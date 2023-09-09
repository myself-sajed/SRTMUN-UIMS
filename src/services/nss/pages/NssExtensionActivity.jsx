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

const tableHead = { index: "Sr. no.", Name_of_the_activity: "Name of the activity", Organising_unit: "Organising unit/ agency/ collaborating agency", Name_of_the_scheme: "Name of the scheme", Year_of_activity: "Year of the activity ", Number_of_students: "Number of students participated in such activities", Upload_Proof: "Proof", Action: "Action" }

const NssExtensionActivity = () => {
    const model = 'ExtensionActivities'
    const module = 'nssd';
    const title = "Extension Activities";
  
  
    let filter = {SchoolName: "NSS"};
    const params = { model, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))
  
    const initialstate = {
        Name_of_the_activity: "", Organising_unit: "", Name_of_the_scheme: "", Year_of_activity: "", Number_of_students: "", Upload_Proof: "",
    }
    const [values, setValues] = useState(initialstate)
    const { Name_of_the_activity, Organising_unit, Name_of_the_scheme, Year_of_activity, Number_of_students, } = values
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
            const { Name_of_the_activity, Organising_unit, Name_of_the_scheme, Year_of_activity, Number_of_students, } = item
            setEdit(true); setOpen(true);
            setValues({ Name_of_the_activity, Organising_unit, Name_of_the_scheme, Year_of_activity, Number_of_students,  })
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
        addReq({SchoolName:"NSS"}, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }
  
    return (
      <>
      {/* Name_of_the_activity, Organising_unit, Name_of_the_scheme, Year_of_activity, Number_of_students, */}
        <AddButton title={title} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} />
        <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
          <div className='flex flex-wrap'>
            <Text className='col-md-6 col-lg-4' id="Name_of_the_activity" value={Name_of_the_activity} label={tableHead.Name_of_the_activity} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="Organising_unit" value={Organising_unit} label={tableHead.Organising_unit} setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="Name_of_the_scheme" value={Name_of_the_scheme} label={tableHead.Name_of_the_scheme} setState={setValues} />
            <Text className='col-md-6 col-lg-4' type='number' id="Number_of_students" value={Number_of_students} label={tableHead.Number_of_students} setState={setValues} />
            <YearSelect className='col-md-6 col-lg-4' id="Year_of_activity" value={Year_of_activity} label={tableHead.Year_of_activity} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label={tableHead.Upload_Proof} setState={setValues} required={!edit} />
          </div>
        </DialogBox>
  
        <BulkExcel data={data?.data} sampleFile="Nss Extension Activities" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />
  
        <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} proof="director"/>
      </>
    )
}

export default NssExtensionActivity
