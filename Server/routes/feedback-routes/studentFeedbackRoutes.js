const StudentFeedback = require('../../models/feedback-models/studentFeedbackModel')

function studentFeedbackRoutes(app) {

    app.post('/feedback/studentFeedback/collectResponse', (req, res) => {
        // collecting the response here

        const { response, academicYear, schoolName } = req.body;
        const studentFeedback = new StudentFeedback({ academicYear, schoolName, response: JSON.stringify(response) });
        studentFeedback.save().then((savedFeedback) => {
            if (savedFeedback) {
                res.send({ status: 'success', message: 'News published successfully' })
            }
            else {
                res.send({ status: 'error', message: 'Could not save the form...' })
            }
        })

    })


}

module.exports = studentFeedbackRoutes