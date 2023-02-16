//Icons
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TaskIcon from '@mui/icons-material/Task';

//components
import Jobs from "../pages/AlumniJobs";
import Business from "../pages/AlumniBusiness";
import HigherEducation from "../pages/AlumniHE";
import ExamQualified from '../pages/AlumniExamQualified';
import AlumniContribution from "../pages/AlumniContribution";

const navcom = [
    
    {
        element: <HigherEducation />,
        icon: <SchoolIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'higherEducation',
        value: 'Higher Education',
    },
    {
        element: <ExamQualified />,
        icon: <TaskIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'examQualified',
        value: 'Exam Qualified',
    },
    {
        element: <Jobs />,
        icon: <WorkIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'jobs',
        value: 'Jobs',
    },
    {
        element: <Business />,
        icon: <BusinessIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'business',
        value: 'Business',
    },
    {
        element: <AlumniContribution />,
        icon: <AccountBalanceWalletIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'alumniContribution',
        value: 'Alumni Contribution',
    },

]
export default navcom;