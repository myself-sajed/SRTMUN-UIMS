const FeedbackModels = require('./feedbackRoutes').feedbackModels
const User = require('../../models/faculty-models/userModel')


function fetchFeedbackData(app) {


    app.post('/director/service/getFeedbackData/', async (req, res) => {
        const { filter } = req.body;

        let dashboardData = {}
        dashboardData.Student = await FeedbackModels.StudentFeedback.find(filter)
        dashboardData.StudentCount = dashboardData.Student.length
        dashboardData.Teacher = await FeedbackModels.TeacherFeedback.find(filter)
        dashboardData.TeacherCount = dashboardData.Teacher.length
        dashboardData.Alumni = await FeedbackModels.AlumniFeedback.find(filter)
        dashboardData.AlumniCount = dashboardData.Alumni.length
        dashboardData.Parent = await FeedbackModels.ParentFeedback.find(filter)
        dashboardData.ParentCount = dashboardData.Parent.length
        dashboardData.Employer = await FeedbackModels.EmployerFeedback.find(filter)
        dashboardData.EmployerCount = dashboardData.Employer.length
        dashboardData.Faculties = await User.find({department: filter.schoolName})
        dashboardData.FacultiesCount = dashboardData.Faculties.length

        res.send({ message: 'success', data: dashboardData })


    })

}


module.exports = fetchFeedbackData