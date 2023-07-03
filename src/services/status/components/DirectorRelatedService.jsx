import React, { useEffect } from 'react'
import { getTotalAAAData } from '../../director/reports/academic-audit/components/audit-services'
import { getTotalDirectorAQARData } from '../../director/reports/aqar/js/getAQARData'
import { useState } from 'react'
import { academicYearGenerator } from '../../../inputs/Year'
import UserLoading from '../../../pages/UserLoading'
import { getReportInfo } from '../../../js/submitReportForm'

const DirectorRelatedService = ({ year, serviceName, school }) => {

    const [serviceDataFromServer, setServiceDataFromServer] = useState(null)
    const [candidates, setCandidates] = useState(null)

    const [serviceLoading, setServiceLoading] = useState(false)


    useEffect(() => {
        setCandidates(null)
        setServiceDataFromServer(null)

        if (serviceName === 'AAA') {
            getReportInfo('AAAModel', setServiceDataFromServer, setServiceLoading, 'director')
        } else if (serviceName === 'Director AQAR') {
            getReportInfo('DirectorAQARModel', setServiceDataFromServer, setServiceLoading, 'director')
        }
    }, [serviceName])

    useEffect(() => {
        setCandidates([])
        if (serviceDataFromServer?.length > 0) {
            serviceDataFromServer.forEach((serviceItem) => {
                if (serviceItem.schoolName === school) {
                    setCandidates(() => serviceItem?.submitted ? serviceItem.submitted : [])
                    return
                }
            })
        }
    }, [serviceDataFromServer, year, serviceName, school])

    useEffect(() => {
        console.log('serviceDataFromServer :', serviceDataFromServer, candidates)
    }, [serviceDataFromServer, candidates])

    return (
        <div>
            {
                !serviceLoading ? <div>
                    {
                        candidates && <div>
                            <p className='my-2 bg-[#f5f5f5] border text-black p-2 rounded-md'><b>{school}</b> submitted <b>{candidates?.length ? candidates?.length : 0}</b> years of {serviceName} data</p>

                            <div className="mt-2">
                                <ul class="list-group list-group-flush">

                                    {
                                        (candidates && candidates?.length > 0) ? candidates?.map((yearItem, index) => {
                                            return <li className='flex items-center justify-start gap-5 list-group-item'>
                                                <span> {index + 1}. <b className='ml-3'>{yearItem}</b></span>
                                                <span class="badge bg-success">Submitted</span>
                                            </li>
                                        }) : <div>
                                            <p className='py-3 text-red-600 text-center'>No {serviceName} data submitted yet. </p>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div> : <UserLoading title={`Fetching ${serviceName} Data`} />
            }
        </div>
    )
}

export default DirectorRelatedService
