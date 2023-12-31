import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_the_workshop_seminar: "Name of the workshop/ seminar", Number_of_Participants: "Number of Participants", year: "year", From_Date: "From Date", To_Date: "To Date", Upload_Proof: "Upload Proof", }

function ResearchMethodologyWorkshops({id, setState, yearFilter, schoolName, Heading, setLoaded}) {

    const SendReq = 'ResearchMethodologyWorkshops';
    const module = 'Admin'

    let filter = yearFilter.length === 0 && schoolName === 'All Schools' ? null : yearFilter.length !== 0 && schoolName === 'All Schools' ? { year: {$in:yearFilter} } : yearFilter.length === 0 && schoolName !== 'All Schools' ? { SchoolName: schoolName } : { year: {$in:yearFilter}, SchoolName: schoolName }

    const params = { model: SendReq, id: '', module, filter, }

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='year' module='director' isLoading={isLoading} />
    );
}
export default ResearchMethodologyWorkshops;