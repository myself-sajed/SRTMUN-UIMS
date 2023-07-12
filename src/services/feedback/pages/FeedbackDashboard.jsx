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
import { teacherQuestions } from './TeacherFeedback';
import { studentQuestions, teacherQuestions as stutechQ } from './StudentFeedback';
import SchoolsProgram from '../../../components/SchoolsProgram';
import designationWiseSorting from '../../../js/designationWiseSorting';
import { Bar, Pie } from 'react-chartjs-2';



const FeedbackDashboard = () => {
  title('Feedback Dashboard')
  useDirectorAuth()
  const directorUser = useSelector((state) => state.user.directorUser)

  const generateChartData = (responses) => {
    const courseRatings = {
      'Very Good': 0,
      'Good': 0,
      'Satisfactory': 0,
      'Not-Satisfactory': 0
    };

    const facilityRatings = {
      'Very Good': 0,
      'Good': 0,
      'Satisfactory': 0,
      'N/A': 0
    };

    const facilityQuestions = {};

    const teacherData = {};

    responses.forEach((response) => {
      const teacherNames = response['Tick only those teachers who taught you this year'];

      teacherNames.forEach((teacherName) => {
        if (!teacherData[teacherName]) {
          teacherData[teacherName] = {};
        }

        const aboutTeacherSection = response[`About the teacher ${teacherName}`];

        Object.entries(aboutTeacherSection).forEach(([question, rating]) => {
          if (!teacherData[teacherName][question]) {
            teacherData[teacherName][question] = {
              'Very Good': 0,
              'Good': 0,
              'Satisfactory': 0,
              'Un-Satisfactory': 0
            };
          }

          teacherData[teacherName][question][rating]++;
        });
      });

      const courseRating = response['Rate the course']['Overall rating'];
      courseRatings[courseRating]++;

      const facilitySection = response['Rate the Facilities available'];
      Object.entries(facilitySection).forEach(([question, rating]) => {
        if (!facilityQuestions[question]) {
          facilityQuestions[question] = {
            'Very Good': 0,
            'Good': 0,
            'Satisfactory': 0,
            'N/A': 0
          };
        }

        facilityQuestions[question][rating]++;
      });
    });

    const courseData = {
      labels: Object.keys(courseRatings),
      datasets: [
        {
          data: Object.values(courseRatings),
          backgroundColor: ['green', 'blue', 'yellow', 'red']
        }
      ]
    };

    const facilityData = {
      labels: Object.keys(facilityRatings),
      datasets: [
        {
          data: Object.values(facilityRatings),
          backgroundColor: ['green', 'blue', 'yellow', 'red']
        }
      ]
    };

    const facilityChartData = Object.entries(facilityQuestions).map(([question, ratings]) => {
      return {
        question,
        data: {
          labels: Object.keys(ratings),
          datasets: [
            {
              data: Object.values(ratings),
              backgroundColor: ['green', 'blue', 'yellow', 'red']
            }
          ]
        }
      };
    });

    return { courseData, facilityData, facilityChartData, teacherData };
  };













  let param = { filter: { schoolName: directorUser?.department } }

  const { data, isLoading, refetch } = useQuery([param.model, param], () => getFeedbackData(param))
  const [teachers, setTeachers] = useState([])

  const [activeUser, setActiveUser] = useState("Student");

  useEffect(() => {
    setTeachers(designationWiseSorting(data?.data?.data?.Faculties)?.map((teacher) => `${teacher.salutation} ${teacher.name}`))
  }, [data])



  const [chartData, setChartData] = useState(null)

  useEffect(() => {

    if (data?.data?.data) {

      let reponses = data?.data?.data?.[activeUser].map((item) => {
        return JSON.parse(item.response)
      })

      console.log("reponses :", reponses)

      let newChartData = generateChartData(reponses)
      console.log('Chart data is :', chartData)

      setChartData(() => newChartData)

    }

  }, [data])

  const ratingLabels = ['Very Good', 'Good', 'Satisfactory', 'Un-Satisfactory'];


  return (
    <div>
      <GoBack pageTitle="Feedback Response" />

      <div className="mt-4">
        <DashboardHeroSection countData={data?.data?.data} isLoading={isLoading} />
      </div>


      {chartData && (
        <div className="my-5 w-full">
          <div>
            <div >
              <div >
                <Title title="1. Course Feedback Ratings" />
                <div className="w-[30%] bg-gray-50 p-2 rounded-md m-2">
                  <Pie data={chartData.courseData} />
                </div>
              </div>

              <div>
                <Title title="2. Facility Feedback Ratings" className="mt-5" />
                <div className="grid grid-cols-2 gap-5 bg-gray-50 p-2 rounded-md m-2">
                  {chartData?.facilityChartData?.map(({ question, data }, index) => (
                    <div key={question} >
                      <h4 className="font-semibold mb-3 text-center text-muted">
                        {index + 1}. {question}
                      </h4>
                      <div className="flex items-center justify-center">
                        <Pie data={data} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Title title="3. Teacher Feedback Ratings" className="mt-5" />
            {Object.entries(chartData.teacherData).map(([teacherName, teacher], index) => (
              <div key={teacherName} className="bg-gray-50 p-2 rounded-md m-2">
                <h3 className="my-3 font-semibold text-blue-600 text-lg">
                  {index + 1}. {teacherName}
                </h3>
                <div className="pl-10 border-l-4 border-l-gray-400 grid grid-cols-2 gap-5">
                  {Object.entries(teacher).map(([question, ratings], index) => (
                    <div key={question} className="my-3">
                      <h4 className="font-semibold mb-3">
                        {index + 1}. {question}
                      </h4>
                      <div>
                        <Bar
                          data={{
                            labels: Object.keys(ratings),
                            datasets: [
                              {
                                label: question,
                                data: Object.values(ratings),
                                backgroundColor: ['green', 'blue', 'yellow', 'red'],
                                categoryPercentage: 0.6,
                                barPercentage: 0.4
                              }
                            ]
                          }}
                          options={{
                            scales: {
                              x: {
                                stacked: true
                              },
                              y: {
                                stacked: true,
                                beginAtZero: true
                              }
                            },
                            plugins: {
                              legend: {
                                display: false
                              },
                              datalabels: {
                                display: true,
                                anchor: 'end',
                                align: 'end'
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  )
}

export default FeedbackDashboard

const Title = ({ title, className }) => {
  return <p className={`mb-4 w-full text-lg font-bold bg-blue-100 p-2 rounded-md text-blue-800 ${className}`}>{title}</p>
}


