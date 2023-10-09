import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CustomReport from '../services/faculty/pages/CustomReport'
import FacultyLogin from '../services/faculty/pages/FacultyLogin'
import ChangePassword from '../services/faculty/pages/ChangePassword'
import Main from './Main'
import NavTools from '../components/NavTools'
import ViewFile from './ViewFile'
import PageNotFound from './PageNotFound'
import Index from './Index'
import LoadingPage from '../components/LoadingPage'
import CasReportHome from '../services/faculty/reports/cas/CasReportHome'
import GenerateCASPage from '../services/faculty/reports/cas/report/GenerateCASPage'
import DirectorViewFile from '../services/director/pages/DirectorViewFile'
import DirectorLogin from '../services/director/pages/DirectorLogin'
import AdminLogin from '../services/admin/pages/AdminLogin'
import Home from '../services/faculty/pages/Home'
import Test from './Test'
import AuditHome from '../services/director/reports/academic-audit/AuditHome'
import DirectorHome from '../services/director/pages/Home'
import DirectorMain from '../services/director/pages/DirectorMain'
import AlumniLogin from '../services/alumni/pages/AlumniLogin'
import AlumniHome from '../services/alumni/pages/Home'
import AlumniMain from '../services/alumni/pages/AlumniMain'
import StudentLogin from '../services/student/pages/StudentLogin'
import StudentRegister from '../services/student/pages/StudentRegistration'
import StudentHome from '../services/student/pages/StudentHome'
import StudentMain from '../services/student/pages/StudentMain'



// reports
import CASReport from '../templates/faculty/cas-report/CASReport'
import PBASReport from '../templates/faculty/pbas-report/PBASReport'
import FacultyReport from '../templates/faculty/faculty-report/FacultyReport'
import AllFaculties from '../services/dashboard/pages/AllFaculties'
import AllDepartments from '../services/dashboard/pages/AllDepartments'
import Faculty from '../services/dashboard/pages/Faculty'
import AllAlumni from '../services/dashboard/pages/AllAlumni'
import PbasReportHome from '../services/faculty/reports/pbas/PbasReportHome'
import GeneratePBASPage from '../services/faculty/reports/pbas/report/GeneratePBASPage'
import AllStudents from '../services/dashboard/pages/AllStudents'
import AlumniModelWise from '../services/dashboard/pages/AlumniModelWise'
import DirectorRegistration from '../services/director/pages/DirectorRegistration'
import AAAReport from '../templates/director/aaa-report/AAAReport'
import GenerateAAAPage from '../services/director/reports/academic-audit/report/GenerateAAAPage'
import FacultyRegistration from '../services/faculty/pages/FacultyRegistration'
import AlumniRegistration from '../services/alumni/pages/AlumniRegistration'
import ContractualFacultyRegistration from '../services/faculty/pages/ContractualFacultyRegistration'
import ForgotPassword from './ForgotPassword'
import DeveloperServices from './DeveloperServices'
import OtherDashboardData from '../services/dashboard/pages/OtherDashboardData'
import DirectorDashboardData from '../services/dashboard/pages/DirectorDashboardData'
import AdminMain from '../services/admin/pages/AdminMain'
import NewsPage from '../services/news/pages/NewsPage'
import PROLogin from '../services/news/pages/PROLogin'
import PROEditor from '../services/news/pages/PROEditor'
import SingleNews from '../services/news/pages/SingleNews'
import PROHome from '../services/news/pages/PROHome'
import DirectorSSM from '../services/director/pages/DirectorSSM'
import Gallery from '../services/photogallery/pages/Gallery'
import AddEvent from '../services/photogallery/pages/AddEvent'
import EventsPage from '../services/photogallery/pages/EventsPage'
import SchoolInformation from '../services/dashboard/pages/SchoolInformation'
import StudentFeedback from '../services/feedback/pages/StudentFeedback'
import AQARHome from '../services/faculty/reports/aqar/pages/AQARHome'
import useAuth from '../hooks/useAuth'
import useDirectorAuth from '../hooks/useDirectorAuth'
import TeacherFeedback from '../services/feedback/pages/TeacherFeedback'
import AlumniFeedback from '../services/feedback/pages/AlumniFeedback'
import ParentFeedback from '../services/feedback/pages/ParentFeedback'
import EmployerFeedback from '../services/feedback/pages/EmployerFeedback'
import StudentResponse from '../services/feedback/pages/StudentResponse'
import OtherReponses from '../services/feedback/pages/OtherReponses'
import GenerateAQARReport from '../services/faculty/reports/aqar/pages/GenerateAQARReport'
import StatusPage from '../services/status/pages/StatusPage'
import GenerateFeedbackLink from '../services/feedback/pages/GenerateFeedbackLink'
import GoToResponse from '../services/feedback/pages/GoToResponse'
import useAdminAuth from '../hooks/useAdminAuth'
import FeedbackRedirect from '../services/feedback/pages/FeedbackRedirect'
import FeedbackDashboard from '../services/feedback/pages/FeedbackDashboard'
import DirectorReportStatus from '../services/director/pages/DirectorReportStatus'
import FeedbackReport from '../templates/feedback/FeedbackReport'
import ExpertFeedback from '../services/feedback/pages/ExpertFeedback'
import NSSLogin from '../services/nss/pages/NSSLogin'
import NSSStudentAdmission from '../services/nss/pages/NSSStudentAdmission'
import ActionOnFeedback from '../services/feedback/pages/ActionOnFeedback'
import StudentResume from '../templates/student/StudentResume'
import DirectorFRCC from '../services/director/pages/DirectorFRCC'
import ProgramHome from '../services/programs/pages/ProgramHome'
import ProgramRegistration from '../services/programs/pages/ProgramRegistration'
import AddProgram from '../services/programs/pages/AddProgram'
import ProgramFlyer from '../services/programs/pages/ProgramFlyer'
import SingleProgram from '../services/programs/pages/SingleProgram'
import RegistrationAck from '../services/programs/pages/RegistrationAck'
import RegistrationDetails from '../services/programs/pages/RegistrationDetails'
import AddProgramPhotos from '../services/programs/pages/AddProgramPhotos'
import YFCollegeRegistration from '../services/youthfestival/pages/YFCollegeRegistration'
import YFCollegeHome from '../services/youthfestival/pages/YFCollegeHome'
import YFCollegeLogin from '../services/youthfestival/pages/YFCollegeLogin'
import YFForm from '../services/youthfestival/pages/YFForm'
import DSDLogin from '../services/dsd/pages/DSDLogin'
import KRCLogin from '../services/krc/pages/KRCLogin'
import ExamLogin from '../services/exam/pages/ExamLogin'
import SportsLogin from '../services/sports/pages/SportsLogin'
import PlacementLogin from '../services/placement/pages/PlacementLogin'
import DSDHome from '../services/dsd/pages/DSDHome'
import KRCHome from '../services/krc/pages/KRCHome'
import NSSHome from '../services/nss/pages/NSSHome'
import SportsHome from '../services/sports/pages/SportsHome'
import ExamHome from '../services/exam/pages/ExamHome'
import PlacementHome from '../services/placement/pages/PlacementHome'
import Test2 from '../inputs/Test2'
import StudentSatisfactionSurvey from '../services/feedback/pages/StudentSatisfactionSurvey'
import DSDAQAR from '../services/dsd/pages/DSDAQAR'
import SportsAQAR from '../services/sports/pages/SportsAQAR'
import KRCAQAR from '../services/krc/pages/KRCAQAR'
import NSSAQAR from '../services/nss/pages/NSSAQAR'
import ExamAQAR from '../services/exam/pages/ExamAQAR'
import PlacementAQAR from '../services/placement/pages/PlacementAQAR'
import OtherAQAR from '../services/other/pages/OtherAQAR'
import ProgramFeedback from '../services/programs/pages/ProgramFeedback'
import ProgramFeedbackDetails from '../services/programs/pages/ProgramFeedbackDetails'
import FeedbackAck from '../services/programs/pages/FeedbackAck'
import YFGenerateReport from '../services/youthfestival/pages/YFGenerateReport'
import YFApplicationForm from '../templates/youthfestival/YFApplicationForm'
import PDFNumericalTable from '../services/admin/pages/PDFNumericalTable'
import SSSReport from '../templates/feedback/SSSReport'
import IILLogin from '../services/iil/pages/IILLogin'
import IILHome from '../services/iil/pages/IILHome'
import IILAQAR from '../services/iil/pages/IILAQAR'
import YouthDashboard from '../services/dsd/pages/YouthDashboard'
import DirectorRC from '../services/director/pages/DirectorRC'
import DirectorSSS from '../services/director/pages/DirectorSSS'
import SkillLogin from '../services/skilldevelopment/pages/SkillLogin'
import SkillsHome from '../services/skilldevelopment/pages/SkillsHome'
import SkillFillData from '../services/skilldevelopment/pages/SkillFillData'
import PGLogin from '../services/pgsection/pages/PGLogin'
import PGHome from '../services/pgsection/pages/PGHome'
import APDSLogin from '../services/apds/pages/APDSLogin'
import APDSHome from '../services/apds/pages/APDSHome'
import ServicesList from './ServicesList'

let model = "Xyz"
let module = 'abc'
let filter = {}
let tableObj = { name: 'Name', class: 'Class', course: 'Course', rollNo: 'Roll No' }

const RoutesHandler = () => {

    return (
        <div className='mr-3 ml-3 sm:mx-3 md:mx-10 lg:mx-10 xl:mx-20'>

            <Navbar />

            <Routes>
                <Route path="/" exact element={<Index />} />
                <Route path="/services-list" exact element={<ServicesList />} />
                <Route path="/load/:url" exact element={<LoadingPage />} />
                <Route path="/faculty/faculty-profile" exact element={<Main />} />
                <Route path="/faculty-login" exact element={<FacultyLogin />} />
                <Route path="/faculty/service/cas-report" exact element={<CasReportHome />} />
                <Route path="/faculty/service/pbas-report" exact element={<PbasReportHome />} />
                <Route path="/faculty/service/generateCASReport" exact element={<GenerateCASPage />} />
                <Route path="/faculty/service/generatePBASReport" exact element={<GeneratePBASPage />} />
                <Route path="/director/service/generateAAAReport" exact element={<GenerateAAAPage />} />
                <Route path="/faculty" exact element={<Home />} />
                <Route path="/admin-login" exact element={<AdminLogin />} />
                <Route path="/Test2" exact element={<Test2 />} />
                <Route path="/director-login" exact element={<DirectorLogin />} />
                <Route path="/faculty-registration" exact element={<FacultyRegistration />} />
                <Route path="/contractual-faculty-registration" exact element={<ContractualFacultyRegistration />} />
                <Route path="/changePassword" exact element={<><NavTools /><ChangePassword /></>} />
                <Route path="/faculty/service/generateFacultyReport" exact element={<CustomReport />} />
                <Route path="/viewFile" exact element={<ViewFile />} />
                <Route path="/director/viewFile/:fileName" exact element={<DirectorViewFile />} />
                <Route path="/*" exact element={<PageNotFound />} />
                <Route path="/test" exact element={<Test model={model} module={module} filter={filter} tableObj={tableObj} />} />
                <Route path="/director/service/academic-audit" exact element={<AuditHome />} />
                <Route path="/alumni-login" exact element={<StudentLogin />} />
                <Route path="/alumni-registration" exact element={<StudentRegister />} />
                <Route path="/alumni" exact element={<StudentHome />} />
                <Route path="/alumni/alumni-status" exact element={<AlumniMain />} />
                <Route path="/student-login" exact element={< StudentLogin />} />
                <Route path="/student-registration" exact element={<StudentRegister />} />
                <Route path='/student' exact element={<StudentHome />} />
                <Route path='/student/resume' exact element={<StudentResume />} />
                <Route path="/student/student-status" exact element={<StudentMain />} />
                <Route path='/admin' exact element={<AdminMain />} />
                <Route path='/admin/numericalData/:School' exact element={<PDFNumericalTable />} />
                <Route path='/director/numericalData/:School' exact element={<PDFNumericalTable isDirector={true} />} />
                <Route path="/IQAC-NAAC/DEVELOPERS" exact element={<DeveloperServices />} />



                <Route path='/director' element={<DirectorHome />} />
                <Route path='/director/sdm' element={<DirectorMain />} />
                <Route path='/director/fdc' element={<DirectorFRCC />} />
                <Route path='/director/ssm' element={<DirectorSSM />} />
                <Route path='/director/research-center' element={<DirectorRC />} />
                <Route path='/director-registration' element={<DirectorRegistration />} />
                <Route path='/director/sss/:schoolName' element={<DirectorSSS />} />

                {/* report routes */}
                <Route path="/report/CASReport/:userId/:selectedYear/:forPrintOut" exact element={<CASReport />} />
                <Route path="/report/PBASReport/:userId/:selectedYear/:forPrintOut" exact element={<PBASReport />} />
                <Route path="/report/facultyReport/:userId/:otherOptions" exact element={<FacultyReport />} />
                <Route path="/report/AAAReport/:department/:selectedYear" exact element={<AAAReport />} />

                {/* main dashboard routes */}
                <Route path="/dashboard/select-department/:serviceName" exact element={<AllDepartments />} />
                <Route path="/dashboard/:school" exact element={<AllFaculties />} />
                <Route path="/dashboard/faculty/:facultyName" exact element={<Faculty />} />
                <Route path="/dashboard/:school/students" exact element={<AllStudents />} />
                <Route path="/dashboard/:school/alumni" exact element={<AllAlumni />} />
                <Route path="/dashboard/schoolInformation/:schoolName" exact element={<SchoolInformation />} />
                <Route path="/dashboard/alumni/:school/:model/:title" exact element={<AlumniModelWise />} />
                <Route path="/dashboard/information/:school/:model/:title" exact element={<OtherDashboardData />} />
                <Route path="/dashboard/director/information/:school/:model/:title" exact element={<DirectorDashboardData />} />

                {/* Forgot Password */}
                <Route path="/services/forgot-password/:serviceName" exact element={<ForgotPassword />} />

                {/* News */}
                <Route path='/news' exact element={<NewsPage />} />
                <Route path='/pro-login' exact element={<PROLogin />} />
                <Route path='/pro' exact element={<PROHome />} />
                <Route path='/pro-editor' exact element={<PROEditor />} />
                <Route path='/news/:newsId' exact element={<SingleNews />} />

                {/* Photo Gallery */}
                <Route path='/event/:eventId' exact element={<Gallery />} />
                <Route path='/upload-event' exact element={<AddEvent />} />
                <Route path='/events' exact element={<EventsPage />} />


                {/* Feedback System: PART I : QUESTIONS */}
                <Route path='/feedback/student' exact element={<StudentFeedback />} />
                <Route path='/feedback/teacher' exact element={<TeacherFeedback />} />
                <Route path='/feedback/alumni' exact element={<AlumniFeedback />} />
                <Route path='/feedback/parent' exact element={<ParentFeedback />} />
                <Route path='/feedback/employer' exact element={<EmployerFeedback />} />
                <Route path='/feedback/expert' exact element={<ExpertFeedback />} />
                <Route path='/feedback/:userType/:year/:school' exact element={<FeedbackRedirect />} />



                {/* Feedback System: PART II : RESPONSE */}
                <Route path='/feedback/response/student/:academicYear/:schoolName' exact
                    element={<StudentResponse />} />
                <Route path='/feedback/response/:responseType/:academicYear/:schoolName' exact element={<OtherReponses />} />

                {/* Feedback System: PART III : Pages */}
                <Route path="/director/service/feedback/generateFeebackLinks" exact element={<GenerateFeedbackLink />} />
                <Route path="/director/service/feedback/dashboard" exact element={<FeedbackDashboard />} />
                <Route path="/director/service/feedback/action" exact element={<ActionOnFeedback />} />
                <Route path="director/feedback/dashboard" exact element={<StatusPage auth={{ director: useDirectorAuth }} />} />
                <Route path="/feedback/generateFeedbackReport/:schoolName/:feedbackUser/:academicYear" exact element={<FeedbackReport />} />
                <Route path="/SSS/report/:schoolName/:academicYear" exact element={<SSSReport />} />

                {/* AQAR  */}
                <Route path="/faculty/service/aqar-report" exact element={<AQARHome auth={useAuth} />} />
                <Route path="/director/service/aqar-report" exact element={<AQARHome userType='director' auth={useDirectorAuth} />} />
                <Route path="/:userType/service/generateAQARReport" exact element={<GenerateAQARReport
                    auth={{ faculty: useAuth, director: useDirectorAuth }} />} />

                {/* SERVICE STATUS */}
                <Route path="/director/service/status" exact element={<DirectorReportStatus />} />


                {/* Workshop Service */}
                <Route path="/programs" exact element={<ProgramHome />} />
                <Route path="/program/:programId/program-flyer" exact element={<ProgramFlyer />} />
                <Route path="/program/:programId" exact element={<SingleProgram />} />
                <Route path="/program/:programId/registration-form" exact element={<ProgramRegistration />} />
                <Route path="/program/:programId/registration-details" exact element={<RegistrationDetails />} />
                <Route path="/program/:programId/registration-details/participants" exact element={<RegistrationDetails forPublic={true} />} />
                <Route path="/program/:programId/feedback-details" exact element={<ProgramFeedbackDetails />} />
                <Route path="/program/:programId/program-feedback" exact element={<ProgramFeedback />} />
                <Route path="/program/:programId/upload-program-photos" exact element={<AddProgramPhotos />} />
                <Route path="/program/:programId/registration-form/acknowledgement" exact element={<RegistrationAck />} />
                <Route path="/program/:programId/feedback-form/acknowledgement" exact element={<FeedbackAck />} />
                <Route path="/addProgram" exact element={<AddProgram />} />

                {/* Youth Festival Service */}
                <Route path="/youthfestival/college-registration" exact element={<YFCollegeRegistration />} />
                <Route path="/youthfestival/college-login" exact element={<YFCollegeLogin />} />
                <Route path="/youthfestival" exact element={<YFCollegeHome />} />
                <Route path="/youthfestival/participant-details-form" exact element={<YFForm />} />
                <Route path="/youthfestival/generate-report" exact element={<YFGenerateReport />} />
                <Route path="/youthfestival/application-form/:collegeId/:academicYear" exact element={<YFApplicationForm />} />

                {/* NSS Service */}
                <Route path="/nss-login" exact element={<NSSLogin />} />
                <Route path="/nss" exact element={<NSSHome />} />
                <Route path="/nss/aqar" exact element={<NSSAQAR />} />
                <Route path="/nss/student-admission" exact element={<NSSStudentAdmission />} />

                {/* DSD */}
                <Route path="/dsd-login" exact element={<DSDLogin />} />
                <Route path="/dsd" exact element={<DSDHome />} />
                <Route path="/dsd/aqar" exact element={<DSDAQAR />} />
                <Route path="/dsd/youthfestival/dashboard" exact element={<YouthDashboard />} />

                {/* IIL */}
                <Route path="/iil-login" exact element={<IILLogin />} />
                <Route path="/iil" exact element={<IILHome />} />
                <Route path="/iil/aqar" exact element={<IILAQAR />} />

                {/* KRC */}
                <Route path="/krc-login" exact element={<KRCLogin />} />
                <Route path="/krc" exact element={<KRCHome />} />
                <Route path="/krc/aqar" exact element={<KRCAQAR />} />

                {/* EXAM BOEE */}
                <Route path="/boee-login" exact element={<ExamLogin />} />
                <Route path="/boee" exact element={<ExamHome />} />
                <Route path="/boee/aqar" exact element={<ExamAQAR />} />

                {/* SPORTS */}
                <Route path="/sports-login" exact element={<SportsLogin />} />
                <Route path="/sports" exact element={<SportsHome />} />
                <Route path="/sports/aqar" exact element={<SportsAQAR />} />

                {/* PG Section */}
                <Route path="/pg-login" exact element={<PGLogin />} />
                <Route path="/pg" exact element={<PGHome />} />

                {/* PG Section */}
                <Route path="/apds-login" exact element={<APDSLogin />} />
                <Route path="/apds" exact element={<APDSHome />} />

                {/* SKILLS */}
                <Route path="/competativeExams-training-skillsDevelopment-login" exact element={<SkillLogin />} />
                <Route path="/competativeExams-training-skillsDevelopment" exact element={<SkillsHome />} />
                <Route path="/competativeExams-training-skillsDevelopment/data-center" exact element={<SkillFillData />} />

                {/* Training and placements */}
                <Route path="/training-and-placement-login" exact element={<PlacementLogin />} />
                <Route path="/training-and-placement" exact element={<PlacementHome />} />
                <Route path="/training-and-placement/aqar" exact element={<PlacementAQAR />} />

                {/* Other AQAR */}
                <Route path="/expenditure-and-demand-ratio/aqar" exact element={<OtherAQAR />} />

                {/* Student Satisfaction Survey */}
                <Route path="/student-satisfaction-survey" exact element={<StudentSatisfactionSurvey />} />

            </Routes>


        </div>
    )
}

export default RoutesHandler
