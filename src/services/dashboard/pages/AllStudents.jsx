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

const AllStudents = () => {

    const { school } = useParams()
    const param = { model: 'Student', filter: { schoolName: school } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => fetchData(param))

    title(`About Students of ${school}`)


    return (
        <div>
            <div className="sticky-top bg-white">
                <GoBack backUrl={-1} pageTitle={`About Students of ${school}`} />
            </div>

            <div>


                <div className='mt-5'>

                    <div className='table-responsive'>
                        <table class="table table-bordered css-serial">
                            <thead className='bg-blue-600 text-white'>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    {/* <th scope="col">Photo</th> */}
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Enrolled Program</th>
                                    <th scope="col">Current Year</th>



                                </tr>
                            </thead>
                            <tbody>


                                {
                                    data?.data?.data?.map((item) => {
                                        return <tr>
                                            <td className='font-bold'></td>
                                            {/* <td><ShowImage fileName={item?.photoURL} serviceName={'student'} /></td> */}
                                            <td>
                                                <div className='flex items-start justify-start gap-5'>
                                                    <div>
                                                        <p>{item?.name}</p>
                                                    </div>
                                                </div>
                                            </td>
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
                            data?.data?.data?.length === 0 && <EmptyBox />
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllStudents