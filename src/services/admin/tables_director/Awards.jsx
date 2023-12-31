import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no." , SchoolName: "School", Title_of_the_innovation : "Title of the innovation" ,  Name_of_the_Award: "Name of the Award" ,  Year_of_Award: "Year of Award" ,  Name_of_the_Awarding_Agency: "Name of the Awarding Agency" ,  Contact_details_Agency: "Contact details Agency" ,  Category: "Category" ,  Upload_Proof: "Proof" , }

function Awards({id, setState, yearFilter, schoolName, Heading, setLoaded}) {
 const SendReq = 'Award';
 const module = 'Admin'
 
 let filter = yearFilter.length === 0 && schoolName === 'All Schools'? null : yearFilter.length !== 0  && schoolName === 'All Schools'?{Year_of_Award: {$in:yearFilter}}: yearFilter.length === 0 && schoolName !== 'All Schools'? {SchoolName: schoolName} : {Year_of_Award: {$in:yearFilter},SchoolName: schoolName}
 
 const params = { model: SendReq, id: '', module, filter: filter, }
 
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
   <AdminAcordinTable   Heading= {Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Year_of_Award' module='director' isLoading={isLoading} />
 );
}

export default Awards;