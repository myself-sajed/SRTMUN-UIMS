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
import AdminFeedbackStatus from '../services/admin/pages/AdminFeedbackStatus'
import FeedbackReport from '../templates/feedback/FeedbackReport'
import ExpertFeedback from '../services/feedback/pages/ExpertFeedback'
import NSSLogin from '../services/nss/pages/NSSLogin'
import NSSStudentAdmission from '../services/nss/pages/NSSStudentAdmission'
import ActionOnFeedback from '../services/feedback/pages/ActionOnFeedback'
import StudentResume from '../templates/student/StudentResume'



const RoutesHandler = () => {

    const navigate = useNavigate()

    return (
        <div className='mr-3 ml-3 sm:mx-3 md:mx-10 lg:mx-10 xl:mx-20'>

            <Navbar />

            <Routes>
                <Route path="/" exact element={<Index />} />
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
                <Route path="/director-login" exact element={<DirectorLogin />} />
                <Route path="/faculty-registration" exact element={<FacultyRegistration />} />
                <Route path="/contractual-faculty-registration" exact element={<ContractualFacultyRegistration />} />
                <Route path="/changePassword" exact element={<><NavTools /><ChangePassword /></>} />
                <Route path="/faculty/service/generateFacultyReport" exact element={<CustomReport />} />
                <Route path="/viewFile" exact element={<ViewFile />} />
                <Route path="/director/viewFile/:fileName" exact element={<DirectorViewFile />} />
                <Route path="/*" exact element={<PageNotFound />} />
                <Route path="/test" exact element={<Test />} />
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
                <Route path="/IQAC-NAAC/DEVELOPERS" exact element={<DeveloperServices />} />



                <Route path='/director' element={<DirectorHome />} />
                <Route path='/director/sdm' element={<DirectorMain />} />
                <Route path='/director/ssm' element={<DirectorSSM />} />
                <Route path='/director-registration' element={<DirectorRegistration />} />

                {/* report routes */}
                <Route path="/report/CASReport/:userId/:selectedYear/:forPrintOut" exact element={<CASReport />} />
                <Route path="/report/PBASReport/:userId/:selectedYear/:forPrintOut" exact element={<PBASReport />} />
                <Route path="/report/facultyReport/:userId/:otherOptions" exact element={<FacultyReport />} />
                <Route path="/report/AAAReport/:department/:selectedYear" exact element={<AAAReport />} />

                {/* main dashboard routes */}
                <Route path="/dashboard/select-department/:serviceName" exact element={<AllDepartments />} />
                <Route path="/dashboard/:school" exact element={<AllFaculties />} />
                <Route path="/dashboard/faculty/:userId" exact element={<Faculty />} />
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

                {/* AQAR  */}
                <Route path="/faculty/service/aqar-report" exact element={<AQARHome auth={useAuth} />} />
                <Route path="/director/service/aqar-report" exact element={<AQARHome userType='director' auth={useDirectorAuth} />} />
                <Route path="/:userType/service/generateAQARReport" exact element={<GenerateAQARReport
                    auth={{ faculty: useAuth, director: useDirectorAuth }} />} />

                {/* SERVICE STATUS */}
                <Route path="/director/service/status" exact element={<DirectorReportStatus />} />

                {/* NSS Service */}
                <Route path="/nss-login" exact element={<NSSLogin />} />
                <Route path="/nss/student-admission" exact element={<NSSStudentAdmission />} />


            </Routes>


        </div>
    )
}

export default RoutesHandler
