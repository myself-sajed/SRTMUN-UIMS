import React, { useEffect } from 'react'
import PlagiarismRoundedIcon from '@mui/icons-material/PlagiarismRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import LaptopChromebookRoundedIcon from '@mui/icons-material/LaptopChromebookRounded';
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import serverLinks from '../../../js/serverLinks';

// director icons

import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import DuoRoundedIcon from '@mui/icons-material/DuoRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const dashboardObj = {
    faculty: [
        { id: 1, title: 'Research Projects', model: 'ResearchProject', icon: <ScienceRoundedIcon /> },
        { id: 2, title: 'Research Papers', model: 'ResearchPaper', icon: <PlagiarismRoundedIcon /> },
        { id: 3, title: 'Invited Talks', model: 'InvitedTalk', icon: <HeadsetMicRoundedIcon /> },
        { id: 4, title: 'Seminars organized', model: 'ConferenceOrganized', icon: <LaptopChromebookRoundedIcon /> },
        { id: 5, title: 'Research Guidance', model: 'ResearchGuidance', icon: <AssistantDirectionRoundedIcon /> },
        { id: 6, title: 'ICT Created', model: 'EContentDeveloped', icon: <LanguageRoundedIcon /> },
        { id: 7, title: 'Books & Chapters', model: 'BookAndChapter', icon: <MenuBookRoundedIcon /> },
        { id: 8, title: 'Ph.D. Awarded', model: 'PhdAwarded', icon: <CardMembershipRoundedIcon /> },
        { id: 9, title: 'Patents', model: 'Patent', icon: <DocumentScannerRoundedIcon /> },
        { id: 10, title: 'Orientation / FDP', model: 'Online', icon: <RecordVoiceOverRoundedIcon /> },
        { id: 11, title: 'Administrative Responsibilities', model: 'Responsibilities', icon: <ManageAccountsIcon /> },
    ],
    director: [
        { id: 1, title: 'Exams Qualified', model: 'QualifiedExams', icon: <HowToRegRoundedIcon /> },
        { id: 2, title: 'Placements', model: 'Placement', icon: <WorkRoundedIcon /> },
        { id: 3, title: 'Awards', model: 'Award', icon: <EmojiEventsRoundedIcon /> },
        { id: 4, title: 'Total Alumni', model: 'Alumni', icon: <PeopleRoundedIcon /> },
        { id: 5, title: 'Alumni Contributed', model: 'AlumniContribution', icon: <AccountBalanceWalletRoundedIcon /> },
        { id: 6, title: 'Students', model: 'Student', icon: <GroupsRoundedIcon /> },
        { id: 7, title: 'Professional Development / Administrative Training Programs Organized', model: 'TrainingProgramsOrganized', icon: <TrendingUpRoundedIcon /> },
        { id: 8, title: 'Conferences / Seminar / Workshop Organized', model: 'ConferencesSemiWorkshopOrganized', icon: <DuoRoundedIcon /> },
        { id: 9, title: 'Progression to Higher Education', model: 'ProgressionToHE', icon: <SchoolRoundedIcon /> },
    ]
}

const Header = ({ user, title, subTitle, directorData, otherOptions = false, userType }) => {

    return (
        <div className='font-sans mx-auto mt-16'>

            <div className='text-center bg-[#009879] text-white p-2 mt-3 rounded-md'>
                <p className='lg:text-2xl text-base'><strong>{title}</strong></p>
                <p className='text-sm mt-2'>{subTitle}</p>
            </div>

            <div className='mt-12'>

                <div className='md:flex-row items-start justify-around gap-4 flex-col flex'>
                    <div className='md:w-[80%] w-full bg-green-50 p-2 border border-green-100 rounded-md hover:bg-green-100 '>

                        {
                            otherOptions ? otherOptions.Photo ? <img src={serverLinks.showFile(user?.photoURL, userType)} className="w-32 h-32 object-cover rounded-full mx-auto border-2 p-1 border-[#009879]" alt={`${user.salutation} ${user.name}`} draggable={false} /> : null : <img src={serverLinks.showFile(user?.photoURL, userType)} className="w-32 h-32 object-cover rounded-full mx-auto border-2 p-1 border-[#009879]" alt={`${user.salutation} ${user.name}`} draggable={false} />
                        }

                        <div className="my-3">
                            <p className='lg:text-2xl text-xl text-center text-[#009879] font-semibold'>{`${user.salutation} ${user.name}`}</p>

                            <div className="mt-1 text-center lg:text-sm text-xs">
                                <p className='text-base'>{user.designation}</p>
                                <p className='text-gray-800 mt-2'>{user.department}</p>
                                <p className='text-gray-800'>SRTM University, Vishnupuri, Nanded - 431 606</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ShowDashboard directorData={directorData && directorData}
                            dashboardObj={dashboardObj[userType]} />
                    </div>
                </div>



                {
                    otherOptions ? otherOptions.PersonalInfo ?
                        <div className="my-5 mx-auto">
                            <div className="bg-white border overflow-hidden sm:rounded-lg">

                                <div className="px-4 py-2 sm:px-6 bg-[#009879]">
                                    <h3 className="sm:text-lg text-base leading-6 font-medium text-white">Applicant Information</h3>
                                    <p className="max-w-2xl text-sm text-white">Personal details and application.</p>
                                </div>

                                <div className="border-t border-gray-200 sm:flex items-start justify-between flex-wrap">
                                    <DetailTile sr="Name" value={`${user.salutation} ${user.name}`} />
                                    <DetailTile sr="School" value={user.department} />
                                    <DetailTile sr="Current Designation" value={user.designation} />
                                    <DetailTile sr="Date of Last Promotion" value={user.promotionDate} />
                                    <DetailTile sr="Grade Pay" value={user.gradePay} />
                                    <DetailTile sr="Address of Correspondence" value={`${user.department}, Swami Ramanand Teerth Marathwada University, Vishnupuri, Nanded-431 606`} />
                                    <DetailTile sr="Email" value={user?.email} />
                                    <DetailTile sr="Permanent Address" value={user.email} />
                                    <DetailTile sr="Mobile Number" value={user.mobile} />
                                    <DetailTile sr="Date of Birth" value={user?.dob} />
                                </div>
                            </div>
                        </div> : null : <div className="my-5 mx-auto">
                        <div className="bg-white border overflow-hidden sm:rounded-lg">

                            <div className="px-4 py-2 sm:px-6 bg-[#009879]">
                                <h3 className="sm:text-lg text-base leading-6 font-medium text-white">Applicant Information</h3>
                                <p className="max-w-2xl text-sm text-white">Personal details and application.</p>
                            </div>

                            <div className="border-t border-gray-200 sm:flex items-start justify-between flex-wrap">
                                <DetailTile sr="Name" value={`${user.salutation} ${user.name}`} />
                                <DetailTile sr="School" value={user.department} />
                                <DetailTile sr="Current Designation" value={user.designation} />
                                <DetailTile sr="Date of Last Promotion" value={user.promotionDate} />
                                <DetailTile sr="Grade Pay" value={user.gradePay} />
                                <DetailTile sr="Address of Correspondence" value={`${user.department}, Swami Ramanand Teerth Marathwada University, Vishnupuri, Nanded-431 606`} />
                                <DetailTile sr="Email" value={user?.email} />
                                <DetailTile sr="Permanent Address" value={user?.address} />
                                <DetailTile sr="Mobile Number" value={user.mobile} />
                                <DetailTile sr="Date of Birth" value={user?.dob} />
                            </div>
                        </div>
                    </div>
                }


            </div>
        </div>

    )
}

export default Header



const DetailTile = ({ sr, value }) => {


    return (

        value && <div className="px-4 py-3 sm:w-5/12 border-b sm:border-b-0">
            <dt className="text-sm font-medium text-gray-500">{sr}</dt>
            <dd className="mt-1 sm:text-base text-black text-sm">{value ? value : 'N/A'}</dd>
        </div>
    )
}

export { dashboardObj }


const ShowDashboard = ({ directorData, dashboardObj, color = "[#009879]", bgColor = "green" }) => {
    return <div className='flex items-center justify-between gap-3 flex-wrap'>
        {
            directorData && dashboardObj.map((item, index) => {
                return directorData?.[item.model]?.length > 0 && <div key={index} className={`bg-${bgColor}-50 p-2 border border-green-100 rounded-md flex-auto hover:bg-${bgColor}-100`}>
                    <div className={`flex items-center justify-start gap-2 ${color.includes('#') ? `text-${color}` : `text-${color}-800`}`}>
                        {item.icon} <span className='font-bold text-xl'>{directorData?.[item.model]?.length}</span>
                    </div>
                    <p className='md:text-base text-sm'>{item.title}</p>
                </div>
            })
        }
    </div>
}

export { ShowDashboard }