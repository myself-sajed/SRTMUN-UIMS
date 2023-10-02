import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import UTextField from "../components/FormComponents/UTextField";
import SCTextField from "../components/FormComponents/SCTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SchoolsProgram from "../../../components/SchoolsProgram";


const TOP = ["UG", "PG", "Ph.D", "Diploma", "PG Diploma", "Certificate"]
const tableHead = { index: "Sr. no.", Programme_Code: "Program Code", Programme_name: "Program name", Academic_Year: "Academic Year", Type_of_program: "Type of Program", Number_of_seats_available: "Number of seats available", Number_of_eligible_applications: "Number of eligible applications", Number_of_Students_admitted: "Number of Students admitted", Upload_Proof: "Proof", Action: "Action" }
function DemandRatio({ filterByAcademicYear = false, academicYear }) {

  const SendReq = "DemandRatio"
  const module = "director"

  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)
  const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = yearFilter.length === 0 ? { SchoolName } : { Academic_Year: { $in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: '', module, filter }
  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))

  //--------------values useState---------------
  const initialState = { drpc: "", drpn: "", dray: "", drnosav: "", drnoea: "", drnosad: "", Upload_Proof: "", drtop: "" }
  const [values, setvalues] = useState(initialState);

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = 'Demand Ratio';

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setAdd(true);
          setvalues({
            drpc: item.Programme_Code,
            drpn: item.Programme_name,
            dray: item.Academic_Year,
            drnosav: item.Number_of_seats_available,
            drnoea: item.Number_of_eligible_applications,
            drnosad: item.Number_of_Students_admitted,
            drtop: item.Type_of_program,
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
              <CTextField label="Program Code" value={values.drpc} type="text" id="drpc" required={true} onch={setvalues} />
              <SCTextField label= "Program Name" value={values.drpn} id="drpn" required={true} type="text" onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />
              <SYTextField label="Academic Year" value={values.dray} id="dray" required={true} onch={setvalues} />
              <CTextField label="Number of seats available" type="number" value={values.drnosav} id="drnosav" required={true} onch={setvalues} />
              <CTextField label="Number of eligible applications" type="number" value={values.drnoea} id="drnoea" required={true} onch={setvalues} />
              <CTextField label="Number of Students admitted" type="number" value={values.drnosad} id="drnosad" required={true} onch={setvalues} />
              <SCTextField label="Type of Program" value={values.drtop} id="drtop" select={TOP} required={true} onch={setvalues} />
              <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='DemandRatioDirector' title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Academic_Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
    </>
  )
}

export default DemandRatio
export {TOP}