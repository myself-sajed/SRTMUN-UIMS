const fs = require('fs');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');

const College = require('../../models/youth-festival/yfColleges');

// multer configuration

const capitalizeText = require('../../utility/capitalizeText');
const { multerConfig } = require('../../utility/multerConfig');
const upload = multerConfig(`../../`)



// student login auth route 
router.post("/api/auth/youthfestival-login", (req, res) => {
    const { email, password } = req.body
    College.findOne({ email: email.toLowerCase() })
        .then((user) => {
            if (user) {
                if (password === user.password) {
                    const token = jwt.sign({ email: user.email, id: user._id, }, "SRTMUN");
                    res.send({ status: "ok", user, token });
                }
                else {
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


// check if email is already taken by student
router.post('/service/youthfestival-checkAndEmail', function (req, res) {
    const { email } = req.body;
    // check if mail already taken
    College.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (user) {
            res.send({ status: 'taken', message: 'Email already taken' });
        }
        else {
            res.send({ status: 'available' })
        }
    });
})


// student-user register handler 
router.post("/api/auth/youthfestival-register", upload.single("file"), async (req, res) => {

    try {

        const data = JSON.parse(JSON.stringify(req.body));

        console.log(data)


        // otp authentication
        let isMatch = await bcrypt.compare(data.clientOTP, data.serverOTP)

        if (isMatch) {
            const college = new College({ ...data, email: data.email.toLowerCase() });
            await college.save();
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



module.exports = router;