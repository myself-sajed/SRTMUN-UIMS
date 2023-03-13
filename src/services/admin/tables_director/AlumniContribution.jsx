import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.",SchoolName: "School", Name_of_The_Alumni_Contributed: "Name Of The Alumni", Program_graduated_from: "Program Graduated From", Amount_of_contribution: "Contribution Ammount in ₹", Academic_Year: "Academic Year of Contribution", Upload_Proof: "Proof"  }

const AlumniContribution = ({id, setState, yearFilter, schoolName, Heading}) => {
    const SendReq = "AlumniContribution";
    const module = "Admin"
    
    let filter = yearFilter === ""&& schoolName === ""? null : yearFilter !== ""&& schoolName === ""?{Academic_Year: yearFilter}: yearFilter === ""&& schoolName !== ""? {SchoolName: schoolName} : {Academic_Year: yearFilter,SchoolName: schoolName}

    const params = { model: SendReq, id: '', module, filter: filter, }

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
      <AdminAcordinTable   Heading= {Heading} data={data?.data} SendReq={SendReq} proof="Upload_Proof" tableHead={tableHead} year="Academic_Year" module="director" />
    );
}

export default AlumniContribution