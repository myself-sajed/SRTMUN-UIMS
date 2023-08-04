import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import Table from '../../../components/tableComponents/TableComponent'
import axios from 'axios';
import { toast } from 'react-hot-toast'

const tableHead = { index: "Sr. no.",propic: "Profile Pic", name : "Name Of Student" ,  email: "Email Id" ,  mobile: "Mobile No.",  doCompleted: "Compited On", Action: "Action" }
const Alumni = () => {
  const module = "director";
  const model = "StudentUser"

  const user = useSelector(state => state.user.directorUser)
  const schoolName = user? user.department : null
  
  const filter =  {schoolName, isAlumni:true}
  const params = { model: model, id: "", module, filter: filter, }
  const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

  const [activeProgram, setActiveProgram] = useState(SchoolsProgram[schoolName][0][0])

  const filteredData = data?.data.filter((students) => students.programGraduated[0] === activeProgram)
  
  return (
    <>
    <div style={{ width: "100%", overflow: "hidden", background: "#FFF" }}>
      <div className='table-responsive my-2' style={{ display: "flex", gap: "10px", borderRadius: "5px"}}>
        {
          SchoolsProgram[schoolName].map((item) =>{
            return <div className={`rounded-md border p-2 cursor-pointer ${activeProgram === item[0] ? 'bg-[#bfdbfe] text-[#1e3a8a]' : 'bg-blue-100 text-[#626469]'} w-[100px] md:w-[250px] hover:shadow-md duration-200 ease-in-out md:text-base text-sm`}
            onClick={() => { setActiveProgram(item[0]) }}> <p>{item[0].length > 28
                    ? item[0].slice(0, 35) + "..."
                    : item[0]}</p>

                <div className='text-xs'>

                    <p>Total: <span className='font-semibold'>{data?.data.filter((students) => students.programGraduated[0] === item[0])?.length}</span></p>
                </div>
            </div>
        })
        }
      </div>
    </div>
    <Table TB={filteredData} module="Alumni" proof="faculty" year="programEnroledOn" propic="photoURL" fatchdata={refetch} isLoading={isLoading} tableHead={tableHead} SendReq={model} EditDisabled={true} />
    </>
  )
}

export default Alumni