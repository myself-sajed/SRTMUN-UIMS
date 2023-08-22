import React, { useEffect } from 'react'
import Footer from '../components/Footer';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import SportsHandballRoundedIcon from '@mui/icons-material/SportsHandballRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useNavigate } from 'react-router';
import useScroll from '../hooks/useScroll';
import { useDispatch, useSelector } from 'react-redux';
import title from '../js/title';
import { setDirectorUser, setUser, setAlumniUser, setStudentUser, setProUser } from '../redux/slices/UserSlice';
import siteLinks from '../components/siteLinks';
import { FloatButton, Tooltip } from 'antd';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import DialogBox from '../components/DialogBox';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import RichText from '../services/director/reports/academic-audit/inputs/RichText'
import Axios from 'axios'
import Dashboard from '../services/dashboard/pages/Dashboard';
import useUserIsLoggedIn from '../hooks/useUserIsLoggedIn';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import { fetchIndexNews } from '../services/news/js/fetchNews';
import { useQuery } from 'react-query';
import LoggedInUsers from '../components/LoggedInUsers';
import VisitorCount from '../services/dashboard/components/VisitorCount';
import navcom from '../services/director/components/UtilityComponents/navcom';

const Index = () => {
    let iconProps = { fontSize: '65px', color: '#fc4829', borderRadius: '50%', margin: '10px', padding: '5px', }
    useScroll()
    const users = useSelector(state => state.user)
    const [feedbackModal, setFeedbackModal] = useState(false)
    const [feedback, setFeedback] = useState({ content: '' })
    const [feedbackEmail, setFeedbackEmail] = useState(null)
    useUserIsLoggedIn()
    title("Welcome")
    const navigate = useNavigate()


    let serviceList = [
        {
            icon: <PersonRoundedIcon sx={iconProps} />,
            title: 'Faculty Profile',
            phrase: 'Login to the your Faculty Profile by entering your alloted Employee ID and Password.',
            user: users.user ? users.user : null,
            profileUrl: siteLinks.facultyHome.link,
            tokenId: 'faculty-token',
            dispatchFunction: setUser,
            loginUrl: siteLinks.facultyLogin.link,
        },
        {
            icon: <DescriptionRoundedIcon sx={iconProps} />,
            title: 'CAS / PBAS',
            phrase: 'Submit CAS & PBAS Reports effortlessly, login through your Faculty Profile Credentials',
            user: users.user ? users.user : null,
            profileUrl: siteLinks.cas.link,
            dispatchFunction: setUser,
            tokenId: 'faculty-token',
            loginUrl: siteLinks.facultyLogin.link,
        },
        {
            icon: <LocalLibraryRoundedIcon sx={iconProps} />,
            title: 'Director',
            phrase: "Information of the School's Students, Alumni, Achievements and much more in one place.",
            user: users.directorUser ? users.directorUser : null,
            profileUrl: siteLinks.directorHome.link,
            dispatchFunction: setDirectorUser,
            tokenId: 'director-token',
            loginUrl: siteLinks.directorLogin.link,
        },
        {
            icon: <LocalLibraryRoundedIcon sx={iconProps} />,
            title: 'Administrative & Academic Audit (AAA)',
            phrase: 'Login to the individual Director Profile by entering your valid allotted Director ID and Password.',
            user: users.directorUser ? users.directorUser : null,
            profileUrl: siteLinks.aaa.link,
            tokenId: 'director-token',
            dispatchFunction: setDirectorUser,
            loginUrl: siteLinks.directorLogin.link,
        },

        {
            icon: <SchoolRoundedIcon sx={iconProps} />,
            title: 'Student Profile',
            phrase: 'Login to student profile for giving feedbacks of your school and many different activities.',
            user: users.studentUser ? users.studentUser : null,
            profileUrl: siteLinks.studentHome.link,
            tokenId: 'student-token',
            loginUrl: '/student-login',
            dispatchFunction: setStudentUser
        },
        {
            icon: <BoyRoundedIcon sx={iconProps} />,
            title: 'Alumni Profile',
            phrase: 'Login to Alumni profile for giving feedbacks of your school and many different activities.',
            user: users.alumniUser ? users.alumniUser : null,
            profileUrl: siteLinks.alumniHome.link,
            tokenId: 'alumni-token',
            loginUrl: '/alumni-login',
            dispatchFunction: setAlumniUser

        },
        {
            icon: <NewspaperRoundedIcon sx={iconProps} />,
            title: 'Public Relation Officer (PRO)',
            phrase: 'Log in to your account to stay add the latest news and events happening at our university.',
            user: users.proUser ? users.proUser : null,
            profileUrl: siteLinks.proHome.link,
            tokenId: 'pro-token',
            loginUrl: '/pro-login',
            dispatchFunction: setProUser

        },
        {
            icon: <DirectionsRunIcon sx={iconProps} />,
            title: 'Training & Placement',
            phrase: 'Login to avail Training & Placement services with your ID and Password.',
            user: users.placement ? users.placement : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/training-and-placement-login'
        },
        {
            icon: <GroupsRoundedIcon sx={iconProps} />,
            title: 'Board of Examination and Evaluation(BoEE)',
            phrase: 'Login to Board of Examination and Evaluation(BoEE)',
            user: users.boee ? users.boee : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/boee-login'
        },
        {
            icon: <AutoStoriesRoundedIcon sx={iconProps} />,
            title: 'Knowledge Resource Center (KRC)',
            phrase: 'Login to the SRTMUN KRC with valid ID & Password',
            user: users.krc ? users.krc : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/library-login'
        },
        {
            icon: <BusinessRoundedIcon sx={iconProps} />,
            title: 'Establishment Department',
            phrase: 'Login to Establishment Department section',
            user: users.establishment ? users.establishment : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/establishment-login'
        },
        {
            icon: <AutoGraphRoundedIcon sx={iconProps} />,
            title: 'Department of Student Development (DSD)',
            phrase: 'Login to Department of Student Development for Student Development related activities.',
            user: users.dsd ? users.dsd : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/dsd-login'
        },
        {
            icon: <GroupsRoundedIcon sx={iconProps} />,
            title: 'National Service Scheme (NSS)',
            phrase: 'Login to National Service Scheme to know more about NSS',
            user: users.nss ? users.nss : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/nss-login'
        },
        {
            icon: <SportsHandballRoundedIcon sx={iconProps} />,
            title: 'Sports Department',
            phrase: 'Login to Sports Department for various Sports related activities & information',
            user: users.sports ? users.sports : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/sports-login'
        },

    ]

    const sendFeedback = () => {
        if (feedbackEmail === null || feedbackEmail === '' || feedbackEmail === undefined) {
            toast.error('Please provide your email address')
            return
        }
        else if (feedback.content === '' || feedback.content === null || feedback.content === undefined) {
            toast.error('Please provide a valid feedback')
            return
        }

        let url = `${process.env.REACT_APP_MAIN_URL}/api/userFeedback`
        Axios.post(url, { email: feedbackEmail, feedback: feedback.content }).then((res) => {
            res.data.status === 'success' ? toast.success('Feedback sent successfully') : toast.error(res.data.error)
        }).catch((err) => {
            toast.error('Internal Server Error')
        })

        setFeedbackModal(false)
    }

    const { data: news, isLoading, isError, error, refetch } = useQuery([], () => fetchIndexNews())


    return (
        <>
            <div className="w-full">

                {/* News */}
                <div className='flex items-center justify-start mt-2'>
                    <span onClick={() => { navigate('/news') }} className='md:text-base cursor-pointer text-sm whitespace-nowrap bg-orange-500 hover:bg-orange-800 text-white px-1 md:px-2'>
                        <div className='flex items-center justify-start gap-1'><NewspaperRoundedIcon sx={{ fontSize: '18px' }} />News Bulletin</div></span>
                    <marquee className='bg-orange-100 text-orange-700' behavior="scroll" direction="left"
                    >
                        {
                            news?.data?.data.length > 0 ?
                                <div className='flex items-center justify-start gap-4'>

                                    {news?.data?.data?.map((el) => {
                                        return <div className='flex items-center justify-start gap-1 hover:text-blue-800 cursor-pointer text-sm md:text-base' onClick={() => { navigate(`/news/${el._id}`) }}>
                                            <LabelImportantRoundedIcon sx={{ fontSize: '18px' }} /> {el.headline}
                                        </div>
                                    })}

                                </div> : <p className="md:text-base text-sm">No Recent News</p>
                        }
                    </marquee>
                    <span onClick={() => { navigate('/news') }} className='sm:block hidden text-sm md:text-base whitespace-nowrap hover:bg-orange-800 bg-orange-500 text-white px-2'>
                        <div className='flex items-center justify-start gap-1 cursor-pointer'><NewspaperRoundedIcon sx={{ fontSize: '18px' }} />Explore all News</div></span>


                </div>

                <div className='mt-3 flex items-center justify-center'>
                    {/* LOGGED IN USERS */}
                    <LoggedInUsers />
                </div>

                {/* MAIN DIV */}

                <div className='z-30 mt-4'>
                    <div className={`text-center ${sessionStorage.getItem('animate') === 'false' ? '' : 'main__index__heading'}`}>
                        <p className='text-xs text-gray-500'>Welcome to</p>
                        <h2 className='font-bold text-blue-500 text-3xl md:text-6xl sm:text-4xl gradient'>SRTMUN-UIMS</h2>
                        <p className='text-[#fc4829] md:text-xl sm:text-lg text-base md:w-1/2 sm:w-2/3 text-center mx-auto'>University Information Management System</p>
                    </div>



                </div>


                <div className='mt-4 z-30 '>


                    <div className={`${sessionStorage.getItem('animate') === 'false' ? '' : 'main__cards'}`}>
                        <div className='md:p-5 sm:p-4 p-3 rounded-lg'>
                            <Dashboard />
                        </div>
                    </div>


                    <div className={`flex-wrap flex items-center mt-9 gap-auto ${sessionStorage.getItem('animate') === 'false' ? '' : 'main__cards'}`}>
                        {serviceList.map((item, index) => {
                            return <MainService data={item} key={index} />
                        })}
                    </div>


                    {/* Website visitor count and footer area */}
                    <div className="mt-40">
                        <VisitorCount />
                        <Footer />
                    </div>

                </div>



            </div>

            <div>

                <DialogBox title='Share your valuable feedback / suggestion' buttonName='Send Feedback / Suggestion' isModalOpen={feedbackModal} setIsModalOpen={setFeedbackModal} onClickFunction={sendFeedback}>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="feedbackEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" value={feedbackEmail} onChange={(e) => { setFeedbackEmail(e.target.value) }} id="feedbackEmail" placeholder='youremail@example.com' />
                        </div>
                        <RichText setState={setFeedback} state={feedback} note="Write a short note about the Feedback, Suggestion or a Bug" />
                    </form>
                </DialogBox>

                <FloatButton
                    icon={<ForumRoundedIcon sx={{ color: 'blue' }} />}
                    description="FEED BACK"
                    shape="square"
                    style={{ right: 24 }}
                    onClick={() => { setFeedbackModal(true); setFeedbackEmail(null); setFeedback({ content: '' }) }} className='bg-blue-200'
                />
            </div>


        </>
    )
}

export default Index


const MainService = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    return (


        <div className="indexCard flex items-start gap-2 relative pt-4">
            <div className='indexCardIcon'>
                {data.icon}

            </div>
            <div className='indexCardBody'>
                <div>
                    <p className='indexCardPUp'>{data.title}</p>
                    <p className='indexCardPDown'>{data.phrase}</p>
                </div>
            </div>
            <div className='indexBtnOuter'>
                <button onClick={() => {
                    navigate(data.user ? data.profileUrl : data.
                        loginUrl)
                }} className={`indexBtn ${data.user ? 'indexBtnHalf' : 'indexBtnFull'} duration-200 ease-in-out`}>
                    {data.user ? 'Visit Profile' : 'Login Now'}
                </button>
                {data.user && <button onClick={() => {
                    dispatch(data.dispatchFunction(null))
                    localStorage.removeItem(data.tokenId)
                    navigate('/')
                }} className='indexBtn indexBtnHalf duration-200 ease-in-out'
                    style={{ backgroundColor: "#f88e7b" }}> Logout
                </button>
                }
            </div>
        </div>


    )
}
