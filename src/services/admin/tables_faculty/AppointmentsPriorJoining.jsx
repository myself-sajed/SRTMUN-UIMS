import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: 'Sr.No.', "userId.username": "Username", "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", designation: 'Designation', employerName: 'Employer Name', joiningDate: 'From', leavingDate: 'To', salaryWithGrade: 'Salary with Grade', leavingReason: 'Leaving Reason' }

const AppointmentsPriorJoining = ({ id, setState, yearFilter, schoolName, Heading }) => {
  const SendReq = "AppointmentsHeldPrior"
  const module = "Admin"
  let condition = schoolName===""? null :{department: schoolName}

  const params = { model: SendReq, id: "", module, filterConditios: condition }

  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => getReq(params))

  useEffect(() => {
    setState((pri) => {
      return {
        ...pri,
        [id]: data?.data
      }
    })
  }, [data && data])

  return (
    <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} tableHead={tableHead} module="faculty" isLoading={isLoading} />
  )
}

export default AppointmentsPriorJoining