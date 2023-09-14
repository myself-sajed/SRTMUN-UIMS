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

const tableHead = { index: "Sr. no.", programCode: "Program Code", programName: "Program Name", studentsAppeared: "Number of Students Appeared in Final Year Examination", studentsPassed: "Number of Students Passed in Final Year Examination", academicYear: 'Year', Action: "Action" }

const ExamPassedDuringYear = ({ filterByAcademicYear = false }) => {
  const model = 'ExamPassedDuringYear'
  const module = 'exam';
  const title = "Students Passed During The Year ";

  let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear } : {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    programCode: "", programName: "", studentsAppeared: "", studentsPassed: "", academicYear: "",
  }
  const [values, setValues] = useState(initialstate)
  const { programCode, programName, studentsAppeared, studentsPassed, academicYear, } = values
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
          const { programCode, programName, studentsAppeared, studentsPassed, academicYear, } = item
          setEdit(true); setOpen(true);
          setValues({ programCode, programName, studentsAppeared, studentsPassed, academicYear, })
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
      {/* programCode, programName, studentsAppeared, studentsPassed, academicYear, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="programCode" value={programCode} label={tableHead.programCode} setState={setValues} required={false} />
          <Text className='col-md-6 col-lg-4' id="programName" value={programName} label={tableHead.programName} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="studentsAppeared" value={studentsAppeared} label={tableHead.studentsAppeared} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="studentsPassed" value={studentsPassed} label={tableHead.studentsPassed} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="Students Passed During The Year" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model}  />
    </>
  )
}

export default ExamPassedDuringYear
