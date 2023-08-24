import React, { useEffect, useState } from 'react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Alert, AlertTitle, Avatar } from '@mui/material';
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
import DynamicCheckboxes from '../../../components/formComponents/DynamicChackboxes';
import checkPasswordStrength from '../../../js/passwordChecker';
import Skeleton from '@mui/material/Skeleton';
import ProfileCroper from '../../../components/ProfileCroper';

const AlumniRegistration = () => {

    const [step, setStep] = useState(1)
    const navigate = useNavigate();
    title("Alumni Registration")

    // all states
    const Salutations = ["Dr.", "Prof.", "Mr.", "Miss.", "Mrs.", "Shri", "Shrimati"]
    const genders = ["Male", "Female", "Other"]
    const initialState = { salutation: "", name: "", schoolName: "", gender: "", password: "", cPassword: "", email: "", mobile: "" }
    const [values, setValues] = useState(initialState)
    const { salutation, name, schoolName, gender, password, cPassword, mobile, email } = values

    const [avatar, setAvatar] = useState(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [programGraduated, setProgramGraduated] = useState([])
    const [otp, setOtp] = useState({ serverOTP: null, clientOTP: null })
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [isRegActive, setIsRegActive] = useState(null)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        async function fetchData() {
            const response = await Axios.post(`${process.env.REACT_APP_MAIN_URL}/Registration/pageStatus`)
            console.log(response.data)
            setIsRegActive(response.data.isAlumniRegistration);
        }
        fetchData()
        setInterval(fetchData, 30 * 60 * 1000);
    }, [])

    // send otp
    function sendOTP() {
        console.log('in send otp')
        setLoading(true)
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/sendOTPOnEMail`, { emailId: email, userType: "Alumni" })
            .then((res) => {
                console.log('Email sent successfully : ', res.data)
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

    useEffect(() => {
        console.log('OTP Entered', otp)
    }, [otp])

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
            Axios.post(`${process.env.REACT_APP_MAIN_URL}/service/alumni-checkAndEmail`, { email }).then(function (res) {
                if (res.data.status === 'taken') {
                    toast.error(res.data.message)
                    setLoading(false)
                    return
                }
                else {
                    console.log('Before send otp');
                    sendOTP()
                }
            })
        } else {
            setLoading(false)
            toast.error('Please select a photo')
            return
        }
    }

    // Handle Registration Form
    function handleRegistration(e) {
        e.preventDefault()

        setVerifyLoading(true)

        // upload file
        let formData = new FormData();
        Object.keys(values).map((key) => {
            formData.append(key, values[key]);
        });
        for (let i = 0; i < programGraduated.length; i++) {
            formData.append('programGraduated', programGraduated[i]);
        }
        formData.append('file', file)
        formData.append('serverOTP', otp.serverOTP)
        formData.append('clientOTP', otp.clientOTP)


        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/auth/alumni-register`, formData).then(function (response) {
            if (response.data.status === 'success') {
                navigate(siteLinks.alumniLogin.link)
                toast.success(response.data.message)
            }
            else {
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

    return (
        <div>

            <IndexNavbar />
            <div className='mt-3'>
                <Bred links={[siteLinks.welcome, siteLinks.alumniLogin, { title: 'Alumni Registration', link: '/alumni-register' }]} />
            </div>
            <div className='flex items-center justify-center gap-2 mb-3 mt-6 mx-auto'>
                <BadgeRoundedIcon className='text-orange-700 mb-1' />
                <p className='text-orange-700 font-bold text-xl'>Alumni Registration</p>
            </div>

            <div className='mt-3 flex items-center justify-center mb-4'>
                <div className='w-[750px] p-3 rounded-xl bg-gray-100'>

                    <div className='m-4'>
                        {
                            (step !== 1 && step !== 2) && otp.serverOTP && <Alert severity="success" sx={{ borderRadius: '5px', border: '2px solid green' }}>
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
                            step === 1 ?

                                <form className="row g-3 needs-validation sm:p-3" onSubmit={handleFirstStep}   >

                                    <Select className="col-md-2" id="salutation" value={salutation} label="Salutation" setState={setValues} options={Salutations} />

                                    <Text className="col-md-10" id="name" value={name} setState={setValues} label="Full Name" />

                                    <Select className="col-12" id="schoolName" value={schoolName} label="School Name" setState={setValues} options={Object.keys(SchoolsProgram)} />

                                    {/* <Select id="programGraduated" value={programGraduated} label="Current Program" setState={setValues} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} /> */}

                                    <DynamicCheckboxes id='programGraduated' value={programGraduated} label="Programs Graduated" setState={setProgramGraduated} state={programGraduated} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} />

                                    <Select className="col-md-2" id="gender" value={gender} label="Gender" setState={setValues} options={genders} />

                                    <Text className="col-md-5" id="password" value={password} label="Create Password" type='password' setState={setValues} />

                                    <Text className="col-md-5" id="cPassword" value={cPassword} label="Confirm Password" type='password' setState={setValues} />

                                    <div className="col-12 flex items-center justify-center">
                                        <button className="flex items-center justify-start mt-3 gap-2 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"> Next <ArrowForwardRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /></button>
                                    </div>

                                </form>
                                : step === 2 ?
                                    <div>
                                        <div>
                                            <div>
                                                {!avatar ?

                                                    gender && gender === 'Male' ?
                                                        <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={`/assets/male.jpg`} /> :
                                                        <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={`/assets/female.jpg`} />
                                                    :

                                                    <img className="h-[90px] w-[90px] rounded-full object-cover mx-auto sm:h-[110px] sm:w-[110px] sm:mx-0" src={avatar} />


                                                }
                                                <p htmlFor='avatar' className="text-blue-800 text-center cursor-pointer hover:text-blue-900 p-2 bg-blue-200 rounded-xl my-2 hover:bg-blue-200 duration-200 ease-in-out col-sm-6 mx-auto" onClick={handleAvatar} >Choose Photo (Required)*</p>
                                                <div className='text-xs text-muted text-center my-2'>Photo size should be less than 10MB</div>
                                            </div>

                                            <ProfileCroper open={open} setOpen={setOpen} file={file} setFile={setFile} setAvatar={setAvatar} />


                                            <div className="w-full flex items-center justify-center ">
                                                <form className="row g-3 needs-validation" onSubmit={handleSecondStep} type="multipart/form-data">


                                                    <input onChange={handleAvatarChange} type="file" accept='image/png, image/jpeg, image/jpg' name="file" id='avatar' style={{ 'display': 'none' }} />

                                                    <div>

                                                        <div className="col-md-10 mx-auto mt-3">

                                                            <Text className='col-md-12' type='email' id="email" value={email} setState={setValues} label="Email ID" placeholder="example@gmail.com" inputclassName="py-3" />

                                                            <Text className='col-md-12 mt-2' type='number' id="mobile" value={mobile} setState={setValues} label="Mobile Number" placeholder='Enter your Mobile Number (WhatsApp)' inputclassName="py-3" />

                                                        </div>
                                                    </div>


                                                    <div className='mx-auto flex flex-col items-center justify-center'>
                                                        <div className='w-full flex items-center justify-center gap-2'>
                                                            <div className="flex items-center justify-center">
                                                                <button onClick={() => { setStep(1); setLoading(false) }} className="flex items-center justify-start mt-3 gap-1 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"><ArrowBackRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /> Back  </button>

                                                            </div>
                                                            <div className="flex items-center justify-center">

                                                                {
                                                                    loading ?
                                                                        <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                            <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                            Sending OTP...
                                                                        </button>
                                                                        :
                                                                        <button className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                                            Send OTP
                                                                        </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div >
                                        <div className="w-full flex items-center justify-center h-52">
                                            <form className="row g-3 needs-validation" onSubmit={handleRegistration} type="multipart/form-data">

                                                <div className='mx-auto flex flex-col items-center justify-center'>
                                                    <div className="col-sm-8 mx-auto mb-3">
                                                        <label htmlFor="validationCustomUsername" className="form-label">Enter OTP</label>
                                                        <div className="input-group has-validation">

                                                            <input type="number" className="form-control py-3" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="Enter OTP" required value={otp.clientOTP} onChange={(e) => setOtp({ ...otp, clientOTP: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className='w-full flex items-center justify-center gap-2'>
                                                        <div className="flex items-center justify-center">
                                                            <button onClick={() => { setStep(2); setLoading(false); setVerifyLoading(false); setOtp({ ...otp, clientOTP: null }) }} className="flex items-center justify-start mt-3 gap-1 hover:bg-blue-800 bg-blue-600 text-white p-2 rounded-lg" type="submit"><ArrowBackRoundedIcon sx={{ fontSize: '20px' }} className='mt-1' /> Back  </button>

                                                        </div>
                                                        <div className="flex items-center justify-center">
                                                            {
                                                                verifyLoading ?
                                                                    <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg flex items-center justify-center" type="button" disabled>
                                                                        <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                        Verifying OTP...
                                                                    </button>
                                                                    :
                                                                    <button className="flex items-center justify-start mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="submit" >
                                                                        Verify OTP
                                                                    </button>
                                                            }

                                                            {
                                                                loading ?
                                                                    <button className="btn btn-primary py-2 px-3 mt-3 rounded-lg mx-4 flex items-center justify-center" type="button" disabled>
                                                                        <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                                                        Resending OTP...
                                                                    </button>

                                                                    :

                                                                    <button className="flex items-center justify-start mx-4 mt-3 gap-3 hover:bg-blue-800  bg-blue-600 text-white py-2 px-4 rounded-lg" type="button" onClick={sendOTP} >
                                                                        Resend OTP
                                                                    </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div> : isRegActive === false ? <p className='text-center my-4 text-xl text-[#c2410c]'>The Alumni registration is suspended for period of time</p> : <><Skeleton height={50} /><Skeleton height={50} /><Skeleton height={50} /></>
                    }
                    <p className='text-center mt-2'><Link to="" className='cursor-pointer hover:text-blue-900 text-blue-600'>Forgot Password</Link> | Already have an account? <Link to={siteLinks.alumniLogin.link} className='cursor-pointer hover:text-blue-900 text-blue-600'>Login Now.</Link></p>
                </div>
            </div>
            <div className='pt-10'>
                <Footer />
            </div>
        </div>
    )
}

export default AlumniRegistration