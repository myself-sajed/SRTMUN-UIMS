import React from 'react'
import UserLoading from '../../../pages/UserLoading'
import { getTotalCASData } from '../../faculty/reports/cas/CASServices'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTotalPBASData } from '../../faculty/reports/pbas/PBASServices'
import { getTotalFacultyAQARData } from '../../director/reports/aqar/js/getAQARData'

const FacultyRelatedService = ({ teachers, teacherLoading, serviceName, year, school }) => {


    const [serviceDataFromServer, setServiceDataFromServer] = useState(null)
    const [candidates, setCandidates] = useState([])
    const [count, setCount] = useState({ [school]: 0 })


    const serviceInfo = {
        'CAS': { accessor: 'casData', year: 'casYear' },
        'PBAS': { accessor: 'casData', year: 'casYear' },
        'Faculty AQAR': { accessor: 'aqarData', year: 'aqarYear' },
    }


    useEffect(() => {
        setCandidates(null)
        setServiceDataFromServer(null)
        setCount(null)

        if (serviceName === 'CAS') {
            getTotalCASData(setServiceDataFromServer, () => { });
        } else if (serviceName === 'PBAS') {
            getTotalPBASData(setServiceDataFromServer, () => { });
        } else if (serviceName === 'Faculty AQAR') {
            getTotalFacultyAQARData(setServiceDataFromServer, () => { });
        }
    }, [year, serviceName])

    useEffect(() => {
        setCount(null)
        setCandidates(null)

        if (serviceDataFromServer?.length > 0) {
            serviceDataFromServer.forEach((serviceItem) => {
                serviceItem?.[serviceInfo[serviceName]?.accessor]?.forEach((newData) => {
                    if (JSON.parse(newData)?.[serviceInfo[serviceName]?.year] === year) {
                        setCandidates((prev) => {
                            if (prev?.length > 0) {
                                let arr = [...new Set([...prev, serviceItem?.userId?._id])]
                                return arr
                            } else {
                                return [serviceItem?.userId?._id]
                            }
                        })

                        setCount((prev) => {
                            return {
                                ...prev, [serviceItem?.userId?.department]: prev?.[serviceItem?.userId?.department] ? prev?.[serviceItem?.userId?.department] + 1 : 1
                            }
                        })
                    }
                })
            })
        }
    }, [serviceDataFromServer, year, serviceName])


    return (
        <div>
            <div>

                {teachers?.data?.data && <p className='my-2 bg-[#f5f5f5] border text-black p-2 rounded-md'><b>{count?.[school] ? count?.[school] : 0}</b> Teachers out of <b>{teachers?.data?.data?.length}</b> filled {serviceName} form for year <b>{year}</b> </p>}

                <div>
                    {teacherLoading && <UserLoading title="Loading CAS Data" />}
                    <ul class="list-group list-group-flush">

                        {
                            teachers?.data?.data && teachers?.data?.data?.map((teacher, index) => {
                                return <li className='flex items-center justify-between list-group-item'>
                                    <span> {index + 1}. {teacher?.salutation} {teacher?.name}</span>
                                    {
                                        candidates?.includes(teacher?._id) ? <span class="badge bg-success">Filled</span> : <span class="badge bg-danger">Not filled</span>
                                    }
                                </li>
                            })
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default FacultyRelatedService
