const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const multerConfig = require('../../utility/multerConfig').multerConfig

const DSDAQAR = require('../../models/dsd-models/dsdAqarSchema')
const KRCAQAR = require('../../models/krc-models/krcAqarSchema')
const SportsAQAR = require('../../models/sports-models/sportsAqarSchema')
const NSSAQAR = require('../../models/nss-models/nssAqarSchema')
const ExamAQAR = require('../../models/exam-models/examAqarSchema')
const PlacementAQAR = require('../../models/placement-models/placementAqarSchema')
const IILAQAR = require('../../models/iil-models/iilAQARSchema')
const OtherAQAR = require('../../models/other-models/otherAQARSchema')
const YFReportIsSubmitted = require('../../models/youth-festival/yfSubmitted')

const NonTeachingModels = { DSDAQAR, KRCAQAR, SportsAQAR, NSSAQAR, ExamAQAR, PlacementAQAR, OtherAQAR, YFReportIsSubmitted, IILAQAR }

const DSDSports = require('../../models/dsd-models/dsdSportsSchema');
const SportsAndCulturalEvents = require('../../models/dsd-models/sportsAndCulturalEventsSchema');

const models = { DSDSports, SportsAndCulturalEvents }

const excelUpload = multerConfig(`../../excels/`)

const dsdstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/dsd-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const dsdUpload = multer({ storage: dsdstorage })

const excelObject = {
    DSDSports: {
        "Name of the award/ medal": 'nameOfAward', "Team / Individual": 'teamIndividual', "Inter-university / state / National / International": 'isNat', "Name of the event": 'nameOfEvent', "Name of the student": 'nameOfStudnt', "Year": 'academicYear',
    },
    SportsAndCulturalEvents: {
        "Date of event/competition": "dateOfEvent", "Name  of the event/competition": "nameOfEvent", "Academic Year": "academicYear",
    }
}


// add aqar submissions year in the schema so that it will show if the aqar for that year has submitted or not
router.post('/other/services/isReportSubmitted', (req, res) => {

    const { year, model, filter, dataToAdd } = req.body;
    const modelFilter = filter ? filter : {}
    const data = dataToAdd ? dataToAdd : {}
    NonTeachingModels[model].findOne(modelFilter, (err, doc) => {
        if (err) {
            console.error(err);
            return res.send({ status: 'error', message: "Internal Server Error" });
        } else {
            if (!doc) {
                doc = new NonTeachingModels[model](data);
            }


            doc.submitted = [...new Set([...doc.submitted, year])]?.sort((a, b) => {
                const numA = Number(a.replace('-', ''));
                const numB = Number(b.replace('-', ''));
                if (numA > numB) {
                    return -1;
                } else if (numA < numB) {
                    return 1;
                }
                return 0;
            });;

            doc.save((saveErr, updatedDoc) => {
                if (saveErr) {
                    console.log(saveErr)
                    return res.send({ status: 'error', message: "Could not submit the form" });

                } else {
                    return res.send({ status: 'success', message: `AQAR Form (${year}) submission successful` });
                }
            });

        }
    });

})

//get
router.post('/dsd/getData', async (req, res) => {
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
router.post("/dsd/newRecord/:model", dsdUpload.single("Proof"), async (req, res) => {
    try {
        const model = req.params.model
        // console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        // const { } = data
        const up = req.file.filename;
        SendData = data

        var withUpData = Object.assign(SendData, { Proof: up })
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
router.post('/dsd/editRecord/:model', dsdUpload.single('Proof'), async (req, res) => {
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
router.post('/dsd/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Proof;
        const link = path.join(__dirname, `../../uploads/dsd-uploads/${Filename}`);
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

router.post('/dsd/excelRecord/:model', excelUpload.single('excelFile'), (req, res) => {
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

        let dateInputs = ["Date of event/competition"]
        data.forEach((item) => {
            Object.keys(excelObject[model]).forEach(key => {
                if (dateInputs.includes(key)) {
                    let d = new Date((item[key] - (25567 + 2)) * 86400 * 1000)
                    fullDate = (`${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`)
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


module.exports = { router, excelObject }