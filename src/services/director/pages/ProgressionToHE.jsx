import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SubmitButton from "../components/FormComponents/SubmitButton";
import CTextField from "../components/FormComponents/CTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SCTextField from "../components/FormComponents/SCTextField";
import SchoolsProgram from "../../../components/SchoolsProgram";
import { academicYearGenerator } from "../../../inputs/Year";

const tableHead = { index: "Sr. no.", Name_of_student_enrolling: "Name of student enrolling", SchoolName: "School Name", Program_graduated_from: "Program graduated from", Name_of_institution_admitted: "Name of institution admitted", Name_of_programme_admitted: "Name of programme admitted", Academic_Year: "Academic Year", Upload_Proof: "Upload Proof", Action: "Action" }

function ProgressionToHE({ filterByAcademicYear = false, academicYear, school }) {

    if (!school) {
        delete tableHead.SchoolName;
    }

    const SendReq = "ProgressionToHE";
    const module = 'director'

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const typeObject = {
        Name_of_student_enrolling: "text", SchoolName: Object.keys(SchoolsProgram), Program_graduated_from: school?Object.values(SchoolsProgram).flat().map(programArray => programArray[0]):SchoolsProgram[directorUser?.department]?.map(item => item[0]), Name_of_institution_admitted: "text", Name_of_programme_admitted: "text", Academic_Year: academicYearGenerator( 29, true ),
    }
    if (!school) {
        delete typeObject.SchoolName;
    }
    const [Filter, setFiletr] = useState({ yearFilter: filterByAcademicYear? [academicYear] : [], SchoolName: school ? school : directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = school ? yearFilter.length === 0 ? {} : { Academic_Year: { $in: yearFilter } } : yearFilter.length === 0 ? { SchoolName } : { Academic_Year: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, refetch } = useQuery([SendReq, "?4cndG.Sjn?-+A&4UmZB"], () => GetReq(params))

    //--------------values useState---------------
    const initialState = { SchoolN: "", pthenose: "", pthepgf: "", pthenoia: "", pthenopa: "", ptheya: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Progression To HE';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        pthenose: item.Name_of_student_enrolling,
                        pthepgf: item.Program_graduated_from,
                        pthenoia: item.Name_of_institution_admitted,
                        pthenopa: item.Name_of_programme_admitted,
                        ptheya: item.Academic_Year,
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
                            EditReq({ id: itemToEdit }, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
                            PostReq({ School: school ? values?.SchoolN : directorUser.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                            <CTextField value={values.pthenose} id="pthenose" type="text" label="Name of student enrolling" required={true} onch={setvalues} />
                            {
                                school && <SCTextField value={values.SchoolN} id="SchoolN" type="text" label="School" required={true} onch={setvalues} select={Object.keys(SchoolsProgram).map(item => { return item })} />
                            }
                            <SCTextField value={values.pthepgf} id="pthepgf" type="text" label="Program graduated from" required={true} onch={setvalues} select={school
                                ? SchoolsProgram[values?.SchoolN]?.map(item => item[0]) || []
                                : directorUser
                                    ? SchoolsProgram[directorUser.department]?.map(item => item[0]) || []
                                    : []
                            } />

                            <CTextField value={values.pthenoia} id="pthenoia" type="text" label="Name of institution admitted" required={true} onch={setvalues} />
                            <CTextField value={values.pthenopa} id="pthenopa" type="text" label="Name of programme admitted" required={true} onch={setvalues} />
                            <SYTextField label="Academic Year" value={values.ptheya} id="ptheya" required={true} onch={setvalues} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} disableUpload={school?true:false} />

            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Academic_Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default ProgressionToHE;