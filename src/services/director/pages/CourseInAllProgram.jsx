import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import SYTextField from "../components/FormComponents/SYTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';

const tableHead = { index: "Sr. no.", programName: "Program Name", programCode: "Program Code", courseName: "Course Name", courseCode: "Course Code", academicYear: "Academic Year", Action: "Action" }

function CourceInAllPrograms({ filterByAcademicYear = false, academicYear }) {
  const SendReq = "CourceInAllProgram"
  const module = 'director'

  //--------------fetch data from db----------
  const [tableBody, setTableBody] = useState();
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)

  const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = yearFilter.length === 0 ? { SchoolName } : { academicYear: { $in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: '', module, filter }
  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


  const initialState = { programCode: "", programName: "", courseCode: "", courseName: "", academicYear: "" }
  const [values, setvalues] = useState(initialState);

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = "Courses In All Programs";

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        const { _id, programName, programCode, courseCode, courseName, academicYear } = item
        if (_id === itemToEdit) {
          setEdit(true); setAdd(true);
          setvalues({
            courseName, courseCode, programCode, programName, academicYear,
          })
        }
      })
    }
  }, [itemToEdit])

  useEffect(() => {
    if (filterByAcademicYear) {
      setFiletr((prev) => {
        return { ...prev, yearFilter: [academicYear] }
      })
    }
  }, [academicYear])
  //--------------Frant end ui------------


  return (
    <>
      <AddButton title={title} filterByAcademicYear={filterByAcademicYear} onclick={setAdd} exceldialog={setOpen} yearFilter={yearFilter} setState={setFiletr} />
      <Dialog fullWidth maxWidth='lg' open={add}>
        <Diatitle title={title} clear={setAdd} setItemToEdit={setItemToEdit} EditClear={setEdit} Edit={edit} init={initialState} setval={setvalues} />
        <DialogContent dividers sx={{ background: "#e5eaf0" }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLoading(true)
            edit ?
              EditReq({ id: itemToEdit }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
              PostReq({ School: directorUser.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
          }}>
            <Grid container >
              <CTextField label="Program Name" type="text" value={values.programName} id="programName" required={true} onch={setvalues} />
              <CTextField label="Program Code" type="text" value={values.programCode} id="programCode" required={true} onch={setvalues} />
              <CTextField label="Course Name" type="text" value={values.courseName} id="courseName" required={true} onch={setvalues} />
              <CTextField label="Course Code" type="text" value={values.courseCode} id="courseCode" required={true} onch={setvalues} />
              <SYTextField label="Academic Year" value={values.academicYear} id="academicYear" required={true} onch={setvalues} />

              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} sampleFile='CourseInAllProgramsDirector' title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} fatchdata={refetch} year="academicYear" isLoading={isLoading} setItemToEdit={setItemToEdit} tableHead={tableHead} SendReq={SendReq} />
    </>
  )
}
export default CourceInAllPrograms;