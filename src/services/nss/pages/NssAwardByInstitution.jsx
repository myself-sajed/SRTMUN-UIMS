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

const tableHead = { index: "Sr. no.", nameOfActivity: "Name of the activity", nameOfAward: "Name of the Award/ recognition", nameOfGovBody: "Name of the Awarding government/ government recognised bodies", academicYear: "Year of award", Upload_Proof: "Proof", Action: "Action" }

const NssAwardByInstitution = ({ filterByAcademicYear = false }) => {
  const model = 'AwardForExtensionActivities'
  const module = 'nss';
  const title = "Award For Extension Activities";


  let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear } : {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    nameOfActivity: "", nameOfAward: "", nameOfGovBody: "", academicYear: "", Upload_Proof: ""
  }
  const [values, setValues] = useState(initialstate)
  const { nameOfActivity, nameOfAward, nameOfGovBody, academicYear, } = values
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
          const { nameOfActivity, nameOfAward, nameOfGovBody, academicYear, } = item
          setEdit(true); setOpen(true);
          setValues({ nameOfActivity, nameOfAward, nameOfGovBody, academicYear, })
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
      {/* nameOfActivity, nameOfAward, nameOfGovBody, academicYear, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>
          <Text className='col-md-6 col-lg-4' id="nameOfActivity" value={nameOfActivity} label={tableHead.nameOfActivity} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="nameOfAward" value={nameOfAward} label={tableHead.nameOfAward} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="nameOfGovBody" value={nameOfGovBody} label={tableHead.nameOfGovBody} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label={tableHead.Upload_Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="Nss Award By Institution" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} proof="nss" />
    </>
  )
}

export default NssAwardByInstitution
export {tableHead}
