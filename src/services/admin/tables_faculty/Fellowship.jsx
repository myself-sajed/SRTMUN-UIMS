import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
   index: 'Sr.No.',
   'userId.username': 'Username',
   'userId.name': 'Faculty Name',
   'userId.department': 'Faculty School',
   teacherName: 'Name of the teacher awarded national/international fellowship/financial support',
   awardName: 'Name of the award/fellowship',
   awardingAgency: 'Awarding Agency',
   awardYear: 'Award Year',
   isNat: 'National / International',
   year: 'Year',
   proof: 'Uploaded Proof',
}
const Fellowship = ({id, setState, yearFilter, schoolName, Heading}) => {
  const SendReq = 'Fellowship'
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
   <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} year='year' module='faculty'  />
  )
}

export default Fellowship