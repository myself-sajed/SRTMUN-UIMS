import React, { useState } from 'react'
import QuestionHandler from '../components/QuestionHandler'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import ActionButtons from '../components/ActionButtons';
import validateForm from '../js/validateAndSubmit';
import Header from '../components/Header'


const parentQuestions = [
    {
        type: 'text',
        required: true,
        question: 'Your full name(Parent)',
    },
    {
        type: 'text',
        required: true,
        question: 'Residential address',
    },
    {
        type: 'text',
        required: true,
        question: 'Contact Number',
    },
    {
        type: 'text',
        required: true,
        question: 'Name of your son/daughter',
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

const ParentFeedback = () => {

    const [formData, setFormData] = useState({})
    const { schoolName, academicYear } = useParams()

    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shouldUpdate && localStorage.setItem(`parentFeedback-FormData-${academicYear}-${schoolName}`, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(`parentFeedback-FormData-${academicYear}-${schoolName}`)) ? JSON.parse(localStorage.getItem(`parentFeedback-FormData-${academicYear}-${schoolName}`)) : {})
        setShouldUpdate(true)
    }, [])

    const navigate = useNavigate()

    return (
        <div>
            <div>
                <GoBack pageTitle={`Parent Feedback Form (${academicYear})`} />
            </div>

            <div className='w-full md:flex items-center justify-center'>


                <div className='lg:w-3/5 sm:w-full md:w-4/5'>


                    <div className='w-full'>
                        <Header title='Parent Feedback Form' />



                        <form onSubmit={(e) => { e.preventDefault(); validateForm(parentQuestions, setLoading, 'parentFeedback', formData, setFormData, { academicYear, schoolName }, navigate) }} className='w-full mt-5'>

                            <div id="part-1" >
                                {
                                    parentQuestions.map((question) => {
                                        return <QuestionHandler question={question} formData={formData} setFormData={setFormData} />
                                    })
                                }
                            </div>

                            <br /><br /><br /><br />

                            <ActionButtons loading={loading} setFormData={setFormData} academicYear={academicYear} schoolName={schoolName} responseType="parentFeedback" />

                        </form>
                    </div>

                </div>
            </div >
        </div>
    )
}

export default ParentFeedback

export { parentQuestions }