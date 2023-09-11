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

const tableHead = { index: "Sr. no.", academicYear: "Year", budjetAllocated: "Budget allocated for infrastructure augmentation", expenditureInfrastructure: "Expenditure for infrastructure augmentation", totalExpenditure: "Total expenditure excluding Salary", academicMaintenance: "Expenditure on maintenace of academic facilities (excluding salary for human resources)", physicalMaintenance: "Expenditure on maintenace of physical facilities (excluding salary for human resources)", Action: "Action" }

const TotalExpenditure = ({ filterByAcademicYear = false }) => {
  const model = 'TotalExpenditure'
  const module = 'other';
  const title = "Total Expenditure (FAO) ";


  let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear } : {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    academicYear: "", budjetAllocated: "", expenditureInfrastructure: "", totalExpenditure: "", academicMaintenance: "", physicalMaintenance: "",
  }
  const [values, setValues] = useState(initialstate)
  const { academicYear, budjetAllocated, expenditureInfrastructure, totalExpenditure, academicMaintenance, physicalMaintenance, } = values
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
          const { academicYear, budjetAllocated, expenditureInfrastructure, totalExpenditure, academicMaintenance, physicalMaintenance, } = item
          setEdit(true); setOpen(true);
          setValues({ academicYear, budjetAllocated, expenditureInfrastructure, totalExpenditure, academicMaintenance, physicalMaintenance, })
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
      {/* academicYear, budjetAllocated, expenditureInfrastructure, totalExpenditure, academicMaintenance, physicalMaintenance, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
        <div className='flex flex-wrap'>

          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="budjetAllocated" value={budjetAllocated} label={tableHead.budjetAllocated} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="expenditureInfrastructure" value={expenditureInfrastructure} label={tableHead.expenditureInfrastructure} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="totalExpenditure" value={totalExpenditure} label={tableHead.totalExpenditure} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="academicMaintenance" value={academicMaintenance} label={tableHead.academicMaintenance} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="physicalMaintenance" value={physicalMaintenance} label={tableHead.physicalMaintenance} setState={setValues} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="Total Expenditure" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default TotalExpenditure