

import AdminFaculty from '../pages/AdminFaculty';
import AdminDirector from '../pages/AdminDirector';
import AdminAlumni from '../pages/AdminAlumni';
import AdminStudent from '../pages/AdminStudent';
import AdminDashboard from '../pages/AdminDashboard';
import AdminMore from '../pages/AdminMore';
import useAdminAuth from '../../../hooks/useAdminAuth';
import AdminReportStatus from '../pages/AdminReportStatus';
import AdminFeedbackStatus from '../pages/AdminFeedbackStatus';
import AdminNumaricalData from '../pages/AdminNumaricalData';
import AdminPrograms from './AdminPrograms';
import AdminResearchCenter from '../pages/AdminResearchCenter';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
// import EContentDeveloped from '../tables/EContentDeveloped';
// import Faculties from '../table2/Faculties';
// import Qualification from '../table2/Qualification';


const navcom = [

]



const DashbordButtons = [
    { element: <AdminDashboard />, title: "Dashboard", name: "Dashboard", },
    { element: <AdminFaculty />, title: "Faculties", name: "Faculties", },
    { element: <AdminDirector />, title: "Directors", name: "Directors", },
    { element: <AdminNumaricalData />, title: "Numerical Dashboard", name: "Numerical Dashboard", },
    { element: <AdminResearchCenter />, title: "Research Center", name: "Research Center", },
    { element: <AdminReportStatus />, title: "Report Status", name: "Report Status", },
    { element: <AdminFeedbackStatus />, title: "Feedback Status", name: "Feedback Status", },
    { element: <GroupsRoundedIcon />, title: "Student Satisfaction Survey", name: "Student Satisfaction Survey", },
    { element: <AdminStudent />, title: "Students", name: "Students", },
    { element: <AdminAlumni />, title: "Alumni", name: "Alumnis", },
    // { element: <AdminPrograms />, title: "University Programs", name: "University Programs", },
    { element: <AdminMore />, title: "More", name: "More", },
]

export default navcom
export { DashbordButtons }