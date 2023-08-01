import React, { useEffect, useState } from 'react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Alert, AlertTitle, Avatar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import toast from 'react-hot-toast';
import siteLinks from '../../../components/siteLinks'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import IndexNavbar from '../../../components/IndexNavbar';
import Bred from '../../../components/Bred';
import Footer from '../../../components/Footer'
import title from '../../../js/title';
import Select from '../../../components/formComponents/Select';
import Text from '../../../components/formComponents/Text';
import SchoolsProgram from '../../../components/SchoolsProgram';
import checkPasswordStrength from '../../../js/passwordChecker';
import countries from '../../director/components/FormComponents/country'
import YearSelect from '../../../components/formComponents/YearSelect'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Skeleton from '@mui/material/Skeleton';
import ProfileCroper from '../../../components/ProfileCroper';
import StepStatus from '../../../components/StepStatus';
import useLocalStorage from '../../../hooks/useLocalStorage';
import EnterOTPComponent from '../components/EnterOTPComponent';
import { getOrdinalSuffix } from '../../director/pages/NewStudent';

const StudentRegistration = () => {

    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const isAlumniLink = window.location.pathname.includes('alumni')
    title(isAlumniLink ? 'Alumni Registration' : "Student Registration")
    const steps = ["Basic Info", "Photo & Contact", "Verify Email", "Registration Successful"]


    // all states
    const Salutations = ["Mr.", "Mrs.", , "Miss", "Shri", "Shrimati"]
    const genders = ["Male", "Female", "Other"]
    const Casts = ["General", "OBC", "SC", "SBC", "SEBC", "ST", "VJ", "NT-B", "NT-C", "NT-D"]
    const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddh", "Jain", "Other"]
    const initialState = { salutation: "", name: "", programGraduated: "", schoolName: "", gender: "", password: "", cPassword: "", email: "", mobile: "", abcNo: "", currentIn: '', country: "India", cast: "", religion: "", programEnroledOn: "" }
    const [values, setValues] = useState(initialState)
    const { salutation, name, programGraduated, schoolName, gender, password, cPassword, mobile, email, abcNo, currentIn, country, cast, religion, programEnroledOn } = values

    const [avatar, setAvatar] = useState(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState({ serverOTP: null, clientOTP: null })
    const [enteredOTP, setEnteredOTP] = useState('')
    const [programDuration, setProgramDuration] = useState(null)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [isRegActive, setIsRegActive] = useState(null)
    const [open, setOpen] = useState(false)

    const [shouldUpdate, setShouldUpdate] = useState(false)

    useLocalStorage({ titleOfStorage: isAlumniLink ? 'AlumniRegistration' : 'StudentRegistration', formData: values, setFormData: setValues, shouldUpdate, setShouldUpdate, initialState, dependancies: [] })

    // send otp
    function sendOTP() {
        setLoading(true)
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/sendOTPOnEMail`, { emailId: email, userType: "Student" })
            .then((res) => {
                if (res.data.status === 'success') {
                    setOtp({ ...otp, serverOTP: res.data.otp })
                    toast.success(res.data.message)
                    setLoading(false)
                    setStep(3)
                }
                else {
                    setLoading(false)
                    toast.error(res.data.message)
                }

            }).catch((err) => {
                console.log(err);
                setLoading(false)
                toast.error('Internal Server Error')
            })
    }

    // Handle first step of registration
    function handleFirstStep(e) {
        e.preventDefault()

        if (checkPasswordStrength(password, cPassword, setErrorMessage)) {
            setErrorMessage(null)
            setStep(2);
        }

    }

    function handleSecondStep(e) {
        e.preventDefault()

        // check if file is selected
        if (file) {
            setLoading(true)
            // check if username already exists
            Axios.post(`${process.env.REACT_APP_MAIN_URL}/service/student-checkAndEmail`, { email }).then(function (res) {
                if (res.data.status === 'taken') {
                    toast.error(res.data.message)
                    setLoading(false)
                    return
                }
                else {
                    sendOTP()
                }
            })
        } else {
            setLoading(false)
            toast.error('Please select a photo')
            return
        }
    }

    useEffect(() => {
        async function fetchData() {
            const response = await Axios.post(`${process.env.REACT_APP_MAIN_URL}/Registration/pageStatus`)
            setIsRegActive(response.data.isStudentRegistration);
        }
        fetchData()
        setInterval(fetchData, 30 * 60 * 1000);
    }, [])

    // Handle Registration Form
    function handleRegistration() {

        setVerifyLoading(true)

        // upload file
        let formData = new FormData();
        Object.keys(values).map((key) => {
            formData.append(key, values[key]);
        });
        formData.append('file', file)
        formData.append('serverOTP', otp.serverOTP)
        formData.append('clientOTP', otp.clientOTP)
        formData.append('isCreatedByDirector', 'false')

        // route at student-auth file line 136
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/auth/student-register`, formData).then(function (response) {
            if (response.data.status === 'success') {
                // localStorage.removeItem('StudentRegistration')
                toast.success(response.data.message)
                setStep(4)
            }
            else {
                setEnteredOTP(() => '')
                toast.error(response.data.message)
                setVerifyLoading(false)
            }
        }).catch(function (err) {
            toast.error('Internal Server Error')
            setVerifyLoading(false)

        })
    }
    // Handle Avatar
    function handleAvatar() {
        document.getElementById('avatar').click();
    }
    // Handle Avatar change
    function handleAvatarChange(e) {
        setAvatar(null)
        const file = e.target.files[0];
        setOpen(true)
        if (e.target.files[0].size >= 10485760) {
            toast.error('Photo size should be less than 10 MB')
            setOpen(false)
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatar(reader.result)
            setFile(e.target.files[0])
        }
    }

    useEffect(() => {
        if (programGraduated) {
            SchoolsProgram[schoolName].forEach((programs) => {
                if (programs[0] === programGraduated) {
                    setProgramDuration(Array.from({ length: programs[1] }, (v, i) => `${i + 1}${getOrdinalSuffix(i + 1)} Yr.`))
                }
            })
        }
    }, [programGraduated])

    useEffect(() => {

        setOtp((prev) => {
            return { ...prev, clientOTP: enteredOTP }
        })

    }, [enteredOTP])

    useEffect(() => {
        console.log('OTP changed to:', otp.clientOTP)
        if (otp.clientOTP?.length === 6) {
            handleRegistration()
        }
    }, [otp])


    return (
        <div>

            <IndexNavbar />
            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, { title: isAlumniLink ? 'Alumni Registration' : 'Student Registration', link: isAlumniLink ? '/alumni-registration' : '/student-registration' }]} />
            </div>

            <div className="mt-2">
                <StepStatus steps={steps} activeStep={step - 1} />
            </div>

            <div className='flex items-center justify-center gap-2 mb-3 mt-6 mx-auto'>
                <BadgeRoundedIcon className='text-orange-700 mb-1' />
                <p className='text-orange-700 font-bold text-xl'> {isAlumniLink ? 'Alumni Registration' : 'Student Registration'} </p>
            </div>

            <div className='mt-3 flex items-center justify-center mb-4'>
                <div className='w-[750px] p-3 rounded-xl bg-gray-100'>

                    <div className='my-3 mx-2'>
                        {
                            (step !== 1 && step !== 2 && step !== 4) && otp.serverOTP && <Alert severity="success" sx={{ borderRadius: '5px', border: '2px solid green' }}>
                                <AlertTitle>Success</AlertTitle>
                                OTP has been successfully sent on — <strong>{email}</strong>
                            </Alert>
                        }
                        {
                            (errorMessage && step === 1) && <Alert severity="warning" sx={{ borderRadius: '5px', border: '2px solid orange' }}>
                                <AlertTitle>Password is not strong</AlertTitle>
                                {errorMessage}
                            </Alert>
                        }
                    </div>


                    {
                        isRegActive === true ?

                            <div>
                                {step === 1 &&
                                    <form className="row g-3 needs-validation sm:p-3" onSubmit={handleFirstStep}   >

                                        <Select className="col-md-2" id="salutation" value={salutation} label="Salutation" setState={setValues} options={Salutations} />

                                        <Text className="col-md-10" id="name" value={name} setState={setValues} label="Full Name" />

                                        <Select className='col-md-5' id="schoolName" value={schoolName} label="School Name" setState={setValues} options={Object.keys(SchoolsProgram)} />

                                        <Select className='col-md-5' id="programGraduated" value={programGraduated} label="Enrolled Program" setState={setValues} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} />

                                        <Select className="col-md-2" id="currentIn" value={currentIn} label="Admitted In" setState={setValues} options={programDuration ? programDuration : []} />

                                        <YearSelect className="col-md-3" id="programEnroledOn" value={programEnroledOn} label="Year of Enrollment" setState={setValues} />

                                        <Select className="col-md-3" id="gender" value={gender} label="Gender" setState={setValues} options={genders} />

                                        <Select className='col-md-3' id='country' value={country} label="Nationality" setState={setValues} options={countries()} />

                                        <Select className='col-md-3' id='religion' value={religion} label="Religion" setState={setValues} options={religions} />

                                        <Select className='col-md-2' id='cast' value={cast} label="Caste" setState={setValues} options={Casts} />

                                        <Text className="col-md-5" id="password" value={password} label="Create Password" type='password' setState={setValues} />

                                        <Text className="col-md-5" id="cPassword" value={cPassword} label="Confirm Password" type='password' setState={setValues} />

                                        <div className="col-12 flex items-center justify-center">
                                            <button className="flex items-center justify-start mt-3 gap-2 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"> Next <ArrowForwardRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /></button>
                                        </div>

                                    </form>}

                                {step === 2 &&
                                    <div>
                                        <div>
                                            <div>
                                                {!avatar ?

                                                    gender && gender === 'Male' ?
                                                        <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={`/assets/male.jpg`} /> :
                                                        <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={`/assets/female.jpg`} />
                                                    :

                                                    <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0 border-2 border-blue-500" src={avatar} />


                                                }
                                                <p htmlFor='avatar' className="text-blue-800 text-center cursor-pointer hover:text-blue-900 p-2 bg-blue-200 rounded-xl my-2 hover:bg-blue-100 duration-200 ease-in-out col-sm-6 mx-auto" onClick={handleAvatar} >Choose Photo (Required)*</p>
                                                <div className='text-xs text-muted text-center my-2'>Photo size should be less than 10MB</div>
                                            </div>
                                            <ProfileCroper open={open} setOpen={setOpen} file={file} setFile={setFile} setAvatar={setAvatar} />

                                            <div className="w-full flex items-center justify-center ">
                                                <form className="row g-3 needs-validation" onSubmit={handleSecondStep} type="multipart/form-data">


                                                    <input onChange={handleAvatarChange} type="file" accept='image/png, image/jpeg, image/jpg' name="file" id='avatar' style={{ 'display': 'none' }} />

                                                    <div>

                                                        <div className="col-md-10 mx-auto mt-3">


                                                            <Text className='col-md-12' type='email' id="email" value={email} setState={setValues} label="Email ID" placeholder="example@gmail.com" inputClass="py-3" />

                                                            <Text className='col-md-12 mt-2' type='number' id="mobile" value={mobile} setState={setValues} label="Mobile Number" placeholder='Enter your Mobile Number (WhatsApp)' inputClass="py-3" />

                                                            <Text className='col-md-12 mt-2' type='number' id="abcNo" value={abcNo} setState={setValues} label="Academic Bank Credit ID" placeholder='Academic Bank Credit (ABC) ID' inputClass="py-3" />

                                                        </div>
                                                    </div>


                                                    <div className='mx-auto flex flex-col items-center justify-center my-3'>
                                                        <div className='w-full flex items-center justify-evenly gap-2'>
                                                            <div onClick={() => { setStep(1); setLoading(false) }} type="submit" className='bg-gray-200 rounded-full'>
                                                                <IconButton>
                                                                    <ArrowBackRoundedIcon />
                                                                </IconButton>
                                                            </div>

                                                            <div className="flex items-center justify-center">

                                                                {
                                                                    loading ?
                                                                        <button class="btn btn-primary py-2 px-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                            <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                            Sending OTP...
                                                                        </button>
                                                                        :
                                                                        <button className="flex items-center justify-start gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                                            Send OTP
                                                                        </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>}

                                {step == 3 &&
                                    <div >
                                        <div className="w-full flex items-center justify-center h-52">
                                            <form className="row g-3 needs-validation" type="multipart/form-data">

                                                <div className='mx-auto flex flex-col items-center justify-center'>
                                                    <div className="mx-auto mb-3">
                                                        <label htmlFor="validationCustomUsername" className="form-label">Enter OTP</label>
                                                        <EnterOTPComponent otp={enteredOTP} setOtp={setEnteredOTP} onOTPEntered={handleRegistration} />
                                                    </div>
                                                    <div className='w-full flex items-center justify-center gap-2 mt-3'>
                                                        <div onClick={() => { setOtp(() => { return { ...otp, clientOTP: null } }); setStep(2); setVerifyLoading(false); setLoading(false); }} type="submit" className='bg-gray-200 rounded-full'>
                                                            <IconButton>
                                                                <ArrowBackRoundedIcon />
                                                            </IconButton>
                                                        </div>
                                                        <div className="flex items-center justify-center">
                                                            {
                                                                verifyLoading ?
                                                                    <button class="btn btn-primary py-2 px-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                        <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                        Verifying...
                                                                    </button>
                                                                    :
                                                                    <button className="flex items-center justify-start gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" >
                                                                        Verify
                                                                    </button>
                                                            }

                                                            {
                                                                loading ?
                                                                    <button class="btn btn-primary py-2 px-3 rounded-lg mx-4 flex items-center justify-center" type="button" disabled>
                                                                        <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                        Resending...
                                                                    </button>

                                                                    :

                                                                    <button className="flex items-center justify-start mx-4 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="button" onClick={sendOTP} >
                                                                        Resend
                                                                    </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>}

                                {step === 4 &&
                                    <div className="w-full flex items-center justify-center h-67">
                                        <div>
                                            <div className='flex flex-col items-center justify-center'>
                                                <CheckCircleRoundedIcon className='text-green-700'
                                                    sx={{ fontSize: 65 }} />

                                                Congratulations! Your account has been successfully registered at  <p><b>SRTMUN-UIMS</b> as {isAlumniLink ? 'an Alumni' : 'a Student'}. </p>
                                            </div>
                                            <div className='text-center mb-3 mt-3'>
                                                {
                                                    <div>
                                                        <strong>Username</strong> is your Email and
                                                        remember your password that you entered. <br />


                                                        <div className="my-5 flex items-center justify-center gap-4">
                                                            <button onClick={() => { navigate('/') }} className="flex items-center justify-start gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" >
                                                                Home Page
                                                            </button>
                                                            <button onClick={() => { navigate(isAlumniLink ? siteLinks.alumniLogin.link : siteLinks.studentLogin.link) }} className="flex items-center justify-start gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" >
                                                                {isAlumniLink ? 'Login as Alumni' : 'Login as Student'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                            : isRegActive === false ? <p className='text-center my-4 text-xl text-[#c2410c]'>The student registration is suspended for period of time</p> : <><Skeleton height={50} /><Skeleton height={50} /><Skeleton height={50} /></>


                    }
                    <p className='text-center mt-2'>Already have an account? <Link to={siteLinks.studentLogin.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Login Now.</Link></p>
                </div>
            </div>
            <div className='pt-10'>
                <Footer />
            </div>
        </div>
    )
}

export default StudentRegistration