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
import SchoolsProgram from "../../../components/SchoolsProgram";
import { academicYearGenerator } from "../../../inputs/Year";


const Cate = ["Institution", "Teacher", "Research Scholar", "Student"]
const tableHead = { index: "Sr. no.", SchoolName: "School Name", Title_of_the_innovation: "Title of the innovation", Name_of_the_Award: "Name of the Award", Year_of_Award: "Year of Award", Name_of_the_Awarding_Agency: "Name of the Awarding Agency", Contact_details_Agency: "Contact details Agency", Category: "Category", Upload_Proof: "Proof", Action: "Action" }

const typeObject = {
  SchoolName: Object.keys(SchoolsProgram).map(item => { return item }), Title_of_the_innovation: "test", Name_of_the_Award: "text", Year_of_Award: academicYearGenerator(29, true, true), Name_of_the_Awarding_Agency: "text", Contact_details_Agency: "text", Category: Cate,
}
function Awards({ filterByAcademicYear = false, academicYear, school }) {

  if (!school) {
    delete tableHead.SchoolName;
    delete typeObject.SchoolName;
  }

  const SendReq = "Award";
  const module = "director"
  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)

  const [Filter, setFiletr] = useState({ yearFilter: filterByAcademicYear?[academicYear]: [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = school ? yearFilter.length === 0 ? {} : { Year_of_Award: { $in: yearFilter } } : yearFilter.length === 0 ? { SchoolName } : { Year_of_Award: { $in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: '', module, filter }

  const { data, isLoading, refetch } = useQuery(`${SendReq}Jf*H&8pQrZ1q@K9Lb2Xm`, () => GetReq(params))

  //--------------values useState---------------
  const initialState = { atoti: "", anota: "", SchoolN: "", anotaa: "", acda: "", ayoa: "", ac: "", Upload_Proof: "" }
  const [values, setvalues] = useState(initialState);

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = "Awards";

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
            ac: item.Category,
            SchoolN: school ? item.SchoolName : ""
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
      <AddButton title={title} filterByAcademicYear={filterByAcademicYear} onclick={setAdd} exceldialog={setOpen} yearFilter={yearFilter} setState={setFiletr} dataCount={data?.data.length} />
      <Dialog fullWidth maxWidth='lg' open={add}>
        <Diatitle title={title} clear={setAdd} setItemToEdit={setItemToEdit} EditClear={setEdit} Edit={edit} init={initialState} setval={setvalues} />
        <DialogContent dividers sx={{ background: "#e5eaf0" }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLoading(true)
            edit ?
              EditReq({ id: itemToEdit, School: values?.SchoolN }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
              PostReq({ School: school ? values?.SchoolN : directorUser?.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
          }}>
            <Grid container >
              {
                school && <SCTextField value={values.SchoolN} id="SchoolN" type="text" label="School" required={true} onch={setvalues} select={Object.keys(SchoolsProgram).map(item => { return item })} />
              }
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

      <BulkExcel data={data?.data} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{ SchoolName: directorUser?.department }} open={open} setOpen={setOpen} tableHead={tableHead} typeObject={typeObject} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Year_of_Award" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
    </>
  );
}

export default Awards;