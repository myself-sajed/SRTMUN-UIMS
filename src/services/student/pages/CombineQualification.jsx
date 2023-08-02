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
import { Switch } from 'antd'
import SchoolsProgram from '../../../components/SchoolsProgram'


const tableHead = { index: "Sr. no.", Type: "Exam Type", Exam: "Exam Name", InstitutionBoard: "Institute/Board", Persentage: "Percentage", StartYear: "Started On", Year: "Completed on", Upload_Proof: "Uploaded Proof", Action: "Action" }

const CombineQualification = () => {
  const model = 'StudentQualification'
  const module = 'student'
  const ExamType = ["SSC", "HSC", "UG", "PG", "M.Phil.", "Ph.D."]

  const isAlumniLink = window.location.pathname.includes('alumni')

  const user = useSelector(state => isAlumniLink ? state.user.alumniUser : state.user.studentUser)
  const filter = { userId: user?._id }
  const params = { model, id: "", module, filter }
  const { data, isLoading, isError, error, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = { Exam: '', InstitutionBoard: '', Persentage: '', StartYear: '', Year: '', Type: '', Upload_Proof: '', isStudied: false, school: '' }
  const [values, setValues] = useState(initialstate)
  const { Exam, InstitutionBoard, Persentage, StartYear, Year, Type, isStudied, school } = values
  const [open, setOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { Exam, InstitutionBoard, Persentage, StartYear, Year, Type } = item
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
      addReq({ userId: user?._id, }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }

  return (
    <>
      <AddButton onclick={setOpen} title="Your Qualifications" />
      <DialogBox title={`${edit ? "Edit" : "Add"} Qualification`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
        <div className='flex flex-wrap'>
          <Select className='col-md-6 col-lg-4' id="Type" value={Type} label="Exam Type" setState={setValues} options={ExamType} />
          {
            ["UG", "PG", "M.Phil.", "Ph.D."].includes(Type) && <div className='col-12 col-md-6 col-lg-4 border rounded-md mt-[35px] mb-[10px]'>
              <div class="form-check form-switch py-[0.20rem] mt-[0.28rem]">
                  <input class="form-check-input" checked={isStudied} onChange={()=>{setValues((pri) => { return { ...pri, 'isStudied': !pri.isStudied }})}} type="checkbox" role="switch" id="checkbox" />
                  <label class="form-check-label" htmlFor="checkbox">Complited from University campus</label>
              </div>
            </div>
          }
          {
             isStudied && <Select className='col-md-6 col-lg-4' id="school" value={school} label="School Name" setState={setValues} options={Type==="UG"?["School of Pharmacy"]:Object.keys(SchoolsProgram)} />
          }
          <Text className='col-md-6 col-lg-4' id="Exam" value={Exam} label="Exam Name" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="InstitutionBoard" value={InstitutionBoard} label="Institute/Board" setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="Persentage" value={Persentage} type='number' label="Percentage" setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="StartYear" value={StartYear} label="Started On" setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="Year" value={Year} label="Completed On" setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default CombineQualification
