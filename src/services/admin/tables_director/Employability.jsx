import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Course_Code: "Course Code", Name_of_the_Course: "Course name", Academic_Year: "Academic Year", Year_of_introduction: "Year of introduction", Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: "Activities / Content with direct bearing on Employability / Entrepreneurship / Skill development", Upload_Proof: "Proof"}

function Employability({id, setState, yearFilter, schoolName, Heading}) {
const SendReq = 'Employability';
const module = 'Admin'

let filter = yearFilter === ''&& schoolName === ''? null : yearFilter !== ''&& schoolName === ''?{Academic_Year: yearFilter}: yearFilter === ''&& schoolName !== ''? {SchoolName: schoolName} : {Academic_Year: yearFilter,SchoolName: schoolName}

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
  <AdminAcordinTable Heading= {Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Academic_Year' module='director' isLoading={isLoading} />
);
}
export default Employability;