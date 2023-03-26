import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';
import AdminExcelExoprt from '../components/AdminExcelExoprt';

const tableHead = {
   index: 'Sr.No.',
   'userId.username': 'Username',
   'userId.name': 'Faculty Name',
   'userId.department': 'Faculty School',
   programTitle: 'Program Title',
   organizingInstitute: 'Organizing Institute',
   fundedBy: 'Funded By',
   isNational: 'National / International',
   year: 'Year',
   proof: 'Uploaded Proof',
}

const ConferencePartipeted = ({id, setState, yearFilter, schoolName, Heading}) => {
  const SendReq = 'ConferenceParticipated'
  const module = 'Admin'
  
let condition = schoolName==='All Schools'? null :{department: schoolName}
let filter = yearFilter.length === 0? null : {year:{$in: yearFilter}}

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
    <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} year='year' module='faculty' isLoading={isLoading} />
  )
}

export default ConferencePartipeted