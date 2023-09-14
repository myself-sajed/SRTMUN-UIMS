const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerConfig = require('../../utility/multerConfig').multerConfig
const YfTable1 = require('../../models/youth-festival/yfTable1Schema')
const YfTable2 = require('../../models/youth-festival/yfTable2Schema')

const models = { YfTable1, YfTable2 }

const youthUpload = multerConfig(`../uploads/youth-uploads/`)


//get
router.post('/youth/getData', async (req, res) => {
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
router.post("/youth/newRecord/:model", youthUpload.single("photoURL"), async (req, res) => {
    try {
        const model = req.params.model
        // console.log(model)
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        // const { } = data
        const up = req.file.filename;
        SendData = data

        var withUpData = Object.assign(SendData, { photoURL: up })
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
router.post('/youth/editRecord/:model', youthUpload.single('photoURL'), async (req, res) => {
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
        alldata = Object.assign(SendData, { photoURL: up })
    }
    else {
        alldata = SendData
    }
    await models[model].findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")
})

//remove
router.post('/youth/deleteRecord', async (req, res) => {
    const { model, id } = req.body

    try {
        const Record = await models[model].findOne({ _id: id });
        await models[model].deleteOne({ _id: id })
        const Filename = Record.photoURL;
        const link = path.join(__dirname, `../../uploads/youth-uploads/${Filename}`);
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