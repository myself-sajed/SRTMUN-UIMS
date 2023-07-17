import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import UTextField from "../components/FormComponents/UTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import CDatePicker from "../components/FormComponents/CDatePicker";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';

const tableHead = { index: "Sr. no.", Name_of_the_value_added_courses_offered: "Name of the value added courses offered", Course_Code_if_any: "Course Code (if any)", Academic_year: "Academic year", Year_of_offering: "Year of offering", No_of_times_offered_during_the_same_year: "No. of times offered during the same year", Duration_of_the_course: "Duration of the course (in Months)", Number_of_students_enrolled: "Number of students enrolled", Number_of_Students_completing_the_course: "Number of Students completing the course", Upload_Proof: "Upload proof", Action: "Action" }

function ValueAddedCource({ filterByAcademicYear = false, academicYear }) {
  const SendReq = 'ValueAddedCource'
  const module = 'director';

  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)
  const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = yearFilter.length === 0 ? { SchoolName } : { Academic_year: { $in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: "", module, filter }
  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


  //--------------values useState---------------
  const initialState = { vacnotvaco: "", vacccia: "", vacac: "", vacyoo: "", vacnotodtsy: "", vacdoc: "", vacnose: "", vacnosctc: "", Upload_Proof: "" }
  const [values, setvalues] = useState(initialState);

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = 'Value Added Courses';

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setAdd(true);
          setvalues({
            vacnotvaco: item.Name_of_the_value_added_courses_offered,
            vacccia: item.Course_Code_if_any,
            vacac: item.Academic_year,
            vacyoo: item.Year_of_offering,
            vacnotodtsy: item.No_of_times_offered_during_the_same_year,
            vacdoc: item.Duration_of_the_course,
            vacnose: item.Number_of_students_enrolled,
            vacnosctc: item.Number_of_Students_completing_the_course
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
      <AddButton title={title} filterByAcademicYear={filterByAcademicYear} onclick={setAdd} exceldialog={setOpen} yearFilter={Filter.yearFilter} setState={setFiletr} />
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
              <CTextField label="Name of the value added courses offered" type="text" value={values.vacnotvaco} id="vacnotvaco" required={true} onch={setvalues} />
              <CTextField label="Course Code (if any)" type="text" value={values.vacccia} id="vacccia" required={false} onch={setvalues} />
              <SYTextField label="Academic year" value={values.vacac} id="vacac" required={true} onch={setvalues} />
              <CDatePicker label="Year of offering" value={values.vacyoo} id="vacyoo" required={true} onch={setvalues} />
              <CTextField label="No. of times offered during the same year" type="Number" value={values.vacnotodtsy} id="vacnotodtsy" required={true} onch={setvalues} />
              <CTextField label="Duration of the course (in Months)" type="number" value={values.vacdoc} id="vacdoc" required={true} onch={setvalues} />
              <CTextField label="Number of students enrolled" type="number" value={values.vacnose} id="vacnose" required={true} onch={setvalues} />
              <CTextField label="Number of Students completing the course" type="number" value={values.vacnosctc} id="vacnosctc" required={true} onch={setvalues} />
              <UTextField label="Upload proof" id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='ValueAddedCourceDirector' title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year='Academic_year' fatchdata={refetch} isLoading={isLoading} setItemToEdit={setItemToEdit} tableHead={tableHead} SendReq={SendReq} />
    </>
  )
}
export default ValueAddedCource;