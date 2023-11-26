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
import Select from '../../../components/formComponents/Select';

const tableHead = { index: "Sr. no.", libraryResources: "Library resources	If yes, details of memberships/subscriptions", eBooks: "Expenditure on subscription to e-journals, e-books (INR in lakhs)", eResources: "Expenditure on subscription to other e-resources (INR in lakhs)", academicYear: 'Year', Proof: "Total Library Expenditure Link to the relevant document", Action: "Action" }


const SubscriptionForKRC = ({ filterByAcademicYear = false }) => {
  const model = 'SubscriptionForKRC'
  const module = 'krc';
  const title = "Institution has subscription for KRC";


  let filter = filterByAcademicYear ? { academicYear: filterByAcademicYear } : {};
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    libraryResources: "", eBooks: "", eResources: "", academicYear: "", Proof: "",
  }
  const [values, setValues] = useState(initialstate)
  const { libraryResources, eBooks, eResources, academicYear, } = values
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
          const { libraryResources, eBooks, eResources, academicYear, } = item
          setEdit(true); setOpen(true);
          setValues({ libraryResources, eBooks, eResources, academicYear, })
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
      {/* libraryResources, eBooks, eResources, academicYear, */}
      <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg"  loading={Loading}>
        <div className='flex flex-wrap'>

          <Select className='col-md-6 col-lg-4' id="libraryResources" value={libraryResources} label={tableHead.libraryResources} options={['Books Journals', 'e–Journals', 'e-books', 'e-ShodhSindhu', 'Shodhganga', 'Databases',]} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="eBooks" value={eBooks} label={tableHead.eBooks} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="eResources" value={eResources} label={tableHead.eResources} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} sampleFile="Student Complaints Grievances" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} getproof="proof" />
    </>
  )
}

export default SubscriptionForKRC
export { tableHead }
