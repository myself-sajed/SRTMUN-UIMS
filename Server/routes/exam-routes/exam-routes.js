const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const multerConfig = require('../../utility/multerConfig').multerConfig

const ExamPassedDuringYear = require('../../models/exam-models/examPassedDuringYearSchema')
const StudentComplaintsGrievances = require('../../models/exam-models/studentComplaintsGrevancesSchema')
const DateOfResultDiclaration = require('../../models/exam-models/dateOfResultDiclarationSchema')

const models = { ExamPassedDuringYear, StudentComplaintsGrievances, DateOfResultDiclaration }

const excelUpload = multerConfig(`../../excels/`)


const examstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/exam-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const examUpload = multer({ storage: examstorage })


const excelObject = {
    //EXAM
    ExamPassedDuringYear: {
        "Program Code": 'programCode', "Program Name": 'programName', "Number of Students Appeared in Final Year Examination": 'studentsAppeared', "Number of Students Passed in Final Year Examination": 'studentsPassed', 'Year': 'academicYear',
    },
    StudentComplaintsGrievances: {
        "No Of Students Appeared": 'noOfStudents', "No Of Grievances": 'noOfGrievances', 'Year': 'academicYear',
    },
    DateOfResultDiclaration: {
        "Programme Name": 'programmeName', "Programme Code": 'programmeCode', "Semester/ year": 'academicYear', "Last date of the last semester-end/ year- end examination": 'lastDate', "Date of declaration of results of semester-end/ year- end examination": 'diclarationDate',
    }
}

//get
router.post('/exam/getData', async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await models[model].find(filter);
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//set
router.post("/exam/newRecord/:model", examUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));

        const isFile = req.file
        if (isFile) {
            var up = req.file.filename;
        }

        if (up) {
            var withUpData = Object.assign(data, { Proof: up })
        }
        else {
            var withUpData = data
        }
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//reset
router.post('/exam/editRecord/:model', async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;
    if (isfile) {
        var up = req.file.filename
    }
    SendData = data

    var alldata = null
    if (up) {
        alldata = Object.assign(SendData, { Proof: up })
    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//remove
router.post('/exam/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Proof;
        const link = path.join(__dirname, `../../uploads/exam-uploads/${Filename}`);
        fs.unlink(link, function (err) {
            if (err) {
                console.error(err);
            }
            console.log("file deleted successfullay ");
        });
        res.status(200).send("Entry Deleted Successfully");
    }
    catch (e) {
        res.status(500).send({ massage: e.massage });
    }
})

router.post('/exam/excelRecord/:model', excelUpload.single('excelFile'), (req, res) => {
    console.log('req came')
    const excelFile = req.file.filename
    const model = req.params.model
    let sendData = {};
    const values = JSON.parse(JSON.stringify(req.body));

    let data = []
    try {
        const file = xlsx.readFile(path.join(__dirname, `../../../excels/${excelFile}`))
        const sheetNames = file.SheetNames
        for (let i = 0; i < sheetNames.length; i++) {
            const arr = xlsx.utils.sheet_to_json(
                file.Sheets[sheetNames[i]])
            arr.forEach((response) => data.push(response))
        }

        let dateInputs = ["Last date of the last semester-end/ year- end examination", "Date of declaration of results of semester-end/ year- end examination"]
        data.forEach((item) => {
            Object.keys(excelObject[model]).forEach(key => {
                if (dateInputs.includes(key)) {
                    let d = new Date((item[key] - (25567 + 2)) * 86400 * 1000)
                    let fullDate = (`${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`)
                    sendData[excelObject[model][key]] = fullDate
                }
                else {
                    sendData[excelObject[model][key]] = item[key]
                }

            })
            const obj = new models[model](sendData);
            obj.save(function (error) {
                if (error) {
                    res.status(500).send()
                    console.log(error)
                }
            })
        })
        res.status(201).send(`Entry suceeed`)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})


module.exports = { router, excelObject, models };