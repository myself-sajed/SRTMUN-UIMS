import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SubmitButton from "../components/FormComponents/SubmitButton";
import CTextField from "../components/FormComponents/CTextField";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from "../../../components/BulkExcel";
import { academicYearGenerator } from "../../../inputs/Year";
import SYTextField from "../components/FormComponents/SYTextField";

const tableHead = { index: "Sr. no.", Room_number_or_Name_of_Classrooms: "Room number or Name of Classrooms", Type_of_ICT_facility: "Type of ICT facility ", academicYear: "Academic Year", Upload_Proof: "Gio taged photo", Action: "Action" }

function IctClassrooms() {

    const SendReq = "IctClassrooms";
    const module = "director"

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const typeObject = {
        Room_number_or_Name_of_Classrooms: "text", Type_of_ICT_facility: "text", academicYear: academicYearGenerator( 29, true, true )
    }

    const params = { model: SendReq, id: directorUser.department, module }
    const { data, isLoading, refetch } = useQuery([SendReq, "a58pRj6;?ewz'x{&6ANy"], () => GetReq(params))

    //--------------values useState---------------
    const initialState = { icrnonoc: "", ictoif: "", academicYear: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = "ICT Classrooms";

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        icrnonoc: item.Room_number_or_Name_of_Classrooms,
                        ictoif: item.Type_of_ICT_facility,
                        academicYear: item.academicYear
                    })
                }
            })
        }
    }, [itemToEdit])


    return (
        <>
            <AddButton title={title} onclick={setAdd} exceldialog={setOpen} filterByAcademicYear={true} dataCount={data ? data?.data.length : 0} />
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
                        <Grid container>
                            <CTextField label="Room number or Name of Classrooms" type="text" value={values.icrnonoc} id="icrnonoc" required={true} onch={setvalues} />
                            <CTextField label="Type of ICT facility" type="text" value={values.ictoif} id="ictoif" required={true} onch={setvalues} />
                            <SYTextField value={values.ayoa} id="academicYear" label="Academic Year" required={!edit} onch={setvalues} />
                            <UTextField label="Upload Geo tagged Photo" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} />
            <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} year="academicyear" />
        </>
    )
}
export default IctClassrooms;