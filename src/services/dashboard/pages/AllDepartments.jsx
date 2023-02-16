import { IconButton } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useQuery } from 'react-query';
import refresh from '../../faculty/js/refresh';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GoBack from '../../../components/GoBack';
import title from '../../../js/title';
import { countData } from '../js/fetchData';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import SchoolsProgram from '../../../components/SchoolsProgram';

const AllDepartments = () => {

    title("University Schools / Departments")
    const navigate = useNavigate()
    const { serviceName } = useParams()

    const serviceMap = {
        info: {
            model: 'User',
            select: 'department',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Faculty', 'Faculties']
        },
        students: {
            model: 'Student',
            select: 'schoolName',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Student', 'Students']
        },
        alumni: {
            model: 'Alumni',
            select: 'schoolName',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Alumnus/Alumna', 'Alumni']
        },
        BookAndChapter: {
            model: 'BookAndChapter',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Book And Chapter', 'Book And Chapters'],
            title: 'Books & Chapters'
        },
        ResearchPaper: {
            model: 'ResearchPaper',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Research Paper', 'Research Paper'],
            title: 'Research Papers'
        },
        ResearchProject: {
            model: 'ResearchProject',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Research Projects', 'Research Project'],
            title: 'Research Projects'
        },
        EContentDeveloped: {
            model: 'EContentDeveloped',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['E-content', 'E-contents'],
            title: 'E-content Developed'
        },
        Patent: {
            model: 'Patent',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Patent Published', 'Patents Published'],
            title: 'Patents Published'
        },
        ConferenceOrganized: {
            model: 'ConferenceOrganized',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Conference Organized', 'Conference Organized'],
            title: 'Conference Organized'
        },
        InvitedTalk: {
            model: 'InvitedTalk',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Invited Talk', 'Invited Talks'],
            title: 'Total Invited Talks'
        },
        PhdAwarded: {
            model: 'PhdAwarded',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Research Guidance', 'Research Guidance'],
            title: 'Research Guidance'
        },
        Fellowship: {
            model: 'Fellowship',
            select: 'department',
            type: 'faculty',
            icon: <MapsHomeWorkRoundedIcon sx={{ color: '#fc4829' }} />,
            fieldName: ['Fellowship', 'Fellowships'],
            title: 'Fellowships'
        },
    }


    const param = { model: serviceMap[serviceName].model, select: serviceMap[serviceName].select, type: serviceMap[serviceName]?.type ? serviceMap[serviceName].type : null }
    const { data } = useQuery([param.model, param], () => countData(param))



    return (
        <div>
            <GoBack backUrl="/" pageTitle="Choose Department or School" />

            <div>

                <div className='lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid gap-4 my-4'>
                    {Object.keys(SchoolsProgram).map((nameOfTheSchool, i) => (
                        <div className="border rounded-md p-2 duration-200 ease-in-out cursor-pointer bg-[#ffe6e5] hover:bg-[#f7d8d6]" onClick={() => {
                            navigate(serviceName === 'info' ? `/dashboard/${nameOfTheSchool}` :
                                serviceMap[serviceName].type === 'faculty' ? `/dashboard/information/${nameOfTheSchool}/${serviceName}/${serviceMap[serviceName].title}` : `/dashboard/${nameOfTheSchool}/${serviceName}`)
                        }}>
                            <div>
                                <div className='flex items-start justify-start gap-2'>
                                    <div>{serviceMap[serviceName].icon}</div>
                                    <div className='flex flex-col justify-start '>
                                        <p className='font-medium text-[#fc4829]'>{nameOfTheSchool.replace('School of', '')}</p>
                                        {
                                            (serviceMap[serviceName]?.type !== 'faculty' && data?.data?.data) ? <p className='text-muted'>

                                                {(data?.data?.data.filter((el) => el[serviceMap[serviceName].select] === nameOfTheSchool)).length} {(data?.data?.data.filter((el) => el[serviceMap[serviceName].select] === nameOfTheSchool)).length === 1 ? serviceMap[serviceName].fieldName[0] : serviceMap[serviceName].fieldName[1]
                                                }</p>

                                                :
                                                <p className='text-muted'>

                                                    {data?.data?.data.filter((el) => el.userId?.department === nameOfTheSchool).length} {
                                                        data?.data?.data.filter((el) => el.userId?.department === nameOfTheSchool).length === 1 ? serviceMap[serviceName].fieldName[0] : serviceMap[serviceName].fieldName[1]
                                                    }

                                                </p>
                                        }
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default AllDepartments