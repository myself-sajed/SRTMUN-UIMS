import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Academic_Year: "Academic Year", Program_Name: "Program Name", NseSC: "SC", NseST: "ST", NseOBC: "OBC(VJNT)", NseDivyngjan: "Divyngjan", NseGeneral: "General", NseOthers: "Others",NsaSC: "SC", NsaST: "ST", NsaOBC: "OBC(VJNT)", NsaDivyngjan: "Divyngjan", NsaGeneral: "General", NsaOthers: "Others", Upload_Proof: "Upload Proof", }

function ReservedSeats({id, setState, yearFilter, schoolName, Heading, setLoaded}) {

    const SendReq = 'ReservedSeats';
    const module = 'Admin'

    let filter = yearFilter.length === 0 && schoolName === 'All Schools' ? null : yearFilter.length !== 0 && schoolName === 'All Schools' ? { Academic_Year: {$in:yearFilter} } : yearFilter.length === 0 && schoolName !== 'All Schools' ? { SchoolName: schoolName } : { Academic_Year: {$in:yearFilter}, SchoolName: schoolName }

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
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Academic_Year' module='director' isLoading={isLoading} />
    );
}
export default ReservedSeats; 
export { tableHead }