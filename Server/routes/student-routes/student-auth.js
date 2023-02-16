const fs = require('fs');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');

const StudentUser = require('../../models/student-models/studentUserSchema');

// multer configuration

const multer = require('multer');

const studentstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const link = path.join(__dirname,`../../uploads/student-uploads/`)
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
        const data = JSON.parse(JSON.stringify(req.body));
        const { salutation, name, programGraduated, schoolName, gender, password, cPassword, email, mobile, clientOTP, serverOTP, abcNo, currentIn }= data;

        // otp authentication
        let isMatch = await bcrypt.compare(clientOTP, serverOTP)
        console.log(isMatch);
        if (isMatch) {
            const user = new StudentUser({
                mobile: mobile,
                salutation: salutation,
                name: name,
                schoolName: schoolName,
                programGraduated: programGraduated,
                password: password,
                gender: gender,
                email: email.toLowerCase(),
                photoURL: req.file.filename,
                abcNo: abcNo,
                currentIn: currentIn
            });
            user.save();
            res.send({ status: "success", message: "Registration Successfull" });
        }
        else {
            res.send({ status: "error", message: "Wrong OTP entered, Please try again" });
        }

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
router.post("/student/editRecord/",StudentUpload.single("uploadProof"), async(req, res)=>{

    // const model = req.params.model
    const data = JSON.parse(JSON.stringify(req.body));
    let SendData = null;
    const { id } = data
    const isfile = req.file;
    if (isfile) {
        var up = req.file.filename
    }

    Object.keys(data).map((item)=>{
        if(data[item]=='undefined'){
            data[item] = ""
        }
        
    })
    console.log(data)
        const { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn} = data

        SendData = {  salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn }    

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