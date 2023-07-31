//Icons

import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';

//components

import StudentJRFSRF from "../pages/StudentJRFSRF";
import CombineQualification from '../pages/CombineQualification';

const PhDStudent = [
    {
        element: <CombineQualification />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentQualification',
        value: 'Qualification',
    },
    {
        element: <StudentJRFSRF />,
        icon: <PersonSearchRoundedIcon style={{ fontSize: '20px', color: "#1E3A8A" }} />,
        name: 'studentJRFSRF',
        value: 'JRF, SRF, Post Doctoral Fellows, Research Associate',
    },
]
export default PhDStudent;