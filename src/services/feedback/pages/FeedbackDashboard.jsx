import React, { useState } from 'react'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { getFeedbackData } from '../js/getFeedbackData';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDirectorAuth from '../../../hooks/useDirectorAuth'
import DashboardHeroSection from '../components/DashboardHeroSection';
import StudentAnalysis from '../analysis/StudentAnalysis';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import UserLoading from '../../../pages/UserLoading';
import OtherResponseAnalysis from '../analysis/OtherResponseAnalysis';
import { SelectStatusYear } from '../../status/pages/StatusPage';
import { academicYearGenerator } from '../../../inputs/Year';


const FeedbackDashboard = () => {
  title('Feedback Dashboard')
  useDirectorAuth()
  const directorUser = useSelector((state) => state.user.directorUser)
  const [year, setYear] = useState(academicYearGenerator(1)[0])
  const [activeUser, setActiveUser] = useState("Student");

  let param = { filter: { schoolName: directorUser?.department, academicYear: year }, feedbackUser: activeUser }
  const { data, isLoading, refetch } = useQuery([param.model, param], () => getFeedbackData(param))

  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    setChartData(null)
  }, [activeUser])

  useEffect(() => {
    refetch()
  }, [year])


  useEffect(() => {

    if (data?.data?.data) {
      setChartData(() => data?.data?.data?.analysis)
    }
  }, [data, activeUser])




  return (
    <div>
      <GoBack pageTitle={`Feedback Dashboard for ${directorUser?.department}`} showAvatar={{ photoURL: directorUser?.photoURL, userType: 'director' }} />

      <div className="my-2">
        <SelectStatusYear setYear={setYear} year={year} />
      </div>

      <div className="mt-4">
        <DashboardHeroSection year={year} showActive={activeUser} countData={data?.data?.data.dashboardData} isLoading={isLoading} showDetails={true} setActiveUser={setActiveUser} />
      </div>

      <div>
        <p className='mb-3 mt-5 text-lg font-bold rounded-md text-center flex items-center justify-center gap-3 p-2 bg-blue-800 text-white'> <AnalyticsRoundedIcon /> {activeUser} Feedback Analysis</p>

        {!chartData ?
          <div className='my-5'>
            <UserLoading title="Analyzing data" />
          </div>
          :
          <div>
            {(activeUser === "Student" && chartData[activeUser]) && <div className="mb-5 w-full">
              <StudentAnalysis academicYear={year} chartData={chartData[activeUser]} schoolName={directorUser?.department} />
            </div>}

            {(activeUser !== "Student" && chartData[activeUser]) && <div className="mb-5">
              <OtherResponseAnalysis feedbackUser={activeUser} academicYear={year} questionsWithData={chartData[activeUser]} schoolName={directorUser?.department} />
            </div>}

          </div>
        }
      </div>


    </div >
  )
}

export default FeedbackDashboard




