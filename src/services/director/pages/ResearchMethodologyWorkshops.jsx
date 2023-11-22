import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SubmitButton from "../components/FormComponents/SubmitButton";
import CTextField from "../components/FormComponents/CTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import DateRPick from "../components/FormComponents/DateRPick";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SchoolsProgram from "../../../components/SchoolsProgram";
import SCTextField from "../components/FormComponents/SCTextField";
import { academicYearGenerator } from "../../../inputs/Year";

const tableHead = { index: "Sr. no.", SchoolName: "School Name", Name_of_the_workshop_seminar: "Name of the workshop/ seminar", Number_of_Participants: "Number of Participants", year: "year", From_Date: "From Date", To_Date: "To Date", Upload_Proof: "Upload Proof", Action: "Action" }
const typeObject = {
    SchoolName: Object.keys(SchoolsProgram).map(item => { return item }), Name_of_the_workshop_seminar: "text", Number_of_Participants: "number", year: academicYearGenerator( 29, true ), From_Date: "date", To_Date: "date",
}

function ResearchMethodologyWorkshops({ filterByAcademicYear = false, academicYear, school }) {

    if (!school) {
        delete tableHead.SchoolName;
        delete typeObject.SchoolName;
      }

    const SendReq = 'ResearchMethodologyWorkshops';
    const module = 'director'

    //--------------fetch data from db----------    
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)


    const [Filter, setFiletr] = useState({ yearFilter: filterByAcademicYear? [academicYear] : [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = school ? yearFilter.length === 0 ? {} : { Academic_Year: { $in: yearFilter } } : yearFilter.length === 0 ? { SchoolName } : { Academic_Year: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, refetch } = useQuery([SendReq, params], () => GetReq(params))

    //--------------values useState---------------
    const initialState = { rmwnotws: "", rmwnop: "", rmwy: "", rmwfd: "", rmwtd: "", rmwloarfw: "", Upload_Proof: "", SchoolN: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Research Methodology Workshops';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        rmwnotws: item.Name_of_the_workshop_seminar,
                        rmwnop: item.Number_of_Participants,
                        rmwy: item.year,
                        rmwfd: item.From_Date,
                        rmwtd: item.To_Date,
                        SchoolN:school? item.SchoolName : ""
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
                            EditReq({ id: itemToEdit, School:values?.SchoolN }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
                            PostReq({ School: school ? values?.SchoolN : directorUser?.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                        {
                            school && <SCTextField value={values.SchoolN} id="SchoolN" type="text" label="School" required={true} onch={setvalues} select={Object.keys(SchoolsProgram).map(item => { return item })} />
                        }
                            <CTextField label="Name of the workshop/ seminar" type="text" value={values.rmwnotws} id="rmwnotws" onch={setvalues} required={true} />
                            <CTextField label="Number of Participants" type="number" value={values.rmwnop} id="rmwnop" onch={setvalues} required={true} />
                            <SYTextField label="year" value={values.rmwy} id="rmwy" onch={setvalues} required={true} />
                            <DateRPick label="From Date" value={values.rmwfd} id="rmwfd" onch={setvalues} required={true} />
                            <DateRPick label="To Date" value={values.rmwtd} id="rmwtd" onch={setvalues} required={true} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} disableUpload={school?true:false} />
            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default ResearchMethodologyWorkshops;