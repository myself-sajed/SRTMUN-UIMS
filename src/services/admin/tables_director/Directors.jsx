import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import EmptyBox from '../../../components/EmptyBox'
import Loader from '../../../components/Loader'
import getReq from '../../../components/requestComponents/getReq'
import AdminAcordinTable from '../components/AdminAcordinTable'

const Directors = ({ id, setState, yearFilter, schoolName, Heading }) => {
  const SendReq = "DirectorUser"
  const module = "Admin"

  let filter = schoolName === 'All Schools' ? null : { department: schoolName }

  const params = { model: SendReq, id: "", module, filter: filter }

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
    <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq}>
      <div className='table-responsive' style={{ height: "100%" }}>
        <table className="table">
          <thead className="sticky-top" style={{ background: "#ae7e28", color: '#FFF' }}>
            <tr>
              <th>Sr. No.</th>
              <th>profile Pic</th>
              <th>Name</th>
              <th>School</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Designation</th>

            </tr>
          </thead>
          <tbody>
            {
              data?.data.map((item, index) => <tr>
                <td>{index + 1}</td>
                <td><Avatar src={`${process.env.REACT_APP_MAIN_URL}/showFile/${item.photoURL}/director`} /></td>
                <td>{`${item.salutation} ${item.name}`}</td>
                <td>{item.department}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.designation}</td>
              </tr>
              )
            }
          </tbody>
        </table>
        {isLoading ? <Loader /> : ""}
        {!isLoading && data?.length === 0 ? <EmptyBox /> : ""}
      </div>
    </AdminAcordinTable>
  )
}

export default Directors