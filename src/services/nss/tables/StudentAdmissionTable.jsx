import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../../director/components/FormComponents/CTextField";
import SubmitButton from "../../director/components/FormComponents/SubmitButton";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../../director/components/UtilityComponents/AddButton";
import Diatitle from "../../director/components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import DateRPick from "../../director/components/FormComponents/DateRPick";

const tableHead = { index: "Sr. no.", studentName: "Student Name", class: "Class", dob: "Date of Birth", caste: "Caste", category: "Category", nss1Year: "Year of NSS-1", nss2Year: "Year of NSS-2", address: "Address", email: "Email", projectName: "Project Assigned", bloodGroup: "Blood Group", Action: "Action" }

const CE = ["CBCS", "ECS"]

function StudentAdmissionTable({ filterByAcademicYear = false, academicYear }) {
    const SendReq = 'SyllabusRevision';
    const module = 'director';

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = yearFilter.length === 0 ? { SchoolName } : { Academic_Year: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


    //--------------values useState---------------
    const initialState = {
        studentName: "",
        class: "",
        caste: "",
        category: "",
        nss1Year: "",
        nss2Year: "",
        address: "",
        email: "",
        projectName: "",
        bloodGroup: ""
    }

    const [values, setvalues] = useState(initialState);
    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Syllabus Revision'
    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data?.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        studentName: item.studentName,
                        class: item.class,
                        caste: item.caste,
                        category: item.category,
                        nss1Year: item.nss1Year,
                        nss2Year: item.nss2Year,
                        address: item.address,
                        email: item.email,
                        projectName: item.projectName,
                        bloodGroup: item.bloodGroup
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
            <AddButton title={title} filterByAcademicYear={filterByAcademicYear} onclick={setAdd} exceldialog={setOpen} yearFilter={yearFilter} setState={setFiletr} customName="Enrolled Students into NSS" />
            <Dialog fullWidth maxWidth='lg' open={add}>
                <Diatitle customTitle={"NSS Student"} clear={setAdd} setItemToEdit={setItemToEdit} EditClear={setEdit} Edit={edit} init={initialState} setval={setvalues} />
                <DialogContent dividers sx={{ background: "#e5eaf0" }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true)
                        edit ?
                            EditReq({ id: itemToEdit }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
                            PostReq({ School: directorUser?.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                            <CTextField label="Student Name" value={values.srpc} id="studentName" type="text" onch={setvalues} required={true} />
                            <CTextField label="Class" value={values.srpn} id="class" type="text" onch={setvalues} required={true} />
                            <DateRPick label="Date of Birth" value={values.sray} id="dob" onch={setvalues} required={true} />
                            <CTextField label="Caste" value={values.srpn} id="caste" type="text" onch={setvalues} required={true} />
                            <CTextField label="Category" value={values.srpn} id="category" type="text" onch={setvalues} required={true} />
                            <CTextField label="Year of NSS-1" value={values.srpn} id="nss1Year" type="text" onch={setvalues} required={true} />
                            <CTextField label="Year of NSS-2" value={values.srpn} id="nss2Year" type="text" onch={setvalues} required={true} />
                            <CTextField label="Address" value={values.srpn} id="address" type="text" onch={setvalues} required={true} />
                            <CTextField label="Email" value={values.srpn} id="class" type="email" onch={setvalues} required={true} />
                            <CTextField label="Project Assigned" value={values.srpn} id="projectName" type="text" onch={setvalues} required={true} />
                            <CTextField label="Blood Group" value={values.srpn} id="bloodGroup" type="text" onch={setvalues} required={true} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='SyllabusRevisionDirector' title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} year='Academic_Year' fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} />
        </>
    )
}

export default StudentAdmissionTable;

