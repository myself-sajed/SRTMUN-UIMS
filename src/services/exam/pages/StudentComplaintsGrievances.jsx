import React, { useEffect, useState } from 'react';
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import BulkExcel from '../../../components/BulkExcel'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'

const tableHead = { index: "Sr. no.", noOfStudents: "No Of Students Appeared", noOfGrievances: "No Of Grievances", academicYear: 'Year', Action: "Action" }

const StudentComplaintsGrievances = ({ filterByAcademicYear = false }) => {
  const model = 'StudentComplaintsGrievances'
  const module = 'exam';
  const title = "Student Complaints Grievances ";


  let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear } : {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    noOfStudents: "", noOfGrievances: "", academicYear: '',
  }
  const [values, setValues] = useState(initialstate)
  const { noOfStudents, noOfGrievances, academicYear, } = values
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
          const { noOfStudents, noOfGrievances, academicYear, } = item
          setEdit(true); setOpen(true);
          setValues({ noOfStudents, noOfGrievances, academicYear, })
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
      {/* noOfStudents, noOfGrievances, academicYear, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true}  dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>

          <Text className='col-md-6 col-lg-4' type="number" id="noOfStudents" value={noOfStudents} label={tableHead.noOfStudents} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="noOfGrievances" value={noOfGrievances} label={tableHead.noOfGrievances} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="Student Complaints Grievances" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default StudentComplaintsGrievances
