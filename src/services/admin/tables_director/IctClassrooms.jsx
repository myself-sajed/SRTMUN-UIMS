import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = { index: "Sr. no.", SchoolName: 'School', Room_number_or_Name_of_Classrooms: "Room number or Name of Classrooms", Type_of_ICT_facility: "Type of ICT facility ", Upload_Proof: "Gio taged photo" }

function IctClassrooms({ id, setState, yearFilter, schoolName, Heading }) {

  const SendReq = 'IctClassrooms';
  const module = 'Admin'

  let filter = schoolName === '' ? null : { SchoolName: schoolName }

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
export default IctClassrooms;