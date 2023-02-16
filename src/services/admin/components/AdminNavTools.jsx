import { Avatar, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { Years } from '../../faculty/js/TableInfo';
import { setAcademicYear } from '../../../redux/slices/AcademicYearSlice';
import OffCanvasAdmin from '../components/OffCanvasAdmin';

const AdminNavTools = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const academicYear = useSelector(state => state.academicYear.academicYear)



    return (
        <div className="w-full">

            <div className='flex items-center justify-between my-1 '>

                <div>
                    <div className='block lg:hidden'>
                        <OffCanvasAdmin />
                    </div>

                </div>

                {/* USER */}
                <div className='flex items-center justify-end gap-2'>

                    <div className='hidden sm:block'>
                        <button onClick={(e) => { navigate('/') }} className=' text-black hover:bg-slate-100 border-dark ease-in-out duration-200 rounded-md d-flex align-items-center btn '>
                            {/* <CottageRoundedIcon className='text-slate-800 mr-2' sx={{ fontSize: '28px' }} /> */}
                            Home
                        </button>
                    </div>

                    {/* // TO SHOW YEARS */}
                    <div className='my-1'>
                        <select className="form-select border-dark text-xs sm:text-base" id="validationCustom04" required onChange={(e) => { dispatch(setAcademicYear(e.target.value)) }} value={academicYear && academicYear}>
                            <option selected disabled value="">Choose</option>

                            {Years.map((year, index) => {
                                return <option key={index} value={year}>{year}</option>
                            })}

                            <option value={null}>Show all</option>


                        </select>
                    </div>


                    {/* // name of the user */}
                    <div className="flex flex-col">
                        <p className="text-sm hidden sm:text-lg sm:block text-gray-700 ">Hello, <span className="font-bold">Admin</span></p>
                        <p className="text-xs hidden sm:text-[12px] sm:block text-gray-700">Username : admin</p>
                    </div>

                    {/* // Dropdown item */}
                    <div className="flex items-center justify-end gap-2">
                        <div className="btn-group">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>


                        </div>

                        <div className="btn-group">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    99+
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                                <img src={`/assets/male.jpg`} className="cursor-pointer w-10 h-10 rounded-full object-cover" />


                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-20">
                                    10+

                                </span>


                            </button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => { navigate('/') }}>Home</button></li>
                                <li><button className="dropdown-item"
                                    onClick={() => { navigate('/verify-accounts') }}>Verify Accounts</button>
                                </li>
                            </ul>
                        </div>
                        <Tooltip title="Log out">
                            <IconButton onClick={() => { navigate('/admin-login'); localStorage.removeItem('admin-token') }}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>


            </div>
            <hr />
        </div>
    )
}

export default AdminNavTools