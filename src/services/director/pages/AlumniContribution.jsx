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
import SchoolsProgram from "../../../components/SchoolsProgram";
import BulkExcel from '../../../components/BulkExcel';

const tableHead = { index: "Sr. no.", Name_of_The_Alumni_Contributed: "Name Of The Alumni", Program_graduated_from: "Program Graduated From", Amount_of_contribution: "Contribution Ammount in ₹", Academic_Year: "Academic Year of Contribution", Upload_Proof: "Proof", Action: "Action" }
const AlumniContribution = ({ filterByAcademicYear = false, academicYear }) => {
  const SendReq = "AlumniContribution";
  const module = "director"
  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)

  const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = yearFilter.length === 0 ? { SchoolName } : { Academic_year: { in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: '', module, filter }

  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))

  //--------------values useState---------------
  const initialState = { Name_of_The_Alumni_Contributed: "", Program_graduated_from: "", Amount_of_contribution: "", Academic_Year: "", Upload_Proof: "" }
  const [values, setvalues] = useState(initialState);
  const { Name_of_The_Alumni_Contributed, Program_graduated_from, Amount_of_contribution, Academic_Year } = values

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = 'Alumni Contribution'

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { Name_of_The_Alumni_Contributed, Program_graduated_from, Amount_of_contribution, Academic_Year } = item
          setEdit(true); setAdd(true);
          setvalues({
            Name_of_The_Alumni_Contributed, Program_graduated_from, Amount_of_contribution, Academic_Year
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
              <CTextField value={Name_of_The_Alumni_Contributed} id="Name_of_The_Alumni_Contributed" type="text" label="Name Of The Alumni" required={true} onch={setvalues} />
              <SCTextField value={Program_graduated_from} id="Program_graduated_from" type="text" label="Program Graduated From" required={true} onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />
              <CTextField value={Amount_of_contribution} id="Amount_of_contribution" type="number" label="Contribution Ammount in ₹" required={true} onch={setvalues} />
              <SYTextField value={Academic_Year} id="Academic_Year" label="Year of Contribution" required={true} onch={setvalues} />
              <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile={`AlumniContributionDirector${directorUser?.department}`} title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser.department} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} fatchdata={refetch} year="Academic_Year" setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
    </>
  );
}

export default AlumniContribution