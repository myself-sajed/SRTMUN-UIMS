import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../components/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Select from '../../../components/formComponents/Select'


const tableHead = { index: "Sr. no.", Type: "Type", Exam: "Exam", InstitutionBoard: "Institute/Board",  Persentage: "Persentage", StartYear: "Started On", Year: "Complited on", Upload_Proof: "Uploaded Proof", Action: "Action" }

const CombineQualification = () => {
    const model = 'StudentQualification'
    const module = 'student'
    const ExamType = ["SSC","HSC","UG","PG","Ph.D."]
  
    const user = useSelector(state => state.user.studentUser)
    const filter = {userId:user?._id}
    const params = { model, id: "", module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))
  
    const initialstate = { Exam: '', InstitutionBoard: '', Persentage: '', StartYear: '', Year: '', Type: '',Upload_Proof: '' }
    const [values, setValues] = useState(initialstate)
    const { Exam, InstitutionBoard, Persentage, StartYear, Year, Type } = values
    const [open, setOpen] = useState(false)
  
    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (itemToEdit && data.data) {
        data?.data.forEach((item) => {
          if (item?._id === itemToEdit) {
            const { Exam, InstitutionBoard, Persentage, StartYear, Year, Type, } = item
            setEdit(true); setOpen(true);
            setValues({ Exam, InstitutionBoard, Persentage, StartYear, Year, Type })
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
        addReq({ userId: user?._id,  }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }
  
    return (
      <>
      <AddButton onclick={setOpen} />
        <DialogBox title={`${edit?"Edit":"Add"} Qualification`} buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
          <div className='flex flex-wrap'>
            <Select className='col-md-6 col-lg-4' id="Type" value={Type} label="Type" setState={setValues} options={ExamType} />
            <Text className='col-md-6 col-lg-4' id="Exam" value={Exam} label="Exam Name" setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="InstitutionBoard" value={InstitutionBoard} label="Institute/Board" setState={setValues} />
            <Text className='col-md-6 col-lg-4' id="Persentage" value={Persentage} type='number' label="Persentage" setState={setValues} />
            <YearSelect className='col-md-6 col-lg-4' id="StartYear" value={StartYear} label="Started On" setState={setValues} />
            <YearSelect className='col-md-6 col-lg-4' id="Year" value={Year} label="Complited On" setState={setValues} />
            <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label="Upload Proof" setState={setValues} required={!edit} />
          </div>
        </DialogBox>
        <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
      </>
    )
  }

export default CombineQualification
