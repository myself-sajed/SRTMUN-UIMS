import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_the_workshop_seminar: "Name of the workshop/ seminar", Number_of_Participants: "Number of Participants", year: "year", From_Date: "From Date", To_Date: "To Date", Upload_Proof: "Upload Proof", }

function ResearchMethodologyWorkshops({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = 'ResearchMethodologyWorkshops';
    const module = 'Admin'

    let filter = yearFilter === '' && schoolName === '' ? null : yearFilter !== '' && schoolName === '' ? { year: yearFilter } : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName } : { year: yearFilter, SchoolName: schoolName }

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='year' module='director' isLoading={isLoading} />
    );
}
export default ResearchMethodologyWorkshops;