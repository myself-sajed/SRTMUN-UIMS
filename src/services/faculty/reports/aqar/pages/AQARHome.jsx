import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import OnlyNav from '../../../../../components/OnlyNav'
import siteLinks from '../../../../../components/siteLinks'
import title from '../../../../../js/title'
import { SaveButton } from '../../pbas/PbasReportHome'
import Footer from '../../../../../components/Footer'
import StepStatus from '../../../../../components/StepStatus'
import { useState } from 'react'
import AQARForm from '../components/AQARForm'
import { IconButton } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Acknowledgement from './Acknowledgement'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Year from '../../../../../inputs/Year'
import Bred from '../../../../../components/Bred'
import useAuth from '../../../../../hooks/useAuth'
import { setAqarYear } from '../../../../../redux/slices/AQARSlice'
import { toast } from 'react-hot-toast'


const AQARHome = ({ userType = 'faculty', auth }) => {

    auth(userType === 'faculty' ? false : true)
    const user = useSelector((state) => state.user.user)
    const directorUser = useSelector((state) => state.user.directorUser)
    const [activeStep, setActiveStep] = useState(0)
    const [tabName, setTabName] = useState('year')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    title(`${userType === 'faculty' ? 'Faculty' : 'Director'} AQAR Form`)
    const [aqarYearState, setAqarYearState] = useState(null)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = ['Select Year', `${userType === 'faculty' ? 'Faculty' : 'Director'} AQAR Form`, 'Acknowledgement'];
    const navigateTabs = () => {
        if (tabName === '2') {
            setTabName('1')
            handleBack()
        }
        else if (tabName === '1') {
            setTabName('year')
            handleBack()
        }

    }

    useEffect(() => {
        dispatch(setAqarYear(aqarYearState))
    }, [aqarYearState])

    return (
        <div>

            <div className='sticky-top mb-2 bg-white'>
                <OnlyNav userType={userType} user={userType === 'faculty' ? user : directorUser} li={userType === 'faculty' ? [siteLinks.facultyHome, siteLinks.facultyProfile] : [siteLinks.directorHome, siteLinks.sdm]} logout={{ token: userType === 'faculty' ? 'faculty-token' : 'director-token', link: siteLinks.welcome.link }} >
                    <div className="flex items-center justify-start gap-2">
                        <div className={`${tabName === 'year' ? 'hidden' : 'block'}`}>
                            <IconButton onClick={() => { navigateTabs() }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <div className={`${tabName === 'year' ? 'block' : 'hidden'}`}>
                            <IconButton onClick={() => { navigate(userType === 'faculty' ? siteLinks.facultyHome.link : siteLinks.directorHome.link) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <span className="sm:text-sm md:text-lg font-bold">{`${userType === 'faculty' ? 'Faculty' : 'Director'} AQAR Form`}
                            {aqarYearState && ` (${aqarYearState})`}</span>
                    </div>
                </OnlyNav>
            </div>

            <Bred links={userType === 'faculty' ? [siteLinks.welcome, siteLinks.facultyHome, siteLinks.aqar] : [siteLinks.welcome, siteLinks.directorHome, siteLinks.directorAqar]} />


            <div className='mt-3'>
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>

            {
                tabName === 'year' && <div className='h-screen'>
                    <div className='mx-auto flex items-center text-center justify-center my-5'>
                        <Year state={aqarYearState} setState={setAqarYearState} space='col-md-3'
                            title="Choose AQAR Academic Year" numberOfYearsToDisplay={3} />
                    </div>
                    <div className='mx-auto flex items-center justify-center'>
                        <SaveButton title={`Save and Proceed`} onClickFunction={() => {
                            if (aqarYearState) {
                                setTabName('1'); handleNext()
                            } else {
                                toast.error('Select AQAR Year before you proceed.')
                            }
                        }} />
                    </div>
                </div>
            }

            {
                tabName === '1' && <div>
                    <AQARForm userType={userType} />
                    <div className="mt-3 mb-5">
                        <SaveButton title={`Save AQAR Information (${aqarYearState})`} onClickFunction={() => { setTabName('2'); handleNext(); toast.success(`AQAR Information saved successfully`) }} />
                    </div>
                </div>
            }

            {
                tabName === '2' && <Acknowledgement userType={userType} />
            }







            <Footer />
        </div>
    )
}

export default AQARHome