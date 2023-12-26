import React from 'react'
import AdminHeader from './AdminHeader'
import { useSelector } from "react-redux";

import AdminDashboard from "./AdminDashboard"
import AdminFaculty from "./AdminFaculty"
import AdminDirector from "./AdminDirector"
import AdminAlumni from "./AdminAlumni"
import AdminStudent from "./AdminStudent"
import AdminMore from "./AdminMore"
import AdminReportStatus from './AdminReportStatus';
import AdminFeedbackStatus from './AdminFeedbackStatus';
import AdminNumaricalData from './AdminNumaricalData';
import AdminResearchCenter from './AdminResearchCenter';
import AdminCombine from './AdminCombine';
import AdminSSS from './AdminSSS';
import AdminOthers from './AdminOthers'


const ComponentSetter = { "Dashboard": <AdminDashboard />, "Faculties": <AdminFaculty />, "Directors": <AdminDirector />, "Numerical Dashboard": <AdminNumaricalData />,"Student Satisfaction Survey": <AdminSSS />, "Research Center": <AdminResearchCenter/>, "Report Status": <AdminReportStatus />, "Feedback Status": <AdminFeedbackStatus />, "Alumnis": <AdminAlumni />, "Students": <AdminStudent />, "Other Section": <AdminOthers/>, "Combine Section": <AdminCombine />, "More": <AdminMore /> }
const AdminMain = () => {
  
  // title('SDM | School Data Management')
  const AdminActive = useSelector(state => state.adminActive.adminActive)
  return (<>
    <div className="mb-3">
      <AdminHeader />
    </div>

    {
      Object.keys(ComponentSetter)?.map(item => item === AdminActive ? <div key={item}>{ComponentSetter[item]}</div> : null)
    }
  </>)
}

export default AdminMain
export {ComponentSetter}