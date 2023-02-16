import React, { useEffect, useState } from 'react'
import LineAxisRoundedIcon from '@mui/icons-material/LineAxisRounded';
import DisplaySettingsRoundedIcon from '@mui/icons-material/DisplaySettingsRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import { useNavigate, useParams } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import adminTable from '../js/adminTable';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import DuoRoundedIcon from '@mui/icons-material/DuoRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CloudIcon from '@mui/icons-material/Cloud';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';



const AdminNavbar = () => {
    const [active, setActive] = useState(window.location.pathname)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setActive(window.location.pathname)
    }, [window.location.pathname])


    const logos = [
        <LineAxisRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <CardMembershipRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <WorkspacePremiumRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <AirlineSeatReclineNormalRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <CoPresentRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <TvRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <SentimentVerySatisfiedRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <ScienceRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <FindInPageRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <MenuBookRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <SchoolRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <EmojiEventsRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <CardMembershipRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <PersonSearchRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <AttachMoneyRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <DocumentScannerRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <ConnectWithoutContactRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <GroupRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <HeadsetMicRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <DuoRoundedIcon fontSize="small" className="text-blue-600 mr-2" />,
        <CloudIcon fontSize="small" className="text-blue-600 mr-2" />,

    ]

    return (

        <div className="flex items-start justify-start flex-col md:w-[21vw] lg:w-[18vw]">

            {console.log('active', active && active)}

            {
                adminTable.map((item, index) => {
                    return (

                        <div key={index} onClick={() => { setActive(`${item.path}`); navigate(`${item.path}`) }} className={`p-2 flex  md:w-[21vw] lg:w-[18vw] items-center gap-1 m-2 ${active === `${item.path}` ? 'bg-blue-200 rounded-full' : 'bg-blue-100 rounded-full text-blue-600'} cursor-pointer`}>
                            {logos[index]}
                            <p className={`${active === `${item.path}` ? 'text-blue-600' : null}`}>{item.title}</p>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default AdminNavbar