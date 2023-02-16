const express = require('express');
const router = express.Router();
const {Delete_Pdfs , DB_Backups, Delete_Excels} = require('../../utility/cronFunction')

router.post("/developer/mongodump", () => {
    DB_Backups();
})

router.post("/developer/excelsclear", () => {
    Delete_Excels();
})

router.post("/developer/pdfsclear", () => {
    Delete_Pdfs();
})

module.exports = router;