import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAlumniUser } from '../../../redux/slices/UserSlice'
import Footer from '../../../components/Footer'
import Bred from '../../../components/Bred'
import useAlumniAuth from '../../../hooks/useAlumniAuth'
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
import SchoolsProgram from '../../../components/SchoolsProgram'
import serverLinks from '../../../js/serverLinks'
import DynamicCheckboxes from '../../../components/formComponents/DynamicChackboxes'
import handleAvatarChange from '../../../js/handleAvatar'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import YearSelect from '../../../components/formComponents/YearSelect'
import FileViewer from '../../../components/FileViewer'
import ProfileCroper from '../../../components/ProfileCroper'
import UnderConstruction from '../../../pages/UnderConstruction'
import Lists from '../../../components/tableComponents/Lists'

const Home = () => {

    const Salutations = ["Dr.", "Prof.", "Mr.", "Mrs.", "Shri", "Shrimati"]
    const genders = ["Male", "Female", "Other"]
    const model = "AlumniUser"
    const module = 'alumni'


    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [file, setFile] = useState(null)
    const [openCroper, setOpenCroper] = useState(false)

    // const [alumniProof, setAlumniProoof] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.alumniUser)
    // const alumniActive = useSelector(state => state.alumniActive.alumniActive)
    useAlumniAuth()
    title('Alumni Home')

    const initialstate = { salutation: "", name: "", address: "", mobile: "", schoolName: "", gender: "", dob: "", doStarted: "", doCompleted: "", country: "", Upload_Proof2: "" }
    const [values, setValues] = useState(initialstate);
    const { salutation, name, address, mobile, schoolName, gender, dob, /*doStarted,*/ doCompleted, country } = values

    const refetch = async () => {
        const userrefetch = await getReq({ model, id: user?._id, module, filter: "AlumniUser" })

        dispatch(setAlumniUser(userrefetch?.data[0]))
    }
    const [programGraduated, setProgramGraduated] = useState([])


    const onSubmit = (e) => {
        e.preventDefault();
        setEdit(true);
        editReq({ id: itemToEdit, Upload_Proof: file }, '', initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module, programGraduated)
    }

    const onCancel = () => {
        setValues(initialstate)
        setItemToEdit(null)
    }

    useEffect(() => {
        if (itemToEdit && user) {
            const { salutation, name, programGraduated, address, mobile, schoolName, gender, dob, doStarted, doCompleted, country } = user
            if (user._id === itemToEdit) {
                setEdit(true); setOpen(true);
                setValues({ salutation, name, address, mobile, schoolName, gender, dob, doStarted, doCompleted, country })
                setProgramGraduated(programGraduated)
            }
        }
    }, [itemToEdit, user])

    return (
        <div>
            <OnlyNav user={user} logout={{ token: 'alumni-token', link: siteLinks.welcome.link }}
                heading={{ title: 'Back Welcome', link: siteLinks.welcome.link }}
                li={[siteLinks.welcome]}
            />

            {/* bred & title */}
            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, siteLinks.alumniHome]} />
            </div>

            <div className='mt-3 border rounded-xl gray'>
                {/* PROFILE */}
                <div className='rounded-xl'>
                    {/* // new */}
                    {user &&
                        <div className='p-4'>
                            <div className='sm:flex items-start justify-start gap-5 '>
                                <img alt='' src={serverLinks.showFile(user?.photoURL, 'faculty')} className='h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full object-cover border-4 border-[#344e87]' />
                                <div className='text-black '>
                                    <p className='text-lg sm:text-2xl font-bold'>{user && user.salutation} {user && user.name}</p>
                                    <p className='text-base sm:text-lg'>{user && user.programGraduated.map((item) => { return (`${item},`) })}</p>
                                    <p className='text-xs sm:text-sm'>{user && user.schoolName},</p>
                                    <p className='text-xs sm:text-sm'>{user.schoolName.includes("Latur") ? "Sub-Campus, Latur - 413531" : "SRTMUN, Vishnupuri, Nanded - 431 606"}</p>

                                    <div className='flex items-cent-3 mt-4'>
                                        {/* <button onClick={() => { navigate(siteLinks.alumniStatus.link); }} className='mr-3 p-2 rounded-full border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                            Update Status
                                        </button> */}

                                        <button onClick={() => { dispatch(setAlumniUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('alumni-token'); }} className='p-2 text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
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

                                    <div className='flex flex-wrap'>
                                        <DetailTile keyName="Full Name" value={`${user && user.salutation} ${user && user.name}`} />
                                        <DetailTile keyName="Mobile" value={`${user && user.mobile}`} />
                                        <DetailTile keyName="Email" value={`${user && user.email}`} />
                                        <DetailTile keyName="School Name" value={`${user && user.schoolName}`} />
                                        <DetailTile keyName="Last Program Graduated " value={`${user && user.programGraduated.map((item) => { return (`${item}`) })}`} />
                                        <DetailTile keyName="year of Last Program Completed" value={`${(user && user.doCompleted === undefined) || user.doCompleted === '' ? "Not Added" : user.doCompleted}`} />
                                        <DetailTile keyName="Address" value={`${(user && user.address === undefined) || user.address === '' ? "Not Added" : user.address}`} />
                                        {/* <DetailTile keyName="Admited In School" value={`${user && user.doStarted=== undefined || user.doStarted === '' ? "Not Added" : user.doStarted}`} /> */}
                                        <DetailTile keyName="Date Of Birth" value={`${(user && user.dob === undefined) || user.dob === '' ? "Not Added" : user.dob}`} />
                                        <DetailTile keyName="Nationality" value={`${(user && user.country === undefined) || user.country === '' ? "Not Added" : user.country}`} />
                                        <DetailTile keyName="Alumni Proof" value={(user && user.Upload_Proof === undefined) || user.Upload_Proof === '' ? "Not Added" : <FileViewer fileName={user.Upload_Proof} serviceName="faculty" />} />
                                    </div>
                                </div>
                            }


                            <div className='w-full mt-2 hidden sm:block' id="accordionNav1">

                            </div>
                        </div>
                        {/* <div className="input-group mb-3 px-4  flex items-center justify-end w-1/2">
                                <input type="file" className="form-control" id="impactFactor" aria-describedby="impactfactor" aria-label="Upload" name="impactFactor"
                                    onChange={(e) => {setAlumniProoof(e.target.files[0])}} accept="application/pdf" />
                                <button onClick={() => {  }} className="btn btn-primary bg-blue-700 hover:bg-blue-600" type="button" id="impactFactor">Upload Alumni proof</button>
                            </div> */}
                    </div>
                </div>

            </div>

            <div style={{ background: "#a8bae7", width: "100%", height: "50px", marginTop: "10px", borderRadius: "10px 10px 0 0", color: "#FFF", display: "flex", alignItems: "center", fontWeight: "600" }}><span style={{ margin: "0 30px" }}>Previous Details</span></div>
            <div style={{ border: "solid #a8bae7 2px", width: "100%", padding: "3px", marginBottom: "10px", borderRadius: "0 0 10px 10px" }}>

                <div className="accordion" id="accordionExample1">
                    <div className="accordion-item" style={{ border: "solid #d6d6fb 2px", borderRadius: "10px", background: "#efeffa", margin: "3px 0" }}>
                        <h2 className="accordion-header" id={`heading`}>
                            <button className="accordion-button" style={{ borderRadius: "10px", background: "#dedef6", color: "#344e87", fontSize: 17, fontWeight: 600 }} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse1`} aria-expanded="false" aria-controls={`collapse1`}>
                                Past Qualification
                            </button>
                        </h2>
                        <div id={`collapse1`} className="accordion-collapse collapse" aria-labelledby={`heading`} data-bs-parent="#accordionExample1">
                            <div className="accordion-body">
                                <div> <UnderConstruction /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#a8bae7", width: "100%", height: "50px", marginTop: "10px", borderRadius: "10px 10px 0 0", color: "#FFF", display: "flex", alignItems: "center", fontWeight: "600" }}><span style={{ margin: "0 30px" }}>Current Status</span></div>
            <div style={{ border: "solid #a8bae7 2px", width: "100%", padding: "3px", marginBottom: "10px", borderRadius: "0 0 10px 10px" }}>

                <div className="accordion" id="accordionExample">
                    {
                        navcom.map(((item, index) => {
                            return <div className="accordion-item" style={{ border: "solid #d6d6fb 2px", borderRadius: "10px", background: "#efeffa", margin: "3px 0" }}>
                                <h2 className="accordion-header" id={`heading-${index}`}>
                                    <button className="accordion-button" style={{ borderRadius: "10px", background: "#dedef6", color: "#344e87", fontSize: 17, fontWeight: 600 }} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                        {item.value}
                                    </button>
                                </h2>
                                <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div key={item}>{item.element}</div>
                                    </div>
                                </div>
                            </div>
                        }))
                    }
                </div>
            </div>

            <DialogBox title="Edit Profile" buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={loading}>
                {
                    <div className='flex flex-wrap'>
                        <div className='flex-items-center justify-center flex-col w-full mb-4'>
                            {
                                file ?
                                    <img alt='' src={avatar} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' /> :
                                    <img alt='' src={serverLinks.showFile(user?.photoURL, 'faculty')} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />
                            }
                            <div className='flex items-center justify-center gap-3'>
                                <label className=' bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' htmlFor='file'>Choose Profile Photo</label>
                                <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className='hidden mx-auto' onChange={(e) => { handleAvatarChange(e, setAvatar, setFile, setOpenCroper) }} />
                                {
                                    file && <button className='w-[20%] bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setFile(null); }}>Reset Picture</button>
                                }
                            </div>
                        </div>

                        <ProfileCroper open={openCroper} setOpen={setOpenCroper} file={file} setFile={setFile} setAvatar={setAvatar} />

                        <Select className='col-md-4 col-lg-2' id="salutation" value={salutation} label="Salutation" setState={setValues} options={Salutations} />
                        <Text className='col-md-8 col-lg-10' id="name" value={name} label="Full Name" setState={setValues} />
                        <Text className='col-md-6 col-lg-4' type='number' id='mobile' value={mobile} label="Mobile" setState={setValues} />
                        <Text className='col-md-6 col-lg-8' id="address" value={address} label="Permanent Address" setState={setValues} />

                        {/* <Select className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School Name" setState={setValues} options={Object.keys(SchoolsProgram)} /> */}
                        <DynamicCheckboxes id='programGraduated' value={programGraduated} label="Programs Graduated" setState={setProgramGraduated} state={programGraduated} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} />

                        <Select className='col-md-6 col-lg-4' id="gender" value={gender} label="Gender" setState={setValues} options={genders} />
                        <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof2" label="Upload Alumni Proof" setState={setValues} required={false} />
                        <Text className='col-md-6 col-lg-4' type='date' id="dob" value={dob} label="Date of birth" setState={setValues} />
                        <Select className='col-md-3' id='country' value={country} label="Nationality" setState={setValues} options={Lists.countrys} />
                        {/* <YearSelect className='col-md-6 col-lg-4' id="doStarted" value={doStarted} label="Admited In School" setState={setValues} /> */}
                        <YearSelect className='col-md-6 col-lg-4' id="doCompleted" value={doCompleted} label="Completed Programs" setState={setValues} />
                    </div>
                }

            </DialogBox>
            {/* <Header />  item.name === alumniActive ? : null*/}

            <Footer />
        </div>
    )

}

export default Home


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