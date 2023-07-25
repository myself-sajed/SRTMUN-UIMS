import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import fetchData, { fetchSchoolData } from '../js/fetchData'
import UserLoading from '../../../pages/UserLoading'
import { dashboardObj } from '../../../templates/faculty/cas-report/Header'
import { useState } from 'react'
import EmptyBox from '../../../components/EmptyBox'
import ServiceDashboard, { ServiceDashboardHeading } from './ServiceDashboard'
import serverLinks from '../../../js/serverLinks'
import title from '../../../js/title'
import { Avatar } from '@mui/material'
import ShowImage from './ShowImage'
import designationWiseSorting from '../../../js/designationWiseSorting'

const AllFaculties = ({ school: sch }) => {

    const { school } = useParams()
    const [isAnalytics, setIsAnalytics] = useState(true)
    const param = { model: 'User', filter: { department: school || sch } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => fetchData(param))

    const newParam = { school: school || sch }
    const { data: schoolData, isLoading: isLoadingSchoolData, isError: isErrorOccured, } = useQuery([newParam.school || sch, newParam],
        () => { return fetchSchoolData(newParam) })
    const navigate = useNavigate()
    // title(`About ${school}`)


    useEffect(() => {
        // console.log('SchoolData :', schoolData)
        let emptyCount = 0
        dashboardObj['faculty'].forEach((item) => {
            schoolData?.data?.data?.[item.model]?.length === 0 && emptyCount++;
        })

        if (emptyCount === dashboardObj['faculty']?.length) {
            setIsAnalytics(false)
        }

    }, [schoolData])

    return (
        <div>
            {sch ? <div className="sticky-top bg-white text-[19px] font-bold pt-2 flex justify-center">
                {`Faculties of ${sch}`}
            </div> : <div className="sticky-top bg-white">
                <GoBack backUrl={-1} pageTitle={`Faculties of ${school}`} />
            </div>}

            <div>

                <div className='mt-5'>
                    <AllFacultyTable data={data} isLoading={isLoading} />
                </div>
            </div>

        </div>
    )
}

export default AllFaculties

const AllFacultyTable = ({ data, isLoading }) => {

    const navigate = useNavigate()

    return <div className='table-responsive w-full'>
        <table class="table table-bordered css-serial">
            <thead className='bg-blue-600 text-white'>
                <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Faculty Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Field of Specialization</th>

                </tr>
            </thead>
            <tbody>

                {
                    designationWiseSorting(data?.data?.data).map((item) => {
                        return <tr>
                            <td className='font-bold'></td>
                            <td className='min-w-32'><ShowImage fileName={item?.photoURL} serviceName={'faculty'} /></td>

                            <td>
                                <div>
                                    <p>{item?.salutation} {item?.name}</p>
                                    <button className='p-2 my-2 text-sm rounded-md bg-blue-200 text-blue-800 hover:bg-blue-100' onClick={() => {
                                        const url = '/dashboard/faculty/' + (item ? item._id : '');
                                        window.open(url, '_blank');
                                    }}>View Profile</button>
                                </div>
                            </td>
                            <td>{item?.designation === 'Contractual' ? 'Assistant Professor (Contractual)' : item?.designation}</td>
                            <td>{item?.specialization}</td>
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
}


export { AllFacultyTable }