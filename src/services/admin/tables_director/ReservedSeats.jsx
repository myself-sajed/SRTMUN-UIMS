import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Academic_Year: "Academic Year", Activity: "Activity", SC: "SC", ST: "ST", OBC: "OBC", Divyngjan: "Divyngjan", General: "General", Others: "Others", Upload_Proof: "Upload Proof", }

function ReservedSeats({ id, setState, yearFilter, schoolName, Heading }) {

    const SendReq = 'ReservedSeats';
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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Academic_Year' module='director' />
    );
}
export default ReservedSeats; 