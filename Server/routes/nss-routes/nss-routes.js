const fs = require('fs');
const express = require('express');
const xlsx = require('xlsx');
const router = express.Router();

const NssAdmission = require("../../models/nss-models/nssAdmissionSchema")

// multer configuration director 

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

const models = { NssAdmission }

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

module.exports = router;