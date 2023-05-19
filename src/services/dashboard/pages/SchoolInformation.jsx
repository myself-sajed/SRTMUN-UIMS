import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import { useNavigate, useParams } from 'react-router-dom'
import title from '../../../js/title'
import ServiceDashboard from './ServiceDashboard'
import fetchData, { fetchSchoolData } from '../js/fetchData'
import { useQuery } from 'react-query'
import { dashboardObj } from '../../../templates/faculty/cas-report/Header'
import { AllFacultyTable } from './AllFaculties'
import { Avatar } from '@mui/material'
import fetchEvents from '../../photogallery/js/fetchEvents'
import serverLinks from '../../../js/serverLinks'


const SchoolInformation = () => {
    const { schoolName } = useParams()
    title(`${schoolName} Details`)
    const navigate = useNavigate()

    const [animate, setAnimate] = useState(false);

    // school data for count
    const newParam = { school: schoolName }
    const { data: schoolData, isLoading: isLoadingSchoolData, } = useQuery([newParam.school, newParam],
        () => { return fetchSchoolData(newParam) })

    // faculties data
    const param = { model: 'User', filter: { department: schoolName } }
    const { data, isLoading } = useQuery([param.model, param], () => fetchData(param))

    // events data
    let eventParams = { filter: {} }
    const { data: eventData, loading: eventLoading } = useQuery([eventParams, eventParams.filter], () => fetchEvents(eventParams))


    useEffect(() => {
        setAnimate(true);
        // window.scrollTo(0, 138);
    }, []);



    return (
        <div>
            <GoBack pageTitle={`Details about ${schoolName}`} />

            {/* Tabs */}
            <div className="my-3 flex items-center gap-4 justify-center">
                <p onClick={() => { document.getElementById('dashboard-count-school-info').scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">Dashboard Count</p>
                <p onClick={() => { document.getElementById("faculty-info-page").scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">Faculties</p>
                <p onClick={() => { document.getElementById("events-info-page").scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">School Events</p>
                <p onClick={() => { document.getElementById("student-alumni-info-page").scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:bg-slate-50 p-1 rounded-md bg-slate-100 text-sm border cursor-pointer">Students & Alumni</p>
            </div>

            {/* Hero BG */}
            <div className={`relative h-[70vh] bg-cover bg-center flex items-center justify-center 
                transition duration-1000 ease-in-out rounded-md
                ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                style={{
                    backgroundImage:
                        `url(${`'${serverLinks.showFile(`${schoolName}.jpg`, 'school')}'`})`,
                    // backgroundImage: `url(${imageUrl})`,
                    // filter: 'brightness(0.8) contrast(1.2)',
                }}
            >
                <div className="absolute bottom-0 text-center left-0 w-full p-4 text-white">
                    <h1 className="text-4xl font-bold">{schoolName}</h1>
                    <p>The school where technology and education meet for an easier learning experience</p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute inset-0 bg-[#00000038] rounded-md"></div>
                </div>
            </div>



            {/* Dashboard */}
            <div className='flex gap-2'>
                <div className='my-4 bg-slate-100 rounded-md p-3 border flex-auto' id="dashboard-count-school-info">
                    <p className='mb-3 font-semibold text-lg'>School Publications, Talks, Awards etc.</p>
                    <div >
                        <ServiceDashboard data={schoolData} iconDataObj={dashboardObj['faculty']} isLoading={isLoadingSchoolData} showHeading={false} detailsPage={true} />
                    </div>
                </div>
                <div className='my-4 bg-slate-100 rounded-md p-3 border flex-auto'>
                    <p className='mb-3 font-semibold text-lg'>School Events</p>
                    <div >
                        {eventData?.data?.data?.map((event, index) => {
                            return <div onClick={() => navigate(`/event/${event._id}`)}>
                                <p className='text-blue-700 bg-blue-100 my-1 p-1 rounded-md text-sm cursor-pointer hover:bg-blue-200'>{index + 1}.  {event.eventTitle}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className='my-4 bg-slate-100 rounded-md p-3 border' id="faculty-info-page">
                <p className='mb-3 font-semibold text-lg'>School Faculty Information</p>
                <div>
                    <AllFacultyTable data={data} isLoading={isLoading} />
                </div>
            </div>


        </div >
    )
}

export default SchoolInformation