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

const tableHead = { index: "Sr. no.", titleOfActivity: "Title of the collaborative activity", nameOfAgency: "Name of the collaborating agency with contact details", nameOfParticipant: "Name of the participant ", duration: "Duration",natureOfActivity: "Nature of the activity", academicYear: 'Year of collaboration', Proof: "Proof", Action: "Action" }

const IILCollaborativeActivities = () => {
    const model = 'IilCollaborativeActivities'
    const module = 'iil2';
    const title = "Collaborative Activities with other Institutions"
  
    let filter = {}
    const params = { model, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))
  
    const initialstate = { titleOfActivity: "", nameOfAgency: "", nameOfParticipant: "", duration: "", natureOfActivity: "", academicYear: "", proof: "",}

    const [values, setValues] = useState(initialstate)
    const { titleOfActivity, nameOfAgency, nameOfParticipant, duration, natureOfActivity, academicYear, } = values
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
            const {titleOfActivity, nameOfAgency, nameOfParticipant, duration, natureOfActivity, academicYear,} = item
            setEdit(true); setOpen(true);
            setValues({titleOfActivity, nameOfAgency, nameOfParticipant, duration, natureOfActivity, academicYear,})
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
        {/*titleOfActivity, nameOfAgency, nameOfParticipant, duration, natureOfActivity, academicYear,*/}
        <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} />
        <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
          <div className='flex flex-wrap'>
            <Text className='col-md-6 col-lg-4' id="titleOfActivity" value={titleOfActivity} label={tableHead.titleOfActivity} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="nameOfAgency" value={nameOfAgency} label={tableHead.nameOfAgency} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="nameOfParticipant" value={nameOfParticipant} label={tableHead.nameOfParticipant} setState={setValues} />
            <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="duration" value={duration} label={tableHead.duration} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="natureOfActivity" value={natureOfActivity} label={tableHead.natureOfActivity} setState={setValues} />
            <UploadFile className='col-md-6 col-lg-4' id="proof" label={tableHead.Proof} setState={setValues} required={!edit} />
          </div>
        </DialogBox>
  
        <BulkExcel data={data?.data} proof="Proof" sampleFile="Collaborative Activities with other Institutions" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />
  
        <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} getproof="Proof" proof="iil"/>
      </>
    )
}

export default IILCollaborativeActivities
