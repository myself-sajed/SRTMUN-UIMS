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

const tableHead = { index: "Sr. no.", studentName: "Student Name", classes: "Class", dob: "Date of Birth", caste: "Caste", category: "Category", nss1Year: "Year of NSS-1", nss2Year: "Year of NSS-2", address: "Address", email: "Email", projectName: "Project Assigned", bloodGroup: "Blood Group", Action: "Action" }

function StudentAdmissionTable({ filterByAcademicYear = false, academicYear }) {
    const SendReq = 'NssAdmission';
    const module = 'nss';

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);   
    let filter = {};
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


    //--------------values useState---------------
    const initialState = {
        studentName: "", classes: "", caste: "", category: "", nss1Year: "", nss2Year: "", address: "", email: "", projectName: "", bloodGroup: "",  dob: ""
    }

    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'NSS Student'
    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data?.forEach((item) => {
                const { studentName, classes, caste, category, nss1Year, nss2Year, address, email, projectName, bloodGroup, dob } = item
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({ studentName, classes, caste, category, nss1Year, nss2Year, address, email, projectName, bloodGroup, dob })
                }
            })
        }
    }, [itemToEdit])

    //--------------Frant end ui------------

    return (
        <>
            <AddButton title={title} onclick={setAdd} exceldialog={setOpen}  customName="Enrolled Students into NSS" filterByAcademicYear={true} dataCount={data ? data?.data.length : 0} />
            <Dialog fullWidth maxWidth='lg' open={add}>
                <Diatitle title={title} clear={setAdd} setItemToEdit={setItemToEdit} EditClear={setEdit} Edit={edit} init={initialState} setval={setvalues} />
                <DialogContent dividers sx={{ background: "#e5eaf0" }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true)
                        edit ?
                            EditReq({ id: itemToEdit }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
                            PostReq({}, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                            <CTextField label="Student Name" value={values.studentName} id="studentName" type="text" onch={setvalues} required={true} />
                            <CTextField label="Class" value={values.classes} id="classes" type="text" onch={setvalues} required={true} />
                            <DateRPick label="Date of Birth" value={values.dob} id="dob" onch={setvalues} required={true} />
                            <CTextField label="Caste" value={values.caste} id="caste" type="text" onch={setvalues} required={true} />
                            <CTextField label="Category" value={values.category} id="category" type="text" onch={setvalues} required={true} />
                            <CTextField label="Year of NSS-1" value={values.nss1Year} id="nss1Year" type="number" onch={setvalues} required={true} />
                            <CTextField label="Year of NSS-2" value={values.nss2Year} id="nss2Year" type="number" onch={setvalues} required={true} />
                            <CTextField label="Address" value={values.address} id="address" type="text" onch={setvalues} required={true} />
                            <CTextField label="Email" value={values.email} id="email" type="email" onch={setvalues} required={true} />
                            <CTextField label="Project Assigned" value={values.projectName} id="projectName" type="text" onch={setvalues} required={true} />
                            <CTextField label="Blood Group" value={values.bloodGroup} id="bloodGroup" type="text" onch={setvalues} required={true} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='NSSStudent' title={title} SendReq={SendReq} refetch={refetch} module={module} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} />
        </>
    )
}

export default StudentAdmissionTable;

