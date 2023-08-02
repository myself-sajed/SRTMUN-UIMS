import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAlumniUser, setStudentUser } from '../../../redux/slices/UserSlice'
import Footer from '../../../components/Footer'
import Bred from '../../../components/Bred'
import useStudentAuth from '../../../hooks/useStudentAuth'
import title from '../../../js/title'
import OnlyNav from '../../../components/OnlyNav'
import siteLinks from '../../../components/siteLinks'
import DialogBox from '../../../components/formComponents/DialogBox'
import Select from '../../../components/formComponents/Select'
import Text from '../../../components/formComponents/Text'
import UploadFile from '../../../components/formComponents/UploadFile'
import editReq from '../../../components/requestComponents/editReq'
import getReq from '../../../components/requestComponents/getReq'
import navcom from '../components/navcom'
import serverLinks from '../../../js/serverLinks'
import SchoolsProgram from '../../../components/SchoolsProgram'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import handleAvatarChange from '../../../js/handleAvatar'
import YearSelect from '../../../components/formComponents/YearSelect'
import countries from '../../director/components/FormComponents/country'
import ProfileCroper from '../../../components/ProfileCroper'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { toast } from 'react-hot-toast'
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FileViewer from '../../../components/FileViewer'

const StudentHome = () => {
    const Salutations = ["Mr.", "Miss.", "Mrs.", "Shri", "Shrimati"]
    const genders = ["Male", "Female", "Other"]
    const Casts = ["General", "OBC", "SC", "SBC", "SEBC", "ST", "VJ", "NT-B", "NT-C", "NT-D"]
    const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddh", "Jain",]
    const model = "StudentUser"
    const module = 'student'


    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAlumniLink = window.location.pathname.includes('alumni')
    useStudentAuth(true, isAlumniLink ? 'alumni' : 'student')
    const user = useSelector(state => isAlumniLink ? state.user.alumniUser : state.user.studentUser)
    title(user?.isAlumni ? 'Alumni Home' : 'Student Home')

    const initialstate = { salutation: "", name: "", address: "", mobile: "", programGraduated: "", schoolName: "", gender: "", dob: "", abcNo: "", ResearchGuide: "", Title: "", dateOfRac: "", ReceivesFelloship: "", ResearchGuideId: "", currentIn: "", cast: "", country: "", religion: "", programEnroledOn: "", }

    const [avatar, setAvatar] = useState(null)
    const [uploadProof, setUploadProof] = useState(null)
    const [guides, setGuides] = useState([])
    const [guidesData, setGuidesData] = useState([])
    const [programDuration, setProgramDuration] = useState(null)
    const [openCroper, setOpenCroper] = useState(false)
    const [values, setValues] = useState(initialstate);
    const { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, currentIn, cast, country, religion, programEnroledOn } = values

    const refetch = async () => {
        const userrefetch = await getReq({ model, id: user?._id, module, filter: 'studentEdit' })
        dispatch(isAlumniLink ? setAlumniUser(userrefetch?.data[0]) : setStudentUser(userrefetch?.data[0]))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setEdit(true);
        editReq({ id: itemToEdit, uploadProof: uploadProof }, "", initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module)
    }

    const onCancel = () => {
        setValues(initialstate)
        setItemToEdit(null)
    }

    const fetchFacutys = async () => {
        let arr = []
        const userrefetch = await getReq({ model: "User", id: '', module, filter: { department: user.schoolName, salutation: 'Dr.' } })
        setGuidesData(userrefetch?.data)
        userrefetch?.data.map(item => { arr.push(item.name) })
        setGuides(arr);
    }

    useEffect(() => {
        fetchFacutys()

    }, [open])

    const setResearchGuideId = () => {
        guidesData.forEach(item => {
            if (item.name == ResearchGuide) {
                setValues(pri => {
                    return {
                        ...pri,
                        ResearchGuideId: item._id
                    }
                })
            }

        })

    }
    useEffect(() => {
        setResearchGuideId()
    }, [ResearchGuide])

    useEffect(() => {
        if (itemToEdit && user) {
            const { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, cast, country, religion, programEnroledOn, photoURL } = user
            if (user._id === itemToEdit) {
                setEdit(true); setOpen(true);
                setValues({ salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, cast, country, religion, programEnroledOn })
            }
        }
    }, [itemToEdit])

    useEffect(() => {
        if (programGraduated) {
            SchoolsProgram[schoolName].forEach((programs) => {
                if (programs[0] === programGraduated) {
                    setProgramDuration(Array.from({ length: programs[1] }, (v, i) => `Year ${i + 1}`))
                }
            })
        }
    }, [programGraduated])

    useEffect(() => {
        console.log("User:", user)
    }, [user])

    return (
        <div>
            <div className="bg-white sticky-top">
                <OnlyNav user={user} logout={{ token: user?.isAlumni ? 'alumni-token' : 'student-token', link: siteLinks.welcome.link }}
                    heading={{ title: user?.isAlumni ? 'Alumni' : 'Student', link: siteLinks.welcome.link }}
                    li={[siteLinks.welcome]} userType='student'
                />
            </div>

            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, user?.isAlumni ? siteLinks.alumniHome : siteLinks.studentHome]} />
            </div>

            <div className="main-div md:flex items-start my-3 gap-3">
                <div className="mb-3 md:mb-0 xl:min-w-[35%] lg:min-w-[45%] md:min-w-[60%] sm:h-screen">
                    <div className="p-3 items-start justify-start gap-4 bg-gray-50 rounded-lg border h-full">
                        <img src={serverLinks.showFile(user?.photoURL, 'student')} className='h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] mx-auto rounded-full object-cover border- border-[#4566ac]' />

                        <div className='mt-4'>
                            <p className='text-lg sm:text-2xl font-bold'>{user && user.salutation} {user && user.name}</p>

                            <div className='text-left gap-2 mt-2'>
                                <ContactTile keyName="User" value={`${user && user?.isAlumni ? 'Verified Alumni' : 'Verified Student'}`} />
                                <ContactTile keyName="School" value={`${user && user.schoolName || 'Not Added'}`} />
                                <ContactTile keyName="Email" value={`${user && user.email || 'Not Added'}`} />
                                <ContactTile keyName="Phone" value={`${user && user.mobile || 'Not Added'}`} />
                            </div>

                            <div className="mt-3">
                                <button type="button" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 font-medium rounded-lg text-sm p-2 text-center inline-flex gap-2 items-center mr-2 mb-2">
                                    <ContactPageRoundedIcon />
                                    Build Resume
                                </button>

                                <button type="button" className="text-black bg-yellow-300 hover:bg-yellow-400 font-medium rounded-lg text-sm p-2 text-center inline-flex gap-2 items-center mr-2 mb-2" onClick={() => { setOpen(true); setEdit(true); setItemToEdit(user?._id); }}>
                                    <EditRoundedIcon />
                                    Edit Profile
                                </button>

                                <button onClick={() => { dispatch(user?.isAlumni ? setAlumniUser(null) : setStudentUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem(user?.isAlumni ? 'alumni-token' : 'student-token'); }} type="button" className="text-gray-900 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex gap-2 items-center mr-2 mb-2">
                                    <LogoutRoundedIcon />
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex-1'>
                    <div className=" font-medium text-gray-900 border border-gray-200 rounded-lg bg-gray-50">
                        <p aria-current="true" className="w-full p-2 font-medium text-left text-black  border-b border-gray-200 rounded-t-lg ">
                            Other Relevant Information
                        </p>
                        <div className="w-full">
                            <OtherDetails user={user} editFunction={() => { setOpen(true); setEdit(true); setItemToEdit(user?._id); }} />
                        </div>

                    </div>

                    <div className="mt-3">

                        <div className="accordion" id="accordionExample">
                            {
                                navcom.map((item, index) => {
                                    return item.name === 'studentJRFSRF' ?
                                        (user?.programGraduated.includes("Ph.D") && user?.ReceivesFelloship == 'Yes' && !user?.isAlumni) ?
                                            <div className="accordion-item bg-gray-50 ">
                                                <h2 className="accordion-header accordionHeader" id={`heading-${index}`}>
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                                        {item.value}
                                                    </button>
                                                </h2>
                                                <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div key={item}>{item.element}</div>
                                                    </div>
                                                </div>
                                            </div> : null : <div className="accordion-item bg-gray-50 ">
                                            <h2 className="accordion-header accordionHeader" id={`heading-${index}`}>
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                                    {item.value}
                                                </button>
                                            </h2>
                                            <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div key={item}>{item.element}</div>
                                                </div>
                                            </div>
                                        </div>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>



            <DialogBox title="Edit Profile" buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
                {
                    <div className='flex flex-wrap bg-gray-50 rounded-xl border p-2 '>

                        <div className='flex-items-center justify-center flex-col w-full mb-4'>
                            {
                                uploadProof ?
                                    <img src={avatar} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' /> :
                                    <img src={serverLinks.showFile(user?.photoURL, 'student')} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />
                            }
                            <div className='flex items-center justify-center gap-3'>
                                <label className=' bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' htmlFor='file'>Choose Profile Photo</label>
                                <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className='hidden mx-auto' onChange={(e) => {
                                    handleAvatarChange(e, setAvatar, setUploadProof, setOpenCroper)
                                }} />
                                {
                                    uploadProof && <button className='w-[20%] bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setUploadProof(null); }}>Reset Picture</button>
                                }
                            </div>
                        </div>



                        <Select className='col-md-4 col-lg-2' id="salutation" value={salutation} label="Salutation" setState={setValues} options={Salutations} />
                        <Text className='col-md-8 col-lg-10' id="name" value={name} label="Full Name" setState={setValues} />
                        <Text className='col-md-4 col-lg-4' type='number' id='mobile' value={mobile} label="Mobile" setState={setValues} />
                        <Text className='col-md-8 col-lg-8' id="address" value={address} label="Permanent Address" setState={setValues} />

                        <Select className='col-md-4' id="programGraduated" value={programGraduated} label="Current Program" setState={setValues} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} />

                        <Select className="col-lg-2 col-md-4" id="currentIn" value={currentIn} label="Admitted In" setState={setValues} options={programDuration ? programDuration : []} />

                        <YearSelect className="col-md-2" id="programEnroledOn" value={programEnroledOn} label="Program Enrolled On" setState={setValues} />
                        {/* <UploadFile className='col-md-6 col-lg-4' id="uploadProof" label="Chage profile photo" setState={setValues} /> */}
                        <Text className='col-md-6 col-lg-4' type='date' id="dob" value={dob} label="Date of birth" setState={setValues} />
                        <Text className='col-md-6 col-lg-4' type="number" id="abcNo" value={abcNo} label="ABC ID" setState={setValues} />
                        <Select className="col-md-3" id="gender" value={gender} label="Gender" setState={setValues} options={genders} />

                        <Select className='col-md-3' id='country' value={country} label="Nationality" setState={setValues} options={countries()} />

                        <Select className='col-md-2' id='cast' value={cast} label="Caste" setState={setValues} options={Casts} />

                        <Select className='col-md-3' id='religion' value={religion} label="Religion" setState={setValues} options={religions} />

                        {
                            user?.isAlumni === true && <UploadFile className='col-md-6 col-lg-4' id="uploadProof" label="Upload Alumni Proof" setState={setValues} required={user?.uploadProof == undefined ? true : false} />
                        }
                        {programGraduated.includes("Ph.D") && user.isAlumni === false && <>
                            <Select className='col-md-6 col-lg-3' options={guides ? guides : []} id="ResearchGuide" value={ResearchGuide} label="Research Guide" setState={setValues} />
                            <Text className='col-md-6 col-lg-4' type='text' id="Title" value={Title} label="Title" setState={setValues} />
                            <Text className='col-md-6 col-lg-4' type='date' id="dateOfRac" value={dateOfRac} label="Date of RAC" setState={setValues} />
                            <Select className='col-md-6 col-lg-4' options={["Yes", "No"]} id="ReceivesFelloship" value={ReceivesFelloship} label="Receives any Fellowship?" setState={setValues} />
                        </>}
                    </div>
                }
            </DialogBox>
            <ProfileCroper open={openCroper} setOpen={setOpenCroper} file={uploadProof} setFile={setUploadProof} setAvatar={setAvatar} />
            <Footer />
        </div>

    )
}

export default StudentHome

const OtherDetails = ({ user, editFunction }) => {
    return <div className="p-2 lg:flex items-start justify-start gap-5 w-full">
        <div className="w-full md:w-full lg:w-[60%] xl:w-[40%]">
            <DetailTile editFunction={editFunction} keyName="Program Enrolled" value={`${user && user.programGraduated}`} />
            <DetailTile editFunction={editFunction} keyName="ABC ID" value={`${user && user.abcNo}`} />
            <DetailTile editFunction={editFunction} keyName="Caste" value={`${user && user.cast}`} />
            <DetailTile editFunction={editFunction} keyName="Religion" value={`${user && user.religion}`} />
            <DetailTile editFunction={editFunction} keyName="Date Of Birth" value={`${user && user.dob}`} />
            <DetailTile editFunction={editFunction} keyName="Gender" value={`${user && user.gender}`} />
        </div>
        <div className="w-full md:w-full lg:w-[60%] xl:w-[60%]">
            <DetailTile editFunction={editFunction} keyName="Program Enrolled On" value={`${user && user.programEnroledOn}`} />
            <DetailTile editFunction={editFunction} keyName="Admitted In" value={`${user && user.currentIn}`} />
            <DetailTile editFunction={editFunction} keyName="Nationality" value={`${user && user.country}`} />
            {user?.programGraduated.includes("Ph.D") && user.isAlumni === false && <>
                <DetailTile editFunction={editFunction} keyName="Research Guide" value={`${user && user.ResearchGuide}`} />
                <DetailTile editFunction={editFunction} keyName="Date of RAC" value={`${user && user.dateOfRac}`} />
                <DetailTile editFunction={editFunction} keyName="Title" value={`${user && user.Title}`} />
                <DetailTile editFunction={editFunction} keyName="Receives any Fellowship" value={`${user && user.ReceivesFelloship}`} />
            </>}
            <DetailTile editFunction={editFunction} keyName="Address" value={`${user && user?.address?.toUpperCase()}`} />
            {
                user?.isAlumni === true && <DetailTile editFunction={editFunction} keyName="Alumni Proof" value={user && user.uploadProof} user={user} />
            }
        </div>


    </div>
}

const DetailTile = ({ keyName, value, editFunction, user }) => {
    return (
        <div className="grid grid-cols-2 py-2 text-black text-sm md:gap-1 gap-3">
            <p className="text-muted">{keyName}</p>
            <p className="">{(value === undefined || value === "undefined"
                || value === "null" || value === null || value === "")
                ? <span onClick={editFunction} className='bg-yellow-300 cursor-pointer hover:bg-yellow-200 px-2 py-1 rounded-full text-black text-xs'>Add Now</span> : keyName != "Alumni Proof" ? value : <FileViewer fileName={user.uploadProof} serviceName="student" />}</p>
        </div>
    )
}

const ContactTile = ({ keyName, value }) => {

    let icons = {
        User: <CheckCircleRoundedIcon sx={{ width: '16px', color: 'green' }} />,
        School: <MapsHomeWorkRoundedIcon sx={{ width: '15px' }} />,
        Phone: <LocalPhoneRoundedIcon sx={{ width: '15px' }} />,
        Email: <MailRoundedIcon sx={{ width: '15px' }} />
    }


    return <div className="flex items-center text-sm justify-start gap-2">
        {icons[keyName]} <span>{value}</span>
    </div>
}
