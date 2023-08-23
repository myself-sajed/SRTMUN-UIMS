import React from 'react'
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import siteLinks from '../../../components/siteLinks';
import { useNavigate } from 'react-router-dom';

const PriorityServices = ({ localData }) => {

    const navigate = useNavigate()


    const services = [
        {
            title: 'Teachers',
            phrase: "Login, Data, CAS, PBAS & AQAR",
            countModelName: 'usersCount',
            color: 'cyan',
            buttonTitle: "Login as Teacher",
            url: siteLinks.facultyLogin.link,
            icon: <GroupsRoundedIcon sx={{ color: 'green', fontSize: '42px' }} />
        },
        {
            title: 'Students',
            phrase: "University Student Information",
            countModelName: 'StudentCount',
            color: 'orange',
            buttonTitle: "Student Information",
            url: `/dashboard/select-department/students`,
            icon: <GroupRoundedIcon sx={{ color: 'orange', fontSize: '42px' }} />
        },
        {
            title: 'Alumni Connected',
            phrase: "Placements, Status & Contributions",
            countModelName: 'AlumniCount',
            color: 'cyan',
            buttonTitle: "Alumni Information",
            url: `/dashboard/select-department/alumni`,
            icon: <Diversity3RoundedIcon sx={{ color: 'red', fontSize: '38px' }} />
        },
    ]

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 justify-between'>
            {
                services.map((service, index) => {
                    return <div key={index} className="relative flex-auto w-full md:max-w-md h-full md:h-auto">
                        <div className="text-center bg-[#fff6] w-full rounded-lg border md:pb-0 pb-3 border-[#d8d5d5] dark:bg-gray-800 sm:p-5">
                            <div className='mb-4'>
                                <div className="w-12 h-12 rounded-full  p-2 flex items-center justify-center mx-auto">
                                    {service.icon}
                                </div>
                                <div className='rounded-md p-2 mb-3'>
                                    <p className="text-lg font-semibold text-gray-900"> <b className='text-xl'>{localData?.[service.countModelName] ? localData?.[service.countModelName] : 0}</b> {service.title} </p>
                                    <p className='text-sm text-muted'>{service.phrase}</p>
                                </div>
                            </div>
                            <button onClick={() => { navigate(service.url) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {service.buttonTitle}
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default PriorityServices
