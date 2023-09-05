import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_the_capacity_development_schemes: "Name of the capacity development schemes", Academic_Year: "Academic Year", Date_of_implementation: "Date of implementation", Number_of_students_enrolled: "Number of students enrolled", Upload_Proof: "Upload proof", }

function SkillsEnhancementInitiatives({id, setState, yearFilter, schoolName, Heading, setLoaded}) {

    const SendReq = 'SkillsEnhancementInitiatives';
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

export default SkillsEnhancementInitiatives;