import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux'
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SCTextField from "../components/FormComponents/SCTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';

const tableHead = { index: "Sr. no.", Academic_Year: "Academic Year", Activity: "Activity", SC: "SC", ST: "ST", OBC: "OBC", Divyngjan: "Divyngjan", General: "General", Others: "Others", Upload_Proof: "Upload Proof", Action: "Action" }

const Activity = ["Number of  seats earmarked for reserved category as per GOI or State Government rule", "Number of students admitted from the reserved category"]

function ReservedSeats({ filterByAcademicYear = false, academicYear }) {

    const SendReq = 'ReservedSeats';
    const module = 'director'

    const directorUser = useSelector(state => state.user.directorUser)

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);

    const params = { model: SendReq, id: directorUser?.department, module }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))

    //--------------values useState---------------
    const initialState = { rsay: "", rsa: "", rssc: "", rsst: "", rsobc: "", rsd: "", rsg: "", rso: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        rsay: item.Academic_Year,
                        rsa: item.Activity,
                        rssc: item.SC,
                        rsst: item.ST,
                        rsobc: item.OBC,
                        rsd: item.Divyngjan,
                        rsg: item.General,
                        rso: item.Others,
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
                <Diatitle clear={setAdd} setItemToEdit={setItemToEdit} EditClear={setEdit} Edit={edit} init={initialState} setval={setvalues} />
                <DialogContent dividers sx={{ background: "#e5eaf0" }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true)
                        edit ?
                            EditReq({ id: itemToEdit }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
                            PostReq({ School: directorUser.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                            <SYTextField label="Academic Year" value={values.rsay} id="rsay" onch={setvalues} required={true} />
                            <SCTextField select={Activity} label="Activity" value={values.rsa} id="rsa" onch={setvalues} required={true} />
                            <CTextField label="SC" type="number" value={values.rssc} id="rssc" onch={setvalues} required={true} />
                            <CTextField label="ST" type="number" value={values.rsst} id="rsst" onch={setvalues} required={true} />
                            <CTextField label="OBC" type="number" value={values.rsobc} id="rsobc" onch={setvalues} required={true} />
                            <CTextField label="Divyngjan" type="number" value={values.rsd} id="rsd" onch={setvalues} required={true} />
                            <CTextField label="General" type="number" value={values.rsg} id="rsg" onch={setvalues} required={true} />
                            <CTextField label="Others" type="number" value={values.rso} id="rso" onch={setvalues} required={true} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='ReservedSeatsDirector' title='Reserved Seats' SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year='Academic_Year' fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default ReservedSeats; 