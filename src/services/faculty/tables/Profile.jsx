import { Avatar, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { setProfile } from '../../../redux/slices/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { setUser } from '../../../redux/slices/UserSlice';
import toast from 'react-hot-toast';
import { setReportLoading } from '../../../redux/slices/NavbarSlice';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import UserLoading from '../../../pages/UserLoading';
import useAuth from '../../../hooks/useAuth';
import DesignationSelect from '../../../inputs/DesignationSelect';
import DeptSelect from '../../../inputs/DeptSelect';
import siteLinks from '../../../components/siteLinks';
import serverLinks from '../../../js/serverLinks';


const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.modal.profile);
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const [userData, setUserData] = useState({});
    // useAuth()

    //state
    const [salutation, setSalutation] = useState()
    const [name, setName] = useState()
    const [designation, setDesignation] = useState()
    const [department, setDepartment] = useState()
    const [promotion, setPromotion] = useState('')
    const [gradePay, setGradePay] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')

    useAuth(false)


    // First authenticate user
    useEffect(function () {
        const faculty_token = localStorage.getItem('faculty-token')

        if (faculty_token) {


            Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/auth`, { faculty_token }).then(function (response) {
                if (response.data.status === 'authenticated') {
                    dispatch(setUser(response.data.user))
                    setSalutation(response.data.user.salutation)
                    setName(response.data.user.name)
                    setDepartment(response.data.user.department)
                    setDesignation(response.data.user.designation)
                    setPromotion(response.data.user.promotionDate)
                    setSpecialization(response.data.user.specialization)
                    setGradePay(response.data.user.gradePay)
                    setAddress(response.data.user.address)
                    setMobile(response.data.user.mobile)
                    setEmail(response.data.user.email)
                    setDob(response.data.user.dob)
                    navigate(siteLinks.facultyProfile.link)
                }
                else if (response.data.status === 'unauthenticated') {
                    navigate(siteLinks.facultyLogin.link)
                    dispatch(setUser(null))
                }

            })

        } else {
            navigate(siteLinks.welcome.link)
            dispatch(setUser(null))
        }




    }, [userData]);

    // handle edit button
    function handleEdit(e) {
        e.preventDefault()
        const editData = { salutation, name, designation, department, id: user._id, promotionDate: promotion, gradePay, address, mobile, email, dob, specialization }
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/editProfile`, { editData }).then(function (response) {
            if (response.data.status === 'edited') {
                setUserData(new Date().getTime())
                toast.success('Profile Updated Successfully')
            }
            else {
                toast.error('Could not edit profile, try again...');
            }
        }).catch(function (err) {
            toast.error('Something went wrong');
        })
        dispatch(setProfile(false))


    }


    return (
        <div>



            {/* // PROFILE */}
            <div >

                <div className='flex items-center justify-between gap-2'>
                    <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                        <div className='flex items-center justify-start gap-2'>
                            <PersonIcon className='text-lg' />
                            <p className='text-sm sm:text-lg'>Your Profile</p>
                        </div>
                    </div>

                    <button onClick={() => { navigate(siteLinks.welcome.link); localStorage.removeItem('faculty-token') }} className='bg-green-100 px-5 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 p-1 rounded-full hidden sm:block'>

                        <LoginRoundedIcon className='text-green-800' />
                        Logout</button>
                </div>




                {
                    user ?
                        <div className="mt-3 sm:flex sm:items-start sm:justify-start sm:gap-7 " >
                            {
                                user &&
                                <div className="flex items-start justify-start gap-2 ease-in-out duration-300">
                                    <img src={serverLinks.showFile(user?.photoURL, 'faculty')} className='h-[70px] w-[70px] sm:h-[150px] sm:w-[150px] rounded-full object-cover' />

                                    <div>
                                        <p className="block sm:hidden text-lg font-bold text-gray-700 ">{user && user.salutation} {user && user.name}</p>

                                        <p className='block sm:hidden text-md text-gray-600'>{user && user.designation},</p>
                                        <p className='block sm:hidden text-muted text-[12px] text-gray-600'>{user && user.department}</p>

                                        <div className='block sm:hidden'>
                                            <div className='flex items-center justify-start flex-wrap gap-2'>

                                                <button onClick={(e) => { navigate(siteLinks.facultyReport.link) }} className='bg-green-100 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 px-2 sm:px-3 p-1 rounded-full text-sm sm:text-base'>
                                                    <LeaderboardRoundedIcon className='text-green-800 mr-2 text-sm sm:text-md' />
                                                    Generate Faculty Report
                                                </button>


                                            </div>
                                        </div>

                                    </div>

                                </div>

                            }
                            <div>
                                <p className="hidden sm:block text-4xl font-bold text-gray-700 mb-3 ">{user && user.salutation} {user && user.name}</p>
                                <p className='hidden sm:block text-2xl text-gray-600'>{user && user.designation},</p>
                                <p className='hidden sm:block text-muted text-sm text-gray-600'>{user && user.department}</p>

                                <div className='hidden sm:block'>
                                    <div className='flex items-center justify-start flex-wrap gap-2'>

                                        <button onClick={(e) => { navigate(siteLinks.facultyReport.link) }} className='bg-green-100 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 px-2 sm:px-3 p-1 rounded-full text-sm sm:text-base'>
                                            <LeaderboardRoundedIcon className='text-green-800 mr-2 text-sm sm:text-md' />
                                            Generate Faculty Report
                                        </button>


                                    </div>
                                </div>


                            </div>
                        </div>
                        : <div className="mt-3 flex items-start justify-start gap-7" >
                            <Skeleton variant="circular" width={150} height={150} />
                            <div className='w-1/2'>
                                <Typography variant="h1"><Skeleton /></Typography>
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />

                            </div>
                        </div>
                }


            </div>

            {/* // EDIT */}

            {
                !profile ?

                    <div className='mt-10 my-3'>


                        <div className='flex items-center justify-between py-2'>
                            <p className='text-lg sm:text-2xl font-bold my-3 mb-3'> My Details</p>

                            {
                                user && <button onClick={() => { dispatch(setProfile(true)) }}
                                    className='bg-yellow-100 text-yellow-800 mt-2 hover:bg-yellow-200 border-2 border-yellow-200 ease-in-out duration-200 px-1 text-sm sm:px-3 sm:text-base p-1 rounded-full'>

                                    <ModeEditIcon className='text-yellow-800 mr-2' />
                                    Edit Profile
                                </button>
                            }
                        </div>

                        {
                            user ?
                                <div className="bg-white border overflow-hidden sm:rounded-lg">

                                    <div className="px-4 py-2 sm:px-6">
                                        <h3 className="sm:text-lg text-base leading-6 font-medium text-gray-900">Basic Information</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details & basic information</p>
                                    </div>

                                    <div className="border-t border-gray-200 sm:flex items-start justify-start gap-1 flex-wrap">
                                        <DetailTile sr="Name" value={`${user && user.salutation.toUpperCase()} ${user && user.name.toUpperCase()}`} />
                                        <DetailTile sr="School" value={user && user.department} />
                                        <DetailTile sr="Current Designation" value={user && user.designation} />
                                        <DetailTile sr="Date of Last Promotion" value={user && user.promotionDate} />
                                        <DetailTile sr="Grade Pay" value={user && user.gradePay} />
                                        <DetailTile sr="Date of Birth" value={user && user.dob} />
                                        <DetailTile sr="Specialization" value={user && user.specialization} />
                                        <DetailTile sr="Address of Correspondence" value={`${user && user.department}, Swami Ramanand Teerth Marathwada University, Vishnupuri, Nanded-431 606`} />
                                        <DetailTile sr="Email" value={user && user.email} />
                                        <DetailTile sr="Permanent Address" value={user && user.address} />
                                        <DetailTile sr="Mobile Number" value={user && user.mobile} />
                                    </div>
                                </div>

                                : <UserLoading title="Loading Details" />
                        }

                        <br /><br />

                    </div>

                    :


                    <div className='mt-10 my-3'>
                        <hr />

                        <p className='text-2xl font-bold my-3'>Edit Details</p>

                        <form className="row g-3 needs-validation mb-3" onSubmit={handleEdit}>
                            <div className="col-md-4">
                                <label htmlhtmlFor="validationCustom04" className="form-label">Salutation </label>
                                <select className="form-select" id="validationCustom04" required
                                    value={user && salutation} onChange={(e) => { setSalutation(e.target.value) }}>
                                    <option selected disabled >Choose...</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Prof.">Prof.</option>
                                    <option value="Shri">Shri</option>
                                    <option value="Shrimati">Shrimati</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>

                            </div>
                            <div className="col-md-8">
                                <label htmlFor="validationCustom01" className="form-label">Full Name</label>
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="validationCustom01" required />

                            </div>

                            <div className="col-md-4">
                                <label htmlFor="profileChooseDesignation" className="form-label">Designation</label>

                                <DesignationSelect id="profileChooseDesignation" state={designation} setState={setDesignation} />

                            </div>


                            <div className="col-md-4">
                                <DeptSelect title={'School'} setState={setDepartment} state={department} selectId="profileSchool" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="validationCustom05" className="form-label">Date of Last Promotion</label>
                                <input type="date" value={promotion} onChange={(e) => { setPromotion(e.target.value) }} className="form-control" id="validationCustom05" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="validationCustom" className="form-label">Grade Pay</label>
                                <input type="text" value={gradePay} onChange={(e) => { setGradePay(e.target.value) }} className="form-control" id="validationCustom" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="validationCustom06" className="form-label">Mobile</label>
                                <input type="number" value={mobile} onChange={(e) => { setMobile(e.target.value) }} placeholder="Enter your Mobile Number" className="form-control" id="validationCustom06" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="validationCustom06" className="form-label">Date of Birth</label>
                                <input type="date" value={dob} onChange={(e) => { setDob(e.target.value) }} placeholder="Enter your Date of Birth" className="form-control" id="validationCustom06" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="validationCustom06" className="form-label">Email</label>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="example@gmail.com" className="form-control" id="validationCustom06" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="validationCustom06" className="form-label">Specialization</label>
                                <textarea type="text" value={specialization} onChange={(e) => { setSpecialization(e.target.value) }} placeholder="Enter your field of specialization" className="form-control" id="validationCustom06" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="validationCustom06" className="form-label">Address</label>
                                <textarea type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Please enter your address" className="form-control" id="validationCustom06" />
                            </div>




                            <div className="col-12 mb-3 flex items-center justify-start gap-2">
                                <button type='submit' className="bg-blue-600 hover:bg-blue-700 text-white
                                 px-4 rounded-full p-2">Save Now</button>
                                <button onClick={() => { dispatch(setProfile(false)) }} className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-full p-2">Cancel</button>

                            </div>
                        </form>

                    </div>
            }



        </div>
    )
}

export default Profile



const DetailTile = ({ sr, value }) => {

    const dispatch = useDispatch()

    return (

        <div className="px-4 py-3 sm:w-5/12 border-b sm:border-b-0">
            <dt className="text-sm font-medium text-gray-500">{sr}</dt>
            <dd className="mt-1 sm:text-base text-black text-sm">{value ?
                value :
                <button onClick={() => { dispatch(setProfile(true)) }} className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 rounded-lg px-2 text-sm">Add Now</button>
            }</dd>
        </div>
    )
}
