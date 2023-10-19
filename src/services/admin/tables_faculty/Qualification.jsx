import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import AdminAcordinTable from '../components/AdminAcordinTable';
// import AdminExcelExoprt from '../components/AdminExcelExoprt'
// import AdminTable from '../components/AdminTable'

const tableHead = { index: 'Sr.No.', "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", exam: 'Exams', institute: 'Institute/Boards', year: 'Year', percentage: 'Percentage', subjects: 'Subjects', }

const Qualification = ({id, setState, yearFilter, schoolName, Heading, setLoaded }) => {

  const SendReq = "Qualification"
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
    <AdminAcordinTable  Heading='Qualification' data={data?.data} SendReq={SendReq} tableHead={tableHead} module='faculty' isLoading={isLoading} />
    
  )
}
export default Qualification
export { tableHead }