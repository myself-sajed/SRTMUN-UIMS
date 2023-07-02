import React from 'react'
import UserLoading from '../../../pages/UserLoading'
import { getTotalCASData } from '../../faculty/reports/cas/CASServices'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTotalPBASData } from '../../faculty/reports/pbas/PBASServices'
import { getTotalFacultyAQARData } from '../../director/reports/aqar/js/getAQARData'
import { getReportInfo } from '../../../js/submitReportForm'
import designationWiseSorting from '../../../js/designationWiseSorting'

const FacultyRelatedService = ({ teachers, teacherLoading, serviceName, year, school }) => {


    const [serviceDataFromServer, setServiceDataFromServer] = useState(null)
    const [candidates, setCandidates] = useState([])
    const [serviceLoading, setServiceLoading] = useState(false)


    useEffect(() => {
        setCandidates(null)
        setServiceDataFromServer(null)

        if (serviceName === 'CAS') {
            getReportInfo('CASModel', setServiceDataFromServer, setServiceLoading)
        } else if (serviceName === 'PBAS') {
            getReportInfo('PBASModel', setServiceDataFromServer, setServiceLoading)
        } else if (serviceName === 'Faculty AQAR') {
            getReportInfo('FacultyAQARModel', setServiceDataFromServer, setServiceLoading)
        }
    }, [serviceName])

    useEffect(() => {
        setCandidates(null)

        if (teachers?.data?.data?.length > 0) {
            console.log('inside teachers')
            let candidatesArray = []
            teachers?.data?.data?.forEach((teacher) => {
                serviceDataFromServer?.forEach((serviceItem) => {
                    if (serviceItem.userId?._id === teacher._id) {
                        let hasSubmitted = serviceItem?.submitted ? serviceItem?.submitted.includes(year) : false

                        if (hasSubmitted) {
                            candidatesArray.push(teacher._id)
                        }

                    }
                })
            })

            setCandidates(() => candidatesArray)



        }

    }, [serviceDataFromServer, year, serviceName, teachers])


    return (
        <div>
            <div>

                {teachers?.data?.data && <p className='my-2 bg-[#f5f5f5] border text-black p-2 rounded-md'><b>{candidates?.length ? candidates.length : 0}</b> Teachers out of <b>{teachers?.data?.data?.length}</b> filled {serviceName} form for year <b>{year}</b> </p>}

                <div>
                    {(teacherLoading || serviceLoading) && <UserLoading title="Loading Data" />}
                    <ul class="list-group list-group-flush">

                        {
                            teachers?.data?.data && designationWiseSorting(teachers?.data?.data).map((teacher, index) => {
                                return <li className='flex items-center justify-between list-group-item'>
                                    <span> {index + 1}. {teacher?.salutation} {teacher?.name}</span>
                                    {
                                        candidates?.includes(teacher?._id) ? <span class="badge bg-success">Submitted</span> : <span class="badge bg-danger">Not Submitted</span>
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
