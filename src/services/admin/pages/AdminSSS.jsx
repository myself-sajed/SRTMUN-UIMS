import React, { useState } from 'react'
import AdminDrower from './AdminDrower'
import { useQuery } from 'react-query'
import { generateSSSReportPDF, getSSSAnalytics, getSSSData } from '../../feedback/js/getFeedbackData'
import { academicYearGenerator } from '../../../inputs/Year'
import SchoolsProgram from '../../../components/SchoolsProgram'
import ShowAnalysisModal from '../../feedback/components/ShowAnalysisModal'
import { Button, IconButton } from '@mui/material'
import Title from '../../feedback/components/Title'
import { Bar, Pie } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import DownloadReportButtons from '../../feedback/components/DownloadReportButtons'
import ChartsPieGenerator from '../../feedback/analysis/ChartsPieGenerator'
import ReportLoading from '../../../components/ReportLoading'
import UserLoading from '../../../pages/UserLoading'
import { genrateFeedbackExcel } from '../../feedback/pages/FeedbackDashboard'
import axios from 'axios'
import ShareLink from '../../faculty/reports/aqar/components/ShareLink'

const AdminSSS = () => {
    return <div>
        <AdminDrower>
            <div className='my-2 border p-2'>
                <ShareLink linkToNavigate={`SSS/student-satisfaction-survey`} />
            </div>
            <AdminSSSModule />
        </AdminDrower>
    </div>
}


const AdminSSSModule = () => {

    // other important states
    const [open, setOpen] = useState(false)
    const [schoolNameAndYear, setSchoolNameAndYear] = useState(null)
    const [shouldFetchData, setShouldFetchData] = useState(false)
    const { forReport } = useParams()
    const [reportLoading, setReportLoading] = useState(false)

    // query for numerical data
    const academicYearsToFetch = academicYearGenerator(2)
    const numericalDataFilter = { academicYear: { $in: academicYearsToFetch } }
    const { data: numericalData, isLoading } = useQuery("SSSData", () => getSSSData(numericalDataFilter, academicYearsToFetch))


    const getSSSWoleData = (schoolName, acadmicYear) => {
        return axios.post(`${process.env.REACT_APP_MAIN_URL}/SSS/getFeedbackData`, { schoolName, acadmicYear })
    }

    const showAnalytics = (schoolName, academicYear) => {
        setSchoolNameAndYear(() => { return { schoolName, academicYear } })
        setShouldFetchData(() => true)
        setOpen(true)
    }

    // query for analytical data
    const key = `SSSAnalyticalData-${schoolNameAndYear?.schoolName}-${schoolNameAndYear?.academicYear}`

    const { data: analytics, isLoading: isAnalyticsLoading } = useQuery(key, () => getSSSAnalytics(schoolNameAndYear?.schoolName, schoolNameAndYear?.academicYear), { enabled: shouldFetchData })

    const { data: response, isLoading: responseLoading } = useQuery(["wholeData", schoolNameAndYear?.schoolName, schoolNameAndYear?.academicYear], () => getSSSWoleData(schoolNameAndYear?.schoolName, schoolNameAndYear?.academicYear))
    // console.log(response);
    const onClose = () => {
        setOpen(false);
        setSchoolNameAndYear(null)
        setShouldFetchData(false)
    }

    console.log("numericalData", numericalData);
    const excelClick = () => {
        genrateFeedbackExcel("", response.data, "SSS", schoolNameAndYear?.schoolName)
    }

    return <div>



        <div className='sub-main'>
            <p className="font-bold text-lg text-center mb-2">Student Satisfaction Survey</p>
            {
                isLoading ? <UserLoading title="Fetching SSS Numerical Data" /> :
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>School Names</th>
                                {
                                    academicYearsToFetch.map((year) => {
                                        return <th>{year}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(SchoolsProgram).map((school) => {
                                    return <tr>
                                        <td>{school}</td>
                                        {
                                            academicYearsToFetch.map((year) => {
                                                return <td onClick={() => showAnalytics(school, year)}>
                                                    <Button sx={{ fontWeight: 'bold', fontSize: '16px' }}>{numericalData?.data?.data[school][year]}</Button>
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                            <tr>


                            </tr>
                        </tbody>
                    </table>
            }

        </div>

        <div>
            {schoolNameAndYear && <ShowAnalysisModal open={open} total="Student Satisfaction Survey Analysis" handleClose={onClose} title={`Student Satisfaction Survey Analysis for ${schoolNameAndYear?.schoolName} of ${schoolNameAndYear?.academicYear}`} >

                <SSSAnalyticalData isAnalyticsLoading={isAnalyticsLoading} reportLoading={reportLoading} setReportLoading={setReportLoading} forReport={forReport} analytics={analytics} schoolNameAndYear={schoolNameAndYear} excelClick={excelClick} />

            </ShowAnalysisModal>}
        </div>


    </div>
}

export default AdminSSS
export { AdminSSSModule }


const SSSAnalyticalData = ({ isAnalyticsLoading, reportLoading, setReportLoading, forReport, analytics, schoolNameAndYear, excelClick }) => {
    return <div>
        {isAnalyticsLoading ? <UserLoading title="Generating SSS Report" /> : <div>
            {
                reportLoading && <ReportLoading loading={reportLoading} />
            }


            <div className="my-3">
                <DownloadReportButtons customFunction={generateSSSReportPDF} params={{ schoolName: schoolNameAndYear?.schoolName, academicYear: schoolNameAndYear?.academicYear, setReportLoading }} excelClick={excelClick} />
            </div>

            <ChartsPieGenerator forReport={forReport} analytics={analytics?.data?.data} />
        </div>}
    </div>
}


export { SSSAnalyticalData }