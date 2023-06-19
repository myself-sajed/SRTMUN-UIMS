import React, { useState } from 'react'
import QuestionHandler from '../components/QuestionHandler'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import validateForm from '../js/validateAndSubmit';
import ActionButtons from '../components/ActionButtons';
import Header from '../components/Header'

const employerQuestions = [
    {
        type: 'text',
        required: true,
        question: 'Name of the Employer',
    },
    {
        type: 'text',
        required: true,
        question: 'Address of the Employer',
    },
    {
        type: 'text',
        required: true,
        question: 'Contact Number',
    },
    {
        type: 'radio',
        required: true,
        question: 'The Course objectives & outcomes  were clearly defined / identified',
        options: ['Excellent', 'Good', 'Average', 'Below Average',]
    },
    {
        type: 'text',
        required: true,
        question: 'Any suggestions on course objectives and course outcomes',
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
        question: 'Would you suggest any courses to be introduced',
    },
    {
        type: 'text',
        required: true,
        question: 'Any other comments towards the  betterment of the curriculum',
    },

]



const EmployerFeedback = () => {

    const [formData, setFormData] = useState({})
    const { schoolName, academicYear } = useParams()

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`employerFeedback-FormData-${academicYear}-${schoolName}`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`employerFeedback-FormData-${academicYear}-${schoolName}`)) ? JSON.parse(localStorage.getItem(`employerFeedback-FormData-${academicYear}-${schoolName}`)) : {})
        setShouldUpdate(true)
    }, [])

    const navigate = useNavigate()




    return (
        <div>
            <div>
                <GoBack pageTitle={`Employer Feedback Form (${academicYear})`} />
            </div>

            <div className='w-full md:flex items-center justify-center'>


                <div className='lg:w-3/5 sm:w-full md:w-4/5'>


                    <div className='w-full'>
                        <Header title='Employer Feedback Form' />

                        <form onSubmit={(e) => { e.preventDefault(); validateForm(employerQuestions, setLoading, 'employerFeedback', formData, setFormData, { academicYear, schoolName }, navigate) }} className='w-full mt-5'>

                            <div id="part-1" >
                                {
                                    employerQuestions.map((question) => {
                                        return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                    })
                                }
                            </div>

                            <br /><br /><br /><br />

                            <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} schoolName={schoolName} responseType="employerFeedback" />


                        </form>
                    </div>

                </div>
            </div >
        </div>
    )
}

export default EmployerFeedback

export { employerQuestions }