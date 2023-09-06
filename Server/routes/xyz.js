const express = require('express');
const router = express.Router();
const Xyz = require('../models/xyzSchema')

const models = {Xyz}

router.post('/abc/getData', async (req, res) => {

    
    const { model, id , filter} = req.body
    console.log(model);
    try {
        const fetch = await models[model].find(filter).sort({ $natural: -1 });
        res.status(200).send(fetch);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports= router;