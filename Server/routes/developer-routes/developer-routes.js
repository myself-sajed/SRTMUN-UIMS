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
router.post("/developer/networkConnect", () => {
    Network_Connect();
})

module.exports = router;