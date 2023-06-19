import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import Table from '../../../components/tableComponents/TableComponent'
import { Switch } from 'antd'
import axios from 'axios';
import { toast } from 'react-hot-toast'

const tableHead = { index: "Sr. no.", propic: "Profile Pic", username: "Username", name: "Name Of Student", email: "Email Id", mobile: "Mobile No.", programEnroledOn: "Program Enroled On", Action: "Action" }

const StudentToAlumni = () => {
  const module = "director";
  const model = "StudentUser"

  const user = useSelector(state => state.user.directorUser)
  const schoolName = user ? user.department : null
  const [maxClass, setMaxClass] = useState(SchoolsProgram[schoolName][0][1] == 7 ? 3 : SchoolsProgram[schoolName][0][1])
  const filter = { schoolName, status: "Active" }
  const params = { model: model, id: "", module, filter: filter, }
  const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

  const [activeProgram, setActiveProgram] = useState(SchoolsProgram[schoolName][0][0])

  const [checkedData, setCheckedData] = useState([])
  const [checkEnabe, setCheckEnabe] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  const [switchLoading, setSwitchLoading] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(null)

  const filteredData = data?.data.filter((students) => {
    const year = students.currentIn.split(" ")
    console.log(year);
    students.programGraduated === activeProgram && parseInt(year[1]) >= maxClass
  })

  useEffect(() => {
    if (checkedData.length == filteredData.length && checkAll == false) {
      setCheckAll(true)
    }
    else if (checkedData.length < filteredData.length && checkAll) {
      setCheckAll(false)
    }
  }, [checkedData])

  useEffect(() => {
    setCheckedData([]);
    setCheckAll(false);
  }, [checkEnabe])

  const onCheckAll = () => {
    if (checkAll) {
      setCheckedData([]);
    } else {
      const arr = filteredData.map((student) => student._id);
      setCheckedData(arr);
    }
    setCheckAll(!checkAll);
  };

  // useEffect(() =>{
  //   if(itemToEdit && data.data){
  //     axios.post(`${process.env.REACT_APP_MAIN_URL}/inactive-active/student`, {status: "InActive",itemToEdit  })
  //     .then(res=>{
  //       if(res.data.status === "success"){
  //       toast.success("Student Deactivated Successfully")
  //       refetch()
  //       setItemToEdit(null)
  //       }
  //       else if(res.data.status === "error"){
  //         toast.error("Try again")
  //         refetch()
  //         setItemToEdit(null)
  //       }
  //       else {
  //         toast.error("Somthing went wrong try again")
  //         refetch()
  //         setItemToEdit(null)
  //       }
  //     })
  //   }
  // },[itemToEdit])

  return (
    <>
      <div stayle={{ display: "flex" }}>

      </div>
      <div style={{ width: "100%", overflow: "hidden", background: "#FFF" }}>
        <div className='table-responsive my-2' style={{ display: "flex", gap: "10px", borderRadius: "5px" }}>
          {
            SchoolsProgram[schoolName].map((item) => {
              return <div className={`rounded-md border p-2 cursor-pointer ${activeProgram === item[0] ? 'bg-[#bfdbfe] text-[#1e3a8a]' : 'bg-blue-100 text-[#626469]'} w-[100px] md:w-[250px] hover:shadow-md duration-200 ease-in-out md:text-base text-sm`}
                onClick={() => {
                  const max = item[1] == 7 ? 3 : item[1]
                  setActiveProgram(item[0]); setMaxClass(max)
                }}> <p>{item[0].length > 28
                  ? item[0].slice(0, 35) + "..."
                  : item[0]}</p>

                <div className='text-xs'>

                  <p>Total: <span className='font-semibold'>{data?.data.filter((students) => students.programGraduated === item[0])?.length}</span></p>
                </div>
              </div>
            })
          }
        </div>
      </div>
      <div className='flex justify-end gap-4 py-2 pr-2'><p className='text-base'>Select multiple</p>
        <Switch style={{ background: "#1e3a8a" }} checkedChildren="on" unCheckedChildren="off" onChange={() => { setCheckEnabe(!checkEnabe) }} checked={checkEnabe} loading={switchLoading} />
        {checkEnabe ? <><p className='text-base'>Select All</p>
          <input className='form-check-input' style={{ margin: '5px' }} type="checkbox" checked={checkAll} onChange={() => { onCheckAll(); }} /></> : ""}
      </div>
      <Table TB={filteredData} module="student" proof="student" year="programEnroledOn" propic="photoURL" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} editIcon="Active" deleteDisabled={true} EditDisabled={checkEnabe} CheckBox={checkEnabe} checkedData={checkedData} setCheckedData={setCheckedData} />
    </>
  )
}

export default StudentToAlumni