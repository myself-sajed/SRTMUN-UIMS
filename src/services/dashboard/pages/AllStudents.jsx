import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import fetchData, { fetchSchoolData } from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading'
import { dashboardData } from '../../../templates/faculty/cas-report/Header'
import { useState } from 'react'
import EmptyBox from '../../../components/EmptyBox'
import ServiceDashboard from './ServiceDashboard'
import serverLinks from '../../../js/serverLinks'
import title from '../../../js/title'
import ShowImage from './ShowImage'
import SchoolsPrograms from '../../../components/SchoolsProgram'


const AllStudents = ({ showImage = false }) => {

    const { school } = useParams()
    title(`About Students of ${school}`)
    const param = { model: 'Student', filter: { schoolName: school } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => fetchData(param))
    const [studentData, setStudentData] = useState(null)
    const [activeProgram, setActiveProgram] = useState()

    useEffect(() => {
        setActiveProgram(SchoolsPrograms[school][0][0])
        setStudentData(data?.data?.data?.filter((item) => item.programGraduated === activeProgram))
    }, [school, data])

    useEffect(() => {
        if (school) {
            setStudentData(data?.data?.data?.filter((item) => item.programGraduated === activeProgram))
        }
    }, [activeProgram])

    return (
        <div>
            <div className="sticky-top bg-white">
                <GoBack backUrl={-1} pageTitle={`About Students of ${school}`} />
            </div>

            <div>

                <div>
                    <p className='text-sm text-muted text-center mt-4'>Programs offered by {school}</p>
                    <div className="table-responsive change__scrollbar p-3">
                        <table className='mx-auto'>
                            <div className='flex items-center justify-center gap-3'>
                                {SchoolsPrograms[school].map((item) => {
                                    return <div className={`rounded-md border p-2 cursor-pointer ${activeProgram === item[0] ? 'bg-blue-600 text-white' : 'bg-blue-100'} w-[100px] md:w-[250px] hover:shadow-md duration-200 ease-in-out md:text-base text-sm`}
                                        onClick={() => { setActiveProgram(item[0]) }}> <p>{item[0].length > 28
                                            ? item[0].slice(0, 35) + "..."
                                            : item[0]}</p>

                                        <div className='text-xs'>

                                            <div className='flex items-center justify-start gap-2 mt-3'>
                                                <p>Male: <span className='font-semibold'>{data?.data?.data.filter((students) => students.programGraduated === item[0] && students.gender === 'Male')?.length}</span></p>

                                                <p>Female: <span className='font-semibold'>{data?.data?.data.filter((students) => students.programGraduated === item[0] && students.gender === 'Female')?.length}</span></p>
                                            </div>


                                            <p>Total: <span className='font-semibold'>{data?.data?.data.filter((students) => students.programGraduated === item[0])?.length}</span></p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </table>

                    </div>
                </div>


                <div className='mt-5'>
                    <p className='text-sm text-muted text-center mt-4 mb-3'>Students enrolled in {activeProgram}</p>

                    <div className='table-responsive'>
                        <table class="table table-bordered css-serial">
                            <thead className='bg-blue-600 text-white'>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    {
                                        showImage && <th scope="col">Photo</th>
                                    }
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Enrolled Program</th>
                                    <th scope="col">Current Year</th>


                                </tr>
                            </thead>
                            <tbody>


                                {
                                    studentData?.map((item) => {
                                        return <tr>
                                            <td className='font-bold'></td>
                                            {
                                                showImage && <td className='min-w-32'><ShowImage fileName={item?.photoURL} serviceName={'student'} /></td>
                                            }
                                            <td>{item?.name}</td>
                                            <td>{item?.gender}</td>
                                            <td>{item?.programGraduated}</td>
                                            <td>{item.currentIn ? item.currentIn : 'Not Added'}</td>
                                        </tr>
                                    })
                                }




                            </tbody>
                        </table>
                        {isLoading && <UserLoading title="Fetching data" />}

                        {
                            studentData?.length === 0 && <EmptyBox />
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllStudents