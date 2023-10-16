
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Lists from '../../../components/tableComponents/Lists'
import Select from '../../../components/formComponents/Select'
import BulkExcel from '../../../components/BulkExcel'


const tableHead = { index: "Sr. no.", studentName: "Student Name", parentName: "Father/Mother Name", dob: "Date of Birth", gender: "Gender", state: "State", distric: "Distric", mobileNo: "Mobile No", address: "Address", email: "Email", createdByEmail: "Created by Programme. Officer Email", otherAreaOfInterest: "Other Area Of Interest", Action: "Action" }
const StudentBasicInfoTable = () => {

  const model = 'NssBasicInfo'
  const module = 'nss';
  const title = "Student Basic Info"

  // const user = useSelector(state => state.user.studentUser)

  let filter = {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    studentName: "", parentName: "", gender: "", state: "", distric: "", mobileNo: "", address: "", email: "", createdByEmail: "", otherAreaOfInterest: "", dob: ""
  }
  const [values, setValues] = useState(initialstate)
  const { studentName, parentName, gender, state, distric, mobileNo, address, email, createdByEmail, otherAreaOfInterest, dob } = values
  const [open, setOpen] = useState(false)
  const [excelOpen, setExcelOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { studentName, parentName, gender, state, distric, mobileNo, address, email, createdByEmail, otherAreaOfInterest, dob } = item
          setEdit(true); setOpen(true);
          setValues({ studentName, parentName, gender, state, distric, mobileNo, address, email, createdByEmail, otherAreaOfInterest, dob })
        }
      })
    }
  }, [itemToEdit])

  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({}, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }

  return (
    <>
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} Student Basic Info`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg"  loading={Loading}>
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="studentName" value={studentName} label="Student Name" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="parentName" value={parentName} label="Father/Mother Name" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="dob" value={dob} type="date" label="Date of Birth" setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="gender" value={gender} label="Gender" options={Lists.gender} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="state" value={state} label="State" options={Object.keys(Lists.statesInIndia)} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="distric" value={distric} label="District" options={state ? Lists.statesInIndia[state] : []} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="mobileNo" value={mobileNo} type="number" label="Mobile No." setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="email" value={email} label="Email" setState={setValues} type='email' />
          <Text className='col-md-6 col-lg-4' id="createdByEmail" value={createdByEmail} label="Created by Programme. Officer Email" setState={setValues} type='email' />
          <Text className='col-md-6 col-lg-4' id="otherAreaOfInterest" value={otherAreaOfInterest} label="Other Area Of Interest" setState={setValues} />
          <div className="p-2 col-md-6 col-lg-4 col-12">
            <label for="address" className="form-label">Adress</label>
            <textarea className="form-control" id="address" value={address} rows="1"
              onChange={(e) => {
                setValues((pri) => { return { ...pri, address: e.target.value } })
              }} required ></textarea>
          </div>
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="NSSStudentBasicInfo" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default StudentBasicInfoTable