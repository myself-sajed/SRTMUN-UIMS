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




const FeedbackDashboard = () => {
    title('Feedback Dashboard')
    useDirectorAuth()
    const directorUser = useSelector((state) => state.user.directorUser)


    let param = { filter: { schoolName: directorUser?.department } }

    const { data, isLoading, refetch } = useQuery([param.model, param], () => getFeedbackData(param))
    const [teachers, setTeachers] = useState([])

    const [ activeUser, setActiveUser] = useState("Student");

    useEffect(() => {
      setTeachers(designationWiseSorting(data?.data?.data?.Faculties)?.map((teacher) => `${teacher.salutation} ${teacher.name}`))
  }, [data])
  
    const generalQuestions = [
      {
          type: 'check',
          required: true,
          question: 'Tick only those teachers who taught you this year',
          options: teachers,
      },
      {
          type: 'radio',
          required: true,
          question: 'Choose the program you are currently enrolled in',
          options: SchoolsProgram?.[directorUser?.department]?.map((program) => program[0])
      },
      {
          type: 'table',
          required: true,
          question: 'Rate the course',
          head: ['Very Good', 'Good', 'Satisfactory', 'Not-Satisfactory'],
          cell: ['Depth of the course content including project work if any', 'Extent of coverage of course', 'Applicability/relevance to real life situations', 'Learning value (in terms of knowledge, concepts, manual skills, analytical abilities and broadening perspectives', 'Clarity and relevance of textual reading', 'Relevance of additional source material (Library)', 'Extent of effort required by students', 'Overall rating']
      },
      {
          type: 'table',
          required: true,
          question: 'Rate the Facilities available',
          head: ['Very Good', 'Good', 'Satisfactory', 'N/A'],
          cell: ['Sufficient number of prescribed books are available in the Library.', 'The books prescribed/listed as reference materials are relevant, updated and appropriate', 'Infrastructural facilities, such as student’s room/ girls room/carrels, class rooms, reading rooms and toilets are available in the Department.', 'Laboratory facilities / Field Visits provided	']
      },
      {
          type: 'check',
          required: true,
          question: 'Is your background benefiting from this course?',
          options: ['More than adequate', 'Just adequate', 'Adequate', 'Inadequate']
      },
      {
          type: 'check',
          required: true,
          question: 'The syllabus was?',
          options: ['Challenging', 'Good', 'Adequate', 'Inadequate']
      },
      {
          type: 'check',
          required: true,
          question: 'How helpful was the internal assesssment?',
          options: ['Highly', 'Moderately', 'Fairly', 'Not sure']
      },
      {
          type: 'radio',
          required: true,
          question: 'Were are you provided with a course and lecture outline at the beginning?',
          options: ['Yes', 'No']
      },
      {
          type: 'radio',
          required: true,
          question: 'If Yes, was it followed?',
          options: ['Yes', 'No']
      },
      {
          type: 'radio',
          required: true,
          question: 'If followed, was it helpful?',
          options: ['Yes', 'No']
      },
      {
          type: 'text',
          required: true,
          question: 'If you have other major comments to offer',
      }

  ]

    useEffect(() => {
        // setTeacherData(data?.data?.data?.Teacher);
        generateAnalyticsData(data?.data?.data[activeUser])
        
    },[data])
    
    function generateAnalyticsData(userData) {
        
        const Analiticsdata = activeUser=="Teacher"?{ tNameArr:[], tDigiArr:[0, 0, 0, 0, 0], tContArr:[], tRadioArr : Object.fromEntries(teacherQuestions[3].cell.map((question) => [question, [0, 0, 0, 0, 0]])), tCommentArr:[] }:activeUser=="Student"?{ sNameArr:[], sEmailArr:[], sContArr:[], sProgramEnroled: Array((generalQuestions[1].options)?.length).fill(0) }:null

        let sTeacherTick =  Array((generalQuestions[0].options)?.length).fill(0)

        userData?.forEach((user) => {
          const parseData = JSON.parse(user.response);
          
            const Teacher  = {
                question0 : parseData[teacherQuestions[0].question],
                question1 : parseData[teacherQuestions[1].question],
                question2 : parseData[teacherQuestions[2].question],
                question3 : parseData[teacherQuestions[3].question],
                question4 : parseData[teacherQuestions[4].question],
            }
            const Student = {
              question0 : parseData[studentQuestions[0].question],
              question1 : parseData[studentQuestions[1].question],
              question2 : parseData[studentQuestions[2].question],
              question3: parseData[generalQuestions[0].question],
              question4: parseData[generalQuestions[1].question],
            }
           function pushInArray(arr, value) {
              arr.push(value)
           }
           function sQIncriment( arr, que, opt ) {
            opt.forEach((e, i) => {
              if (e === que) {
                arr[i] += 1;
              }
            });
           }
           function mQIncriment( arr, que, opt ) {
            opt.head.forEach((e, i) => {
              opt.cell.forEach((cellItem) => {
                if (que[cellItem] === e) {
                  arr[cellItem][i] += 1;
                }
              });
            });
           }
          if(activeUser=="Teacher"){
            pushInArray(Analiticsdata.tNameArr, Teacher.question0);
            sQIncriment(Analiticsdata.tDigiArr, Teacher.question1, teacherQuestions[1]?.options);
            pushInArray(Analiticsdata.tContArr,Teacher.question2);
            mQIncriment(Analiticsdata.tRadioArr, Teacher.question3, teacherQuestions[3]);
            pushInArray(Analiticsdata.tCommentArr, Teacher.question4);
          }
          else if(activeUser=="Student"){
            // console.log(parseData[stutechQ[0].question]);
            pushInArray(Analiticsdata.sNameArr, Student.question0);
            pushInArray(Analiticsdata.sEmailArr, Student.question1);
            pushInArray(Analiticsdata.sContArr, Student.question2);
            for(const faculty of Student.question3){
              const index = (generalQuestions[0].options)?.indexOf(faculty);
              if(index > -1) {
                sTeacherTick[index] += 1;
              }
            }
            sQIncriment(Analiticsdata.sProgramEnroled, Student.question4, generalQuestions[1].options)
            
          }
        });
        // console.log(Analiticsdata.sProgramEnroled);
        // console.log(sTeacherTick)
        // console.log(Analiticsdata)

      }

    return (
        <div>
            <GoBack pageTitle="Feedback Response" />

            <div className="mt-4">
                <DashboardHeroSection countData={data?.data?.data} isLoading={isLoading} />
            </div>
            {/* <div className="my-5">
                <StudentAnalysis studentData={data?.data?.data?.Student} isLoading={isLoading} />
            </div> */}
        </div>
    )
}

export default FeedbackDashboard


