import React, { useEffect, useState } from 'react'
import AdminDrower from './AdminDrower'
import axios from 'axios'
import { useQuery } from 'react-query'
import { academicYearGenerator } from '../../../inputs/Year'
import AdminSchoolSelect from '../components/AdminSchoolSelect'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import toast from 'react-hot-toast'
import ExcelJS from 'exceljs'
import { useParams } from 'react-router-dom'

const AdminNumaricalData = () => {

  const { School } = useParams();

  const [values, setValues] = useState({ schoolName: School ? School : "All Schools" })
  const { schoolName } = values

  const getCountData = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_MAIN_URL}/Admin/getFiveYearData`, filter)
  }



  const pdfHandler = () => {
    console.log("pdf Clicked");
  }

  const countFilter = schoolName === "All Schools" ? {} : { schoolName }
  const { data, isLoading, isError, error, refetch } = useQuery(['getFiveYearData', schoolName], () => getCountData(countFilter))

  const generateAcademicYears = [...academicYearGenerator(5, true), 'Total']

  const modelNames = {
    BooksAndChapters: 'Books And Chapters', ResearchProjects: 'Research Projects', EContentDeveloped: 'E-Content Developed', ConferenceOrganized: 'Conference Organized', InvitedTalk: 'Invited Talk', ResearchPapers: 'Research Papers', Fellowship: 'Fellowship', AwardRecognition: 'Award Recognition', Collaboration: 'Collaboration', ConferenceParticipated: 'Conference Participated', ConsultancyServices: 'Consultancy Services', ResearchProject: 'Research Projects', ResearchPaper: 'Research Papers', PhdAwarded: 'Research Guidance', JrfSrf: 'JRF, SRF, Post Doctoral Fellows,', Patent: 'Patents', Financialsupport: 'Financial Support', ForeignVisit: 'Foreign Visits', AlumniContribution: 'Alumni Contribution', Award: 'Award', ConferencesSemiWorkshopOrganized: 'Conferences Seminar Workshop Organized', CounselingAndGuidance: 'Counseling And Guidance', DemandRatio: 'Demand Ratio', Employability: 'Employability', ExtensionActivities: 'Extension Activities', MoUs: 'MoUs', Placement: 'Placement', ProgressionToHE: 'Progression To HE', ProjectsInternships: 'Projects Internships', QualifiedExams: 'Qualified Exams', ResearchMethodologyWorkshops: 'Research Methodology Workshops', ReservedSeats: 'Reserved Seats', SkillsEnhancementInitiatives: 'Skills Enhancement Initiatives', StudentSatisfactionSurvey: 'Student Satisfaction Survey', SyllabusRevision: 'Syllabus Revision', TrainingProgramsOrganized: 'Training Programs Organized', UgcSapCasDstFistDBTICSSR: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR', ValueAddedCource: 'Value Added Cource', AlumniUser: 'Alumni', StudentUser: 'Students', StudentFeedback: "Student Feedback", AlumniFeedback: "Alumni Feedback", TeacherFeedback: "Teacher Feedback", ParentFeedback: "Parent Feedback", EmployerFeedback: "Employer Feedback", ExpertFeedback: "Expert Feedback",
  }


  const excelHandler = async (data) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const columnNames = generateAcademicYears;
      columnNames.unshift('Name Of Table');
      columnNames.unshift('Sr.No.');

      // Set column headers and formatting
      const headerRow = worksheet.addRow(columnNames);
      headerRow.font = { bold: true, size: 12 };

      // Apply formatting to all cells
      worksheet.columns.forEach((column) => {
        column.width = 20;
        column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
      });

      // Add data rows with auto-incrementing numbers
      Object.keys(data)?.forEach((tableRowKey, index) => {

        const values = generateAcademicYears.map((year) => data[tableRowKey][year]);
        // console.log(values)
        values.unshift(modelNames[tableRowKey])
        values.unshift(index + 1);
        worksheet.addRow(values);
      });

      worksheet.getRow(1).font = { bold: true, size: 12 };
      worksheet.getRow(1).height = 30;

      for (let i = 2; i <= data.length; i++) {
        worksheet.getRow(i).commit();
      }

      // Save the workbook as a file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      // Download the Excel file with the specified fileName
      const link = document.createElement('a');
      link.href = url;
      link.download = "Numarical Data";
      link.click();

      console.log('Excel file generated and downloaded successfully.');
      toast.success("Excel generated successfully")
    } catch (error) {
      console.error('Error generating Excel file:', error);
      toast.error("Error while generating try again")
    }
  }

  return (
    <AdminDrower hideHeader={School ? true : false} >
      <div className='sub-main' >
        <div className='flex justify-end pb-2'>
          {!School && <>
            <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
            <Tooltip title="PDF Download" placement="top" >
              <IconButton sx={{ height: "100%", bottom: "-25px", marginLeft: "15px" }} onClick={pdfHandler} >
                <PictureAsPdfRoundedIcon color='error' sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excel Download" placement="top" >
              <IconButton sx={{ height: "100%", bottom: "-25px" }} onClick={() => { excelHandler(data?.data) }}>
                <SimCardDownloadTwoToneIcon color='success' sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          </>}
        </div>
        <div className='table-responsive' style={{ height: School ? '100%' : `80vh` }}>
          <table className='table table-bordered '>
            <thead className='sticky-top'>
              <tr className='bg-[#ae7e28] text-[#FFF]'>
                <th>Sr.No.</th>
                <th>Name Of Table</th>
                {generateAcademicYears.map((year) => {
                  return <th>{year}</th>
                })}
              </tr>
            </thead>

            <tbody>

              {
                data?.data && Object.keys(data?.data)?.map((tableName, i) => {
                  return <tr key={i}>
                    <td>{i + 1}</td>
                    <td style={{ background: "#f4f4f4" }} className='bg-[#ae7e28] font-semibold' > {modelNames?.[tableName]} </td>

                    {generateAcademicYears.map((year) => {
                      return (<td className={year === 'Total' ? 'font-semibold' : ''} onClick={() => { console.log(`Year: ${year} model: ${tableName} school: ${schoolName}`) }} >{data?.data[tableName][year]}</td>)
                    })}

                  </tr>
                })
              }

            </tbody>
          </table>
          {isLoading && <div className='flex justify-center'><CircularProgress /></div>}
        </div>
      </div>
    </AdminDrower>
  )
}

export default AdminNumaricalData