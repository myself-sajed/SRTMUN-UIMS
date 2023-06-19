import React, { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import AcademicScore from './content/AcademicScore'
import Teaching from './content/Teaching'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton, Tooltip } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useDispatch, useSelector } from 'react-redux'
import { setCasYear, setFetchYears } from '../../../../redux/slices/CASSlice'
import FinalPage from './content/FinalPage'
import { getCASData } from './PBASServices'
import Footer from '../../../../components/Footer'
import Year from '../../../../inputs/Year'
import Bred from '../../../../components/Bred'
import OnlyNav from '../../../../components/OnlyNav'
import StepStatus from '../../../../components/StepStatus'
import title from '../../../../js/title'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SelectCASYear from './components/SelectCASYear'
import BasicInfo from './content/BasicInfo'
import siteLinks from '../../../../components/siteLinks'
import AgreePopup from './components/AgreePopup'
import ApplyLevel, { stageObj } from './components/ApplyLevel'
import { toast } from 'react-hot-toast';


const PbasReportHome = () => {
    useAuth(false)
    const [tabName, setTabName] = useState('intro')
    const [casYearState, setCasYearState] = useState(null)
    let links = [{ name: 'Welcome', link: '/' }, { name: 'Home', link: '/faculty' }, { name: 'PBAS Report Form', link: '/service/pbas-report' }]
    const steps = ['Basic Info', 'Select Year', 'Teaching Activities', 'Academic/ Research Score', 'Summary Sheet'];
    title("PBAS Report")
    const [serverCasData, setServerCasData] = useState(null)
    const [serverCasError, setServerCasError] = useState(null)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate()
    const [saveLoader, setSaveLoader] = useState(false)
    const [teachingData, setTeachingData] = useState({
        checkBoxCount: 0, checkBoxSelected: [], teachingGrade: null, totalClasses: null,
        classesTaught: null, teachingRemark: null, teachingRemarkColor: null, uploadInputs: {
            'file-A': null,
            'file-B': null,
            'file-C': null,
            'file-D': null,
            'file-E': null,
            'file-F': null,
            'file-G': null,
        },

        uploadedAttendance: null,
        selectedAttendance: null

    })


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tabName])


    const navigateTabs = () => {
        if (tabName === 'year') {
            setTabName('intro')
            handleBack()
        } else if (tabName === 'first') {
            setTabName('year')
            handleBack()
        } else if (tabName === 'second') {
            setTabName('first')
            handleBack()
        } else if (tabName === 'final') {
            setTabName('second')
            handleBack()
        }
        else if (tabName === 'saved') {
            setTabName('final')
            handleBack()
        }

    }

    useEffect(() => {
        setServerCasData((prev) => {
            return null
        })
        casYearState && getCASData(user?._id, setServerCasData, setServerCasError, true, casYearState)
    }, [casYearState])



    return (
        <div className="w-full">

            {/* PBAS Navtools */}
            <div className='sticky-top bg-white'>
                <OnlyNav user={user} li={[siteLinks.facultyHome, siteLinks.pbas]}
                    logout={{ token: 'faculty-token', link: siteLinks.welcome.link }}>
                    <div className="flex items-center justify-start gap-2">
                        <div className={`${tabName === 'intro' ? 'hidden' : 'block'}`}>
                            <IconButton onClick={() => { navigateTabs() }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <div className={`${tabName === 'intro' ? 'block' : 'hidden'}`}>
                            <IconButton onClick={() => { navigate(siteLinks.facultyHome.link) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <span className="sm:text-sm md:text-lg font-bold">PBAS Report Form {casYearState && <span>({casYearState})</span>}</span>

                        {
                            tabName === 'first' || tabName === 'second' || tabName === 'final' ? (saveLoader ? <div className='flex items-center justify-start gap-2 border-l-2 pl-5 ml-5'>
                                <Tooltip placement="bottom" title="Saving...">
                                    <div className='flex items-center justify-start gap-2 cursor-pointer bg-gray-100 rounded-md p-2'>
                                        <LoadingOutlined style={{ fontSize: 20, }} spin />
                                        <span>Saving...</span>
                                    </div>
                                </Tooltip>
                            </div> : <div className='border-l-2 pl-5 ml-5'>
                                <Tooltip title='Save Progress' placement='bottom'>
                                    <div onClick={() => { setSaveLoader(true) }} className='flex items-center justify-start gap-2 cursor-pointer bg-blue-100 hover:bg-blue-200 ease-in-out duration-200 text-blue-800 rounded-md p-2'>
                                        <SaveRoundedIcon />
                                        <span className='font-medium'>Save</span>
                                    </div>
                                </Tooltip>
                            </div>) : null
                        }
                    </div>
                </OnlyNav>
            </div>

            <div className='mt-2 mb-3'>
                <Bred links={[siteLinks.welcome, siteLinks.facultyHome, siteLinks.pbas]} />
            </div>
            <div className='mt-3'>
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>


            {/* BASIC INTRO */}
            <div className={`${tabName === 'intro' ? 'block' : 'hidden'}`}>
                <BasicInfo />

                <div className='mt-5'>
                    <SaveButton title={'Save and Proceed'}
                        onClickFunction={() => { setTabName('year'); handleNext() }} />
                </div>
            </div>




            {/* CONTENT */}

            <div className={`${tabName === 'year' ? 'block' : 'hidden'}`}>
                <div className='mt-3 flex-col items-center justify-center gap-3 w-full text-center h-screen'>

                    <form className='flex flex-col items-center justify-center mt-5' onSubmit={(e) => {
                        e.preventDefault();
                        setTabName('first');
                        handleNext()
                    }}>
                        <SelectCASYear casYearState={casYearState} setCasYearState={setCasYearState} space='col-md-3' title="Choose PBAS Year" />

                        <div className='mt-5'>
                            <SaveButton title={'Save and Proceed'} />
                        </div>

                    </form>

                </div>
            </div>

            <div className={`${tabName === 'first' ? 'block' : 'hidden'}`}>
                <Teaching setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
            </div>

            <div className={`${tabName === 'second' ? 'block' : 'hidden'}`}>
                <AcademicScore setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
            </div>

            <div className={`${tabName === 'final' ? 'block' : 'hidden'}`}>
                <div>
                    <FinalPage casYear={casYearState} handleNext={handleNext} setTabName={setTabName} casYearState={casYearState} setSaveLoader={setSaveLoader} />
                </div>
            </div>


            <Footer />
        </div >
    )
}

export default PbasReportHome



const SaveButton = ({ title, onClickFunction, icon = <ArrowForwardRoundedIcon /> }) => {
    return (
        <button className="flex items-center justify-start p-2 rounded-xl text-blue-900 font-bold bg-blue-200 hover:gap-2 duration-200 ease-in-out" type="submit" onClick={onClickFunction}><span className='mr-2'>{title}</span> {icon}</button>
    )
}

export { SaveButton }