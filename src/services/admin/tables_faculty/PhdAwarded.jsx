import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
   index: 'Sr.No.',
   'userId.name': 'Faculty Name',
   'userId.department': 'Faculty School',
   scholarName: 'Scholar Name',
   departmentName: 'Department Name',
   guideName: 'Guide Name',
   degreeName: 'Degree',
   awardSubmit: 'Awarded / Submitted',
   thesisTitle: 'Thesis Title',
   yearOfScholar: 'Year of Scholar Registration',
   phdAwardYear: 'Year of Award',
   year: 'Year',
   proof: 'Uploaded Proof',
}

const PhdAwarded = ({id, setState, yearFilter, schoolName, Heading, setLoaded }) => {
  const SendReq = 'PhdAwarded'
  const module = 'Admin'
  
let condition = schoolName==='All Schools'? null :{department: schoolName}
let filter = yearFilter.length === 0? {degreeName: "Ph.D.", awardSubmit: 'Awarded'} : {year: {$in:yearFilter}, degreeName: "Ph.D.", awardSubmit: 'Awarded'}

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

export default PhdAwarded