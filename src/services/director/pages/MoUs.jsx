import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SubmitButton from "../components/FormComponents/SubmitButton";
import UTextField from "../components/FormComponents/UTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import CTextField from "../components/FormComponents/CTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';

const tableHead = { index: "Sr. no.", Name_of_Organisation_with_whome_mou_signed: "Name of Organisation with whome mou signed", Duration_of_MoU: "Duration of MoU", Year_of_signing_MoU: "Year of signing MoU", Upload_Proof: "Actual activity list", Action: "Action" }

function MoUs({ filterByAcademicYear = false, academicYear }) {

    const SendReq = "MoUs"
    const module = "director"

    //--------------fetch data from db----------

    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)

    const [Filter, setFiletr] = useState({yearFilter : [], SchoolName: directorUser?.department })
    const {yearFilter, SchoolName}= Filter
    let filter = yearFilter.length===0?{SchoolName}:{ Year_of_signing_MoU: {$in:yearFilter}, SchoolName } ;
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))

    const initialState = { munoowwms: "", mudom: "", muyosm: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title='MoUs';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    console.log(item);
                    setvalues({
                        munoowwms: item.Name_of_Organisation_with_whome_mou_signed,
                        mudom: item.Duration_of_MoU,
                        muyosm: item.Year_of_signing_MoU,
                    })
                }
            })
        }
    }, [itemToEdit])

    return (
        <>
            <AddButton title={title} onclick={setAdd} exceldialog={setOpen} yearFilter={yearFilter} setState={setFiletr} />
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
                            <CTextField label="Name of Organisation with whome mou signed" type="text" value={values.munoowwms} id="munoowwms" required={!edit} onch={setvalues} />
                            <CTextField label="Duration of MoU" type="text" value={values.mudom} id="mudom" required={!edit} onch={setvalues} />
                            <SYTextField label="Year of signing MoU" value={values.muyosm} id="muyosm" required={!edit} onch={setvalues} />
                            <UTextField label="Upload actual activity list" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='MoUs' title={title} SendReq={SendReq} refetch={refetch} module={module} department={JSON.stringify(directorUser?.department)} open={open} setOpen={setOpen} />
            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Year_of_signing_MoU" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default MoUs;