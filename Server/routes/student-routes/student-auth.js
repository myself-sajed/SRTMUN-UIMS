const fs = require('fs');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');

const StudentUser = require('../../models/student-models/studentUserSchema');
const StudentIdCount = require('../../models/student-models/studentIdCountSchema');

// multer configuration

const multer = require('multer');

const studentstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname, `../../uploads/student-uploads/`)
        cb(null, link)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    },
})
const StudentUpload = multer({ storage: studentstorage })

const models = { StudentUser }


// student login auth route 
router.post("/api/auth/student-login", (req, res) => {
    StudentUser.findOne({ email: req.body.username.toLowerCase() })
        .then((user) => {
            if (user) {
                if (req.body.password === user.password) {
                    const token = jwt.sign({ email: user.email, id: user._id, }, "SRTMUN");
                    res.send({ status: "ok", user, token });
                } else {
                    res.send({
                        status: "notok",
                        message: "Please Enter correct username or password",
                    });
                }
            } else {
                res.send({
                    status: "notok",
                    message: "Please Enter correct username or password",
                });
            }
        })
        .catch(function (err) {
            res.send({ status: "notok", message: "Internal Server Error" });
        });
})


// student-user register handler 
router.post("/api/auth/student-register", StudentUpload.single("file"), async (req, res) => {

    try {
        const SchoolFourCharacter = {
            "School of Computational Sciences": "comp",
            "School of Chemical Sciences": "chem",
            "School of Commerce and Management Sciences": "comm",
            "School of Educational Sciences": "educ",
            "School of Mathematical Sciences": "math",
            "School of Physical Sciences": "phys",
            "School of Social Sciences": "soci",
            "School of Earth Sciences": "eart",
            "School of Life Sciences": "life",
            "School of Pharmacy": "phar",
            "School of Media Studies": "medi",
            "School of Fine and Performing Arts": "fine",
            "School of Language, Literature and Culture Studies": "lang",
            "School of Management Sciences, Sub-Campus, Latur": "mana",
            "School of Technology, Sub-Campus, Latur": "tech",
            "School of Social Sciences, Sub-Campus, Latur": "sosc",

        }
        const data = JSON.parse(JSON.stringify(req.body));
        const { salutation, name, programGraduated, schoolName, gender, email, mobile, clientOTP, serverOTP, abcNo, currentIn, country, cast, religion, programEnroledOn, createdBy } = data;

        console.log(req.file.filename)

        const year = programEnroledOn.slice(0,4);
        
        let dataId = await StudentIdCount.findOne({name : year})
        let NextRoll= dataId.idObject[SchoolFourCharacter[schoolName]]+1;

        // return res.StudentIdCount
        // console.log("Object is"+ NextRoll);
        // console.log(getLastRollNo())
        const rollNumberStr = NextRoll.toString().padStart(3, '0');
        const username= `${SchoolFourCharacter[schoolName]}${year}${rollNumberStr}`;
        console.log("Student username is "+ username);

        if(createdBy== "director"){
            //genrate random pass
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
            let password = "";
            const length = 8
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            const user = new StudentUser({
                mobile, salutation, name, schoolName, programGraduated, password, gender,
                email: email.toLowerCase(),
                photoURL: req.file.filename,
                abcNo, currentIn, country, cast, religion, programEnroledOn, username, 
                status: "Active",createdBy
            })
            await user.save();
            await StudentIdCount.updateOne({name: year},{$set:{[`idObject.${SchoolFourCharacter[schoolName]}`]:NextRoll}});
            res.send({ status: "success", message: "Student Added Successfuly", username});
        }
        else if(createdBy== "Self"){
        // otp authentication
        const{password} = data
        let isMatch = await bcrypt.compare(clientOTP, serverOTP)
        console.log(isMatch);
        if (isMatch) {
            const user = new StudentUser({
                mobile, salutation, name, schoolName, programGraduated, password, gender,
                email: email.toLowerCase(),
                photoURL: req.file.filename,
                abcNo, currentIn, country, cast, religion, programEnroledOn, username, 
                status: "InActive", createdBy
            });
            await user.save();
            await StudentIdCount.updateOne({name: year},{$set:{[`idObject.${SchoolFourCharacter[schoolName]}`]:NextRoll}});
            res.send({ status: "success", message: "Registration Successfull", username: username});
        }
        else {
            res.send({ status: "error", message: "Wrong OTP entered, Please try again" });
        }}

    } catch (error) {
        console.log(error);
        res.send({ status: "error", message: "Internal Server Error" });
    }
});

// student-user authentication handler
router.post("/api/auth/student", (req, res) => {

    // get token from body
    const token = req.body.student_token;
    const decoded = jwt.verify(token, "SRTMUN");
    // console.log('Token :', token, 'Decode :', decoded.username)
    StudentUser.findOne({ email: decoded.username }).then(function (user) {
        if (user) {

            res.send({ status: "authenticated", user: user });
        } else {
            res.send({ status: "error" });
        }
    });
});

router.get("/student/:filename", function (req, res) {
    const link = path.join(__dirname, `../../uploads/student-uploads/${req.params.filename}`);
    res.sendFile(link);
});

//Student User Edit Record
router.post("/student/editRecord/", StudentUpload.single("uploadProof"), async (req, res) => {

    // const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;
    if (isfile) {
        var up = req.file.filename
    }

    Object.keys(data).map((item) => {
        if (data[item] == 'undefined') {
            data[item] = ""
        }

    })
    console.log(data)
    const { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, country, cast, religion, programEnroledOn } = data

    SendData = { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, country, cast, religion, programEnroledOn }

    var alldata = null
    if (up) {
        alldata = Object.assign(SendData, { photoURL: up })
    }
    else {
        alldata = SendData
    }
    await StudentUser.findOneAndUpdate({ _id: id }, alldata)
    res.status(200).send("Edited Successfully")

})


module.exports = router;