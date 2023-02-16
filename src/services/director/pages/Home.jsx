import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setDirectorUser, } from '../../../redux/slices/UserSlice'
import Footer from '../../../components/Footer'
import HomeServices from '../../../components/HomeServices'
import Bred from '../../../components/Bred'
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import title from '../../../js/title'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import OnlyNav from '../../../components/OnlyNav'
import siteLinks from '../../../components/siteLinks'
import DialogBox from '../../../components/DialogBox'
import DesignationSelect from '../../../inputs/DesignationSelect'
import DeptSelect from '../../../inputs/DeptSelect'
import handleAvatarChange from '../../../js/handleAvatar'
import editProfile from '../../../js/editProfile'
import serverLinks from '../../../js/serverLinks'
import { dashboardObj, ShowDashboard } from '../../../templates/faculty/cas-report/Header'
import Axios from 'axios'
import { toast } from 'react-hot-toast'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.directorUser)
    useDirectorAuth()
    title('Director Home')
    const [editModal, setEditModal] = useState(false)
    const [salutation, setSalutation] = useState('')
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [department, setDepartment] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')
    const [file, setFile] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const [academicData, setAcademicData] = useState(null)

    const services = [
        { head: "School Data Management", para: "SDM", lblbtn1: "Manage Data", linkbtn1: siteLinks.sdm.link, lblbtn2: "Generate Report", linkbtn2: siteLinks.directorReport },
        { head: "Academic and Administrative Audit", para: "AAA", lblbtn1: "Fill Form", linkbtn1: siteLinks.aaa.link, lblbtn2: "Generate Report", linkbtn2: siteLinks.aaaReport }
    ]

    // handle edit button
    function handleEdit(e) {
        e.preventDefault()
        const editData = { salutation, name, email, mobileNumber, designation }
        const formData = new FormData()
        formData.append('file', file)
        for (var key in editData) {
            formData.append(key, editData[key]);
        }
        const filter = { department }
        editProfile(dispatch, setDirectorUser, formData, filter, 'DirectorUser')
        setEditModal(false)
        setAvatar(null)
        setFile(null)
    }

    useEffect(() => {
        if (user) {
            setSalutation(user?.salutation)
            setName(user?.name)
            setDesignation(user?.designation)
            setDepartment(user?.department)
            setMobileNumber(user?.mobileNumber)
            setEmail(user?.email)
        }
    }, [user])

    // get all the academic data for tables
    useEffect(() => {
        const URL = `${process.env.REACT_APP_MAIN_URL}/api/getAllData/director`
        if (user) {
            Axios.post(URL, { department: user.department, fetchYears: 'all' })
                .then((res) => {
                    res.data.status = 'success' && setAcademicData(res.data.data)
                }).catch((err) => {
                    toast.error('Could not fetch dashboard data...')
                })
        }
    }, [user])



    return (
        <div>

            <OnlyNav user={user} logout={{ token: 'director-token', link: siteLinks.welcome.link }}
                heading={{ title: 'Director', link: siteLinks.welcome.link }}
                li={[siteLinks.sdm, siteLinks.aaa]} userType="director"
            />

            {/* bred & title */}
            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, siteLinks.directorHome]} />
            </div>

            {
                editModal && <DialogBox title="Edit Director Profile" buttonName="Save Details" onClickFunction={handleEdit} isModalOpen={editModal} setIsModalOpen={setEditModal}>
                    <div className="flex items-start justify-between gap-2 flex-col">
                        <div className='flex-items-center justify-center flex-col w-full'>
                            {
                                file ?
                                    <img src={avatar} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' /> :
                                    <img src={serverLinks.showFile(user?.photoURL, 'director')} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />
                            }
                            <div className='flex items-center justify-center gap-3'>
                                <label className=' bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' htmlFor='file'>Choose Profile Photo</label>
                                <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className='hidden mx-auto' onChange={(e) => { handleAvatarChange(e, setAvatar, setFile) }} />
                                {
                                    file && <button className='w-[20%] bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setFile(null); }}>Reset Picture</button>
                                }
                            </div>
                        </div>
                        <div className='mt-4'>
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
                                    <label htmlFor="validationCustom06" className="form-label">Mobile</label>
                                    <input type="number" value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} placeholder="Enter your Mobile Number" className="form-control" id="validationCustom06" />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="validationCustom06" className="form-label">Email</label>
                                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="example@gmail.com" className="form-control" id="validationCustom06" />
                                </div>

                            </form>
                        </div>

                        <div>

                        </div>
                    </div>
                </DialogBox>
            }

            <div className='mt-3 border rounded-xl gray'>
                {/* PROFILE */}
                <div className='rounded-xl'>
                    {/* // new */}
                    {user &&
                        <div className='p-4 flex lg:flex-row items-start justify-start gap-3 flex-col'>
                            <div className='sm:flex items-start justify-start gap-5 lg:w-[50%]'>
                                <img src={serverLinks.showFile(user?.photoURL, 'director')} className='h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full object-cover border-4 border-[#344e87]' />

                                <div className='text-black '>
                                    <p className='text-lg sm:text-2xl font-bold'>{user && user.salutation} {user && user.name}</p>
                                    <p className='text-base sm:text-xl'>{user && user.designation},</p>
                                    <p className='text-xs sm:text-sm'>{user && user.department},</p>
                                    <p className='text-xs sm:text-sm'>{user.schoolName?.includes("Latur") ? "Sub-Campus, Latur - 413531" : "SRTMUN, Vishnupuri, Nanded - 431 606"}</p>

                                    <div className='flex items-center justify-start gap-3 mt-4'>
                                        <button onClick={() => { navigate(siteLinks.sdm.link) }} className='p-2 rounded-full border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                            Go to Profile
                                        </button>

                                        <button onClick={() => { dispatch(setDirectorUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('director-token'); }} className='p-2 text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-[50%]">
                                {academicData && <ShowDashboard directorData={academicData && academicData}
                                    dashboardObj={dashboardObj['director']} color="blue" bgColor="blue" />}
                            </div>
                        </div>

                    }
                </div>

                <div>
                    <div>
                        <div className='flex items-end justify-between mx-4 my-2'>
                            <div>
                                <p className='font-bold text-base sm:text-xl text-black'>Personal Infomation</p>
                            </div>
                            <div>
                                <button className='flex items-center justify-end gap-2 text-blue-700 hover:bg-blue-200 p-2 rounded-xl' onClick={() => { setEditModal(true) }}><EditRoundedIcon fontSize="small" />Edit Profile</button>
                            </div>

                        </div>
                        <hr className='text-black' />
                        <div className="md:mb-4 shadow-none">
                            {
                                user &&
                                <div className="card-body sm:flex">

                                    <div className='flex-1'>
                                        <DetailTile keyName="Full Name" value={`${user && user.name}`} />
                                        <DetailTile keyName="Designation" value={`${user && user.designation}`} />
                                        <DetailTile keyName="Department" value={`${user && user.department}`} />
                                    </div>
                                    <div className='flex-1'>
                                        <DetailTile keyName="Mobile" value={`${user && user.mobileNumber === undefined ? "Not Added" : user.mobileNumber}`} />
                                        <DetailTile keyName="Email" value={`${user && user.email}`} />
                                    </div>

                                </div>
                            }
                        </div>

                    </div>
                </div>
                {/* SERVICES */}
                <div className='w-full mt-4'>
                    <p className='ml-4 font-bold sm:text-xl text-black text-base'>Services</p>
                    <hr className='text-black' />
                    <HomeServices obj={services} />
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Home


const DetailTile = ({ keyName, value }) => {
    return (
        <div className="row py-2 text-black">
            <div className="col-sm-3">
                <p className="mb-0 text-sm sm:text-base">{keyName}</p>
            </div>
            <div className="col-sm-9">
                <p className="mb-0 text-sm sm:text-base">{value}</p>
            </div>
        </div>
    )
}



