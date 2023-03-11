import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_the_Scheme_Project_Endowments_Chairs: "Name of the Scheme/Project/ Endowments/ Chairs", Name_of_the_Principal_Investigator_Co_Investigator: "Name of the Principal Investigator/ Co Investigator", Name_of_the_Funding_agency: "Name of the Funding agency ", Type_of_Agency: "Type of Agency", Name_of_Department: "Name of Department", Year_of_Award: "Year of Award", Funds_provided_in_lakhs: "Funds provided ( ₹ / in lakhs)", Duration_of_the_project_in_Years: "Duration of the project (in Years)", Upload_Proof: "Upload proof", }

function UgcSapCasDstFistDbtICssr({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = 'UgcSapCasDstFistDBTICSSR';
    const module = 'Admin'

    let filter = yearFilter === '' && schoolName === '' ? null : yearFilter !== '' && schoolName === '' ? { Year_of_Award: yearFilter } : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName } : { Year_of_Award: yearFilter, SchoolName: schoolName }

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Year_of_Award' module='director' />
    );
}
export default UgcSapCasDstFistDbtICssr;