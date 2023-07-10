const FeedbackModels = require('./feedbackRoutes').feedbackModels
const User = require('../../models/faculty-models/userModel')
const { SchoolsProgram } = require('../../utility/allschool')

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
        dashboardData.Faculties = await User.find({ department: filter.schoolName })
        dashboardData.FacultiesCount = dashboardData.Faculties.length

        res.send({ message: 'success', data: dashboardData })


    })

    app.post('/director/service/getTotalFeedbackData', async (req, res) => {
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


        let schoolNames = Object.keys(SchoolsProgram)



        const StudentsSchoolWise = dashboardData.Student.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName].push(item);
                } else {
                    obj[item.schoolName] = [item];
                }
            }
            return obj;
        }, {});

        const TeachersSchoolWise = dashboardData.Teacher.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName].push(item);
                } else {
                    obj[item.schoolName] = [item];
                }
            }
            return obj;
        }, {});

        const AlumniSchoolWise = dashboardData.Alumni.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName].push(item);
                } else {
                    obj[item.schoolName] = [item];
                }
            }
            return obj;
        }, {});

        const ParentsSchoolWise = dashboardData.Parent.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName].push(item);
                } else {
                    obj[item.schoolName] = [item];
                }
            }
            return obj;
        }, {});

        const EmployersSchoolWise = dashboardData.Employer.reduce((obj, item) => {
            if (schoolNames.includes(item.schoolName)) {
                if (obj[item.schoolName]) {
                    obj[item.schoolName].push(item);
                } else {
                    obj[item.schoolName] = [item];
                }
            }
            return obj;
        }, {});


        res.send({ message: 'success', data: { StudentsSchoolWise, TeachersSchoolWise, AlumniSchoolWise, ParentsSchoolWise, EmployersSchoolWise, StudentCount: dashboardData.StudentCount, TeacherCount: dashboardData.TeacherCount, AlumniCount: dashboardData.AlumniCount, ParentCount: dashboardData.ParentCount, EmployerCount: dashboardData.EmployerCount } })


    })

}


module.exports = fetchFeedbackData