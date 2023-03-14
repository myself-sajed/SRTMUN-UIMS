import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Programme_Code: "Program Code", Programme_name: "Program Name", Name_of_the_student: "Name of the student", Academic_Year: "Academic Year", Upload_Proof: "Document prrof ", Action: "Action" }

function ProjectsInternships({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = "ProjectsInternships"
    const module = 'Admin'

    let filter = yearFilter === '' && schoolName === '' ? null : yearFilter !== '' && schoolName === '' ? { Academic_Year: yearFilter } : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName } : { Academic_Year: yearFilter, SchoolName: schoolName }

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

export default ProjectsInternships;