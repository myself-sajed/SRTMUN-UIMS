import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FeedbackHome from '../../feedback/components/FeedbackHome'
import Header from '../../feedback/components/Header'
import GreetParagraph from '../../feedback/components/GreetParagraph'
import QuestionHandler from '../../feedback/components/QuestionHandler'
import ActionButtons from '../../feedback/components/ActionButtons'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import validateForm from '../../feedback/js/validateAndSubmit'
import GoBack from '../../../components/GoBack'
import { fetchPrograms } from '../js/fetchPrograms'
import { useQuery } from 'react-query'
import UserLoading from '../../../pages/UserLoading'
import handleRegistration from '../js/registrationHandler'


const questions = [

    {
        type: 'text',
        required: true,
        question: 'Name of the Teacher',
    },
    {
        type: 'text',
        required: true,
        question: 'Email Address',
    },
    {
        type: 'text',
        required: true,
        question: 'Contact Number',
    },
    {
        type: 'radio',
        required: true,
        question: 'Designation',
        options: ['Assistant Professor', 'Associate Professor', 'Professor', 'Senior Professor', 'Other',]
    },
    {
        type: 'text',
        required: true,
        question: 'Name of the Department/School',
    },
    {
        type: 'text',
        required: true,
        question: 'Name of the College/University',
    },
    {
        type: 'text',
        required: true,
        question: 'Address of the institution',
    },

]



const ProgramRegistration = () => {

    title('Program Registration Form')

    const [formData, setFormData] = useState({})
    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState(null)
    const [program, setProgram] = useState(null)

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    const { programId } = useParams()

    const params = { filter: { _id: programId }, singleItem: true }
    const { data, isLoading } = useQuery(["SingleProgram", programId], () => fetchPrograms(params), {
        staleTime: 60000,
        cacheTime: 60000
    })

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`${programId}-ProgramRegistration-FormData`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`${programId}-ProgramRegistration-FormData`)) ? JSON.parse(localStorage.getItem(`${programId}-ProgramRegistration-FormData`)) : {})
        setShouldUpdate(true)
    }, [schoolName, academicYear])

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    let links = [siteLinks.welcome, siteLinks.programs,
    { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program...', link: `/program/${programId}` }, { title: "Program Registration Form", url: '' }];

    useEffect(() => {
        if (data?.data?.data === null) {
            navigate(siteLinks.programs.link)
        } else {
            setProgram(data?.data?.data)
        }
    }, [data])


    const handleFormRegistration = () => {
        handleRegistration(setLoading, formData, programId, program, navigate)
    }

    return (
        <div>
            <GoBack pageTitle="Program Registration Form" bredLinks={links} />

            {
                isLoading ? <UserLoading title="Creating Form for you" /> :

                    <div className='w-full md:flex items-center justify-center mt-4'>


                        <div className='lg:w-3/5 sm:w-full md:w-4/5'>


                            <div className='w-full'>

                                <div className='animate-fade-up animate-once'>
                                    <div className='bg-blue-50 text-center rounded-xl p-2 border-2 border-blue-700'>
                                        <p className='font-semibold text-lg'>{program?.title}</p>
                                        <p className="text-sm">
                                            Organized by {program?.arrangedBy} from {program?.duration}
                                        </p>
                                    </div>
                                    <Header title='Program Registration Form' schoolName={program?.arrangedBy} />
                                </div>


                                <form onSubmit={(e) => { e.preventDefault(); validateForm(questions, setLoading, 'registration', formData, setFormData, { academicYear, schoolName }, navigate, setActiveStep, handleFormRegistration) }} className='w-full mt-5'>

                                    <div id="part-1" className='animate-fade-up animate-once' >
                                        {
                                            questions.map((question) => {
                                                return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                            })
                                        }
                                    </div>

                                    <br /><br /><br /><br />

                                    <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} schoolName={schoolName} responseType="alumniFeedback" />

                                </form>
                            </div>

                        </div>
                    </div >

            }


        </div>
    )
}

export default ProgramRegistration

export { questions }