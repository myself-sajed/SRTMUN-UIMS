import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Registration_number_roll_number: "Registration number / roll number", Names_of_students_selected_qualified: "Name of student qualified", Name_of_the_Exam: "Exam Qualified", Acadmic_year: "Acadmic Year", Upload_Proof: "Upload Proof", }

function QualifiedExams({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = 'QualifiedExams';
    const module = 'Admin'

    let filter = yearFilter === '' && schoolName === '' ? {AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter !== '' && schoolName === '' ? { Acadmic_year: yearFilter, AlumniId:{$exists:true ,$ne:"undefined"} } : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"} } : { Acadmic_year: yearFilter, SchoolName: schoolName, AlumniId:{$exists:true ,$ne:"undefined"} }

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Acadmic_year' module='director' isLoading={isLoading} />
    );
}
export default QualifiedExams;