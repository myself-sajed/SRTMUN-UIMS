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

const tableHead = { index: "Sr. no.", programmeName: "Programme Name", programmeCode: "Programme Code", academicYear: "Semester/ year", lastDate: "Last date of the last semester-end/ year- end examination", diclarationDate: "Date of declaration of results of semester-end/ year- end examination", Action: "Action" }

const DateOfResultDiclaration = ({ filterByAcademicYear = false }) => {
  const model = 'DateOfResultDiclaration'
  const module = 'exam';
  const title = "Date Of Result Declaration";


  let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear } : {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    programmeName: "", programmeCode: "", academicYear: "", lastDate: "", diclarationDate: "",
  }
  const [values, setValues] = useState(initialstate)
  const { programmeName, programmeCode, academicYear, lastDate, diclarationDate, } = values
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
          const { programmeName, programmeCode, academicYear, lastDate, diclarationDate, } = item
          setEdit(true); setOpen(true);
          setValues({ programmeName, programmeCode, academicYear, lastDate, diclarationDate, })
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
      {/* programmeName, programmeCode, academicYear, lastDate, diclarationDate, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>

          <Text className='col-md-6 col-lg-4' id="programmeName" value={programmeName} label={tableHead.programmeName} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="programmeCode" value={programmeCode} label={tableHead.programmeCode} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="date" id="lastDate" value={lastDate} label={tableHead.lastDate} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="date" id="diclarationDate" value={diclarationDate} label={tableHead.diclarationDate} setState={setValues} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="Date Of Result Diclaration" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default DateOfResultDiclaration
