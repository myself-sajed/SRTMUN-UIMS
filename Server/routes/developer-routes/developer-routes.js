const express = require('express');
const router = express.Router();
const { Delete_Pdfs, DB_Backups, Delete_Excels, Network_Connect } = require('../../utility/cronFunction')

router.post("/developer/mongodump", () => {
    DB_Backups();
})

router.post("/developer/excelsclear", () => {
    Delete_Excels();
})

router.post("/developer/pdfsclear", () => {
    Delete_Pdfs();
})
router.post("/developer/networkConnect", (req,res) => {
    if(req.body!=null){
        const {i_username, i_password} = req.body
        const status = Network_Connect(i_username, i_password)
        if(status){
            res.send({status: true})
        }
    }
    else{
        const status = Network_Connect();
        if(status){
            res.send({status: true})
        }
    }
})

module.exports = router;