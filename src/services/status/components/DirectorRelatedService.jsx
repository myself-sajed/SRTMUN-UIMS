import React, { useEffect } from 'react'
import { getTotalAAAData } from '../../director/reports/academic-audit/components/audit-services'
import { getTotalDirectorAQARData } from '../../director/reports/aqar/js/getAQARData'
import { useState } from 'react'
import { academicYearGenerator } from '../../../inputs/Year'
import UserLoading from '../../../pages/UserLoading'

const DirectorRelatedService = ({ year, serviceName, school }) => {

    const [serviceDataFromServer, setServiceDataFromServer] = useState(null)
    const [candidates, setCandidates] = useState({})

    const [loading, setLoading] = useState(false)

    const serviceInfo = {
        'AAA': { accessor: 'AAAData', year: 'auditYear' },
        'Director AQAR': { accessor: 'aqarData', year: 'aqarYear' },
    }



    useEffect(() => {
        setServiceDataFromServer(null)
        setCandidates(null)
        setLoading(true)

        if (serviceName === 'AAA') {
            getTotalAAAData(setServiceDataFromServer, setLoading, () => { });
        } else if (serviceName === 'Director AQAR') {
            getTotalDirectorAQARData(setServiceDataFromServer, setLoading, () => { });
        }
    }, [year, serviceName])

    useEffect(() => {
        setCandidates(null)
        const myArr = []
        if (serviceDataFromServer?.length > 0) {
            serviceDataFromServer.forEach((serviceItem) => {
                serviceItem?.[serviceInfo[serviceName]?.accessor]?.map((newData) => {
                    if (serviceItem.schoolName === school) {
                        myArr.push(JSON.parse(newData)?.[serviceInfo[serviceName]?.year])
                    }
                })
            })
        }
        setCandidates(() => myArr)
    }, [serviceDataFromServer, year, serviceName, school])

    return (
        <div>
            {
                !loading ? <div>
                    {
                        candidates && <div>
                            <p className='my-2 bg-[#f5f5f5] border text-black p-2 rounded-md'><b>{school}</b> filled <b>{candidates?.length ? candidates?.length : 0}</b> years of {serviceName} data as shown below</p>

                            <div className="mt-2">
                                <ul class="list-group list-group-flush">
                                    {
                                        academicYearGenerator(5)?.map((yearItem, index) => {
                                            return <li className='flex items-center justify-start gap-5 list-group-item'>
                                                <span> {index + 1}. <b className='ml-3'>{yearItem}</b></span>
                                                {
                                                    candidates?.length > 0 && candidates?.includes(yearItem) ? <span class="badge bg-success">Filled</span> : <span class="badge bg-danger">Not filled</span>
                                                }

                                            </li>
                                        })
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
