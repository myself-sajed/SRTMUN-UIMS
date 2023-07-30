const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const StudentUser = require('../../models/student-models/studentUserSchema');
const User = require('../../models/faculty-models/userModel');
const JrfSrf = require('../../models/faculty-models/jrfsrf');
const StudentQualification = require('../../models/student-models/studentQualificationSchema')
const path = require('path');

//multer configuration for student user

const studentstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname,`../../uploads/student-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const studentuploads = multer({ storage: studentstorage })

const facultystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/faculty-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const facultyupload = multer({ storage: facultystorage })


let models = { StudentUser, User, JrfSrf, StudentQualification }


//Get Route  faculty jrfsrf 
router.post('/studentF/getData', async (req, res) => {

    const { model, id, filterConditios } = req.body
    
    try {
        const fetch = await models[model].find({ studentId: id, userId: filterConditios?.ResearchGuideId })
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

//Create Route faculty jrfsrf
router.post('/studentF/newRecord/:model', facultyupload.single("Upload_Proof"),async (req, res) => {
    try{
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        const up = req.file.filename;
 
        var withUpData = Object.assign(data, { proof: up })
        
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }catch(err){
        console.log(err)
        res.status(500).send()
    }     
})

//Edit Route faculty jrfsrf
router.post('/studentF/editRecord/:model', facultyupload.single("Upload_Proof"),async (req, res) => {
    try{
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        const {id}=data 
        const isfile = req.file;
        if (isfile) {
            var up = req.file.filename
        }
        
        var allData = up?Object.assign(data, { proof: up }):data
        await models[model].findOneAndUpdate({_id:id},allData);
        res.status(200).send("Entry Succeed")
    }catch(err){
        console.log(err)
        res.status(500).send()
    }     
})

//Delete Route faculty jrfsrf
router.post('/studentF/deleteRecord', async (req, res) => {
    const { model, id } = req.body
    try {
        const Record = await models[model].findOne({ _id: id });
        console.log(Record);
        
        await models[model].deleteOne({ _id: id })
        const Filename =  Record.Upload_Proof;
        const link = path.join(__dirname,`../../uploads/faculty-uploads/${Filename}`);
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

router.post('/student/getData', async (req, res) => {

    const { model, id, filter } = req.body
    try {
        if(filter === 'studentEdit'){
                const fetch = await models[model].find({ _id: id });
                res.status(200).send(fetch);
         }
        else{
            const fetch = await models[model].find(filter)
                res.status(200).send(fetch);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})
router.post('/student/newRecord/:model', studentuploads.single("Upload_Proof"),async (req, res) => {
    try{
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        const up = req.file.filename;  
        
        var withUpData = Object.assign(data, { Upload_Proof: up })
        
        const obj = new models[model](withUpData);
        await obj.save();
        res.status(201).send("Entry Succeed")
    }catch(err){
        console.log(err)
        res.status(500).send()
    }     
})

//Delete Route
router.post('/student/deleteRecord', async (req, res) => {
    const { model, id } = req.body
    try {
        const Record = await models[model].findOne({ _id: id });
        console.log(Record);
        
        await models[model].deleteOne({ _id: id })
        const Filename =  Record.Upload_Proof;
        const link = path.join(__dirname,`../../uploads/student-uploads/${Filename}`);
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

//Edit Route 
router.post('/student/editRecord/:model', studentuploads.single("Upload_Proof"), async (req, res) => {
    try{
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        const {id}=data 
        const isfile = req.file;
        if (isfile) {
            var up = req.file.filename
        }
        
        var allData = up?Object.assign(data, { proof: up }):data
        await models[model].findOneAndUpdate({_id:id},allData);
        res.status(200).send("Entry Succeed")
    }catch(err){
        console.log(err)
        res.status(500).send()
    }
})

module.exports = router;