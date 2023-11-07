const express = require('express');
const excel = require('exceljs');
const { multerConfig } = require('../../utility/multerConfig');
const router = express.Router();
const models = { ...require('../director-routes/director-routes').models, ...require('../faculty-routes/routes').models, ...require('../swayam-routes/swayam-routes').models, ...require('../admin-routes/admin-routes').AdminModels, ...require('../exam-routes/exam-routes').models, ...require('../dsd-routes/dsd-routes').models, ...require('../tpo-routes/tpo-routes').models, ...require('../estt-routes/estt-routes').models }


const excelUpload = multerConfig(`../../excels/`)




router.post('/bulktableentry/Excel', (req, res) => {
    const { commonFilds, model, tableData } = req.body
    try {
        // console.log(models)
        tableData.forEach(async (e) => {
            const singleItem = new models[model]({ ...e, ...commonFilds });
            await singleItem.save();
        })
        res.status(201).send("Bulk Entry Suceeed")
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})


router.post('/excel/parseExcelData', excelUpload.single('excelFile'), async (req, res) => {
    const excelFile = req.file.filename;

    try {
        const workbook = new excel.Workbook();
        await workbook.xlsx.readFile(path.join(__dirname, `../../../excels/${excelFile}`));
        const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet

        let data = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                const rowData = {};
                row.eachCell((cell, colNumber) => {
                    const header = worksheet.getRow(1).getCell(colNumber).value;
                    rowData[header] = cell.value;
                });

                data.push(rowData);
            }
        });

        console.log('Data from excel :', data)


        res.status(201).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router