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
        }
    }


    const param = { model: serviceMap[serviceName].model, select: serviceMap[serviceName].select }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => countData(param))


    useEffect(() => {
        console.log('Data from users model', data?.data?.data)
    }, [data])



    return (
        <div>
            <GoBack backUrl="/" pageTitle="Choose Department or School" />

            <div>

                <div className='lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid gap-4 my-4'>
                    {Object.keys(SchoolsProgram).map((keyName, i) => (
                        <div className="border rounded-md p-2 duration-200 ease-in-out cursor-pointer bg-[#ffe6e5] hover:bg-[#f7d8d6]" onClick={() => {
                            navigate(serviceName === 'info' ? `/dashboard/${keyName}` :
                                `/dashboard/${keyName}/${serviceName}`)
                        }}>
                            <div>
                                <div className='flex items-start justify-start gap-2'>
                                    <div>{serviceMap[serviceName].icon}</div>
                                    <div className='flex flex-col justify-start '>
                                        <p className='font-medium text-[#fc4829]'>{keyName.replace('School of', '')}</p>
                                        {
                                            data?.data?.data && <p className='text-muted'>{(data?.data?.data.filter((el) => el[serviceMap[serviceName].select] === keyName)).length} {(data?.data?.data.filter((el) => el[serviceMap[serviceName].select] === keyName)).length === 1 ? serviceMap[serviceName].fieldName[0] : serviceMap[serviceName].fieldName[1]}</p>
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