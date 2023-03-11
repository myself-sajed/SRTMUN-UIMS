import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no." , SchoolName: 'School',  Name_of_the_Activity_conducted_by_the_HEI: "Name of the Activity conducted by the HEI" ,  Number_of_Students_Attended: "Number of Students Attended" ,  Year_of_Activity: "Year of Activity" , Upload_Proof: "Link to the relevant document" }

function CounselingAndGuidance({id, setState, yearFilter, schoolName, Heading}) {
    const SendReq = 'CounselingAndGuidance';
    const module = 'Admin'
    
    let filter = yearFilter === ''&& schoolName === ''? null : yearFilter !== ''&& schoolName === ''?{Year_of_Activity: yearFilter}: yearFilter === ''&& schoolName !== ''? {SchoolName: schoolName} : {Year_of_Activity: yearFilter,SchoolName: schoolName}
    
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
      <AdminAcordinTable   Heading= {Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Year_of_Activity' module='director' />
    );
}
export default CounselingAndGuidance;