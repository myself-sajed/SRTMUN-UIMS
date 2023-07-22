import React from 'react'
import { useQuery } from 'react-query'
import { getFeedbackData, getTotalFeedbackData } from '../../feedback/js/getFeedbackData'
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

const AdminFeedbackStatus = () => {

  const [academicYear, setAcademicYear] = useState(academicYearGenerator(1)[0])

  let param = { filter: { academicYear } }
  const { data, isLoading, refetch } = useQuery([param.filter, param], () => getTotalFeedbackData(param))

  useEffect(() => {
    refetch()
  }, [academicYear])


  const [expandedRow, setExpandedRow] = useState(null);
  const [chartData, setChartData] = useState(null)

  const toggleRow = ({ rowIndex, title, school }) => {

    const element = document.getElementById(school);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setExpandedRow({ rowIndex, title, school });
    handleClickOpen()
  };

  let params = { filter: { schoolName: expandedRow?.school, academicYear }, feedbackUser: expandedRow?.title }

  const { data: analysisData, isLoading: analysisLoading, refetch: analysisRefetch } = useQuery([params.filter.schoolName, param], () => getFeedbackData(params))

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
    console.log('TotalData :', data?.data?.data)
    console.log('Analysis data :', analysisData?.data?.data)
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
                          <StudentAnalysis feedbackUser={"Student"} schoolName={expandedRow.school} academicYear={academicYear} chartData={chartData["Student"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Teacher" && chartData["Teacher"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis feedbackUser={"Teacher"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Teacher"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Alumni" && chartData["Alumni"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis feedbackUser={"Alumni"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Alumni"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Parent" && chartData["Parent"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis feedbackUser={"Parent"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Parent"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Employer" && chartData["Employer"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis feedbackUser={"Employer"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Employer"]} />
                        </div>
                      }
                      {
                        expandedRow?.title === "Expert" && chartData["Expert"] &&
                        <div className="mb-5 w-full">
                          <OtherResponseAnalysis feedbackUser={"Expert"} schoolName={expandedRow.school} academicYear={academicYear} questionsWithData={chartData["Expert"]} />
                        </div>
                      }


                    </div>}
                </div>
              }
            </div>
          </div>
        </ShowAnalysisModal>
        {
          isLoading ? <UserLoading title="Loading Feedback Data" /> : <div className='sub-main'>
            <div className="col-md-4 flex items-center justify-end w-full">
              <div>
                <select className="form-select" id="validationCustom04" required onChange={
                  (e) => { setAcademicYear(e.target.value); }} value={academicYear}>
                  <option selected disabled value="">Choose</option>

                  {listOfYears.map((academicYear, index) => {
                    return <option key={index} value={academicYear}>{academicYear}</option>
                  })}
                </select>
              </div>
            </div>
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
              <tbody>
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
            </table>
          </div>
        }
      </AdminDrower>

    </div>
  )
}

export default AdminFeedbackStatus


const Feedbacktd = ({ expandedRow, title, data, accessor, school, rowIndex, toggleRow, chartData, analysisLoading, academicYear }) => {
  return <td onClick={() => toggleRow({ rowIndex, title, school })} className={`font-semibold text-blue-800 cursor-pointer p-2 rounded-sm ${(expandedRow && expandedRow.title === title && expandedRow.school === school) ? 'font-extrabold' : 'hover:font-extrabold'}`} >{data?.data?.data?.[accessor]?.[school] || 0}
  </td>
}
