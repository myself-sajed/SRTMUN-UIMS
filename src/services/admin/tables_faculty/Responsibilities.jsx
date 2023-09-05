import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
   index: 'Sr.No.',
    
   'userId.name': 'Faculty Name',
   'userId.department': 'Faculty School',
   committeeName: 'Name of the Committee',
   designation: 'Designation',
   institute: 'Hosting institute name',
   year: 'Year',   
   proof: 'Uploaded Proof',
}

const Responsibilities = ({id, setState, yearFilter, schoolName, Heading, setLoaded }) => {
  const SendReq = 'Responsibilities'
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

export default Responsibilities