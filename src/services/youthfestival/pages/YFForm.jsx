import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import StepStatus from '../../../components/StepStatus'
import Year from '../../../inputs/Year'
import { SaveButton } from '../../faculty/reports/pbas/PbasReportHome'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Acknowledgement from '../../../components/Acknowledgement'
import isReportSubmitted from '../../dsd/js/isReportSubmitted'
import { useSelector } from 'react-redux'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import GeneralInfo from '../components/GeneralInfo'
import Footer from '../../../components/Footer'
import Spardhak from '../components/Spardhak'
import VadakSathidar from '../components/VadakSathidar'
import ArrowButton from '../../../components/ArrowButton'


const YFForm = () => {

    const steps = ["Select Academic Year", "Fill Youth Festival Tables", "Acknowledgement"]
    const [activeStep, setActiveStep] = useState(0)
    const navigate = useNavigate()
    const bredLinks = [siteLinks.welcome, siteLinks.yfCollegeHome, siteLinks.yfCollegeYouthForm]
    const [academicYear, setAcademicYear] = useState(null)
    title(siteLinks.yfCollegeYouthForm.title)
    const user = useSelector((state) => state.user.youthUser)

    const AQARTables = [
        {
            title: 'General Form',
            component: <GeneralInfo academicYear={academicYear} user={user} />
        },
        {
            title: 'Spardhak',
            component: <Spardhak />
        },
        {
            title: 'Vadak and Sathidar',
            component: <VadakSathidar />
        },
    ]
    const tableTitles = [...AQARTables.map((table) => table.title)]


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const navigateTabs = () => {
        if (activeStep === 2) {
            handleBack()
        } else if (activeStep === 1) {
            handleBack()
        } else if (activeStep === 0) {
            navigate(-1)
        }
    }

    const handleFormSubmit = () => {
        const customMessage = `Youth Festival form for ${academicYear} has been submitted successfully.`
        isReportSubmitted(academicYear, 'YFReportIsSubmitted', handleNext, customMessage)
    }


    return (
        <div>
            <GoBack pageTitle={`${siteLinks.yfCollegeYouthForm.title} ${academicYear ? `(${academicYear})` : ''}`} bredLinks={bredLinks} functionOnBack={navigateTabs} />
            <div className='w-full min-h-screen'>
                <div className='mt-3'>
                    <StepStatus activeStep={activeStep} steps={steps} />
                </div>

                {/* FORM BODY */}
                {/* STEP 0 */}
                {
                    activeStep === 0 && <div className='h-screen'>
                        <div className='mx-auto flex items-center text-center justify-center my-5'>
                            <Year state={academicYear} setState={setAcademicYear} space='col-md-3'
                                title="Choose Academic Year" numberOfYearsToDisplay={3} />
                        </div>
                        <div className='mx-auto flex items-center justify-center'>
                            <SaveButton title={`Save and Proceed`} onClickFunction={() => {
                                if (academicYear) {
                                    handleNext()
                                } else {
                                    toast.error('Select AQAR Year before you proceed.')
                                }
                            }} />
                        </div>
                    </div>
                }

                {
                    activeStep === 1 && <div className="my-5">
                        <div>
                            <TableAccordion AQARTables={AQARTables} />
                        </div>
                        <SaveButton title={`Save and Submit`} onClickFunction={() => {
                            if (academicYear) {
                                handleFormSubmit();
                            } else {
                                toast.error('Select AQAR Year before you proceed.')
                            }
                        }} />
                    </div>
                }

                {
                    activeStep === 2 && <Acknowledgement title="Successful AQAR Data Submission" navigateTo={siteLinks.yfCollegeHome.link}>
                        <>
                            <p>Thank you, staff of <b>{user?.collegeName}</b> for successfully submitting the Youth Festival form for gathering participant's information for the year <b>{academicYear}</b></p>

                            <ArrowButton onClickFunction={() => { navigate(siteLinks.yfCollegeReport.link) }} title={`Generate PDF Report for ${academicYear}`} colorClasses='text-white bg-green-700 hover:bg-green-800' className="my-4" />

                            <div className='my-5 text-left'>
                                <ul className="list-group">
                                    <li className="list-group-item disabled" aria-disabled="true">Your Form has following information related to</li>
                                    {
                                        tableTitles?.map((title, index) => {
                                            return <li className="list-group-item">{index + 1}. {title}</li>
                                        })
                                    }

                                </ul>
                            </div>
                        </>
                    </Acknowledgement>
                }

            </div>

            <Footer />
        </div>
    )
}

export default YFForm
