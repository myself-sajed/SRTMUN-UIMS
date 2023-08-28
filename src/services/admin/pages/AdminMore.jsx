import React, { useEffect } from 'react'
import AdminDrower from './AdminDrower'
import { Switch } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Skeleton from '@mui/material/Skeleton';
import Text from '../../../components/formComponents/Text'

const AdminMore = () => {
    const [regToggle, setRegToggle] = useState(null)
    const [switchLoading, setSwitchLoading] = useState(false)

    const internetInitialState = {i_username: "", i_password: "",}
    const [internetCries, setInternetCries] = useState(internetInitialState)
    const { i_username, i_password } = internetCries
    
    const regToggleItems = [
      {Title: 'Student Registration', name: 'isStudentRegistration'},
      {Title: 'Faculty Registration', name: 'isFacultyRegistration'},
      {Title: 'Alumni Registration', name: 'isAlumniRegistration'},
    ]

    useEffect(() => {
      async function fetchData() {
        const response = await axios.post(`${process.env.REACT_APP_MAIN_URL}/Registration/pageStatus`)
        setRegToggle(response.data);
      }
      fetchData();
    },[])

    const handleToggle = async (name) => {
      const newState = {
        name,
        state: !regToggle[name],
      };
      axios.post(`${process.env.REACT_APP_MAIN_URL}/Registration/pageToggler`, newState)
      .then((res) => {
        setRegToggle(res.data)
        setSwitchLoading(false);
        toast.success("Registration page updated successfully");
      })
    }

  return (
    <AdminDrower>
      <div className='sub-main'> 
        <div className='text-lg font-semibold p-2'>Registration Page Enable / Disable</div>
          <div className='flex flex-col gap-2 w-full bg-[#f1f3f4] rounded-md p-3'>
          {
            regToggleItems.map((item) =>{
              const { name, Title } = item
              return regToggle != null ?<div className='flex justify-between py-2 border-b'><p className='text-base'>{Title}</p>
                  <Switch style={{background:"#ae7e28"}} checkedChildren="on" unCheckedChildren="off" onChange={()=>{handleToggle(name); setSwitchLoading(true)}} checked={regToggle[name]} loading={switchLoading} />
                </div>: <Skeleton height={50} />
            })
          }
        </div>
        {/* <div className='text-lg font-semibold p-2 mt-3'>Internet Connection to Server</div>
          <div className='w-full bg-[#f1f3f4] rounded-md p-3'>
            <div className='w-full text-sm pl-2 text-[green]'>Note:- It is recommended to connect using default credentials, as this has a 100% success rate.</div>
            <br />
            <div>Connect using manual credentials</div>
            <form className='flex flex-wrap justify-center pb-2' action="" onSubmit={ ()=>{
              axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/networkConnect`, internetCries )
              .then(res=>{
                if(res.data.status){
                  toast.success("Attemt to connect successfully")
                }
              })
              }}>
            <Text className='col-md-4 col-sm-6 col-12' label="Username" id="i_username" value={i_username} setState={setInternetCries} type="text"  />
            <Text className='col-md-4 col-sm-6 col-12' label="Password" id="i_password" value={i_password} setState={setInternetCries} type="password" />
            <button type='submit' style={{margin: "auto auto 5px 5px"}} className='btn btn-outline-primary col-md-3 col-sm-6 col-12'>Connect</button>
            </form>
            <hr />
            <div>Connect using default credentials</div>
            <div className='flex justify-center w-full'>
              <button onClick={()=>{
                axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/networkConnect` )
                .then(res=>{
                  if(res.data.status){
                   toast.success("Connected Successfully")
                  }
                })
              }} className='btn btn-outline-success btn-md mt-4 mb-3 col-md-3 col-sm-6 col-12'>
                Connect
              </button>
            </div>
          </div>  */}
          <div className='text-lg font-semibold p-2 mt-3'>Developers Options</div>
          <div className='flex-col gap-2 w-full bg-[#f1f3f4] rounded-md p-3'>
          <div className='w-full text-sm pl-1 pb-3 text-[#b51a1a]'>Note:- It is not recommended to use the following options manually.</div>
            <div className='flex justify-between py-2 border-b'>
              <p className='text-base'>Clear all temparary Pdfs in software</p><button className='btn btn-outline-danger' style={{width: "130px"}} onClick={() => { axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/pdfsclear`) }}>Clear Pdfs</button>
            </div>
            <div className='flex justify-between py-2 border-b'>
              <p className='text-base'>Clear all temparary Excels in software</p><button className='btn btn-outline-danger' style={{width: "130px"}} onClick={() => { axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/excelsclear`) }}>Clear Excels</button>
            </div>
            <div className='flex justify-between py-2 border-b'>
              <p className='text-base'>Take database backup on server</p><button className='btn btn-success'
              style={{width: "130px"}} onClick={() => { axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/mongodump`) }}>Take Backup</button>
            </div>
          </div>
      </div>
    </AdminDrower>
  )
}

export default AdminMore