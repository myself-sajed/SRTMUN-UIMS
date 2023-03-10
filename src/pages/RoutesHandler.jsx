import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminNavbar from '../services/admin/components/AdminNavbar'
import Navbar from '../components/Navbar'
import CustomReport from '../services/faculty/pages/CustomReport'
import FacultyLogin from '../services/faculty/pages/FacultyLogin'
import ChangePassword from '../services/faculty/pages/ChangePassword'
import Main from './Main'
import adminTable from '../services/admin/js/adminTable'
import AdminNavTools from '../services/admin/components/AdminNavTools'
import NavTools from '../components/NavTools'
import ViewFile from './ViewFile'
import PageNotFound from './PageNotFound'
import Index from './Index'
import IndexNavbar from '../components/IndexNavbar'
import LoadingPage from '../components/LoadingPage'
import CasReportHome from '../services/faculty/reports/cas/CasReportHome'
import GenerateCASPage from '../services/faculty/reports/cas/report/GenerateCASPage'
import navcom from '../services/director/components/UtilityComponents/navcom'
import Header from '../services/director/components/UtilityComponents/Header'
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



const RoutesHandler = () => {

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
                <Route path="/alumni-login" exact element={<AlumniLogin />} />
                <Route path="/alumni-registration" exact element={<AlumniRegistration />} />
                <Route path="/alumni" exact element={<AlumniHome />} />
                <Route path="/alumni/alumni-status" exact element={<AlumniMain />} />
                <Route path="/student-login" exact element={< StudentLogin />} />
                <Route path="/student-registration" exact element={<StudentRegister />} />
                <Route path='/student' exact element={<StudentHome />} />
                <Route path="/student/student-status" exact element={<StudentMain />} />
                <Route path='/admin' exact element={<AdminMain />} />
                <Route path="/IQAC-NAAC/DEVELOPERS" exact element={<DeveloperServices />} />

                {
                    adminTable.map((item, index) => {
                        return (

                            <Route key={index} path={item.path} element={<><AdminNavTools /> <div className="flex items-start justify-start gap-4 mt-3"><div className="hidden lg:block"><AdminNavbar /></div> {item.component}</div></>} />
                        )
                    })
                }

                <Route path='/director' element={<DirectorHome />} />
                <Route path='/director/sdm' element={<DirectorMain />} />
                <Route path='/director-registration' element={<DirectorRegistration />} />

                {/* report routes */}
                <Route path="/report/CASReport/:userId/:selectedYear" exact element={<CASReport />} />
                <Route path="/report/PBASReport/:userId/:selectedYear" exact element={<PBASReport />} />
                <Route path="/report/facultyReport/:userId/:otherOptions" exact element={<FacultyReport />} />
                <Route path="/report/AAAReport/:department/:selectedYear" exact element={<AAAReport />} />

                {/* main dashboard routes */}
                <Route path="/dashboard/select-department/:serviceName" exact element={<AllDepartments />} />
                <Route path="/dashboard/:school" exact element={<AllFaculties />} />
                <Route path="/dashboard/faculty/:userId" exact element={<Faculty />} />
                <Route path="/dashboard/:school/students" exact element={<AllStudents />} />
                <Route path="/dashboard/:school/alumni" exact element={<AllAlumni />} />
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
                <Route path='/news/:slug' exact element={<SingleNews />} />




            </Routes>


        </div>
    )
}

export default RoutesHandler
