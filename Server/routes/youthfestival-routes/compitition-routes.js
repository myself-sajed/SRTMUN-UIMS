const fs = require('fs');
const express = require('express');
const router = express.Router();


router.post('/youthfestival/competition/add', (req,res)=>{
    console.log(req.body);
})