import React, { useEffect } from 'react'
import AdminDrower from './AdminDrower'
import axios from 'axios'
import { useQuery } from 'react-query'
import { academicYearGenerator } from '../../../inputs/Year'

const AdminNumaricalData = () => {

  const getData = async () => {
    return await axios.post(`${process.env.REACT_APP_MAIN_URL}/Admin/getFiveYearData`, {})
  }

  const { data, isLoading, isError, error, refetch } = useQuery('getFiveYearData', () => getData())

  const generateAcademicYears = [...academicYearGenerator(5, true, true), 'Total']

  useEffect(() => {
    console.log("numerical data:", data?.data)
  }, [data])


  const modelNames = {
    BooksAndChapters: 'Books And Chapters', ResearchProjects: 'Research Projects', EContentDeveloped: 'E-Content Developed', Petant: 'Petants', ConferenceOrganized: 'Conference Organized', InvitedTalk: 'Invited Talk', ResearchGuidance: 'Research Guidance', ResearchPapers: 'Research Papers', Fellowship: 'Fellowship', AwardRecognition: 'Award Recognition', Collaboration: 'Collaboration', ConferenceParticipated: 'Conference Participated', ConsultancyServices: 'Consultancy Services', ResearchProject: 'Research Projects', Lectures: 'Lectures', ResearchPaper: 'Research Papers', PhdAwarded: 'Research Guidence', JrfSrf: 'JRF, SRF, Post Doctoral Fellows,', Patent: 'Patents', Financialsupport: 'Financial Support', ForeignVisit: 'Foreign Visits', AlumniContribution: 'Alumni Contribution', Award: 'Award', ConferencesSemiWorkshopOrganized: 'Conferences SemiWorkshop Organized', CounselingAndGuidance: 'Counseling And Guidance', DemandRatio: 'Demand Ratio', Employability: 'Employability', ExtensionActivities: 'Extension Activities', MoUs: 'MoUs', Placement: 'Placement', ProgressionToHE: 'Progression To HE', ProjectsInternships: 'Projects Internships', QualifiedExams: 'Qualified Exams', ResearchMethodologyWorkshops: 'Research Methodology Workshops', ReservedSeats: 'Reserved Seats', SkillsEnhancementInitiatives: 'Skills Enhancement Initiatives', StudentSatisfactionSurvey: 'Student Satisfaction Survey', SyllabusRevision: 'Syllabus Revision', TrainingProgramsOrganized: 'Training Programs Organized', UgcSapCasDstFistDBTICSSR: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR', ValueAddedCource: 'Value Added Cource',
  }

  return (
    <AdminDrower>
      <div className='sub-main' >
        <table className='table table-bordered'>
          <thead>
            <tr>
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
                  <td> {modelNames?.[tableName]} </td>

                  {generateAcademicYears.map((year) => {
                    return (year === 'Total' ? <th>{data?.data[tableName][year]}</th> : <td>{data?.data[tableName][year]}</td>)
                  })}

                </tr>
              })
            }

            <tr>

            </tr>

          </tbody>


        </table>
      </div>
    </AdminDrower>
  )
}

export default AdminNumaricalData
