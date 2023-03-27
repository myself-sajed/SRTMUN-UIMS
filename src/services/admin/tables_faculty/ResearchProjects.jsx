import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
   index: 'Sr.No.',
   'userId.username': 'Username',
   'userId.name': 'Faculty Name',
   'userId.department': 'Faculty School',
   schemeName: "Scheme or Project Name",
   programTitle: "Program Title",
   principalName: "Principal Invigilator Name",
   fundingName: "Funding Agency Name",
   isGov: "Wheather Government / Non-Government",
   department: "Department",
   awardYear: "Award Year",
   projectDuration: "Project Duration (In Year)",
   providedFunds: "Provided Funds (INR)",
   fundType: "Wheather Major / Minor",
   status: "Status",
   year: "Year",
   proof: 'Uploaded Proof',
} 

const ResearchProjects = ({id, setState, yearFilter, schoolName, Heading}) => {
  const SendReq = 'ResearchProject'
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
  }, [data && data])

  return (
    <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} year='year' module='faculty' isLoading={isLoading} />
  )
}

export default ResearchProjects