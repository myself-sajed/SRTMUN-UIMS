import React, { useState } from 'react'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PlagiarismRoundedIcon from '@mui/icons-material/PlagiarismRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import VideoChatRoundedIcon from '@mui/icons-material/VideoChatRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSchoolData } from '../js/fetchData';
import { useEffect } from 'react';
import { Skeleton, useStepContext } from '@mui/material';

const dashboardCards = [
    {
        title: 'Schools',
        countModelName: 'SchoolCount',
        color: 'cyan',
        url: `/dashboard/select-department/schoolInformation`,
        icon: <MapsHomeWorkRoundedIcon sx={{ color: 'red', fontSize: '38px' }} />
    },
    {
        title: 'Faculties',
        countModelName: 'usersCount',
        color: 'cyan',
        url: `/dashboard/select-department/info`,
        icon: <GroupsRoundedIcon sx={{ color: 'green', fontSize: '42px' }} />
    },
    {
        title: 'Students',
        countModelName: 'StudentCount',
        color: 'orange',
        url: `/dashboard/select-department/students`,
        icon: <GroupRoundedIcon sx={{ color: 'orange', fontSize: '42px' }} />
    },
    {
        title: 'Registered Alumni',
        countModelName: 'AlumniCount',
        color: 'cyan',
        url: `/dashboard/select-department/alumni`,
        icon: <Diversity3RoundedIcon sx={{ color: 'red', fontSize: '38px' }} />
    },
    {
        title: 'Placements',
        countModelName: 'PlacementCount',
        color: 'cyan',
        url: `/dashboard/select-department/placements`,
        icon: <WorkRoundedIcon sx={{ color: 'blue', fontSize: '38px' }} />
    },
    {
        title: 'Qualified Exams',
        countModelName: 'QualifiedExamCount',
        color: 'cyan',
        url: `/dashboard/select-department/qualifiedExams`,
        icon: <AssignmentTurnedInRoundedIcon sx={{ color: 'green', fontSize: '38px' }} />
    },
    {
        title: 'Progressed to H.E.',
        countModelName: 'ProgressionToHECount',
        color: 'cyan',
        url: `/dashboard/select-department/progessionToHigherEducation`,
        icon: <TimelineRoundedIcon sx={{ color: 'red', fontSize: '38px' }} />
    },
    {
        title: 'Books & Chapters',
        countModelName: 'BookAndChapterCount',
        url: `/dashboard/select-department/BookAndChapter`,
        color: 'pink',
        icon: <AutoStoriesRoundedIcon sx={{ color: 'purple', fontSize: '38px' }} />
    },
    {
        title: 'Research Papers',
        countModelName: 'ResearchPaperCount',
        url: `/dashboard/select-department/ResearchPaper`,
        color: 'blue',
        icon: <StickyNote2RoundedIcon sx={{ color: 'darkcyan', fontSize: '35px' }} />
    },
    {
        title: 'Research Projects',
        countModelName: 'ResearchProjectCount',
        url: `/dashboard/select-department/ResearchProject`,
        color: 'lime',
        icon: <ScienceRoundedIcon sx={{ color: 'blue', fontSize: '35px' }} />
    },
    {
        title: 'E-content Developed',
        countModelName: 'EContentDevelopedCount',
        url: `/dashboard/select-department/EContentDeveloped`,
        color: 'emerald',
        icon: <LanguageRoundedIcon sx={{ color: 'green', fontSize: '35px' }} />
    },
    {
        title: 'Patents Published',
        countModelName: 'PatentCount',
        url: `/dashboard/select-department/Patent`,
        color: 'teal',
        icon: <BookmarkAddedRoundedIcon sx={{ color: 'brown', fontSize: '35px' }} />
    },
    {
        title: 'Conference Organized',
        countModelName: 'ConferenceOrganizedCount',
        url: `/dashboard/select-department/ConferenceOrganized`,
        color: 'cyan',
        icon: <VideoChatRoundedIcon sx={{ color: 'DeepPink', fontSize: '35px' }} />
    },
    {
        title: 'Invited Talks ',
        countModelName: 'InvitedTalkCount',
        url: `/dashboard/select-department/InvitedTalk`,
        color: 'fuchsia',
        icon: <LightbulbRoundedIcon sx={{ color: 'fuchsia', fontSize: '35px' }} />
    },
    {
        title: 'Research Guidance ',
        countModelName: 'PhdAwardedCount',
        url: `/dashboard/select-department/PhdAwarded`,
        color: 'rose',
        icon: <CardMembershipRoundedIcon sx={{ color: 'MediumVioletRed', fontSize: '35px' }} />
    },
    {
        title: 'Fellowships ',
        countModelName: 'FellowshipCount',
        url: `/dashboard/select-department/Fellowship`,
        color: 'maroon',
        icon: <AttachMoneyRoundedIcon sx={{ color: 'green', fontSize: '35px' }} />
    },

]


const Dashboard = () => {

    const newParam = { school: false }
    const { data } = useQuery([newParam.school, newParam],
        () => { return fetchSchoolData(newParam) })

    const [localData, setLocalData] = useState(null)

    useEffect(() => {
        setLocalData(JSON.parse(localStorage.getItem('dashboardData')) || null)
    }, [])

    useEffect(() => {
        console.log('Dashboard Data:', data?.data?.data)
    }, [data])


    useEffect(() => {

        if (data) {
            const filteredData = data?.data?.data
            delete filteredData['Alumni']
            delete filteredData['Student']
            filteredData['SchoolCount'] = 16
            localStorage.setItem('dashboardData', JSON.stringify(filteredData))
            setLocalData(filteredData)
        }

    }, [data])

    return (

        <div>



            {
                localData ? <div className='flex items-center justify-between flex-wrap gap-8'>
                    <DashboardCard data={localData} />
                </div> : <div className='flex items-center justify-between flex-wrap gap-8'>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                </div>
            }

        </div>
    )
}

export default Dashboard


const DashboardCard = ({ data }) => {
    const navigate = useNavigate()

    return (

        <>

            {
                dashboardCards.map((card, index) => {
                    return <div className={`p-3 flex-auto rounded-md cursor-pointer border border-[#d8d5d5] bg-[#f3eeee7a] duration-200 ease-in-out hover:bg-gray-50`} key={`dashboardCard-${index}`}
                        onClick={() => { card.url && navigate(card.url) }}>
                        <div className='w-full'>
                            <div className='flex items-start justify-start gap-2 flex-col'>
                                <div className='flex items-center justify-start gap-2'>{card.icon} <span className='text-xl md:text-3xl font-bold'>{data[card.countModelName] ? data[card.countModelName] : 0}</span></div>
                                <p className='text-center '>{card.title}</p>
                            </div>
                        </div>
                    </div>
                })
            }

        </>
    )
}
