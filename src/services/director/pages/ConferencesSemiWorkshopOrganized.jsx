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

const tableHead = { index: "Sr. no.", Year: "Year", From_Date: "From Date", To_Date: "To Date", Title_Of_the_Program: "Title Of the Program", Level_of_program: "Level of Program", Number_of_Participants: "Number of Participants", Upload_Proof: "Upload proof", Action: "Action" }

// const StaffType = [ "Teaching staff" ,  "Non-Teaching Staff" ]
const level = ["University", "State", "National", "International"]

function ConferencesSemiWorkshopOrganized({ filterByAcademicYear = false, academicYear }) {

  const SendReq = 'ConferencesSemiWorkshopOrganized';
  const module = 'director';

  //--------------fetch data from db----------
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const directorUser = useSelector(state => state.user.directorUser)
  const [Filter, setFiletr] = useState({ yearFilter: filterByAcademicYear? [academicYear] : [], SchoolName: directorUser?.department })
  const { yearFilter, SchoolName } = Filter
  let filter = yearFilter.length === 0 ? { SchoolName } : { Year: { $in: yearFilter }, SchoolName };
  const params = { model: SendReq, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([SendReq, "RM4,(t+D;l|P_h};;z1{"], () => GetReq(params))
  const typeObject = {Year: academicYearGenerator(29,true), From_Date: "date", To_Date: "date", Title_Of_the_Program: "text", Level_of_program: level, Number_of_Participants: "number",}
  //--------------values useState---------------
  const initialState = {
    Year: "", From_Date: "", To_Date: "", Title_Of_the_Program: "", Number_of_Participants: "", Level_of_program: "", Upload_Proof: ""
  }
  const [values, setvalues] = useState(initialState);

  const { Year, From_Date, To_Date, Title_Of_the_Program, Number_of_Participants, Level_of_program } = values
  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const title = 'Conferences / Seminar / Workshop Organized'

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { Year, From_Date, To_Date, Title_Of_the_Program, Type_of_staff, Number_of_Participants, Level_of_program, } = item
          setEdit(true); setAdd(true);
          setvalues({
            Year, From_Date, To_Date, Title_Of_the_Program, Type_of_staff, Number_of_Participants, Level_of_program
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
      <AddButton title={title} filterByAcademicYear={filterByAcademicYear} onclick={setAdd} exceldialog={setOpen} yearFilter={Filter.yearFilter} setState={setFiletr} dataCount={data?.data.length} />
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
              <SYTextField label="Year" value={Year} id="Year" required={true} onch={setvalues} />
              <DateRPick label="From Date" value={From_Date} id="From_Date" onch={setvalues} required={true} />
              <DateRPick label="To Date" value={To_Date} id="To_Date" onch={setvalues} required={true} />
              <CTextField label="Title Of the Program" type="text" value={Title_Of_the_Program} id="Title_Of_the_Program" onch={setvalues} required={true} />
              {/* <SCTextField label="Type of staff" select={StaffType} value={Type_of_staff} id="Type_of_staff" onch={setvalues} required={true} /> */}
              <SCTextField label="Level of program" select={level} value={Level_of_program} id="Level_of_program" onch={setvalues} required={true} />
              <CTextField label="Number of Participants" type="number" value={Number_of_Participants} id="Number_of_Participants" onch={setvalues} required={true} />
              <UTextField label="Upload proof" id="Upload_Proof" required={!edit} onch={setvalues} />
              <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <BulkExcel data={data?.data} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} tableHead={tableHead} typeObject={typeObject} />

      <Table TB={data?.data} module={module} year="Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
    </>
  )
}
export default ConferencesSemiWorkshopOrganized;
