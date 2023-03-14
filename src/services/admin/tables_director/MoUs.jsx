import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_Organisation_with_whome_mou_signed: "Name of Organisation with whome mou signed", Duration_of_MoU: "Duration of MoU", Year_of_signing_MoU: "Year of signing MoU", Upload_Proof: "Actual activity list", }

function MoUs({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = "MoUs"
    const module = 'Admin'

    let filter = yearFilter === '' && schoolName === '' ? null : yearFilter !== '' && schoolName === '' ? { Year_of_signing_MoU: yearFilter } : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName } : { Year_of_signing_MoU: yearFilter, SchoolName: schoolName }

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Year_of_signing_MoU' module='director' isLoading={isLoading} />
    );
}
export default MoUs;