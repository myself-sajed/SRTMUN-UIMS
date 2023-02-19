// icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import AdminResearchDegrees from "../tables/AdminResearchDegrees"


import AdminFaculty from '../pages/AdminFaculty';
import AdminDirector from '../pages/AdminDirector';
import AdminAlumni from '../pages/AdminAlumni';
import AdminStudent from '../pages/AdminStudent';
import AdminDashboard from '../pages/AdminDashboard';
import AdminMore from '../pages/AdminMore';


const navcom = [
    {
        element: <AdminResearchDegrees />, 
        icon: <EmojiEventsIcon style={{ fontSize: '18px', color:"#1E3A8A" }} />, 
        name: 'FacultyResearchDegrees', 
        value: 'Research Degrees',  
    },
    // ,{},{},{},{},{},{},{},
]



const DashbordButtons = [
    {element: <AdminDashboard/>, title:"Dashboard", name:"Dashboard", }, 
    {element: <AdminFaculty/>, title:"Faculties", name:"Faculties", }, 
    {element: <AdminDirector/>, title:"Directors", name:"Directors", }, 
    {element: <AdminAlumni/>, title:"Alumnis", name:"Alumnis", }, 
    {element: <AdminStudent/>, title:"Students", name:"Students", },
    {element: <AdminMore/>, title:"More", name:"More", },
]

export default navcom 
export { DashbordButtons }