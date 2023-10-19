import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: 'Sr.No.',"userId.name": "Name Of Faculty", "userId.department": "School Of Faculty" , degreeName: 'Research Degree', title: 'Title', subject: 'Subject', university: 'University', awardDate: 'Award Year', Proof: 'Uploaded Proof'}
const ResearchDegrees = ({id, setState, yearFilter, schoolName, Heading, setLoaded }) => {

    const SendReq = "Degree"
  const module = "Admin"

  let condition = schoolName==='All Schools'? null :{department: schoolName}

  const params = { model: SendReq, id: "", module, filterConditios: condition }

  const { data, isLoading } = useQuery([SendReq, params], () => getReq(params))

  useEffect(() => {
    setState((pri) => {
      return {
        ...pri,
        [id]: data?.data
      }
    })
    if (!isLoading) {
      setLoaded((pre) => {return{...pre,[id]: true}});
    }
  }, [data && data])

  return (
      <AdminAcordinTable  Heading='Research Degrees' data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} module='faculty' isLoading={isLoading} />
  
  )
}

export default ResearchDegrees
export { tableHead }