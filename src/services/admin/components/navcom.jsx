// icons
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// import AdminResearchDegrees from "../tables/AdminResearchDegrees"


import AdminFaculty from '../pages/AdminFaculty';
import AdminDirector from '../pages/AdminDirector';
import AdminAlumni from '../pages/AdminAlumni';
import AdminStudent from '../pages/AdminStudent';
import AdminDashboard from '../pages/AdminDashboard';
import AdminMore from '../pages/AdminMore';

// import AppointmentsHeldPrior from '../tables/AppointmentsHeldPrior';
import StatusPage from '../../status/pages/StatusPage';
import useAdminAuth from '../../../hooks/useAdminAuth';
import AdminReportStatus from '../pages/AdminReportStatus';
import AdminFeedbackStatus from '../pages/AdminFeedbackStatus';
import AdminNumaricalData from '../pages/AdminNumaricalData';
// import EContentDeveloped from '../tables/EContentDeveloped';
// import Faculties from '../table2/Faculties';
// import Qualification from '../table2/Qualification';


const navcom = [

]



const DashbordButtons = [
    { element: <AdminDashboard />, title: "Dashboard", name: "Dashboard", },
    { element: <AdminFaculty />, title: "Faculties", name: "Faculties", },
    { element: <AdminDirector />, title: "Directors", name: "Directors", },
    { element: <AdminNumaricalData />, title: "Numarical Data", name: "Numarical Data", },
    { element: <AdminReportStatus />, title: "Report Status", name: "Report Status", },
    { element: <AdminFeedbackStatus />, title: "Feedback Status", name: "Feedback Status", },
    { element: <AdminAlumni />, title: "Alumni", name: "Alumnis", },
    { element: <AdminStudent />, title: "Students", name: "Students", },
    { element: <AdminMore />, title: "More", name: "More", },
]

export default navcom
export { DashbordButtons }