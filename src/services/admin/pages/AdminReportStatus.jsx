import React from 'react'
import AdminDrower from './AdminDrower'
import StatusPage from '../../status/pages/StatusPage'
import useAdminAuth from '../../../hooks/useAdminAuth'

const AdminReportStatus = () => {
  return (
    <div >
      <AdminDrower>
        <div className='sub-main'>
          <StatusPage auth={{ admin: useAdminAuth }} user="admin" />
        </div>
      </AdminDrower>
    </div>
  )
}

export default AdminReportStatus
