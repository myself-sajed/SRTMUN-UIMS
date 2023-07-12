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

const AdminFeedbackStatus = () => {

  const [academicYear, setAcademicYear] = useState(academicYearGenerator(1)[0])

  let param = { filter: { academicYear } }
  const { data, isLoading, refetch } = useQuery([param.model, param], () => getTotalFeedbackData(param))

  useEffect(() => {
    refetch()
  }, [academicYear])


  const [expandedRow, setExpandedRow] = useState(null);
  const [chartData, setChartData] = useState(null)

  const toggleRow = ({ rowIndex, title, school }) => {
    if ((expandedRow?.rowIndex === rowIndex && expandedRow?.title === title && expandedRow?.school === school)) {
      setExpandedRow(null);
    } else {
      const element = document.getElementById(school);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setExpandedRow({ rowIndex, title, school });
    }
  };

  let params = { filter: { schoolName: expandedRow?.school, academicYear }, feedbackUser: expandedRow?.title }

  const { data: analysisData, isLoading: analysisLoading, refetch: analysisRefetch } = useQuery([params.filter.schoolName, param], () => getFeedbackData(params))

  useEffect(() => {

    if (data?.data?.data) {
      setChartData(() => analysisData?.data?.data?.analysis)
    }
  }, [analysisData, academicYear])

  useEffect(() => {
    if (expandedRow) {
      setChartData(() => null)
      console.log('Refetching')
      analysisRefetch()
    }
  }, [expandedRow?.title, expandedRow?.school, expandedRow?.rowIndex, expandedRow])


  return (
    <div className='w-full'>
      <AdminDrower>
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
            <p className="text-sm text-muted">Note: Please click on the count of Student, Teacher, Alumni, Parent or Employer of any school in the table to check the Feedback Analysis of that school.</p>
            <table className="table table-bordered my-3">
              <thead className="bg-primary text-white">
                <tr>
                  <th>School Names</th>
                  <th>Students</th>
                  <th>Teachers</th>
                  <th>Alumni</th>
                  <th>Parents</th>
                  <th>Employer</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(SchoolsProgram).map((school, rowIndex) => {
                    return <> <tr key={rowIndex} >
                      <td className="semibold" >{school}</td>
                      <Feedbacktd expandedRow={expandedRow} title="Student" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="StudentsSchoolWise" />
                      <Feedbacktd expandedRow={expandedRow} title="Teacher" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="TeachersSchoolWise" />
                      <Feedbacktd expandedRow={expandedRow} title="Alumni" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="AlumniSchoolWise" />
                      <Feedbacktd expandedRow={expandedRow} title="Parent" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="ParentsSchoolWise" />
                      <Feedbacktd expandedRow={expandedRow} title="Employer" rowIndex={rowIndex} toggleRow={toggleRow} school={school} data={data} accessor="EmployersSchoolWise" />
                    </tr>
                      {expandedRow?.rowIndex === rowIndex && (
                        <tr id={school}>
                          <td colspan="6" className='p-3'>
                            <div className='h-[500px] overflow-auto'>
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
                                            <StudentAnalysis chartData={chartData["Student"]} />
                                          </div>
                                        }
                                        {
                                          expandedRow?.title === "Teacher" && chartData["Teacher"] &&
                                          <div className="mb-5 w-full">
                                            <OtherResponseAnalysis questionsWithData={chartData["Teacher"]} />
                                          </div>
                                        }
                                        {
                                          expandedRow?.title === "Alumni" && chartData["Alumni"] &&
                                          <div className="mb-5 w-full">
                                            <OtherResponseAnalysis questionsWithData={chartData["Alumni"]} />
                                          </div>
                                        }
                                        {
                                          expandedRow?.title === "Parent" && chartData["Parent"] &&
                                          <div className="mb-5 w-full">
                                            <OtherResponseAnalysis questionsWithData={chartData["Parent"]} />
                                          </div>
                                        }
                                        {
                                          expandedRow?.title === "Employer" && chartData["Employer"] &&
                                          <div className="mb-5 w-full">
                                            <OtherResponseAnalysis questionsWithData={chartData["Employer"]} />
                                          </div>
                                        }


                                      </div>}
                                  </div>
                                }
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
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


const Feedbacktd = ({ expandedRow, title, data, accessor, school, rowIndex, toggleRow }) => {
  return <td onClick={() => toggleRow({ rowIndex, title, school })} className={`font-semibold text-blue-800 cursor-pointer p-2 rounded-sm ${(expandedRow && expandedRow.title === title && expandedRow.school === school) ? 'font-extrabold' : 'hover:font-extrabold'}`} >
    {data?.data?.data?.[accessor]?.[school]?.length || 0} </td>
}
