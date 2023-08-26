import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FeedbackHome from '../../feedback/components/FeedbackHome'
import Header from '../../feedback/components/Header'
import GreetParagraph from '../../feedback/components/GreetParagraph'
import QuestionHandler from '../../feedback/components/QuestionHandler'
import ActionButtons from '../../feedback/components/ActionButtons'
import validateForm from '../../feedback/js/validateAndSubmit'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import GoBack from '../../../components/GoBack'

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

const WorkshopRegistration = () => {

    title('Workshop Registration Form')

    const [formData, setFormData] = useState({})
    const [academicYear, setAcademicYear] = useState(null)
    const [schoolName, setSchoolName] = useState(null)

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`workshopRegistration-FormData`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`workshopRegistration-FormData`)) ? JSON.parse(localStorage.getItem(`workshopRegistration-FormData`)) : {})
        setShouldUpdate(true)
    }, [schoolName, academicYear])

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0);
    let links = [siteLinks.welcome, siteLinks.workshop, siteLinks.workshopRegistration]



    return (
        <div>

            <GoBack pageTitle="Workshop Registration Form" bredLinks={links} />

            <div className='w-full md:flex items-center justify-center mt-4 animate-fade-up animate-once'>


                <div className='lg:w-3/5 sm:w-full md:w-4/5'>


                    <div className='w-full'>


                        <div className='bg-blue-50 text-center rounded-xl p-2 border-2 border-blue-700'>
                            <p className='font-semibold text-lg'>One Day Workshop on MOOCs Development for SWAYAM</p>
                            <p className="text-sm">
                                One Day Workshop on MOOCs developement for SWAYAM and other Platforms, 13 Sep 2023, Organized by IQAC, Swami Ramanand Teerth Marathwada University, Nanded
                            </p>
                        </div>
                        <Header title='Workshop Registration Form' academicYear={"2022-23"} schoolName={"School of Mathematical Sciences"} />

                        <form onSubmit={(e) => { e.preventDefault(); validateForm(questions, setLoading, 'workshopRegistration', formData, setFormData, { academicYear: "2023-24", schoolName: "School of Mathematical Sciences" }, navigate, setActiveStep) }} className='w-full mt-5'>

                            <div id="part-1" >
                                {
                                    questions.map((question) => {
                                        return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                    })
                                }
                            </div>

                            <br /><br /><br /><br />

                            <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} schoolName={schoolName} responseType="workshopRegistration" />

                        </form>
                    </div>

                </div>
            </div >

        </div>
    )
}

export default WorkshopRegistration

export { questions }
