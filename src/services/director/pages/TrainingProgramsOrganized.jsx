import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import DateRPick from "../components/FormComponents/DateRPick";
import CTextField from "../components/FormComponents/CTextField";
import SCTextField from "../components/FormComponents/SCTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SYTextField from "../components/FormComponents/SYTextField";
import { academicYearGenerator } from "../../../inputs/Year";

const tableHead = { index: "Sr. no.", Year: "Year", From_Date: "From Date", To_Date: "To Date", Title_Of_the_Program: "Title Of the Program", Type_of_staff: "Type of staff", Number_of_Participants: "Number of Participants", Upload_Proof: "Upload proof", Action: "Action" }

const StaffType = ["Teaching staff & Student", "Non-Teaching Staff"]
// const level = ["University", "State"]

function TrainingProgramsOrganized({ filterByAcademicYear = false, academicYear }) {

  const SendReq = 'TrainingProgramsOrganized';
  const module = 'director';

  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)
  const typeObject = {
    Year: academicYearGenerator(29,true,true), From_Date: "date", To_Date: "date", Title_Of_the_Program: "text", Type_of_staff: StaffType, Number_of_Participants: "number"
  }
  const [Filter, setFiletr] = useState({ yearFilter: filterByAcademicYear? [academicYear] : [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = yearFilter.length === 0 ? { SchoolName } : { Year: { $in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([SendReq, "=R]{Ujz2_bvIAESVU:3d"], () => GetReq(params))

  //--------------values useState---------------
  const initialState = { tpoy: "", tpofd: "", tpotd: "", tpototp: "", tpotos: "", tponop: "", Upload_Proof: "", }
  const [values, setvalues] = useState(initialState);

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = 'Professional Development / Administrative Training Programs Organized';

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setAdd(true);
          setvalues({
            tpoy: item.Year,
            tpofd: item.From_Date,
            tpotd: item.To_Date,
            tpototp: item.Title_Of_the_Program,
            tpotos: item.Type_of_staff,
            tponop: item.Number_of_Participants,
            // tpolop: item.Level_of_program
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
              EditReq({ id: itemToEdit }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
              PostReq({ School: directorUser.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
          }}>
            <Grid container >
              <SYTextField label="Year" value={values.tpoy} id="tpoy" required={true} onch={setvalues} />
              <DateRPick label="From Date" value={values.tpofd} id="tpofd" onch={setvalues} required={true} />
              <DateRPick label="To Date" value={values.tpotd} id="tpotd" onch={setvalues} required={true} />
              <CTextField label="Title Of the Program" type="text" value={values.tpototp} id="tpototp" onch={setvalues} required={true} />
              <SCTextField label="Type of staff" select={StaffType} value={values.tpotos} id="tpotos" onch={setvalues} required={true} />
              {/* <SCTextField label="Level of program" select={level} value={values.tpolop} id="tpolop" onch={setvalues} required={true} /> */}
              <CTextField label="Number of Participants" type="number" value={values.tponop} id="tponop" onch={setvalues} required={true} />
              <UTextField label="Upload proof" value={values.tpoup} id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} />

      <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year='Year' fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
    </>
  )
}
export default TrainingProgramsOrganized;