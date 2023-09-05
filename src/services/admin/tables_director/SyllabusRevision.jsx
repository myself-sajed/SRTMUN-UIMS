import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Programme_Code: "Programme Code", Programme_Name: "Programme Name", Academic_Year: "Academic Year", Year_of_Introduction: "Year of Introduction", Status_of_implementation: "Status of implementation", Year_of_Implimentation: "Year of Implimentation", Year_of_Revision: "Year of Revision", Percentage_of_content_added_or_replaced: "Percentage of content added or replaced", Upload_Proof: "Upload Proof", }

function SyllabusRevision({id, setState, yearFilter, schoolName, Heading, setLoaded}) {
  const SendReq = 'SyllabusRevision';
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

export default SyllabusRevision;
