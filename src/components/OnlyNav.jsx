import React from 'react'
import { Avatar, Skeleton, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import { IconButton, Tooltip } from '@mui/material'
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom'
import { setActive } from '../redux/slices/ActiveSlice';
import { setUser } from '../redux/slices/UserSlice';
import { setPage, } from '../redux/slices/NavbarSlice';
import siteLinks from './siteLinks';

const OnlyNav = ({ children, user, heading, li, logout, userType = 'faculty' }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            {/* Navtools */}
            <div className="py-1 gap-2 flex items-center justify-between text-base border-b">

                <div>
                    {children ? children : <div className="flex items-center justify-start gap-2">
                        <div>
                            <IconButton onClick={() => { navigate(heading.link) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <span className="sm:text-sm md:text-lg font-bold">{heading.title}</span>
                    </div>}
                </div>

                {/* USER */}
                {
                    user && user !== 'donotshow' ?
                        <div className='flex items-center justify-end gap-2'>

                            {/* // name of the user */}


                            <div className='flex items-center justify-end gap-2'>

                                {/* // Dropdown item */}


                                <div className="btn-group">
                                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Avatar src={`${process.env.REACT_APP_MAIN_URL}/showFile/${user && user.photoURL}/${userType}`} className="cursor-pointer" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        {document.location.pathname == siteLinks.facultyHome.link ||
                                            document.location.pathname == siteLinks.cas.link ||
                                            document.location.pathname == siteLinks.pbas.link ? <li><button className="dropdown-item" onClick={() => {
                                                navigate(siteLinks.facultyProfile.link);
                                                dispatch(setActive('profile'));
                                                dispatch(setPage('profile'));
                                            }}>Profile</button></li> : null}
                                        {
                                            li.map((item) => {
                                                return <li><button className="dropdown-item" onClick={() => { navigate(item.link) }}>{item.title}</button></li>
                                            })
                                        }

                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button onClick={() => { dispatch(setUser(null)); navigate(logout.link); localStorage.removeItem(logout.token); }} className="dropdown-item text-red-600"><LogoutIcon sx={{ fontSize: '20px' }} className="mr-2" />Logout</button></li>
                                    </ul>
                                </div>

                            </div>
                        </div> : user === 'donotshow' ? <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Avatar src="/assets/male.jpg" className="cursor-pointer" />
                        </button> :
                            <div className="flex items-center justify-end gap-2">
                                <span className='text-gray-400'>Connecting...</span>
                                <Skeleton variant="circular" width={40} height={40} />

                            </div>
                }


            </div>
        </div>
    )
}

export default OnlyNav