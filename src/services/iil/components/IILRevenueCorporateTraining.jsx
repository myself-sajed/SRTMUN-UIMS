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
import UploadFile from '../../../components/formComponents/UploadFile';


const tableHead = { index: "Sr. no.", nameOfCorporate: "Names of the teacher-consultants/corporate trainers", nameOfCorporateProgram: "Title of the corporate training program", agencyName: "Agency seeking training with contact details", revenueGenerated: "Revenue generated (amount in rupees)",numberOfTrainees: "Number of trainees", academicYear: 'Year', Proof: "Proof", Action: "Action" }

const IILRevenueCorporateTraining = () => {
    const model = 'IilRevenueCorporateTraining'
    const module = 'iil2';
    const title = "Revenue generated from corporate training"
  
    let filter = {}
    const params = { model, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))
  
    const initialstate = { nameOfCorporate: "", nameOfCorporateProgram: "", agencyName: "", revenueGenerated: "", numberOfTrainees: "", academicYear: "", proof: "",}

    const [values, setValues] = useState(initialstate)
    const { nameOfCorporate, nameOfCorporateProgram, agencyName, revenueGenerated, numberOfTrainees, academicYear, } = values
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
            const {nameOfCorporate, nameOfCorporateProgram, agencyName, revenueGenerated, numberOfTrainees, academicYear,} = item
            setEdit(true); setOpen(true);
            setValues({nameOfCorporate, nameOfCorporateProgram, agencyName, revenueGenerated, numberOfTrainees, academicYear,})
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
        addReq({ }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }
  
    return (
      <>
        {/*nameOfCorporate, nameOfCorporateProgram, agencyName, revenueGenerated, numberOfTrainees, academicYear,*/}
        <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} />
        <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
          <div className='flex flex-wrap'>
            <Text className='col-md-6 col-lg-4' id="nameOfCorporate" value={nameOfCorporate} label={tableHead.nameOfCorporate} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="nameOfCorporateProgram" value={nameOfCorporateProgram} label={tableHead.nameOfCorporateProgram} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="agencyName" value={agencyName} label={tableHead.agencyName} setState={setValues} />
            <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
            <Text className='col-md-6 col-lg-4' type="number" id="revenueGenerated" value={revenueGenerated} label={tableHead.revenueGenerated} setState={setValues} />
            <Text className='col-md-6 col-lg-4' type="number" id="numberOfTrainees" value={numberOfTrainees} label={tableHead.numberOfTrainees} setState={setValues} />
            <UploadFile className='col-md-6 col-lg-4' id="proof" label={tableHead.Proof} setState={setValues} required={!edit} />
          </div>
        </DialogBox>
  
        <BulkExcel data={data?.data} proof="Proof" sampleFile="Revenue generated from corporate training" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />
  
        <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} getproof="Proof" proof="iil"/>
      </>
    )
}

export default IILRevenueCorporateTraining
