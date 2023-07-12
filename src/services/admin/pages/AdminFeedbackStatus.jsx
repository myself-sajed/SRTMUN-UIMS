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

const AdminFeedbackStatus = () => {

  const [academicYear, setAcademicYear] = useState(academicYearGenerator(1)[0])

  let param = { filter: { academicYear } }
  const { data, isLoading, refetch } = useQuery([param.model, param], () => getTotalFeedbackData(param))

  useEffect(() => {
    refetch()
  }, [academicYear])

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
            <table className="table table-bordered my-3">
              <thead className="bg-primary text-white">
                <tr>
                  <th>School Names</th>
                  <th>Students</th>
                  <th>Teachers</th>
                  <th>Alumni</th>
                  <th>Parents</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(SchoolsProgram).map((school, index) => {
                    return <tr key={index}>
                      <td className="semibold">{school}</td>
                      <td> {data?.data?.data?.StudentsSchoolWise?.[school]?.length || 0} </td>
                      <td> {data?.data?.data?.TeachersSchoolWise?.[school]?.length || 0} </td>
                      <td> {data?.data?.data?.AlumniSchoolWise?.[school]?.length || 0} </td>
                      <td> {data?.data?.data?.ParentsSchoolWise?.[school]?.length || 0} </td>
                    </tr>
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
