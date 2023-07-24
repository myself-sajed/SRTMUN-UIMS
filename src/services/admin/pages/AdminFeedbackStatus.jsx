import React from 'react'
import { useQuery } from 'react-query'
import { getATRData, getFeedbackData, getTotalFeedbackData } from '../../feedback/js/getFeedbackData'
import { useState } from 'react'
import { useEffect } from 'react'
import { academicYearGenerator, listOfYears } from '../../../inputs/Year'
import SchoolsProgram from '../../../components/SchoolsProgram'
import DashboardHeroSection from '../../feedback/components/DashboardHeroSection'
import AdminDrower from './AdminDrower'
import UserLoading from '../../../pages/UserLoading'
import StudentAnalysis from '../../feedback/analysis/StudentAnalysis'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import OtherResponseAnalysis from '../../feedback/analysis/OtherResponseAnalysis'
import ShowAnalysisModal from '../../feedback/components/ShowAnalysisModal'
import { genrateFeedbackExcel } from '../../feedback/pages/FeedbackDashboard'
import designationWiseSorting from '../../../js/designationWiseSorting'
import TabBox from '../../status/components/TabBox'
import FileViewer from '../../../components/FileViewer'

const AdminFeedbackStatus = () => {

  const [academicYear, setAcademicYear] = useState(academicYearGenerator(1)[0])
  const [activePage, setActivePage] = useState(0)
  let tabs = ['Feedback Dashboard & Analysis', 'Feedback Action Taken Reports']

  let param = { filter: { academicYear } }
  const { data, isLoading, refetch } = useQuery(['GetAllTheDataForDashboardFeedback', param], () => getTotalFeedbackData(param))

  useEffect(() => {
    refetch()
    ATRRefetch()
  }, [academicYear])


  const [expandedRow, setExpandedRow] = useState(null);
  const [chartData, setChartData] = useState(null)
  const [response, setResponse] = useState(null)
  const [teachers, setTeachers] = useState(null)

  const toggleRow = ({ rowIndex, title, school }) => {

    const element = document.getElementById(school);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setExpandedRow({ rowIndex, title, school });
    handleClickOpen()
  };

  let params = { filter: { schoolName: expandedRow?.school, academicYear }, feedbackUser: expandedRow?.title }

  const { data: analysisData, isLoading: analysisLoading, refetch: analysisRefetch } = useQuery(['FeedbackDataFetchingAnalysis'.schoolName, param], () => getFeedbackData(params))

  let paramsForATR = { filter: { academicYear } }
  const { data: ATRData, isLoading: ATRLoading, refetch: ATRRefetch } = useQuery(['ATR', paramsForATR], () => getATRData(paramsForATR))

  useEffect(() => {
    console.log("ATRData :", ATRData)
  }, [ATRData])

  useEffect(() => {

    if (analysisData?.data?.data) {
      setChartData(() => analysisData?.data?.data?.analysis)
    }
  }, [analysisData, academicYear])

  useEffect(() => {
    if (expandedRow) {
      setChartData(() => null)
      analysisRefetch()
    }
  }, [expandedRow?.title, expandedRow?.school, expandedRow?.rowIndex, expandedRow])

  useEffect(() => {
    setResponse(analysisData?.data?.data.dashboardData)
    setTeachers(designationWiseSorting(analysisData?.data?.data?.dashboardData.Faculties)?.map((teacher) => `${teacher.salutation} ${teacher.name}`))
  }, [data, analysisData])

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  return (
    <div className='w-full'>
      <AdminDrower>

        <ShowAnalysisModal handleClose={handleClose} open={open} title={`${expandedRow?.title} Feedback Analysis for ${expandedRow?.school}`}>
          <div>
            <div className='pr-4'>
              <p className='mb-3 mt-3 text-lg font-bold rounded-md text-center flex items-center justify-center gap-3 p-2 bg-blue-800 text-white'> <AnalyticsRoundedIcon /> {expandedRow?.title} Feedback Analysis for {expandedRow?.school} </p>
              {analysisLoading ?
                <div className='my-5'>
                  <UserLoading title="Analyzing data" />
                </div>
                :
                <div>
                  {!chartData ? <div className='my-5'>
                    <UserLoading title="Analyzing data" />
                  </div> :
                    <div>

                      {
                        expandedRow?.title === "Student" && chartData["Student"] &&
                        <div className="mb-5 w-full">
                          <StudentAnalysis excelClick={() => { genrateFeedbackExcel(teachers, response["Student"], "Student", expandedRow.school) }} feedbackUser={"Student"} schoolName={expandedRow.school} academicYear={academicYear} chartData={chartData["Student"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Teacher" && chartData["Teacher"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis excelClick={() => { genrateFeedbackExcel(teachers, response["Teacher"], "Teacher", expandedRow.school) }} feedbackUser={"Teacher"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Teacher"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Alumni" && chartData["Alumni"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis excelClick={() => { genrateFeedbackExcel(teachers, response["Alumni"], "Alumni", expandedRow.school) }} feedbackUser={"Alumni"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Alumni"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Parent" && chartData["Parent"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis excelClick={() => { genrateFeedbackExcel(teachers, response["Parent"], "Parent", expandedRow.school) }} feedbackUser={"Parent"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Parent"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Employer" && chartData["Employer"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis excelClick={() => { genrateFeedbackExcel(teachers, response["Employer"], "Employer", expandedRow.school) }} feedbackUser={"Employer"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Employer"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Expert" && chartData["Expert"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis excelClick={() => { genrateFeedbackExcel(teachers, response["Expert"], "Expert", expandedRow.school) }} feedbackUser={"Expert"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Expert"]} />
                        </div>
                      }


                    </div>}
                </div>
              }
            </div>
          </div>
        </ShowAnalysisModal>
        {
          isLoading ? <UserLoading title="Loading Feedback Data" /> :
            <div className='sub-main'>
              <div className="flex items-center justify-between w-full mb-3">

                <div>
                  <TabBox tabs={tabs} value={activePage} setValue={setActivePage} />
                </div>

                <div className='col-md-1'>
                  <select className="form-select" id="validationCustom04" required onChange={
                    (e) => { setAcademicYear(e.target.value); }} value={academicYear}>
                    <option selected disabled value="">Choose</option>

                    {listOfYears.map((academicYear, index) => {
                      return <option key={index} value={academicYear}>{academicYear}</option>
                    })}
                  </select>
                </div>
              </div>
              <hr />
              <div className="my-3">
                <DashboardHeroSection countData={data?.data?.data} isLoading={isLoading} showDetails={false} year={academicYear} />
              </div>
              <p className="text-sm text-muted mt-5">Note: Please click on the count of Student, Teacher, Alumni, Parent, Employer or Expert of any school in the table to check the Feedback Analysis of that school.</p>
              <table className="table table-bordered my-3">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>School Names</th>
                    <th>Students</th>
                    <th>Teachers</th>
                    <th>Alumni</th>
                    <th>Parents</th>
                    <th>Employer</th>
                    <th>Expert</th>
                  </tr>
                </thead>

                {
                  activePage === 0 ?
                    <TableBodyForAnalysis chartData={chartData} analysisLoading={analysisLoading} academicYear={academicYear} expandedRow={expandedRow} toggleRow={toggleRow} data={data} /> : <TableBodyForATR isLoading={ATRLoading} data={ATRData?.data?.data} />
                }

              </table>
            </div>
        }
      </AdminDrower>

    </div>
  )
}

export default AdminFeedbackStatus





const TableBodyForAnalysis = ({ chartData, analysisLoading, academicYear, expandedRow, toggleRow, school, data }) => {
  return <tbody>
    {
      Object.keys(SchoolsProgram).map((school, rowIndex) => {
        return <> <tr key={rowIndex} >
          <td className="semibold" >{school}</td>
          <Feedbacktd chartData={chartData} analysisLoading={analysisLoading} academicYear={academicYear} expandedRow={expandedRow} title="Student" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="StudentsSchoolWise" />
          <Feedbacktd chartData={chartData} analysisLoading={analysisLoading} academicYear={academicYear} expandedRow={expandedRow} title="Teacher" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="TeachersSchoolWise" />
          <Feedbacktd chartData={chartData} analysisLoading={analysisLoading} academicYear={academicYear} expandedRow={expandedRow} title="Alumni" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="AlumniSchoolWise" />
          <Feedbacktd chartData={chartData} analysisLoading={analysisLoading} academicYear={academicYear} expandedRow={expandedRow} title="Parent" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="ParentsSchoolWise" />
          <Feedbacktd chartData={chartData} analysisLoading={analysisLoading} academicYear={academicYear} expandedRow={expandedRow} title="Employer" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="EmployersSchoolWise" />
          <Feedbacktd chartData={chartData} analysisLoading={analysisLoading} academicYear={academicYear} expandedRow={expandedRow} title="Expert" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="ExpertsSchoolWise" />
        </tr>
        </>
      })
    }

  </tbody>
}

const TableBodyForATR = ({ data, isLoading }) => {

  useEffect(() => {
    console.log('ATR Data Loading:', data)
  }, [data])

  return <tbody>
    {
      Object.keys(SchoolsProgram).map((school, rowIndex) => {
        return <> <tr key={rowIndex} >
          <td className="semibold" >{school}</td>
          <td>{data?.[school]?.[0]?.Student ? <FileViewer fileName={data?.[school]?.[0]?.Student} serviceName="FeedbackATR" /> : <FileViewer justShowButton={true} justShowButtonTitle="Not Uploaded" />}</td>
          <td>{data?.[school]?.[0]?.Teacher ? <FileViewer fileName={data?.[school]?.[0]?.Student} serviceName="FeedbackATR" /> : <FileViewer justShowButton={true} justShowButtonTitle="Not Uploaded" />}</td>
          <td>{data?.[school]?.[0]?.Alumni ? <FileViewer fileName={data?.[school]?.[0]?.Alumni} serviceName="FeedbackATR" /> : <FileViewer justShowButton={true} justShowButtonTitle="Not Uploaded" />}</td>
          <td>{data?.[school]?.[0]?.Parent ? <FileViewer fileName={data?.[school]?.[0]?.Parent} serviceName="FeedbackATR" /> : <FileViewer justShowButton={true} justShowButtonTitle="Not Uploaded" />}</td>
          <td>{data?.[school]?.[0]?.Employer ? <FileViewer fileName={data?.[school]?.[0]?.Employer} serviceName="FeedbackATR" /> : <FileViewer justShowButton={true} justShowButtonTitle="Not Uploaded" />}</td>
          <td>{data?.[school]?.[0]?.Expert ? <FileViewer fileName={data?.[school]?.[0]?.Expert} serviceName="FeedbackATR" /> : <FileViewer justShowButton={true} justShowButtonTitle="Not Uploaded" />}</td>
        </tr>
        </>
      })
    }

  </tbody>
}


const Feedbacktd = ({ expandedRow, title, data, accessor, school, rowIndex, toggleRow, chartData, analysisLoading, academicYear }) => {
  return <td onClick={() => toggleRow({ rowIndex, title, school })} className={`font-semibold text-blue-800 cursor-pointer p-2 rounded-sm ${(expandedRow && expandedRow.title === title && expandedRow.school === school) ? 'font-extrabold' : 'hover:font-extrabold'}`} >{data?.data?.data?.[accessor]?.[school] || 0}
  </td>
}
