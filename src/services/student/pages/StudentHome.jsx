import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStudentUser } from '../../../redux/slices/UserSlice'
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

const StudentHome = () => {
    const Salutations = ["Mr.", "Miss.", "Mrs.", "Shri", "Shrimati"]
    const genders = ["Male", "Female", "Other"]
    const Casts = ["General", "OBC", "SC", "SBC", "SEBC", "ST", "VJ", "NT-B", "NT-C", "NT-D"]
    const religions = ["Hindu", "muslim", "Christian", "Sikh", "Buddh", "Jain",]
    const model = "StudentUser"
    const module = 'student'


    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.studentUser)
    // const studentActive = useSelector(state => state.studentActive.studentActive)
    useStudentAuth()
    title('Student Home')

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

        dispatch(setStudentUser(userrefetch?.data[0]))
    }
    // console.log(guides)
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
        const userrefetch = await getReq({ model: "User", id: 'Dr.', module, filter: "facultyUser", filterConditios: { schoolName: user.schoolName } })
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

    return (
        <div>
            <OnlyNav user={user} logout={{ token: 'student-token', link: siteLinks.welcome.link }}
                heading={{ title: 'Student', link: siteLinks.welcome.link }}
                li={[siteLinks.welcome]} userType='student'
            />

            {/* bred & title */}
            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, siteLinks.studentHome]} />
            </div>

            <div className='mt-3 border rounded-xl gray'>
                {/* PROFILE */}
                <div className='rounded-xl'>
                    {/* // new */}
                    {user &&
                        <div className='p-4'>
                            <div className='sm:flex items-start justify-start gap-5 '>
                                <img src={serverLinks.showFile(user?.photoURL, 'student')} className='h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full object-cover border-4 border-[#344e87]' />

                                <div className='text-black '>
                                    <p className='text-lg sm:text-2xl font-bold'>{user && user.salutation} {user && user.name}</p>
                                    <p className='text-base sm:text-xl'>{user && user.programGraduated},</p>
                                    <p className='text-xs sm:text-sm'>{user && user.schoolName},</p>
                                    <p className='text-xs sm:text-sm'>{user && user.schoolName.includes("Latur") ? "Sub-Campus, Latur - 413531" : "SRTMUN, Vishnupuri, Nanded - 431 606"}</p>

                                    <div className='flex items-cent-3 mt-4'>
                                        {/* <button onClick={() => { navigate(siteLinks.studentStatus.link); }} className='mr-3 p-2 rounded-full border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                            Update Status
                                        </button> */}

                                        <button onClick={() => { dispatch(setStudentUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('student-token'); }} className='p-2 text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div>
                    <div>
                        <div className='flex items-center justify-between mx-4 my-2'>
                            <p className='font-bold text-base sm:text-xl text-black'>Personal Infomation</p>
                            <button className='flex items-center justify-end gap-2 text-blue-700 hover:bg-blue-200 p-2 rounded-xl' onClick={() => { setOpen(true); setEdit(true); setItemToEdit(user?._id); }}>
                                <EditRoundedIcon fontSize="small" />Edit Profile
                            </button>
                        </div>
                        <hr className='text-black' />
                        <div className="md:mb-4 shadow-none">
                            {
                                user &&
                                <div className="card-body sm:flex">

                                    <div className='flex flex-wrap' >
                                        <DetailTile keyName="Full Name" value={`${user && user.salutation} ${user && user.name}`} />
                                        <DetailTile keyName="Program Enroled" value={`${user && user.programGraduated}`} />
                                        <DetailTile keyName="School Name" value={`${user && user.schoolName}`} />
                                        <DetailTile keyName="(ABC) Credit No." value={`${user && user.abcNo}`} />
                                        <DetailTile keyName="Religion" value={`${user && user.religion}`} />
                                        <DetailTile keyName="Cast" value={`${user && user.cast}`} />
                                        <DetailTile keyName="Date Of Birth" value={`${user && user.dob == "" || user.dob == undefined ? "Not Added" : user.dob}`} />
                                        <DetailTile keyName="Gender" value={`${user && user.gender}`} />
                                        <DetailTile keyName="Mobile" value={`${user && user.mobile}`} />
                                        <DetailTile keyName="Program Enroled On" value={`${user && user.programEnroledOn}`} />
                                        <DetailTile keyName="Email" value={`${user && user.email}`} />
                                        <DetailTile keyName="Admitted In" value={`${user && user.currentIn}`} />
                                        <DetailTile keyName="Nationality" value={`${user && user.country}`} />
                                        <DetailTile keyName="Address" value={`${user && user.address == "" || user.address == undefined ? "Not Added" : user.address}`} />
                                        {user?.programGraduated.includes("Ph.D") ? <>
                                            <DetailTile keyName="Research Guide" value={`${user && user.ResearchGuide == "" || user.ResearchGuide == undefined ? "Not Added" : user.ResearchGuide}`} />
                                            <DetailTile keyName="Date of Rac" value={`${user && user.dateOfRac == "" || user.dateOfRac == undefined ? "Not Added" : user.dateOfRac}`} />
                                            <DetailTile keyName="Title" value={`${user && user.Title == "" || user.Title == undefined ? "Not Added" : user.Title}`} />
                                            <DetailTile keyName="Receives any Felloship" value={`${user && user.ReceivesFelloship == "" || user.ReceivesFelloship == undefined ? "Not Added" : user.ReceivesFelloship}`} />
                                        </> : null}

                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>

            
            {
                 <div class="accordion" id="accordionExample">
                    {
                        navcom.map(((item, index) => {
                            return (
                                item.name === "studentJRFSRF" ? 
                                    user?.programGraduated.includes("Ph.D") && user?.ReceivesFelloship==="Yes" ?
                                    <div class="accordion-item" style={{ border: "solid #d6d6fb 2px", borderRadius: "10px", background: "#efeffa", margin: "3px 0" }}>
                                    <h2 class="accordion-header" id={`heading-${index}`}>
                                        <button class="accordion-button" style={{ borderRadius: "10px", background: "#dedef6", color: "#344e87", fontSize: 17, fontWeight: 600 }} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                            {item.value}
                                        </button>
                                    </h2>
                                    <div id={`collapse-${index}`} class="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div key={item}>{item.element}</div>
                                        </div>
                                    </div>
                                </div>:""
                                : 
                                <div class="accordion-item" style={{ border: "solid #d6d6fb 2px", borderRadius: "10px", background: "#efeffa", margin: "3px 0" }}>
                                <h2 class="accordion-header" id={`heading-${index}`}>
                                    <button class="accordion-button" style={{ borderRadius: "10px", background: "#dedef6", color: "#344e87", fontSize: 17, fontWeight: 600 }} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                        {item.value}
                                    </button>
                                </h2>
                                <div id={`collapse-${index}`} class="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div key={item}>{item.element}</div>
                                    </div>
                                </div>
                            </div>
                            )
                        }))
                    }
                </div> 
            }

            <DialogBox title="Edit Profile" buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
                {
                    <div className='flex flex-wrap'>

                        <div className='flex-items-center justify-center flex-col w-full mb-4'>
                            {
                                uploadProof ?
                                    <img src={avatar} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' /> :
                                    <img src={serverLinks.showFile(user?.photoURL, 'student')} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />
                            }
                            <div className='flex items-center justify-center gap-3'>
                                <label className=' bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' htmlFor='file'>Choose Profile Photo</label>
                                <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className='hidden mx-auto' onChange={(e) => {
                                    handleAvatarChange(e, setAvatar, setUploadProof, setOpenCroper)
                                }} />
                                {
                                    uploadProof && <button className='w-[20%] bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setUploadProof(null); }}>Reset Picture</button>
                                }
                            </div>
                        </div>
                        
                       

                        <Select className='col-md-4 col-lg-2' id="salutation" value={salutation} label="Salutation" setState={setValues} options={Salutations} />
                        <Text className='col-md-8 col-lg-10' id="name" value={name} label="Full Name" setState={setValues} />
                        <Text className='col-md-4 col-lg-4' type='number' id='mobile' value={mobile} label="Mobile" setState={setValues} />
                        <Text className='col-md-8 col-lg-8' id="address" value={address} label="Permanent Address" setState={setValues} />

                        {/* <Select className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School Name" setState={setValues} options={Object.keys(SchoolsProgram)} /> */}

                        <Select className='col-md-4' id="programGraduated" value={programGraduated} label="Current Program" setState={setValues} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} />

                        <Select className="col-lg-2 col-md-4" id="currentIn" value={currentIn} label="Admitted In" setState={setValues} options={programDuration ? programDuration : []} />

                        <YearSelect className="col-md-2" id="programEnroledOn" value={programEnroledOn} label="Program Enroled On" setState={setValues} />
                        {/* <UploadFile className='col-md-6 col-lg-4' id="uploadProof" label="Chage profile photo" setState={setValues} /> */}
                        <Text className='col-md-6 col-lg-4' type='date' id="dob" value={dob} label="Date of birth" setState={setValues} />
                        <Text className='col-md-6 col-lg-4' type="number" id="abcNo" value={abcNo} label="(ABC) Credit No." setState={setValues} />
                        <Select className="col-md-3" id="gender" value={gender} label="Gender" setState={setValues} options={genders} />

                        <Select className='col-md-3' id='country' value={country} label="Nationality" setState={setValues} options={countries()} />

                        <Select className='col-md-2' id='cast' value={cast} label="Cast" setState={setValues} options={Casts} />

                        <Select className='col-md-3' id='religion' value={religion} label="Religion" setState={setValues} options={religions} />

                        {programGraduated.includes("Ph.D") ? <>
                            <Select className='col-md-6 col-lg-3' options={guides ? guides : []} id="ResearchGuide" value={ResearchGuide} label="Research Guide" setState={setValues} />
                            <Text className='col-md-6 col-lg-4' type='text' id="Title" value={Title} label="Title" setState={setValues} />
                            <Text className='col-md-6 col-lg-4' type='date' id="dateOfRac" value={dateOfRac} label="Date of Rac" setState={setValues} />
                            <Select className='col-md-6 col-lg-4' options={["Yes", "No"]} id="ReceivesFelloship" value={ReceivesFelloship} label="Receives any Felloship" setState={setValues} />
                        </> : null}
                    </div>
                }
            </DialogBox>
            <ProfileCroper open={openCroper} setOpen={setOpenCroper} file={uploadProof} setFile ={setUploadProof} setAvatar={setAvatar} />
            <Footer />
        </div>
    )
}

export default StudentHome

const DetailTile = ({ keyName, value }) => {
    return (
        <div className="row py-2 text-black col-12 col-md-6 col-lg-6">
            <div className="col-sm-3">
                <p className="mb-0 text-sm sm:text-base font-semibold">{keyName}</p>
            </div>
            <div className="col-sm-9">
                <p className="mb-0 text-sm sm:text-base">{value}</p>
            </div>
        </div>
    )
}