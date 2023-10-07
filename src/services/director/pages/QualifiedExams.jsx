import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SYTextField from "../components/FormComponents/SYTextField";
import SCTextField from "../components/FormComponents/SCTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import CTextField from "../components/FormComponents/CTextField";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import { academicYearGenerator } from "../../../inputs/Year";

const tableHead = { index: "Sr. no.", Registration_number_roll_number: "Registration number / roll number", Names_of_students_selected_qualified: "Name of student qualified", Name_of_the_Exam: "Exam Qualified", Acadmic_year: "Acadmic Year", Upload_Proof: "Upload Proof", Action: "Action" }

const exam = ["NET", "SLET", "GATE", "GMAT", "GPAT", "NIPER", "CAT", "GRE", "JAM", "IELTS", "TOEFL", "Civil Services", "State Gov exams", "Any Such Other Exams"]

function QualifiedExams({ filterByAcademicYear = false, academicYear }) {

    const SendReq = 'QualifiedExams';
    const module = 'director'

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const typeObject = {
        Registration_number_roll_number: "text", Names_of_students_selected_qualified: "text", Name_of_the_Exam: exam, Acadmic_year: academicYearGenerator(29, true),
    }

    const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = yearFilter.length === 0 ? { SchoolName } : { Acadmic_year: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, refetch } = useQuery([SendReq, "D]:Mtp4u%UZOFI&65V5p"], () => GetReq(params))

    //--------------values useState---------------
    const initialState = { Acadmic_year: "", Registration_number_roll_number: "", Names_of_students_selected_qualified: "", Name_of_the_Exam: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Qualified Exams';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { Acadmic_year, Registration_number_roll_number, Names_of_students_selected_qualified, Name_of_the_Exam } = item
                    setEdit(true); setAdd(true);
                    setvalues({
                        Acadmic_year, Registration_number_roll_number, Names_of_students_selected_qualified, Name_of_the_Exam,
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
                            <CTextField label="Registration number / roll number" type="text" value={values.Registration_number_roll_number} id="Registration_number_roll_number" required={true} onch={setvalues} />
                            <CTextField label="Name of student qualified" type="text" value={values.Names_of_students_selected_qualified} id="Names_of_students_selected_qualified" required={true} onch={setvalues} />
                            <SCTextField label="Select Exam" select={exam} value={values.Name_of_the_Exam} id="Name_of_the_Exam" required="true" onch={setvalues} />
                            <SYTextField label="Acadmic Year" value={values.Acadmic_year} id="Acadmic_year" required={true} onch={setvalues} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Acadmic_year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default QualifiedExams;