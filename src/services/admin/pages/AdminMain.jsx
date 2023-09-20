import React from 'react'
import { DashbordButtons } from '../components/navcom'
import AdminHeader from './AdminHeader'
import { useSelector } from "react-redux";

import AdminDashboard from "./AdminDashboard"
import AdminFaculty from "./AdminFaculty"
import AdminDirector from "./AdminDirector"
import AdminAlumni from "./AdminAlumni"
import AdminStudent from "./AdminStudent"
import AdminMore from "./AdminMore"
import useAdminAuth from '../../../hooks/useAdminAuth';
import StatusPage from '../../status/pages/StatusPage';
import AdminReportStatus from './AdminReportStatus';
import AdminFeedbackStatus from './AdminFeedbackStatus';
import AdminNumaricalData from './AdminNumaricalData';
import AdminResearchCenter from './AdminResearchCenter';


const AdminMain = () => {
  const ComponentSetter = { "Dashboard": <AdminDashboard />, "Faculties": <AdminFaculty />, "Directors": <AdminDirector />, "Numerical Dashboard": <AdminNumaricalData />, "Research Center": <AdminResearchCenter/>, "Report Status": <AdminReportStatus />, "Feedback Status": <AdminFeedbackStatus />, "Alumnis": <AdminAlumni />, "Students": <AdminStudent />, "More": <AdminMore /> }

  // title('SDM | School Data Management')
  const AdminActive = useSelector(state => state.adminActive.adminActive)
  return (<>
    <div className="mb-3">
      <AdminHeader />
    </div>

    {
      DashbordButtons?.map(item => item.name === AdminActive ? <div key={item}>{ComponentSetter[item.name]}</div> : null)
    }
  </>)
}

export default AdminMain