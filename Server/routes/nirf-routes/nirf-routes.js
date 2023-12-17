const express = require("express");
const router = express.Router();

const PlacemntAndHEForPriv3Year = require('../../models/nirf-models/placemntAndHEForPriv3YearSchema');

const models = {PlacemntAndHEForPriv3Year}

router.post("/nirf/getData", async (req, res) => {
    const { model, filter } = req.body
    try {
        const fetch = await models[model].find(filter);
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }
})

router.post("/nirf/threeYearSubmit/:model", async (req,res)=>{
    try {
        const model = req.params.model
        const data = req.body;
        const obj = new models[model](data);
        await obj.save();
        res.status(201).send("Entry Succeed")
    } catch (err) {
        console.log(err);
        res.status(500).send()        
    }
});


router.post("/nirf/threeYearEdit/:model", async (req,res)=>{
    try {
        const model = req.params.model
        const data =  JSON.parse(JSON.stringify(req.body));
        const {_id} = data
        await models[model].findOneAndUpdate({ _id }, data)
        res.status(200).send("Edited Successfully")
    } catch (err) {
        console.log(err);
        res.status(500).send()        
    }
});

module.exports = { router, models };