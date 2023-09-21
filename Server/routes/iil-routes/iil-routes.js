const fs = require("fs")
const path = require('path');
const IncubationDetails = require('../../models/iil-models/iilIncubationDetails')
const ScopusWebOfScience = require('../../models/iil-models/iilScopusWebOfScience')
const IilCollaborativeActivities = require('../../models/iil-models/iilCollaborativeActivitiesSchema')
const IilRevenueConsultancy = require('../../models/iil-models/iilRevenueConsultancySchema')
const IilRevenueCorporateTraining = require('../../models/iil-models/iilRevenueCorporateTrainingSchema')
const { multerConfig } = require('../../utility/multerConfig')

const excelObject = {
    IilRevenueCorporateTraining:{
        "Names of the teacher-consultants/corporate trainers": 'nameOfCorporate', "Title of the corporate training program": 'nameOfCorporateProgram', "Agency seeking training with contact details": 'agencyName', "Revenue generated (amount in rupees)": 'revenueGenerated',"Number of trainees": 'numberOfTrainees', 'Year': 'academicYear',
    },
    IilRevenueConsultancy:{
        "Name of the consultant": 'nameOfConsultant', "Name of consultancy project": 'nameOfConsultancyProject', "Consulting/Sponsoring agency with contact details": 'agencyName', "Revenue generated (INR in Lakhs)": 'revenueGenerated', 'Year': 'academicYear',
    },
    IilCollaborativeActivities:{
        "Title of the collaborative activity": 'titleOfActivity', "Name of the collaborating agency with contact details": 'nameOfAgency', "Name of the participant ": 'nameOfParticipant', "Duration": 'duration',"Nature of the activity": 'natureOfActivity', 'Year of collaboration': 'academicYear',
    }
}

function iilRoutes(app) {

    const iilModels = { IncubationDetails, ScopusWebOfScience, IilCollaborativeActivities, IilRevenueConsultancy, IilRevenueCorporateTraining }
    const excelUpload = multerConfig(`../../excels/`)
    const iiLUpload =  multerConfig(`../uploads/iil-uploads`)


    // add iil data in any iil model
    app.post('/iil/addData', async (req, res) => {
        try {
            const { model, dataToAppend, filter } = req.body;
            await iilModels[model].findOneAndUpdate(filter, dataToAppend, { upsert: true, new: true });
            res.send({ status: 'success' })
        } catch (error) {
            console.log(error)
            res.send({ status: 'error' })
        }
    })

    // retrive iil data from any iil model
    app.post('/iil/getData', async (req, res) => {
        try {
            const { model, filter } = req.body;
            const data = await iilModels[model].findOne(filter).lean()
            console.log(data)
            if (data) {
                res.send({ status: 'success', data })
            } else {
                res.send({ status: 'error' })
            }
        } catch (error) {
            console.log(error)
            res.send({ status: 'error' })

        }
    })

    //iil new rouetes
    //get
app.post('/iil2/getData', async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await iilModels[model].find(filter);
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//set
app.post("/iil2/newRecord/:model", iiLUpload.single("proof"), async (req, res) => {
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
        const obj = new iilModels[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//reset
app.post('/iil2/editRecord/:model',iiLUpload.single("proof"), async (req, res) => {
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
    await iilModels[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//remove
app.post('/iil2/deleteRecord', async (req, res) => {
    const { model, id } = req.body
    try {
        const Record = await iilModels[model].findOne({ _id: id });
        await iilModels[model].deleteOne({ _id: id })
        const Filename = Record.Proof;
        console.log(Filename);
        const link = path.join(__dirname, `../../uploads/iil-uploads/${Filename}`);
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

app.post('/iil2/excelRecord/:model', excelUpload.single('excelFile'), (req, res) => {
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
                    fullDate = (`${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`)
                    sendData[excelObject[model][key]] = fullDate
                }
                else {
                    sendData[excelObject[model][key]] = item[key]
                }

            })
            const obj = new iilModels[model](sendData);
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
}

module.exports = {iilRoutes, excelObject}