const ActionTakenReport = require('../../models/feedback-models/actionTakenReportModel')
const { multerConfig } = require('../../utility/multerConfig')

const upload = multerConfig(`../uploads/feedback-uploads/`, 'ActionTakenReport')

function actionTakenReport(app) {
    app.post('/feedback/upload/actionTakenReport', upload.single('ATRFile'), async (req, res) => {
        const { title, schoolName, academicYear } = JSON.parse(JSON.stringify(req.body));

        try {

            let isDocExist = await ActionTakenReport.findOne({ schoolName, academicYear })
            if (isDocExist) {
                let updatedDoc = await ActionTakenReport.findOneAndUpdate({ schoolName, academicYear }, { [title]: req.file ? req.file.filename : null }, { new: true })
                updatedDoc.save()
                res.send({ status: 'success', data: updatedDoc });
            } else {
                let newDoc = new ActionTakenReport({ schoolName, academicYear, [title]: req.file.filename })
                newDoc.save()
                res.send({ status: 'success', data: newDoc });
            }

        } catch (error) {
            res.send({ status: 'error', message: error });
        }
    })

    app.post('/feedback/submit/actionTakenReport', async (req, res) => {
        const { schoolName, academicYear, shouldSubmit } = req.body

        try {
            let isDocExist = await ActionTakenReport.findOne({ schoolName, academicYear })
            if (isDocExist) {
                let updatedDoc = await ActionTakenReport.findOneAndUpdate({ schoolName, academicYear }, { submitted: shouldSubmit })
                updatedDoc.save()
                console.log(updatedDoc)
                res.send({ status: 'success', data: updatedDoc });
            } else {
                console.log(error)
                res.send({ status: 'error', message: 'Could not found reports to submit' });
            }

        } catch (error) {
            res.send({ status: 'error', message: error });
        }
    })
}

module.exports = actionTakenReport;