const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const StudentUser = require('../../models/student-models/studentUserSchema');
const User = require('../../models/faculty-models/userModel');
const JrfSrf = require('../../models/faculty-models/jrfsrf');
const path = require('path');

//multer configuration for student user

const directorstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname,`../../uploads/director-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const upload = multer({ storage: directorstorage })

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


let models = { StudentUser, User, JrfSrf }


router.post('/student/getData', async (req, res) => {

    const { model, id, filter, filterConditios } = req.body
    

    try {
        if(filter){
            if(filter === 'facultyUser'){
             const fetch = await models[model].find({ salutation: id, department:filterConditios.schoolName});
             res.status(200).send(fetch);
            }
            else if(filter === 'studentEdit'){
                const fetch = await models[model].find({ _id: id });
                res.status(200).send(fetch);
            }
         }
        else{
            const fetch = await models[model].find({ studentId: id, userId: filterConditios?.ResearchGuideId })
                res.status(200).send(fetch);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

router.post('/student/newRecord/:model', facultyupload.single("Upload_Proof"),async (req, res) => {
    try{
        const model = req.params.model
        const data = JSON.parse(JSON.stringify(req.body));
        let SendData = null;
        const { SchoolName, StudentId } = data
        const up = req.file.filename;
      
        //JrfSrf
        if (model == 'JrfSrf') {
            const { researchName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year, userId,studentId } = data
            SendData = { 
                researchName, enrolmentYear, fellowshipDuration, fellowshipType, grantingAgency, qualifyingExam, year, userId, studentId
            }
            
        }
        if(model == 'JrfSrf'){
            var withUpData = Object.assign(SendData, { proof: up, StudentId })
        }
        else {
            var withUpData = Object.assign(SendData, { Upload_Proof: up, StudentId })
        }
        
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
        const Filename = Record.Upload_Proof;
        const link = path.join(__dirname,`../../uploads/director-uploads/${Filename}`);
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