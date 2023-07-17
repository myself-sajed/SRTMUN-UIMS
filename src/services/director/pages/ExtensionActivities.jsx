import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import SYTextField from "../components/FormComponents/SYTextField";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';

const tableHead = { index: "Sr. no.", Name_of_the_activity: "Name of the activity", Organising_unit: "Organising unit/ agency/ collaborating agency", Name_of_the_scheme: "Name of the scheme", Year_of_activity: "Year of the activity ", Number_of_students: "Number of students participated in such activities", Upload_Proof: "Proof", Action: "Action" }

function ExtensionActivities({ filterByAcademicYear = false, academicYear }) {
  const SendReq = "ExtensionActivities"
  const module = 'director'

  //--------------fetch data from db----------
  const [tableBody, setTableBody] = useState();
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)

  const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = yearFilter.length === 0 ? { SchoolName } : { Year_of_activity: { $in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: '', module, filter }
  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


  const initialState = { eanota: "", eaouaca: "", eanots: "", eanosp: "", eayota: "", Upload_Proof: "" }
  const [values, setvalues] = useState(initialState);

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = 'Extension Activities';

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setAdd(true);
          setvalues({
            eanota: item.Name_of_the_activity,
            eaouaca: item.Organising_unit,
            eanots: item.Name_of_the_scheme,
            eayota: item.Year_of_activity,
            eanosp: item.Number_of_students,
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
              <CTextField label="Name of the activity" type="text" value={values.eanota} id="eanota" required={true} onch={setvalues} />
              <CTextField label="Organising unit/ agency/ collaborating agency" type="text" value={values.eaouaca} id="eaouaca" required={true} onch={setvalues} />
              <CTextField label="Name of the scheme" type="text" value={values.eanots} id="eanots" required={true} onch={setvalues} />
              <CTextField label="Number of students participated" type="number" value={values.eanosp} id="eanosp" required={true} onch={setvalues} />
              <SYTextField label="Year of the activity" value={values.eayota} id="eayota" required={true} onch={setvalues} />
              <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='ExtensionActivities' title={title} SendReq={SendReq} refetch={refetch} module={module} department={JSON.stringify(directorUser?.department)} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} fatchdata={refetch} year="Year_of_activity" isLoading={isLoading} setItemToEdit={setItemToEdit} tableHead={tableHead} SendReq={SendReq} />
    </>
  )
}
export default ExtensionActivities;