import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_student_enrolling: "Name of student enrolling", Program_graduated_from: "Program graduated from", Name_of_institution_admitted: "Name of institution admitted", Name_of_programme_admitted: "Name of programme admitted", Academic_Year: "Academic Year", Upload_Proof: "Upload Proof", }

function ProgressionToHE({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = "ProgressionToHE";
    const module = 'Admin'

    let filter = yearFilter === '' && schoolName === '' ? {AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter !== '' && schoolName === '' ? { Academic_Year: yearFilter, AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"} } : { Academic_Year: yearFilter, SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"}}

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Academic_Year' module='director' isLoading={isLoading} />
    );
}
export default ProgressionToHE;