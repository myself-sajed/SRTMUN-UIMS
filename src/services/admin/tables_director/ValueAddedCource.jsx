import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_the_value_added_courses_offered: "Name of the value added courses offered", Course_Code_if_any: "Course Code (if any)", Academic_year: "Academic year", Year_of_offering: "Year of offering", No_of_times_offered_during_the_same_year: "No. of times offered during the same year", Duration_of_the_course: "Duration of the course (in Months)", Number_of_students_enrolled: "Number of students enrolled", Number_of_Students_completing_the_course: "Number of Students completing the course", Upload_Proof: "Upload proof", }

function ValueAddedCource({ id, setState, yearFilter, schoolName, Heading }) {
  const SendReq = 'ValueAddedCource'
  const module = 'Admin'

  let filter = yearFilter === '' && schoolName === '' ? null : yearFilter !== '' && schoolName === '' ? { Academic_year: yearFilter } : yearFilter === '' && schoolName !== '' ? { SchoolName: schoolName } : { Academic_year: yearFilter, SchoolName: schoolName }

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
    <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Academic_year' module='director' />
  );
}
export default ValueAddedCource;