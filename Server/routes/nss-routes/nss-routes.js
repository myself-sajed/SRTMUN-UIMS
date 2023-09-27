const fs = require('fs');
const express = require('express');
const xlsx = require('xlsx');
const router = express.Router();

const NssAdmission = require("../../models/nss-models/nssAdmissionSchema")
const NssBasicInfo = require("../../models/nss-models/nssBasicInfoSchema")
const AwardForExtensionActivities = require("../../models/nss-models/awardForExtensionActivitiesSchema")
const ExtensionActivities = require("../../models/director-models/extensionActivitysSchema")
const DemandRatio = require('../../models/director-models/demandRatioSchema');

// multer configuration nss

const multer = require('multer');
const path = require('path');
const dirstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Server/uploads/directorUploads
        const link = path.join(__dirname, `../../uploads/nss-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const upload = multer({ storage: dirstorage })

// multer configuration excel 
const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../../excels/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const excelUpload = multer({ storage: excelStorage })

// multer configuration director
const directorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/director-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const dirtectorUpload = multer({ storage: directorStorage })

const models = { NssAdmission, NssBasicInfo, AwardForExtensionActivities, ExtensionActivities, DemandRatio }

const excelObject = {
    //Nss
    NssBasicInfo: {
        "Student Name":'studentName', 
        "Father/Mother Name":'parentName', 
        "Date of Birth":'dob', 
        "Gender":'gender',  
        "Mobile No":'mobileNo', 
        "Address":'address', 
        "Email":'email', 
        "Created by Programme. Officer Email":'createdByEmail', 
        "Other Area Of Interest":'otherAreaOfInterest',
    },
    NssAdmission:{
        "Student Name":'studentName',
        "Class":'classes',
        "Date of Birth":'dob',
        "Caste":'caste',
        "Category":'category',
        "Year of NSS-1":'nss1Year',
        "Year of NSS-2":'nss2Year',
        "Address":'address',
        "Email":'email',
        "Project Assigned":'projectName',
        "Blood Group":'bloodGroup',
    },
    AwardForExtensionActivities:{
        "Name of the activity": 'nameOfActivity', 
        "Name of the Award/ recognition": 'nameOfAward', 
        "Name of the Awarding government/ government recognised bodies": 'nameOfGovBody', 
        "Year of award": 'academicYear',
    }
}

router.post("/nss/newRecord/:model", upload.single("Upload_Proof"), async (req, res) => {
    try {
        const model = req.params.model
        console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        const up = req.file?req.file.filename:"";
        var withUpData = null
        if (up===""){
            withUpData = data 
        }
        else{
            withUpData = Object.assign(data, { Upload_Proof: up})
        }

        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
        
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

router.post("/nssd/newRecord/:model", dirtectorUpload.single("Upload_Proof"), async (req, res) => {
    try {
        const model = req.params.model
        console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        const up = req.file?req.file.filename:"";
        var withUpData = null
        if (up===""){
            withUpData = data 
        }
        else{
            withUpData = Object.assign(data, { Upload_Proof: up})
        }

        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
        
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
});

//Get Route
router.post('/nss/getData', async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await models[model].find(filter).sort({ $natural: -1 });
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.post('/nssd/getData', async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await models[model].find(filter).sort({ $natural: -1 });
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Edit Route
router.post('/nss/editRecord/:model', upload.single('Upload_Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    const { id } = data
    const isfile = req.file;
    console.log(isfile);
    if (isfile) {
        console.log('file found: ' + isfile)
        var up = req.file.filename
    }
    var alldata = null
    if (up) {
        alldata = Object.assign(data, { Upload_Proof: up })
    }
    else {
        alldata = data
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

router.post('/nssd/editRecord/:model', dirtectorUpload.single('Upload_Proof'), async (req, res) => {
    const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    const { id } = data
    const isfile = req.file;
    console.log(isfile);
    if (isfile) {
        console.log('file found: ' + isfile)
        var up = req.file.filename
    }
    var alldata = null
    if (up) {
        alldata = Object.assign(data, { Upload_Proof: up })
    }
    else {
        alldata = data
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//Delete Route
router.post('/nss/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Upload_Proof;
        const link = path.join(__dirname, `../../uploads/nss-uploads/${Filename}`);
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

router.post('/nssd/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.Upload_Proof;
        const link = path.join(__dirname, `../../uploads/director-uploads/${Filename}`);
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

router.post('/nss/excelRecord/:model', excelUpload.single('excelFile'), (req, res) => {
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
       
        let dateInputs = ["Date of implementation", "Date of Birth"]
           data.forEach((item)=>{
            Object.keys(excelObject[model]).forEach(key => {
                if(dateInputs.includes(key)){
                    let d = new Date((item[key] - (25567 + 2))*86400*1000)
                    fullDate = (`${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0"+d.getDate()).slice(-2)}`)
                    sendData[excelObject[model][key]] = fullDate
                }
                else{
                    sendData[excelObject[model][key]] = item[key]
                }
                
            })
            const obj = new models[model](sendData);
            obj.save(function(error){
                if(error){
                    res.status(500).send()
                    console.log(error)  
                }
            })
        })
         res.status(201).send(`Entry suceeed`)  
    }
    catch(err){
        console.log(err);
        return res.status(500).send()
    }
})

module.exports = {router, excelObject};