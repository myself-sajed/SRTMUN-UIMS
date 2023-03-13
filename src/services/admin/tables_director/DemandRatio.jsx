import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';


const tableHead = { index: "Sr. no." , SchoolName: 'School',  Programme_Code: "Programme Code" ,  Programme_name: "Programme name" ,  Academic_Year: "Academic Year" , Type_of_program: "Type of Program",  Number_of_seats_available: "Number of seats available" ,  Number_of_eligible_applications: "Number of eligible applications" ,  Number_of_Students_admitted: "Number of Students admitted" ,  Upload_Proof: "Proof" }
function DemandRatio({id, setState, yearFilter, schoolName, Heading}) {

  const SendReq = 'DemandRatio';
  const module = 'Admin'
  
  let filter = yearFilter === ''&& schoolName === ''? null : yearFilter !== ''&& schoolName === ''?{Academic_Year: yearFilter}: yearFilter === ''&& schoolName !== ''? {SchoolName: schoolName} : {Academic_Year: yearFilter,SchoolName: schoolName}
  
  const params = { model: SendReq, id: '', module, filter, }
  
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
    <AdminAcordinTable   Heading= {Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Academic_Year' module='director' />
  );

}

export default DemandRatio