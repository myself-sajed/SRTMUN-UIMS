import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import SCTextField from "../components/FormComponents/SCTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";
import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from "../../../components/BulkExcel";


const Cate = ["Institution", "Teacher", "Research Scholar", "Student"]
const tableHead = { index: "Sr. no.", Title_of_the_innovation: "Title of the innovation", Name_of_the_Award: "Name of the Award", Year_of_Award: "Year of Award", Name_of_the_Awarding_Agency: "Name of the Awarding Agency", Contact_details_Agency: "Contact details Agency", Category: "Category", Upload_Proof: "Proof", Action: "Action" }

function Awards({ filterByAcademicYear = false, academicYear }) {
  const SendReq = "Award";
  const module = "director"
  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)

  const params = { model: SendReq, id: directorUser.department, module }

  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))

  //--------------values useState---------------
  const initialState = { atoti: "", anota: "", anotaa: "", acda: "", ayoa: "", ac: "", Upload_Proof: "" }
  const [values, setvalues] = useState(initialState);

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title="Awards";

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setAdd(true);
          setvalues({
            atoti: item.Title_of_the_innovation,
            anota: item.Name_of_the_Award,
            anotaa: item.Name_of_the_Awarding_Agency,
            acda: item.Contact_details_Agency,
            ayoa: item.Year_of_Award,
            ac: item.Category
          })
        }
      })
    }
  }, [itemToEdit])

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
              PostReq({ School: directorUser.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
          }}>
            <Grid container >
              <CTextField value={values.atoti} id="atoti" type="text" label="Title of the innovation" required={!edit} onch={setvalues} />
              <CTextField value={values.anota} id="anota" type="text" label="Name of the Award" required={!edit} onch={setvalues} />
              <CTextField value={values.anotaa} id="anotaa" type="text" label="Name of the Awarding Agency" required={!edit} onch={setvalues} />
              <CTextField value={values.acda} id="acda" type="text" label="Contact details(Agency)" required={!edit} onch={setvalues} />
              <SYTextField value={values.ayoa} id="ayoa" label="Year of Award" required={!edit} onch={setvalues} />
              <SCTextField value={values.ac} id="ac" label="Category" required={!edit} onch={setvalues} select={Cate} />
              <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile="AwardDirector" title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser.department} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Year_of_Award" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
    </>
  );
}

export default Awards;