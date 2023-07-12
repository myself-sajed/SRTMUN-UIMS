const FeedbackModels = require('./feedbackRoutes').feedbackModels
const User = require('../../models/faculty-models/userModel')
const { SchoolsProgram } = require('../../utility/allschool');
const generateChartDataForStudent = require('./studentAnalysis');
const generateChartDataForTeacher = require('./teacherAnalysis');

function fetchFeedbackData(app) {


    app.post('/director/service/getFeedbackData', async (req, res) => {
        const { filter, feedbackUser } = req.body;

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

        let analysis = {}


        if (feedbackUser === "Student") {

            let reponses = dashboardData.Student.map((item) => {
                return JSON.parse(item.response)
            })

            analysis["Student"] = generateChartDataForStudent(reponses)
        } else if (feedbackUser === "Teacher") {
            let reponses = dashboardData.Teacher.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [
                {
                    type: 'table',
                    required: true,
                    question: 'For each item please indicate your level of satisfaction with the following statement',
                    head: ['Strongly agree', 'Agree', 'Neither agree nor disagree', 'Disagree', 'Strongly disagree'],

                    cell: ['Syllabus is suitable to the course', 'Syllabus is need based', 'Objectives & outcome of the syllabi are well defined and clear to teachers and students.', 'Course content is followed by corresponding reference materials.', 'Sufficient number of prescribed books are available in the Library.', 'The course/syllabus has good balance between theory and application.', 'The course/syllabus has made me interested in the subject area.', 'The course/syllabus of this subject increased my knowledge and perspective in the subject area', 'The course/programme of studies carries sufficient number of optional papers.', 'The books prescribed/listed as reference materials are relevant, updated and appropriate', 'Infrastructural facilities, such as teacher’s rooms/carrels, class rooms, reading rooms and toilets are available in the Department.', 'Staff canteen is available at the faculty level.', 'Tests and examinations are conducted well in time with proper coverage of all units in the syllabus.', 'I have the freedom to propose, modify, suggest and incorporate new topics in the syllabus', 'I have the freedom to adopt new techniques/strategies of teaching such as seminar presentations, group discussions and learners’ participations.', 'I have the freedom to adopt/adapt new techniques/strategies of testing and assessment of students.', 'The environment in the department is conducive to teaching and research.', 'The administration is teacher friendly', 'The University provides adequate and smooth support for projects and research facilities.', 'The University provides adequate funding and support to faculty members for upgrading their skills and qualifications.', 'Provisions for professional development are non-discriminatory and fair.']
                },

                {
                    type: 'text',
                    required: true,
                    question: 'If you have other major comments to offer',
                }

            ]

            generateChartDataForTeacher(reponses, questions)

            analysis["Teacher"] = questions

        } else if (feedbackUser === "Alumni") {
            let reponses = dashboardData.Alumni.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [{
                type: 'radio',
                required: true,
                chartType: 'Chart',
                question: 'The Course objectives & outcomes  were clearly defined / identified',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },

            {
                type: 'radio',
                required: true,
                question: 'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
                options: ['Excellent', 'Good', 'Average', 'Below Average',],
                show: 'Chart'

            },
            {
                type: 'radio',
                required: true,
                question: 'The program of studies carries sufficient number of elective(optional) papers.',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'radio',
                required: true,
                question: 'Size / quantum of curriculum according to course duration',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'radio',
                required: true,
                question: 'Weightage and usefulness of curriculum towards Research and Innovation',
                options: ['Excellent', 'Good', 'Average', 'Below Average',],
                show: 'Chart'
            },
            {
                type: 'radio',
                required: true,
                question: 'The program provides focus on skill Development /Employability/ Entrepreneurship',
                options: ['Excellent', 'Good', 'Average', 'Below Average',]
            },
            {
                type: 'text',
                required: true,
                question: 'Any suggestions on course objectives and course outcomes',
            },
            {
                type: 'text',
                required: true,
                question: 'Would you suggest any courses to be introduced',
            },
            {
                type: 'text',
                required: true,
                question: 'Any other comments towards the  betterment of the curriculum',
            },]

            generateChartDataForTeacher(reponses, questions)

            analysis["Alumni"] = questions

        } else if (feedbackUser === "Parent") {
            let reponses = dashboardData.Parent.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [
                {
                    type: 'radio',
                    required: true,
                    question: 'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program of studies carries sufficient number of elective(optional) papers.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',],
                    show: 'Chart'
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Size / quantum of curriculum according to course duration',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Weightage and usefulness of curriculum towards Research and Innovation',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program provides focus on skill Development /Employability/ Entrepreneurship',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',],
                    show: 'Chart'
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Would you suggest any courses to be introduced',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any suggestions on course objectives and course outcomes',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any other comments towards the  betterment of the curriculum',
                }]

            generateChartDataForTeacher(reponses, questions)

            analysis["Parent"] = questions

        } else if (feedbackUser === "Employer") {
            let reponses = dashboardData.Employer.map((item) => {
                return JSON.parse(item.response)
            })

            const questions = [
                {
                    type: 'radio',
                    required: true,
                    question: 'The Course objectives & outcomes  were clearly defined / identified',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The books prescribed/listed as reference materials are relevant, updated and appropriate.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program of studies carries sufficient number of elective(optional) papers.',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Size / quantum of curriculum according to course duration',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'Weightage and usefulness of curriculum towards Research and Innovation',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'radio',
                    required: true,
                    question: 'The program provides focus on skill Development /Employability/ Entrepreneurship',
                    options: ['Excellent', 'Good', 'Average', 'Below Average',]
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any suggestions on course objectives and course outcomes',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Would you suggest any courses to be introduced',
                },
                {
                    type: 'text',
                    required: true,
                    question: 'Any other comments towards the  betterment of the curriculum',
                },
            ]

            generateChartDataForTeacher(reponses, questions)

            analysis["Employer"] = questions

        }


        res.send({ message: 'success', data: { dashboardData, analysis } })


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