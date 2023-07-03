import React, { useState } from 'react'
import QuestionHandler from '../components/QuestionHandler'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchData from '../../dashboard/js/fetchData'
import { useQuery } from 'react-query'
import UserLoading from '../../../pages/UserLoading'
import SchoolsProgram from '../../../components/SchoolsProgram'
import GoBack from '../../../components/GoBack'
import { submitResponse } from '../js/validateAndSubmit'
import ActionButtons from '../components/ActionButtons'
import Header from '../components/Header'
import Bred from '../../../components/Bred'
import siteLinks from '../../../components/siteLinks'
import StepStatus from '../../../components/StepStatus'
import IntroStep from '../components/IntroStep'
import Acknowlegement from '../components/Acknowlegement'
import FeedbackHome from '../components/FeedbackHome'


const StudentFeedback = () => {

    const [formData, setFormData] = useState({})
    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState(null)
    const param = { model: 'User', filter: { department: schoolName } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => fetchData(param))
    const [teachers, setTeachers] = useState([])

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTeachers(data?.data?.data?.map((teacher) => `${teacher.salutation} ${teacher.name}`))
    }, [data])

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`studentFeedback-FormData-${academicYear}-${schoolName}`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`studentFeedback-FormData-${academicYear}-${schoolName}`)) ? JSON.parse(localStorage.getItem(`studentFeedback-FormData-${academicYear}-${schoolName}`)) : {})
        setShouldUpdate(true)
    }, [schoolName, academicYear])

    const navigate = useNavigate()


    const generalQuestions = [
        {
            type: 'check',
            required: true,
            question: 'Tick only those teachers who taught you this year',
            options: teachers
        },
        {
            type: 'radio',
            required: true,
            question: 'Choose the program you are currently enrolled in',
            options: SchoolsProgram?.[schoolName]?.map((program) => program[0])
        },
        {
            type: 'table',
            required: true,
            question: 'Rate the course',
            head: ['Very Good', 'Good', 'Satisfactory', 'Not-Satisfactory'],
            cell: ['Depth of the course content including project work if any', 'Extent of coverage of course', 'Applicability/relevance to real life situations', 'Learning value (in terms of knowledge, concepts, manual skills, analytical abilities and broadening perspectives', 'Clarity and relevance of textual reading', 'Relevance of additional source material (Library)', 'Extent of effort required by students', 'Overall rating']
        },
        {
            type: 'table',
            required: true,
            question: 'Rate the Facilities available',
            head: ['Very Good', 'Good', 'Satisfactory', 'N/A'],
            cell: ['Sufficient number of prescribed books are available in the Library.', 'The books prescribed/listed as reference materials are relevant, updated and appropriate', 'Infrastructural facilities, such as student’s room/ girls room/carrels, class rooms, reading rooms and toilets are available in the Department.', 'Laboratory facilities / Field Visits provided	']
        },
        {
            type: 'check',
            required: true,
            question: 'Is your background benefiting from this course?',
            options: ['More than adequate', 'Just adequate', 'Adequate', 'Inadequate']
        },
        {
            type: 'check',
            required: true,
            question: 'The syllabus was?',
            options: ['Challenging', 'Good', 'Adequate', 'Inadequate']
        },
        {
            type: 'check',
            required: true,
            question: 'How helpful was the internal assesssment?',
            options: ['Highly', 'Moderately', 'Fairly', 'Not sure']
        },
        {
            type: 'radio',
            required: true,
            question: 'Were are you provided with a course and lecture outline at the beginning?',
            options: ['Yes', 'No']
        },
        {
            type: 'radio',
            required: true,
            question: 'If Yes, was it followed?',
            options: ['Yes', 'No']
        },
        {
            type: 'radio',
            required: true,
            question: 'If followed, was it helpful?',
            options: ['Yes', 'No']
        },
        {
            type: 'text',
            required: true,
            question: 'If you have other major comments to offer',
        }

    ]

    const teacherQuestions = [
        {
            type: 'text',
            required: true,
            question: 'Subject/Paper taught by '
        },
        {
            type: 'table',
            required: true,
            question: 'About the teacher',
            head: ['Very Good', 'Good', 'Satisfactory', 'Un-Satisfactory'],
            cell: ['The teacher is generally well-organized and prepared for class.', 'Knowledge base of the teacher (as perceived by you)', 'Communication skills (in terms of articulation and comprehensibility', 'Ability to integrate content with other courses', 'Provision of sufficient time for feedback', 'Interest generated by the teacher']
        },
        {
            type: 'check',
            required: true,
            question: 'How much of the syllabus was covered in class by ',
            options: ['85 to 100%', '70 to 85%', '55 to 70%', 'Less than 55%']
        },
        {
            type: 'text',
            required: true,
            question: 'If you have other major comments for ',
        },

    ]

    const studentQuestions = [
        {
            type: 'text',
            question: 'Name of the student',
        },
        {
            type: 'text',
            question: 'Email address',
        },
        {
            type: 'text',
            question: 'Contact number',
        },
    ]


    const validateForm = (e) => {
        e.preventDefault()
        const questions = [...generalQuestions, ...studentQuestions]

        let generalValidation = true
        let teacherValidation = true

        questions.reverse().forEach((question) => {
            if (question.required) {
                if (formData[question.question]) {
                    if (question.type === 'check') {
                        if (formData[question.question].length === 0) {
                            const element = document.getElementById(question.question);
                            generalValidation = false
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });

                            }
                        }
                    }
                } else {
                    generalValidation = false
                    const element = document.getElementById(question.question);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        })

        teacherQuestions.reverse().forEach((question) => {
            if (question.required) {
                teachers?.forEach((teacher) => {
                    if (formData['Tick only those teachers who taught you this year']?.includes(teacher)) {
                        if (formData[`${question.question} ${teacher}`]) {
                            if (question.type === 'check') {
                                if (formData[`${question.question} ${teacher}`].length === 0) {
                                    const element = document.getElementById(`${question.question} ${teacher}`);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }
                            }
                        } else {
                            teacherValidation = false
                            const element = document.getElementById(`${question.question} ${teacher}`);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    }
                })
            }
        })

        if (generalValidation === true && teacherValidation === true) {
            submitResponse(setLoading, 'studentFeedback', formData, setFormData, { schoolName, academicYear }, navigate, setActiveStep)
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const links = [siteLinks.welcome, siteLinks.studentFeedack]


    return (
        <div>
            <FeedbackHome userType="Student" links={links} academicYear={academicYear} setAcademicYear={setAcademicYear} schoolName={schoolName} setSchoolName={setSchoolName} setActiveStep={setActiveStep} activeStep={activeStep} >


                <div className='w-full md:flex items-center justify-center mt-4'>


                    <div className='lg:w-3/5 sm:w-full md:w-4/5'>

                        {
                            isError ? <div className="alert alert-danger my-4" role="alert">
                                Sorry could not load the form, please try again later...
                            </div> : teachers?.length > 0 ?
                                <div className='w-full'>
                                    <Header title='Student Feedback Form' academicYear={academicYear} schoolName={schoolName} />

                                    <form onSubmit={validateForm} className='w-full mt-5'>

                                        <div id="part-1" >
                                            <p className='bg-green-100 text-green-700 p-2 my-2 rounded-md font-bold w-full mt-3'>General Questions</p>
                                            {
                                                generalQuestions.map((question) => {
                                                    return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                                })
                                            }
                                        </div>
                                        <div id="part-2">
                                            <p className='bg-green-100 text-green-700 p-2 my-2 rounded-md font-bold w-full'>Faculty related Questions</p>

                                            {
                                                formData['Tick only those teachers who taught you this year']?.map((teacher, index) => {
                                                    return <div key={index}>
                                                        {
                                                            teacherQuestions?.map((question) => {
                                                                return <QuestionHandler question={question} formData={formData} setFormData={setFormData} dynamicQuestion={true} dynamicValue={teacher} />
                                                            })
                                                        }
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div id="part-3">
                                            <p className='bg-green-100 text-green-700 p-2 my-2 rounded-md font-bold w-full'>Student related Questions</p>
                                            {
                                                studentQuestions.map((question) => {
                                                    return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                                })
                                            }
                                        </div>
                                        <br /><br /><br /><br />

                                        <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} schoolName={schoolName} responseType="studentFeedback" />



                                    </form>
                                </div>
                                : isLoading ? <UserLoading title="Loading your form" /> : <div className="alert alert-danger my-4" role="alert">
                                    Wrong URL detected, please ensure the URL is correct
                                </div>
                        }
                    </div>
                </div>


            </FeedbackHome>

        </div>
    )
}

export default StudentFeedback