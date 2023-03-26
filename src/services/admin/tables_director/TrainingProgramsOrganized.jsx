import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Year: "Year", From_Date: "From Date", To_Date: "To Date", Title_Of_the_Program: "Title Of the Program", Type_of_staff: "Type of staff", Number_of_Participants: "Number of Participants", Upload_Proof: "Upload proof", }

function TrainingProgramsOrganized({ id, setState, yearFilter, schoolName, Heading }) {

  const SendReq = 'TrainingProgramsOrganized';
  const module = 'Admin'

  let filter = yearFilter.length === 0 && schoolName === 'All Schools' ? null : yearFilter.length !== 0 && schoolName === 'All Schools' ? { Year: {$in:yearFilter} } : yearFilter.length === 0 && schoolName !== 'All Schools' ? { SchoolName: schoolName } : { Year: {$in:yearFilter}, SchoolName: schoolName }

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
    <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Year' module='director' isLoading={isLoading} />
  );
}
export default TrainingProgramsOrganized;