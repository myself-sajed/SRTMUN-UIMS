import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_the_student: "Name of the student", Year_of_joining: "Year of joining", Category: "Category", State_of_Domicile: "State of Domicile", Nationality: "Nationality", Email_ID: "Email ID", Programme_name: "Programme name", Student_Unique_Enrolment_ID: "Student Unique Enrolment ID", Mobile_Number: "Mobile Number", Gender: "Gender", Upload_Proof: "Upload proof", }

function StudentSatisfactionSurvey({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = 'StudentSatisfactionSurvey';
    const module = 'Admin'

    let filter = yearFilter === '' && schoolName === '' ? null : yearFilter !== '' && schoolName === '' ? { Year_of_joining: yearFilter } : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName } : { Year_of_joining: yearFilter, SchoolName: schoolName }

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Year_of_joining' module='director' isLoading={isLoading} />
    );
}
export default StudentSatisfactionSurvey;