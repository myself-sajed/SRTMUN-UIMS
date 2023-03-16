import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: 'Sr.No.',"userId.username": "Username","userId.name": "Name Of Faculty", "userId.department": "School Of Faculty" , degreeName: 'Research Degree', title: 'Title', subject: 'Subject', university: 'University', awardDate: 'Award Year', Proof: 'Uploaded Proof'}
const ResearchDegrees = ({id, setState, yearFilter, schoolName}) => {

    const SendReq = "Degree"
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
      <AdminAcordinTable  Heading='Research Degrees' data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} module='faculty' isLoading={isLoading} />
  
  )
}

export default ResearchDegrees