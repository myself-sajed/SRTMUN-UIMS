import { Avatar, IconButton, Skeleton, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { useNavigate } from 'react-router-dom';
import { setPage, setReportLoading } from '../redux/slices/NavbarSlice';
import Axios from 'axios'
import toast from 'react-hot-toast';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import { setActive } from '../redux/slices/ActiveSlice';
import { setUser } from '../redux/slices/UserSlice';
import OffCanvas from './OffCanvas';
import siteLinks from './siteLinks';
import serverLinks from '../js/serverLinks';



const NavTools = () => {

    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    // generate report function
    function generateReport() {

        dispatch(setReportLoading(true));
        toast.success('Please wait...')

        // const otherOptions = { photo: true, Qualifications: true, Degree: true,  }
        let otherOptions = {
            Photo: true, PersonalInfo: true, Qualifications: true, Degree: true, AppointmentsHeldPrior: true, PostHeld: true, Lectures: true, Online: true, ResearchProject: true, ResearchPaper: true, BookAndChapter: true, ResearchGuidance: true, PhdAwarded: true, JrfSrf: true, AwardRecognition: true, Patent: true, ConsultancyServices: true, Collaboration: true, InvitedTalk: true, ConferenceOrganized: true, Fellowship: true, EContentDeveloped: true,
        }

        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/generateReport`, { userId: user._id, otherOptions })
            .then(function (res) {
                if (res.data.status === 'generated') {
                    dispatch(setReportLoading(false));
                    toast.success('Report generated successfully');
                    window.open(`${process.env.REACT_APP_MAIN_URL}/downloadPdf/${res.data.fileName}`, '_blank');
                }
                else if (res.data.status === 'error') {
                    dispatch(setReportLoading(false));
                    toast.error(res.data.message);
                }
            })
            .catch(function (err) {
                dispatch(setReportLoading(false));
                toast.error('Something went wrong');
            })
    }



    return (

        <>

            <div className="py-1 gap-2 flex items-center justify-between ">

                {/* // generateReport and  customized report */}
                {user ?

                    <div className="flex items-center justify-start gap-2">
                        <OffCanvas />


                        <button onClick={(e) => { navigate(siteLinks.facultyReport.link) }} className='bg-green-100 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 px-2 sm:px-3 p-1 rounded-full text-sm sm:text-base'>
                            <LeaderboardRoundedIcon className='text-green-800 mr-2 text-sm sm:text-md' />
                            Generate Faculty Report
                        </button>




                    </div> : <div className="flex items-center justify-start gap-2">




                    </div>

                }



                {/* USER */}
                {
                    user ?
                        <div className='flex items-center justify-end gap-2'>

                            {/* // name of the user */}


                            <div className='flex items-center justify-end gap-2'>
                                {/* // Dropdown item */}
                                <div className="btn-group">
                                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Avatar src={serverLinks.showFile(user?.photoURL, 'faculty')} className="cursor-pointer" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={() => { navigate(siteLinks.facultyHome.link) }}>Home</button></li>
                                        <li><button className="dropdown-item" onClick={() => {
                                            navigate(siteLinks.facultyProfile.link);
                                            dispatch(setActive('profile'));
                                            dispatch(setPage('profile'));
                                        }}>Profile</button></li>
                                        <li><button className="dropdown-item" onClick={() => { navigate(siteLinks.facultyChangePass.link) }}>{siteLinks.facultyChangePass.title}</button></li>
                                        <li><hr className="dropdown-divider" /></li>

                                        <li><button onClick={() => { dispatch(setUser(null)); navigate('/'); localStorage.removeItem('token'); }} className="dropdown-item text-red-600"><LogoutIcon sx={{ fontSize: '20px' }} className="mr-2" />Logout</button></li>
                                    </ul>
                                </div>
                                <div>
                                    <Tooltip title="Log out">
                                        <IconButton onClick={() => { navigate('/'); localStorage.removeItem('faculty-token'); dispatch(setUser(null)); }}>
                                            <LogoutIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div> :
                        <div className="flex items-center justify-end gap-2">
                            <span className='text-gray-400'>Connecting...</span>
                            <Skeleton variant="circular" width={40} height={40} />

                        </div>
                }


            </div>

        </>
    )
}

export default NavTools