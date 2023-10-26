import React, { useState, useEffect } from "react";
import DialogBox from "../../../components/formComponents/DialogBox";
import Text from '../../../components/formComponents/Text'
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

const tableHead = { index: "Sr. no.", nameOfProgram: "Name of the Course / Programme", programCode: "Course / Programme Code (if any)", modeOfCourse: "Mode of the Course- offered by the HEI or Online (Specify the platform like MOOCS, SWAYAM, etc.)", yearOfOffering: "Year of offering / Year of enrolment", contactHours: "Contact Hours of Course", studentsEnrolled: "Number of students enrolled in the year", studentsCompleting: "Number of Students completing the course  in the year", academicYear: "Academic Year", Proof: "Uploaded Proof", Action: "Action" }
const SwayamValueAddedCourses = () => {
    const module = "swayam"
    const model = "SwayamValueAddedCourses"
    const title = "Value Added Courses"

  let filter = {}
  const params = { model, module, filter }
  const { data, isLoading, refetch } = useQuery(`${model}yf=p9L&RB;E(?YUu.cXY`, () => getReq(params))

  const initialstate = { nameOfProgram: "", programCode: "", modeOfCourse: "", yearOfOffering: "", contactHours: "", studentsEnrolled: "", studentsCompleting: "", academicYear: "", Proof: "", }
  const [values, setValues] = useState(initialstate)
  const { nameOfProgram, programCode, modeOfCourse, yearOfOffering, contactHours, studentsEnrolled, studentsCompleting, academicYear, } = values

  const [open, setOpen] = useState(false)
  const [excelOpen, setExcelOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  const typeObject = {
    nameOfProgram: "text", programCode: "text", modeOfCourse: "text", yearOfOffering: "number", contactHours: "text", studentsEnrolled: "number", studentsCompleting: "number", academicYear: academicYearGenerator(29, true, true),
  }

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { nameOfProgram, programCode, modeOfCourse, yearOfOffering, contactHours, studentsEnrolled, studentsCompleting, academicYear, } = item
          setEdit(true); setOpen(true);
          setValues({ nameOfProgram, programCode, modeOfCourse, yearOfOffering, contactHours, studentsEnrolled, studentsCompleting, academicYear, })
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
   addReq({  }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module) 
  }
  // { nameOfProgram, programCode, modeOfCourse, yearOfOffering, contactHours, studentsEnrolled, studentsCompleting, year, }
  return (
    <>
    <AddButton customName={title} onclick={setOpen} exceldialog={setExcelOpen} dataCount={data ? data?.data.length : 0} />
    <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
      <div className='flex flex-wrap'>
        <Text className='col-md-6 col-lg-4' id="nameOfProgram" value={nameOfProgram} label={tableHead.nameOfProgram} setState={setValues} />
        <Text className='col-md-6 col-lg-4' id="programCode" value={programCode} label={tableHead.programCode} setState={setValues} />
        <Text className='col-md-6 col-lg-4' id="modeOfCourse" value={modeOfCourse} label={tableHead.modeOfCourse} setState={setValues} />
        <Text className='col-md-6 col-lg-4' type='number' id="yearOfOffering" value={yearOfOffering} label={tableHead.yearOfOffering} setState={setValues} />
        <Text className='col-md-6 col-lg-4' id="contactHours" value={contactHours} label={tableHead.contactHours} setState={setValues} />
        <Text className='col-md-6 col-lg-4' type='number' id="studentsEnrolled" value={studentsEnrolled} label={tableHead.studentsEnrolled} setState={setValues} />
        <Text className='col-md-6 col-lg-4' type='number' id="studentsCompleting" value={studentsCompleting} label={tableHead.studentsCompleting} setState={setValues} />
        <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />
        <UploadFile className='col-md-6 col-lg-4' id="Proof" label="Upload Proof" setState={setValues} required={!edit} />
      </div>
    </DialogBox>
    <BulkExcel data={data?.data} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} tableHead={tableHead} typeObject={typeObject} open={excelOpen} setOpen={setExcelOpen} proof='proof' />
    <Table TB={data?.data} module={module} getproof="proof" proof="swayam" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
  </>
  )
}

export default SwayamValueAddedCourses
