import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
   index: 'Sr.No.',
   'userId.username': 'Username',
   'userId.name': 'Faculty Name',
   'userId.department': 'Faculty School',
   course: 'Course/Paper',
   level: 'Level',
   teachingMode: 'Teaching Mode',
   noOfClasses: 'No of classes alloted per week',
   year: ' Year',
}
const Lactures = ({id, setState, yearFilter, schoolName, Heading }) => {
  const SendReq = 'Lectures'
  const module = 'Admin'
  
let condition = schoolName===""? null :{department: schoolName}
let filter = yearFilter === ""? null : {year: yearFilter}

const params = { model: SendReq, id: '', module, filter: filter, filterConditios: condition}
  
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
    <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq}  tableHead={tableHead} year='year' module='faculty' isLoading={isLoading} />
  )
}

export default Lactures