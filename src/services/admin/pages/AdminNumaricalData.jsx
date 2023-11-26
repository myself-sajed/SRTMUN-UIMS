import React, { useState } from 'react'
import AdminDrower from './AdminDrower'
import axios from 'axios'
import { useQuery } from 'react-query'
import { academicYearGenerator } from '../../../inputs/Year'
import AdminSchoolSelect from '../components/AdminSchoolSelect'
import { Avatar, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Tooltip, LinearProgress } from '@mui/material'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import toast from 'react-hot-toast'
import ExcelJS from 'exceljs'
import { useNavigate, useParams } from 'react-router-dom'
import ReportLoading from '../../../components/ReportLoading'
import ClearIcon from '@mui/icons-material/Clear';
import AdminTable from '../components/AdminTable'
import GoBack from '../../../components/GoBack'

const tableHead = {
  ResearchPapers: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', paperTitle: 'Paper Title', journalName: 'Journal Name', authors: "Author(s)", publicationYear: 'Publication Year', issnNumber: 'ISSN Number', year: 'Year', proof: 'Uploaded Proof', },
  ResearchProjects: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', schemeName: "Scheme or Project Name", programTitle: "Program Title", principalName: "Principal Invigilator Name", fundingName: "Funding Agency Name", isGov: "Wheather Government / Non-Government", department: "Department", awardYear: "Award Year", projectDuration: "Project Duration (In Year)", providedFunds: "Provided Funds (INR)", fundType: "Wheather Major / Minor", status: "Status", year: "Year", proof: 'Uploaded Proof', },
  BooksAndChapters: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', teacherName: 'Teacher Name', titleOfBook: 'Title of Book / Chapter / Edited Book / Translation', paperTitle: 'Paper Title', titleOfProceeding: 'Title of proceedings of the conference', conName: 'Conference Name', isNat: 'Wheather National / International', authorEditor: 'Author / Editor / Translator', publicationYear: 'Year of Publication', issnNumber: 'ISBN/ISSN number of proceeding', schoolName: 'School Name', aff: 'Affiliation Institute at the time of publication', year: 'Academic Year', publisherName: 'Publisher Name', proof: "Uploaded Proof" },
  PhdAwarded: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', scholarName: 'Scholar Name', departmentName: 'Department Name', guideName: 'Guide Name', degreeName: 'Degree', awardSubmit: 'Awarded / Submitted', thesisTitle: 'Thesis Title', yearOfScholar: 'Year of Scholar Registration', phdAwardYear: 'Year of Award', year: 'Year', proof: 'Uploaded Proof' },
  JrfSrf: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', researchName: 'Research Fellow Name', enrolmentYear: 'Enrolment Date', fellowshipDuration: 'Fellowship Duration', fellowshipType: 'Fellowship Type', grantingAgency: 'Granting Agency', qualifyingExam: 'Qualifying Exam (if any)', year: 'Year', proof: 'Uploaded Proof', },
  Patent: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', patenterName: 'Patenter Name', patentNumber: 'Patent Number', patentTitle: 'Patent Title', isNat: 'Wheather National / International', awardYear: 'Award Year of Patent', year: 'Academic Year', proof: 'Uploaded Proof', },
  Financialsupport: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', nameOfConference: 'Name of Conference', feeprovider: 'Name of professional body Funds provided for', amountOfSupport: 'Amount of support', pan: 'PAN No.', year: 'Year', proof: 'Uploaded Proof', },
  EContentDeveloped: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', moduleName: 'Name of the Module / Course developed', creationType: 'Type of Creation', platform: 'Platform on which the module is developed', year: 'Academic Year', link: 'Link to the content', },
  Award: { index: "Sr. no.", SchoolName: "School", Title_of_the_innovation: "Title of the innovation", Name_of_the_Award: "Name of the Award", Year_of_Award: "Year of Award", Name_of_the_Awarding_Agency: "Name of the Awarding Agency", Contact_details_Agency: "Contact details Agency", Category: "Category", Upload_Proof: "Proof", },
  Fellowship: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', teacherName: 'Name of the teacher awarded national/international fellowship/financial support', awardName: 'Name of the award/fellowship', awardingAgency: 'Awarding Agency', awardYear: 'Award Year', isNat: 'National / International', year: 'Year', proof: 'Uploaded Proof', },
  AwardRecognition: { index: 'Sr.No.', "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", teacherName: 'Name of full-time teachers receiving award', awardYear: 'Award Date', pan: 'PAN', designation: 'Designation', awardName: 'Name of the Award, Fellowship, received', isNat: 'National / International', agencyName: "Award Agency Name", incentive: "Incentives/Type of incentive given by the HEI in recognition of the award", year: "Year", proof: 'Uploaded Proof' },
  InvitedTalk: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', lectureTitle: 'Title of Lecture/Academic Session', seminarTitle: 'Title of Seminar, etc.', organizedBy: 'Organized by', isNat: 'Type', nature: 'Nature', year: 'Year', proof: 'Uploaded Proof', },
  Placement: { index: "Sr. no.", SchoolName: 'School', Name_of_student_placed: "Name of student placed/started Business", Program_graduated_from: "Program graduated from", Name_of_the_employer: "Name of the employer/business", Employer_contact_details: "Employer/business contact details", Pay_package_annum: "Pay package ( ₹ / annum)", Academic_Year: "Year of Placement", Type_Of_Placement: "Type of placemnt", Upload_Proof: "Upload Proof", },
  ProgressionToHE: { index: "Sr. no.", SchoolName: 'School', Name_of_student_enrolling: "Name of student enrolling", Program_graduated_from: "Program graduated from", Name_of_institution_admitted: "Name of institution admitted", Name_of_programme_admitted: "Name of programme admitted", Academic_Year: "Academic Year", Upload_Proof: "Upload Proof", },
  QualifiedExams: { index: "Sr. no.", SchoolName: 'School', Registration_number_roll_number: "Registration number / roll number", Names_of_students_selected_qualified: "Name of student qualified", Name_of_the_Exam: "Exam Qualified", Acadmic_year: "Acadmic Year", Upload_Proof: "Upload Proof", },
  CounselingAndGuidance: { index: "Sr. no.", SchoolName: 'School', Name_of_the_Activity_conducted_by_the_HEI: "Name of the Activity conducted by the HEI", Number_of_Students_Attended: "Number of Students Attended", Year_of_Activity: "Year of Activity", Upload_Proof: "Link to the relevant document" },
  AlumniContribution: { index: "Sr. no.", SchoolName: "School", Name_of_The_Alumni_Contributed: "Name Of The Alumni", Program_graduated_from: "Program Graduated From", Amount_of_contribution: "Contribution Ammount in ₹", Academic_Year: "Academic Year of Contribution", Upload_Proof: "Proof" },
  ConferenceParticipated: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', programTitle: 'Program Title', organizingInstitute: 'Organizing Institute', fundedBy: 'Funded By', isNational: 'National / International', year: 'Year', proof: 'Uploaded Proof', },
  ConferenceOrganized: { index: "Sr.No.", 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', programTitle: 'Program Title', schoolName: 'School Name', fundedBy: 'Funded By', isNational: 'National / International', noOfParticipants: 'No of Participants', year: 'Year', proof: "Uploaded Proof" },
  ConferencesSemiWorkshopOrganized: { index: "Sr. no.", SchoolName: 'School', Year: "Year", From_Date: "From Date", To_Date: "To Date", Title_Of_the_Program: "Title Of the Program", Level_of_program: "Level of Program", Number_of_Participants: "Number of Participants", Upload_Proof: "Upload proof", },
  TrainingProgramsOrganized: { index: "Sr. no.", SchoolName: 'School', Year: "Year", From_Date: "From Date", To_Date: "To Date", Title_Of_the_Program: "Title Of the Program", Type_of_staff: "Type of staff", Number_of_Participants: "Number of Participants", Upload_Proof: "Upload proof", },
  ConsultancyServices: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', cName: 'Consultant Name', cProjectName: 'Consultancy Project Name', cAgency: 'Consulting / Sponsoring Agency with contact', cYear: 'Consultancy Year', revenue: 'Revenue Generated(INR)', year: 'Year', proof: 'Uploaded Proof', },
  Collaboration: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', collabTitle: 'Title of the collaborative activity', agencyName: 'Name of the collaborating agency with contact details', participantName: 'Participant Name', collabYear: 'Year of Collaboration', duration: 'Duration', activityNature: 'Nature of the activity', year: 'Year', proof: 'Uploaded Proof' },
  ForeignVisit: { index: 'Sr.No.', 'userId.name': 'Faculty Name', 'userId.department': 'Faculty School', purposeOfVisit: 'Purpose Of Visit', nameOfTheInstitutionVisited: 'Name Of The Institute Visited', fromDate: 'From', toDate: 'To', year: 'Year', },
  UgcSapCasDstFistDBTICSSR: { index: "Sr. no.", SchoolName: 'School', Name_of_the_Scheme_Project_Endowments_Chairs: "Name of the Scheme/Project/ Endowments/ Chairs", Name_of_the_Principal_Investigator_Co_Investigator: "Name of the Principal Investigator/ Co Investigator", Name_of_the_Funding_agency: "Name of the Funding agency ", Type_of_Agency: "Type of Agency", Name_of_Department: "Name of Department", Year_of_Award: "Year of Award", Funds_provided_in_lakhs: "Funds provided ( ₹ / in lakhs)", Duration_of_the_project_in_Years: "Duration of the project (in Years)", Upload_Proof: "Upload proof", },
  ExtensionActivities: { index: "Sr. no.", SchoolName: 'School', Name_of_the_activity: "Name of the activity", Organising_unit: "Organising unit/ agency/ collaborating agency", Name_of_the_scheme: "Name of the scheme", Year_of_activity: "Year of the activity ", Number_of_students: "Number of students participated in such activities", Upload_Proof: "Proof" },
  Employability: { index: "Sr. no.", SchoolName: 'School', Course_Code: "Course Code", Name_of_the_Course: "Course name", Academic_Year: "Academic Year", Year_of_introduction: "Year of introduction", Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: "Activities / Content with direct bearing on Employability / Entrepreneurship / Skill development", Upload_Proof: "Proof" },
  ProjectsInternships: { index: "Sr. no.", SchoolName: 'School', Programme_Code: "Program Code", Programme_name: "Program Name", Name_of_the_student: "Name of the student", Academic_Year: "Academic Year", Upload_Proof: "Document proof " },
  SkillsEnhancementInitiatives: { index: "Sr. no.", SchoolName: 'School', Name_of_the_capacity_development_schemes: "Name of the capacity development schemes", Academic_Year: "Academic Year", Date_of_implementation: "Date of implementation", Number_of_students_enrolled: "Number of students enrolled", Upload_Proof: "Upload proof", },
  SyllabusRevision: { index: "Sr. no.", SchoolName: 'School', Programme_Code: "Programme Code", Programme_Name: "Programme Name", Academic_Year: "Academic Year", Year_of_Introduction: "Year of Introduction", Status_of_implementation: "Status of implementation", Year_of_Implimentation: "Year of Implimentation", Year_of_Revision: "Year of Revision", Percentage_of_content_added_or_replaced: "Percentage of content added or replaced", Upload_Proof: "Upload Proof", },
  ValueAddedCource: { index: "Sr. no.", SchoolName: 'School', Name_of_the_value_added_courses_offered: "Name of the value added courses offered", Course_Code_if_any: "Course Code (if any)", Academic_year: "Academic year", Year_of_offering: "Year of offering", No_of_times_offered_during_the_same_year: "No. of times offered during the same year", Duration_of_the_course: "Duration of the course (in Months)", Number_of_students_enrolled: "Number of students enrolled", Number_of_Students_completing_the_course: "Number of Students completing the course", Upload_Proof: "Upload proof", },
  ResearchMethodologyWorkshops: { index: "Sr. no.", SchoolName: 'School', Name_of_the_workshop_seminar: "Name of the workshop/ seminar", Number_of_Participants: "Number of Participants", year: "year", From_Date: "From Date", To_Date: "To Date", Upload_Proof: "Upload Proof", },
  MoUs: { index: "Sr. no.", SchoolName: 'School', Name_of_Organisation_with_whome_mou_signed: "Name of Organisation with whome mou signed", Duration_of_MoU: "Duration of MoU", Year_of_signing_MoU: "Year of signing MoU", Upload_Proof: "Actual activity list", },
}

const AdminNumaricalData = ({ isDirector = false }) => {

  const { School } = useParams();
  const navigate = useNavigate()
  const [values, setValues] = useState({ schoolName: School ? School : "All Schools" })
  const { schoolName } = values
  const [reportLoading, setReportLoading] = useState(false)
  const [tileData, setTileData] = useState(null)
  const [tileDataLoading, setTileDataLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [module, setModule] = useState(null)
  const [model, setModel] = useState(null)
  const [proof, setProof] = useState(null)
  const fiveYears = academicYearGenerator(5, true, true)
  const generateAcademicYears = [...fiveYears, 'Total']

  const getCountData = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_MAIN_URL}/Admin/getFiveYearData`, filter)
  }

  const feedbackModels = ["StudentFeedback", "AlumniFeedback", "TeacherFeedback", "ParentFeedback", "EmployerFeedback", "ExpertFeedback", "FeedbackStudentSatisfactionSurvey"]

  const getTileData = async (tdData, year, model) => {
    if (!(feedbackModels.includes(model)) && tdData !== 0 &&  !(isNaN(tdData))) {
      setModel(model)
      setTileDataLoading(true)
      const yearFilter = year==="Total"?fiveYears: [year]
      const Filter = schoolName === "All Schools" ? { year: {$in: yearFilter}, model } : { year: {$in: yearFilter}, schoolName, model }
      axios.post(`${process.env.REACT_APP_MAIN_URL}/Admin/getNumaricalTileData`, Filter)
        .then((res) => {
          const { status, data } = res
          if (status === 200) {
            setModule(data.module)
            setProof(data.proof)
            setTileData(data?.data)
            setOpen(true)
            setTileDataLoading(false)
          }
          else if (status === 500) {
            setTileDataLoading(false)
            toast.error('Error while get data...')
          }
        })
    }
    else if (tdData === 0 || isNaN(tdData)) {
      toast.success("No data available")
    }
    else if (feedbackModels.includes(model)) {
      if(schoolName==="All Schools" || year==="Total"){
        toast.error('Feedback is only avalable for single School and single year.')
      }
      else{
        if(model!=="FeedbackStudentSatisfactionSurvey"){
  
          const userSelecter= {"StudentFeedback": "Student", "AlumniFeedback": "Alumni", "TeacherFeedback": "Teacher", "ParentFeedback": "Parent", "EmployerFeedback": "Employer", "ExpertFeedback": "Expert",}
          window.open(`/feedback/generateFeedbackReport/${schoolName}/${userSelecter[model]}/${year}`, '_blank');
        }
        else if(model==="FeedbackStudentSatisfactionSurvey"){
          window.open(`/SSS/report/${schoolName}/${year}`, '_blank')
        }
      }
    }
  }

  const pdfHandler = () => {
    setReportLoading(true)
    axios.post(`${process.env.REACT_APP_MAIN_URL}/admin/pdf/numericalData`, { schoolName })
      .then(function (res) {
        if (res.data.status === 'generated') {
          setReportLoading(false)
          toast.success('File generated successfully');
          window.open(`${process.env.REACT_APP_MAIN_URL}/downloadPdf/${res.data.fileName}`, '_blank');
        }
        else if (res.data.status === 'error') {
          setReportLoading(false)
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setReportLoading(false)
        toast.error('Something went wrong');
      })
  }

  const countFilter = schoolName === "All Schools" ? {} : { schoolName }
  const { data, isLoading} = useQuery(['getFiveYearData', schoolName], () => getCountData(countFilter))

  const modelNames = {
    JrfSrf: 'JRF, SRF, Post Doctoral Fellows,',
    Placement: 'Placement',
    ProgressionToHE: 'Progression To HE',
    QualifiedExams: 'Qualified Exams',
    FeedbackStudentSatisfactionSurvey: 'Student Satisfaction Survey',
    AlumniContribution: 'Alumni Contribution',
    StudentFeedback: "Student Feedback", AlumniFeedback: "Alumni Feedback", TeacherFeedback: "Teacher Feedback", ParentFeedback: "Parent Feedback", EmployerFeedback: "Employer Feedback", ExpertFeedback: "Expert Feedback",
    ValueAddedCource: 'Value Added Course',
    Patent: 'Patents',
    ResearchPapers: 'Research Papers',
    ResearchProjects: 'Research Projects',
    BooksAndChapters: 'Books And Chapters',
    PhdAwarded: 'Ph.D. Awarded',
    Financialsupport: 'Financial Support',
    EContentDeveloped: 'E-Content Developed',
    Award: 'Innovation and Research Awards',
    Fellowship: 'Teachers Fellowship',
    AwardRecognition: 'Award Recognition',
    InvitedTalk: 'Invited Talk',
    StudentUser: 'Students',
    CounselingAndGuidance: 'Counseling And Guidance',
    AlumniUser: 'Registered Alumni',
    ConferenceParticipated: 'Conference Participated',
    ConferenceOrganized: 'Conference Organized',
    ConferencesSemiWorkshopOrganized: 'Conferences Seminar Workshop Organized',
    TrainingProgramsOrganized: 'Training Programs Organized',
    ConsultancyServices: 'Consultancy Services',
    Collaboration: 'Collaboration',
    ForeignVisit: 'Foreign Visits',
    UgcSapCasDstFistDBTICSSR: 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR',
    ExtensionActivities: 'Extension Activities',
    Employability: 'Employability Courses',
    ProjectsInternships: 'Projects Internships',
    SkillsEnhancementInitiatives: 'Skills Enhancement Initiatives',
    SyllabusRevision: 'Syllabus Revision',
    ResearchMethodologyWorkshops: 'Research Methodology Workshops',
    MoUs: 'MoUs',
  }

  const excelHandler = async (data) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const columnNames = generateAcademicYears;
      columnNames.unshift('Particulars');
      columnNames.unshift('Sr.No.');

      // Set column headers and formatting
      const headerRow = worksheet.addRow(columnNames);
      headerRow.font = { bold: true, size: 12 };

      // Apply formatting to all cells
      worksheet.columns.forEach((column) => {
        column.width = 20;
        column.alignment = {
          wrapText: true, vertical: 'middle',
          horizontal: 'center'
        };
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
    <div>
      {isDirector && <div className='mb-4'><GoBack pageTitle="School Numerical Dashboard" /></div>}
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
          <div className="mb-2">
            {reportLoading && <ReportLoading loading={reportLoading} />}
            {tileDataLoading && <LinearProgress />}
          </div>
          <p className="text-center my-2 font-bold">{schoolName}</p>
          <div className='table-responsive' style={{ height: School ? 'fit-content' : `90vh` }}>
            <table className='table table-bordered pb-3'>
              <thead className='sticky-top'>
                <tr className='bg-[#ae7e28] text-[#FFF]'>
                  <th>Sr.No.</th>
                  <th>Particulars</th>
                  {generateAcademicYears.map((year) => {
                    return <th>{year}</th>
                  })}
                </tr>
              </thead>

              <tbody>

                {
                  data?.data && Object.keys(modelNames)?.map((tableName, i) => {
                    return <tr key={i}>
                      <td className='text-center font-bold'>{i + 1}</td>
                      <td style={{ background: "#f4f4f4" }} className='font-semibold' > {modelNames?.[tableName]} </td>

                      {generateAcademicYears.map((year) => {
                        return (<td className={`text-center cursor-pointer ${year === 'Total' ? 'font-bold text-[#ae7e28]' : 'text-center'}`} style={{ background: year === 'Total' ? "#f4f4f4" : "" }} onClick={(e) => { let tdData = parseInt(e.target.textContent); getTileData(tdData, year, tableName) }} >{data?.data[tableName][year]}</td>)
                      })}

                    </tr>
                  })
                }

              </tbody>
            </table>
            {isLoading && <div className='flex justify-center'><CircularProgress /></div>}
          </div>
        </div>
        <Dialog fullScreen open={open} onClose={() => { setOpen(false) }}>
          <DialogTitle className='flex gap-4 items-center'>
            <IconButton onClick={() => { setOpen(false) }}>
              <ClearIcon />
            </IconButton>
            {modelNames[model]}
            <div className='flex w-full justify-end'>
              <p className='px-2 mx-2 text-[#ae7e28]' style={{ border: "1px solid", borderRadius: "5px" }}>{tileData?.length}</p>
            </div>
          </DialogTitle>
          <DialogContent>
            {["StudentUser", "AlumniUser"].includes(model)?
              <div className='table-responsive' style={{ height: "100%" }}>
                <table className="table">
                  <thead className="sticky-top" style={{ background: "#ae7e28", color: '#FFF' }}>
                    <tr>
                      <th>Sr. No.</th>
                      <th>profile Pic</th>
                      <th>Name</th>
                      <th>School</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Eanroled Program</th>
                      <th>{`Program ${model==="StudentUser"?'Enroled':'completed'} on`}</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      tileData?.map((item, index) => <tr>
                        <td>{index + 1}</td>
                        <td><Avatar src={`${process.env.REACT_APP_MAIN_URL}/showFile/${item.photoURL}/student`} /></td>
                        <td>{`${item.salutation} ${item.name}`}</td>
                        <td>{item.schoolName}</td>
                        <td>{item.gender}</td>
                        <td>{item.email}</td>
                        <td>{item.programGraduated}</td>
                        <td>{model==="StudentUser"?item.programEnroledOn:item.programCompletedOn}</td>
                      </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              : <AdminTable data={tileData} tableHead={tableHead[model]} proof={proof} serviceName={module} Heading={modelNames[model]} SendReq={model} />}
          </DialogContent>
        </Dialog>
      </AdminDrower>
    </div>
  )
}

export default AdminNumaricalData

export { tableHead }