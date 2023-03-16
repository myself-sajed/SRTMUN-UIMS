// icons
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// import AdminResearchDegrees from "../tables/AdminResearchDegrees"


import AdminFaculty from '../pages/AdminFaculty';
import AdminDirector from '../pages/AdminDirector';
import AdminAlumni from '../pages/AdminAlumni';
import AdminStudent from '../pages/AdminStudent';
import AdminDashboard from '../pages/AdminDashboard';
import AdminMore from '../pages/AdminMore';

import AppointmentsHeldPrior from '../tables/AppointmentsHeldPrior';
// import EContentDeveloped from '../tables/EContentDeveloped';
// import Faculties from '../table2/Faculties';
// import Qualification from '../table2/Qualification';


const navcom = [
    // {
    //     element: <Faculties />, 
    //     value: 'Faculties',  
    // },
    // ,{

    //     element: <Qualification />,
    //     value: 'Qualifications',
    // },
    // {
    //     element: <EContentDeveloped/>,
    //     value:'E-Content Developed',
    // },
    // {
    //     element: <A/>,
    //     value:'',
    // },
    // {
    //     element: <A/>,
    //     value:'',
    // },
    // {
    //     element: <A/>,
    //     value:'',
    // },
    // {
    //     element: <A/>,
    //     value:'',
    // },
    // {
    //     element: <A/>,
    //     value:'',
    // },
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