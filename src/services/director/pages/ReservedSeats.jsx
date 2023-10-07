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
import SchoolsProgram from "../../../components/SchoolsProgram";
import { academicYearGenerator } from "../../../inputs/Year";

const tableHead = { index: "Sr. no.", Academic_Year: "Academic Year", Program_Name: "Program Name", NseSC: "SC", NseST: "ST", NseOBC: "OBC(VJNT)", NseDivyngjan: "Divyngjan", NseGeneral: "General", NseOthers: "Others", NsaSC: "SC", NsaST: "ST", NsaOBC: "OBC(VJNT)", NsaDivyngjan: "Divyngjan", NsaGeneral: "General", NsaOthers: "Others", Upload_Proof: "Upload Proof", Action: "Action" }

function ReservedSeats({ filterByAcademicYear = false, academicYear }) {
    const SendReq = 'ReservedSeats';
    const module = 'director'
    const directorUser = useSelector(state => state.user.directorUser)
    const typeObject = {
        Academic_Year: academicYearGenerator(29,true), Program_Name: SchoolsProgram[directorUser.department].map(item => { return item[0] }), NseSC: "number", NseST: "number", NseOBC: "number", NseDivyngjan: "number", NseGeneral: "number", NseOthers: "number", NsaSC: "SCnumber", NsaST: "number", NsaOBC: "number", NsaDivyngjan: "number", NsaGeneral: "number", NsaOthers: "number",
    }
    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);

    const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = yearFilter.length === 0 ? { SchoolName } : { Academic_Year: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, refetch } = useQuery([SendReq, "9obMqP&NK,p.@i.{,W5I"], () => GetReq(params))

    //--------------values useState---------------
    const initialState = { NseSC: "", NseST: "", NseOBC: "", NseDivyngjan: "", NseGeneral: "", NseOthers: "", NsaSC: "", NsaST: "", NsaOBC: "", NsaDivyngjan: "", NsaGeneral: "", NsaOthers: "", Program_Name: "", Academic_Year: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Reserved Seats';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                const { NseSC, NseST, NseOBC, NseDivyngjan, NseGeneral, NseOthers, NsaSC, NsaST, NsaOBC, NsaDivyngjan, NsaGeneral, NsaOthers, Academic_Year, Program_Name } = item
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        NseSC, NseST, NseOBC, NseDivyngjan, NseGeneral, NseOthers, NsaSC, NsaST, NsaOBC, NsaDivyngjan, NsaGeneral, NsaOthers, Academic_Year, Program_Name
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
            <AddButton title={title} filterByAcademicYear={filterByAcademicYear} onclick={setAdd} exceldialog={setOpen} yearFilter={yearFilter} setState={setFiletr} />
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
                            <div className="flex-col">
                                <div className="flex flex-row flex-wrap">
                                    <SYTextField label="Academic Year" value={values.Academic_Year} id="Academic_Year" onch={setvalues} required={true} />
                                    <SCTextField label="Program Name" value={values.Program_Name} id="Program_Name" required={true} type="text" onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />
                                </div>
                                <div className="flex flex-row flex-wrap">
                                    <div className="w-full font-semibold ml-2 my-2">Number of seats earmarked for reserved category as per GOI or State Government rule</div>
                                    <CTextField label="SC" type="number" value={values.NseSC} id="NseSC" onch={setvalues} required={true} />
                                    <CTextField label="ST" type="number" value={values.NseST} id="NseST" onch={setvalues} required={true} />
                                    <CTextField label="OBC(VJNT)" type="number" value={values.NseOBC} id="NseOBC" onch={setvalues} required={true} />
                                    <CTextField label="Divyngjan" type="number" value={values.NseDivyngjan} id="NseDivyngjan" onch={setvalues} required={true} />
                                    <CTextField label="General" type="number" value={values.NseGeneral} id="NseGeneral" onch={setvalues} required={true} />
                                    <CTextField label="Others" type="number" value={values.NseOthers} id="NseOthers" onch={setvalues} required={true} />
                                </div>
                                <div className="flex flex-row flex-wrap">
                                    <div className="w-full font-semibold ml-2 my-2">Number of students admitted from the reserved category</div>
                                    <CTextField label="SC" type="number" value={values.NsaSC} id="NsaSC" onch={setvalues} required={true} />
                                    <CTextField label="ST" type="number" value={values.NsaST} id="NsaST" onch={setvalues} required={true} />
                                    <CTextField label="OBC(VJNT)" type="number" value={values.NsaOBC} id="NsaOBC" onch={setvalues} required={true} />
                                    <CTextField label="Divyngjan" type="number" value={values.NsaDivyngjan} id="NsaDivyngjan" onch={setvalues} required={true} />
                                    <CTextField label="General" type="number" value={values.NsaGeneral} id="NsaGeneral" onch={setvalues} required={true} />
                                    <CTextField label="Others" type="number" value={values.NsaOthers} id="NsaOthers" onch={setvalues} required={true} />
                                </div>
                                <div className="flex flex-row flex-wrap">
                                    <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                                    <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                                </div>
                            </div>

                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} note="In the Sample file, '1' refers to the available seats count, and '2' refers to the admitted students count." />

            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year='Academic_Year' fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default ReservedSeats; 