import React from 'react'
import UserLoading from '../../../pages/UserLoading'
import { generateCASReport, getTotalCASData } from '../../faculty/reports/cas/CASServices'
import { useState } from 'react'
import { useEffect } from 'react'
import { generatePBASReport, getTotalPBASData } from '../../faculty/reports/pbas/PBASServices'
import { getTotalFacultyAQARData } from '../../director/reports/aqar/js/getAQARData'
import { getReportInfo } from '../../../js/submitReportForm'
import designationWiseSorting from '../../../js/designationWiseSorting'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { LinearProgress } from '@mui/material'
import ReportLoading from '../../../components/ReportLoading'
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';

const FacultyRelatedService = ({ teachers, teacherLoading, serviceName, year, school }) => {


    const [serviceDataFromServer, setServiceDataFromServer] = useState(null)
    const [candidates, setCandidates] = useState([])
    const [serviceLoading, setServiceLoading] = useState(false)
    const [reportLoading, setReportLoading] = useState(false)


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

    const generateReport = (id) => {
        if (serviceName === "PBAS") {
            let userData = { _id: id }
            setReportLoading({ isLoading: true, title: 'Generating PBAS Report' });
            generatePBASReport(userData, [year], setReportLoading, false)
        } else if (serviceName === "CAS") {
            let userData = { _id: id }
            setReportLoading({ isLoading: true, title: 'Generating CAS Report' });
            generateCASReport(userData, [year], setReportLoading, false)
        }
    }

    const browseReport = (id) => {
        if (serviceName === "PBAS") {
            let link = `${process.env.REACT_APP_REPORT_URL}/report/PBASReport/${id}/${JSON.stringify([year])}/false`
            window.open(link, '_blank')
        } else if (serviceName === "CAS") {
            let link = `${process.env.REACT_APP_REPORT_URL}/report/CASReport/${id}/${JSON.stringify([year])}/false`
            window.open(link, '_blank')
        }
    }


    return (
        <div>
            <div>

                {(reportLoading && reportLoading.title.includes(serviceName)) && <div className="my-2">
                    <ReportLoading loading={reportLoading} />
                </div>}

                {teachers?.data?.data && <p className='my-2 bg-[#f5f5f5] border text-black p-2 rounded-md'><b>{candidates?.length ? candidates.length : 0}</b> Teachers out of <b>{teachers?.data?.data?.length}</b> submitted {serviceName} form for year <b>{year}</b> </p>}

                <div>
                    {(teacherLoading || serviceLoading) && <UserLoading title="Loading Data" />}
                    <ul class="list-group list-group-flush">

                        {
                            teachers?.data?.data && designationWiseSorting(teachers?.data?.data).map((teacher, index) => {
                                return <li className='flex items-center justify-between list-group-item'>
                                    <span> {index + 1}. {teacher?.salutation} {teacher?.name}</span>
                                    {
                                        candidates?.includes(teacher?._id) ?
                                            <span className='flex items-center font-semibold'>
                                                <span class="badge bg-success mr-2 p-[10px] cursor-default">Submitted</span>
                                                <span class="badge mr-2 bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => browseReport(teacher._id)} > <CalendarViewDayRoundedIcon sx={{ width: '16px' }} /> View Report</span>
                                                <span class="badge bg-blue-600 hover:bg-blue-800 cursor-pointer" onClick={() => generateReport(teacher._id)} > <FileDownloadRoundedIcon sx={{ width: '16px' }} /> Download Report</span>
                                            </span>
                                            :
                                            <span className='flex items-center font-semibold'>
                                                <span class="badge bg-danger mr-2 p-[10px]">Not Submitted</span>
                                                <span class="badge mr-2 bg-[#0d6efd6b] cursor-default"> <CalendarViewDayRoundedIcon sx={{ width: '16px' }} /> View Report</span>
                                                <span class="badge bg-[#0d6efd6b] cursor-default"> <FileDownloadRoundedIcon sx={{ width: '16px' }} /> Download Report</span>
                                            </span>
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
