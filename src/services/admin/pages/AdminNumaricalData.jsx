import React, { useEffect, useState } from 'react'
import AdminDrower from './AdminDrower'
import axios from 'axios'
import { useQuery } from 'react-query'
import { academicYearGenerator } from '../../../inputs/Year'
import AdminSchoolSelect from '../components/AdminSchoolSelect'

const AdminNumaricalData = () => {

  const [values, setValues] = useState({schoolName: "All Schools" })
  const {schoolName} = values

  const getCountData = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_MAIN_URL}/Admin/getFiveYearData`, filter)
  }
  const countFilter = schoolName=== "All Schools"?{}:{schoolName}
  const { data, isLoading, isError, error, refetch } = useQuery(['getFiveYearData',schoolName], () => getCountData(countFilter))


  // const tdClicked = async (model,module, filter) =>{
  //     const params = { model, id: "", module, filter }
  // }

  const generateAcademicYears = [...academicYearGenerator(5, true, true), 'Total']

  // useEffect(() => {
  //   console.log("numerical data:", data?.data)
  // }, [data])


  const modelNames = {
    BooksAndChapters: 'Books And Chapters', ResearchProjects: 'Research Projects', EContentDeveloped: 'E-Content Developed', ConferenceOrganized: 'Conference Organized', InvitedTalk: 'Invited Talk', ResearchPapers: 'Research Papers', Fellowship: 'Fellowship', AwardRecognition: 'Award Recognition', Collaboration: 'Collaboration', ConferenceParticipated: 'Conference Participated', ConsultancyServices: 'Consultancy Services', ResearchProject: 'Research Projects', Lectures: 'Lectures', ResearchPaper: 'Research Papers', PhdAwarded: 'Research Guidance',  JrfSrf: 'JRF, SRF, Post Doctoral Fellows,', Patent: 'Patents', Financialsupport: 'Financial Support', ForeignVisit: 'Foreign Visits', AlumniContribution: 'Alumni Contribution', Award: 'Award', ConferencesSemiWorkshopOrganized: 'Conferences Seminar Workshop Organized', CounselingAndGuidance: 'Counseling And Guidance', DemandRatio: 'Demand Ratio', Employability: 'Employability', ExtensionActivities: 'Extension Activities', MoUs: 'MoUs', Placement: 'Placement', ProgressionToHE: 'Progression To HE', ProjectsInternships: 'Projects Internships', QualifiedExams: 'Qualified Exams', ResearchMethodologyWorkshops: 'Research Methodology Workshops', ReservedSeats: 'Reserved Seats', SkillsEnhancementInitiatives: 'Skills Enhancement Initiatives', StudentSatisfactionSurvey: 'Student Satisfaction Survey', SyllabusRevision: 'Syllabus Revision', TrainingProgramsOrganized: 'Training Programs Organized', UgcSapCasDstFistDBTICSSR: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR', ValueAddedCource: 'Value Added Cource',AlumniUser: 'Alumni', StudentUser: 'Studnts'
  }

  return (
    <AdminDrower>
      <div className='sub-main' >
        <div className='flex justify-end pb-2'>
          <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
        </div>
        <div className='table-responsive' style={{ height: "70vh" }}>
          <table className='table table-bordered '>
          <thead className='sticky-top'>
            <tr className='bg-[#ae7e28] text-[#FFF]'>
              <th>Name Of Table</th>
              {generateAcademicYears.map((year) => {
                return <th>{year}</th>
              })}
            </tr>
          </thead>

            <tbody>

              {
                data?.data && Object.keys(data?.data)?.map((tableName) => {
                  return <tr>
                    <td style={{background: "#a6a3a3a6", fontWeight: "600"}}> {modelNames?.[tableName]} </td>

                    {generateAcademicYears.map((year) => {
                      return (<td className={year === 'Total'?'font-semibold':''} onClick={(e)=>{console.log(`Year: $ {year} model: ${tableName} school: ${schoolName}`)}} >{data?.data[tableName][year]}</td>)
                    })}

                  </tr>
                })
              }

              <tr>

              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </AdminDrower>
  )
}

export default AdminNumaricalData
