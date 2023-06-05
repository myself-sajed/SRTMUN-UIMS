import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import UTextField from "../components/FormComponents/UTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import SYTextField from "../components/FormComponents/SYTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SCTextField from "../components/FormComponents/SCTextField";
import SchoolsProgram from "../../../components/SchoolsProgram";

const tableHead = { index: "Sr. no.", Programme_Code: "Program Code", Programme_name: "Program Name", Name_of_the_student: "Name of the student", Academic_Year: "Academic Year", Upload_Proof: "Document prrof ", Action: "Action" }

function ProjectsInternships({ filterByAcademicYear = false, academicYear }) {

    const SendReq = "ProjectsInternships"
    const module = 'director'

    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)

    const params = { model: SendReq, id: directorUser?.department, module }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))

    const initialState = { pipc: "", pipn: "", pinots: "", Upload_Proof: "", piay: "" }
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
                        pipc: item.Programme_Code,
                        pipn: item.Programme_name,
                        piay: item.Academic_Year,
                        pinots: item.Name_of_the_student,
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
                            <CTextField label="Program Code" value={values.pipc} type="text" id="pipc" required={true} onch={setvalues} />

                            <SCTextField value={values.pipn} id="pipn" type="text" label="Programme name" required={true} onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />

                            <CTextField label="Name of the student" type="text" value={values.pinots} id="pinots" required={true} onch={setvalues} />
                            <SYTextField label="Academic Year" value={values.piay} id="piay" required={true} onch={setvalues} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile={`ProjectsInternshipsDirector${directorUser?.department}`} title='Projects Internships' SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Academic_Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}

export default ProjectsInternships;