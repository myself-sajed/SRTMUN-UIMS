import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import EmptyBox from '../../../components/EmptyBox'
import Loader from '../../../components/Loader'
import getReq from '../../../components/requestComponents/getReq'
import AdminAcordinTable from '../components/AdminAcordinTable'

const Alumnies = ({id, setState, yearFilter, schoolName, Heading}) => {
  const SendReq = "AlumniUser"
  const module = "Admin"

  let filter = yearFilter.length === 0  && schoolName === 'All Schools' ? null : yearFilter.length !== 0 && schoolName === 'All Schools'?{doCompleted: {$in:yearFilter}}: yearFilter.length === 0 && schoolName !== 'All Schools'? {schoolName: schoolName} :{schoolName: schoolName, doCompleted: {$in:yearFilter}}

  const params = { model: SendReq, id: "", module, filter }

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
      <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq}>
        <div className='table-responsive' style={{height: "100%" }}>
          <table class="table">
            <thead class="sticky-top" style={{ background: "#ae7e28", color: '#FFF' }}>
              <tr>
                <th>Sr. No.</th>
                <th>profile Pic</th>
                <th>Name</th>
                <th>School</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Programmes Graduated</th>
                <th>Last progamme Graduated at</th>
  
              </tr>
            </thead>
            <tbody>
              {
                data?.data.map((item, index) => <tr>
                  <td>{index + 1}</td>
                  <td><Avatar src={`${process.env.REACT_APP_MAIN_URL}/showFile/${item.photoURL}/faculty`} /></td>
                  <td>{`${item.salutation} ${item.name}`}</td>
                  <td>{item.schoolName}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.programGraduated.map(program=>`${program}, `)}</td>
                  <td>{item.doCompleted}</td>
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

export default Alumnies