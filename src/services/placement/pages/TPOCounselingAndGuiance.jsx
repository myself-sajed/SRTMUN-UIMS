import React, { useState, useEffect } from "react";
import DialogBox from "../../../components/formComponents/DialogBox";
import Text from '../../../components/formComponents/Text'
import Select from '../../../components/formComponents/Select'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import BulkExcel from "../../../components/BulkExcel";
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import { academicYearGenerator } from "../../../inputs/Year";
import SchoolsProgram from "../../../components/SchoolsProgram";
import Lists from "../../../components/tableComponents/Lists";

const tableHead = { index: "Sr. no.", SchoolName: "School Name", activityType: "Type Of Activity", Name_of_the_Activity_conducted_by_the_HEI: "Name of the Activity conducted by the HEI", Number_of_Students_Attended: "Number of Students Attended", Year_of_Activity: "Year of Activity", Proof: "Link to the relevant document", Action: "Action" }

const TPOCounselingAndGuiance = () => {
    const module = "tpo"
  const model = "TpoCounselingAndGuidance"
  const title = "Counseling And Guidance"

  let filter = {}
  const params = { model, module, filter }
  const { data, isLoading, refetch } = useQuery(`${model}IW4c-Cl)~*e+~&J0LLb4`, () => getReq(params))

  const initialstate = { SchoolName: "", Name_of_the_Activity_conducted_by_the_HEI: "", Proof: "", Number_of_Students_Attended: "", Year_of_Activity: "", activityType: "" }
  const [values, setValues] = useState(initialstate)
  const { SchoolName, Name_of_the_Activity_conducted_by_the_HEI, Number_of_Students_Attended, Year_of_Activity, activityType } = values

  const [open, setOpen] = useState(false)
  const [excelOpen, setExcelOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  const typeObject = {
    SchoolName: Object.keys(SchoolsProgram), activityType: Lists.counselingActivities, Name_of_the_Activity_conducted_by_the_HEI: "text", Number_of_Students_Attended: "number", Year_of_Activity: academicYearGenerator(29, true, true),
  }

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { SchoolName, Name_of_the_Activity_conducted_by_the_HEI, Number_of_Students_Attended, Year_of_Activity, activityType } = item
          setEdit(true); setOpen(true);
          setValues({ SchoolName, Name_of_the_Activity_conducted_by_the_HEI, Number_of_Students_Attended, Year_of_Activity, activityType })
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
  // { , , , ,  }
  return (
    <>
      <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          <Select className='col-md-6 col-lg-4' id="SchoolName" value={SchoolName} label={tableHead.SchoolName} setState={setValues} options={Object.keys(SchoolsProgram)} />
          <Select className='col-md-6 col-lg-4' id="activityType" value={activityType} label={tableHead.activityType} setState={setValues} options={Lists.counselingActivities} />
          <Text className='col-md-6 col-lg-4' id="Name_of_the_Activity_conducted_by_the_HEI" value={Name_of_the_Activity_conducted_by_the_HEI} label={tableHead.Name_of_the_Activity_conducted_by_the_HEI} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="Number_of_Students_Attended" value={Number_of_Students_Attended} label={tableHead.Number_of_Students_Attended} setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="Year_of_Activity" value={Year_of_Activity} label={tableHead.Year_of_Activity} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
      <Table TB={data?.data} module={module} getproof="proof" proof="tpo" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default TPOCounselingAndGuiance

