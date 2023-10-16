import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
   index: 'Sr.No.',
   'userId.name': 'Faculty Name',
   'userId.department': 'Faculty School',
   lectureTitle: 'Title of Lecture/Academic Session',
   seminarTitle: 'Title of Seminar, etc.',
   organizedBy: 'Organized by',
   isNat: 'Type',
   nature: 'Nature',
   year: 'Year',
   proof: 'Uploaded Proof',
}
const InvitedTalks = ({id, setState, yearFilter, schoolName, Heading, setLoaded }) => {
  const SendReq = 'InvitedTalk'
  const module = 'Admin'
  
let condition = schoolName==='All Schools'? null :{department: schoolName}
let filter = yearFilter.length === 0? null : {year: {$in:yearFilter}}

const params = { model: SendReq, id: '', module, filter: filter, filterConditios: condition}
  
  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => getReq(params))

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
    <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} year='year' module='faculty' isLoading={isLoading} />
  )
}

export default InvitedTalks
export { tableHead }