import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import CDatePicker from "../components/FormComponents/CDatePicker";
import SubmitButton from "../components/FormComponents/SubmitButton";
import SCTextField from "../components/FormComponents/SCTextField"
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';

const tableHead = { index: "Sr. no.", Programme_Code: "Programme Code", Programme_Name: "Programme Name", Academic_Year: "Academic Year", Year_of_Introduction: "Year of Introduction", Status_of_implementation: "Status of implementation", Year_of_Implimentation: "Year of Implimentation", Year_of_Revision: "Year of Revision", Percentage_of_content_added_or_replaced: "Percentage of content added or replaced", Upload_Proof: "Upload Proof", Action: "Action" }

const CE = ["CBCS", "ECS"]

function SyllabusRevision({ filterByAcademicYear = false, academicYear }) {
  const SendReq = 'SyllabusRevision';
  const module = 'director';

  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)
  const params = { model: SendReq, id: directorUser?.department, module }
  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


  //--------------values useState---------------
  const initialState = { srpc: "", srpn: "", sray: "", sryoi: "", srsoioce: "", sryoim: "", sryor: "", srpocaor: "", Upload_Proof: "" }

  const [values, setvalues] = useState(initialState);
  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title='Syllabus Revision'
  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data?.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setAdd(true);
          setvalues({
            srpc: item.Programme_Code,
            srpn: item.Programme_Name,
            sray: item.Academic_Year,
            sryoi: item.Year_of_Introduction,
            srsoioce: item.Status_of_implementation,
            sryoim: item.Year_of_Implimentation,
            sryor: item.Year_of_Revision,
            srpocaor: item.Percentage_of_content_added_or_replaced
          })
        }
      })
    }
  }, [itemToEdit])
  // console.log(data)
  //--------------Frant end ui------------
  return (
    <>
      <AddButton onclick={setAdd} exceldialog={setOpen} />
      <Dialog fullWidth maxWidth='lg' open={add}>
        <Diatitle title={title} clear={setAdd} setItemToEdit={setItemToEdit} EditClear={setEdit} Edit={edit} init={initialState} setval={setvalues} />
        <DialogContent dividers sx={{ background: "#e5eaf0" }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLoading(true)
            edit ?
              EditReq({ id: itemToEdit }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
              PostReq({ School: directorUser?.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
          }}>
            <Grid container >
              <CTextField label="Programme Code" value={values.srpc} id="srpc" type="text" onch={setvalues} required={true} />
              <CTextField label="Programme Name" value={values.srpn} id="srpn" type="text" onch={setvalues} required={true} />
              <SYTextField label="Academic Year" value={values.sray} id="sray" onch={setvalues} required={true} />
              <CDatePicker label="Year of Introduction" value={values.sryoi} id="sryoi" onch={setvalues} required={true} />
              <SCTextField label="Status of implementation" value={values.srsoioce} id="srsoioce" select={CE} required={true} onch={setvalues} />
              <CDatePicker label="Year of Implimentation" value={values.sryoim} id="sryoim" onch={setvalues} required={true} />
              <CDatePicker label="Year of Revision" value={values.sryor} id="sryor" onch={setvalues} />
              <CTextField label="Percentage of content added or replaced" type="number" value={values.srpocaor} id="srpocaor" onch={setvalues} required={true} />
              <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='SyllabusRevisionDirector' title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} year='Academic_Year' fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} />
    </>
  )
}

export default SyllabusRevision;
