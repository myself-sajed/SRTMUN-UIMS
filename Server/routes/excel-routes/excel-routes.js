const express = require('express');
const router = express.Router();
const models = {...require('../director-routes/director-routes').models, ...require('../faculty-routes/routes').models, ...require('../swayam-routes/swayam-routes').models, ...require('../admin-routes/admin-routes').AdminModels, ...require('../exam-routes/exam-routes').models, ...require('../dsd-routes/dsd-routes').models, ...require('../tpo-routes/tpo-routes').models, ...require('../estt-routes/estt-routes').models }


router.post('/bulktableentry/Excel', (req, res) => {
    const {commonFilds, model, tableData } = req.body
    try {
        // console.log(models)
        tableData.forEach(async(e) =>{
            const singleItem = new models[model]({...e, ...commonFilds});
            await singleItem.save();
        })
        res.status(201).send("Bulk Entry Suceeed")
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router