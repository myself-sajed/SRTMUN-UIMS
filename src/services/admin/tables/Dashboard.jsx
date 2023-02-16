import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import toast from 'react-hot-toast'
import { NewDashboardTile } from '../components/DashboardTile'
import { Skeleton, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import useAdminAuth from '../../../hooks/useAdminAuth'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const navigate = useNavigate()
    const [dashboadData, setDashboadData] = useState(null)
    const isLoading = true
    const academicYear = useSelector((state) => state.academicYear.academicYear)
    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_MAIN_URL}/api/getCount`, { academicYear }).then(res => {
            if (res.data.status === 'fetched') {
                setDashboadData(res.data.dashboadData)
            }
        }).catch(err => {
            toast.error('Something went wrong. Check your internet connection.')
        })
    }, [academicYear])



    //useeffecct
    useAdminAuth()


    return (
        <div className="dashboard mt-2 w-full sticky-top">
            <p className='font-bold text-2xl text-gray-700'>Dashboard</p>

            {
                dashboadData ?
                    <div className="mt-3 items-center justify-between gap-3 flex-wrap w-full my-3 ">


                        <div className='sm:flex items-center justify-between gap-10'>
                            <NewDashboardTile figure={dashboadData.User} title='Total Teachers' url="/admin/teacher-details" theme="success" gradient="ohhappiness" icon={<PeopleIcon sx={{ height: '40px', width: '40px' }} />} />

                            <NewDashboardTile figure={dashboadData.Degree} title='Total Uploaded Degrees' url="/admin/research-degrees" theme="info" gradient="scooter" icon={<CardMembershipIcon sx={{ height: '40px', width: '40px' }} />} />
                        </div>

                        <div className='sm:flex items-center justify-between gap-10'>
                            <NewDashboardTile figure={dashboadData.ResearchPaper} title='Total Uploaded Research Papers' url="/admin/research-papers" theme="warning" gradient="blooker" icon={<FindInPageIcon sx={{ height: '40px', width: '40px' }} />} />

                            <NewDashboardTile figure={dashboadData.BookAndChapter} title='Total Published Books and Chapters' url="/admin/books-and-chapters" theme="danger" gradient="bloody" icon={<MenuBookIcon sx={{ height: '40px', width: '40px' }} />} />
                        </div>

                    </div> : <div>
                        <Typography variant="h1">{isLoading ? <Skeleton /> : 'h1'}</Typography>
                        <Typography variant="h1">{isLoading ? <Skeleton /> : 'h1'}</Typography>
                        <Typography variant="h1">{isLoading ? <Skeleton /> : 'h1'}</Typography>
                        <Typography variant="h1">{isLoading ? <Skeleton /> : 'h1'}</Typography>
                    </div>
            }


        </div >
    )
}

export default Dashboard