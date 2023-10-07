import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SCTextField from '../components/FormComponents/SCTextField';
import SubmitButton from '../components/FormComponents/SubmitButton';
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SchoolsProgram from "../../../components/SchoolsProgram";
import SYTextField from "../components/FormComponents/SYTextField";
import { academicYearGenerator } from "../../../inputs/Year";
import Lists from "../../../components/tableComponents/Lists";

const tableHead = { index: "Sr. no.", Name_of_the_student: "Name of the student", Year_of_joining: "Year of joining", Category: "Category", State_of_Domicile: "State of Domicile", Nationality: "Nationality", Email_ID: "Email ID", Programme_name: "Program name", Student_Unique_Enrolment_ID: "Student Unique Enrolment ID", Mobile_Number: "Mobile Number", Gender: "Gender", Upload_Proof: "Upload proof", Action: "Action" }

const Category = ["Genral", "OBC", "SC", "ST", "NT", "Others"]

function StudentSatisfactionSurvey({ filterByAcademicYear = false, academicYear }) {

    const SendReq = 'StudentSatisfactionSurvey';
    const module = 'director';

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const typeObject = {
        Name_of_the_student: "text", Year_of_joining: academicYearGenerator(29,true,true), Category: Category, State_of_Domicile: "text", Nationality: Lists.countrys, Email_ID: "text", Programme_name: SchoolsProgram[directorUser.department].map(item => { return item[0] }), Student_Unique_Enrolment_ID: "text", Mobile_Number: "number", Gender: Lists.gender,
    }
    const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = yearFilter.length === 0 ? { SchoolName } : { Year_of_joining: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, refetch } = useQuery([SendReq, ">=rHe+>/%O2x3Cm,D-cU"], () => GetReq(params))


    //--------------values useState---------------
    const initialState = { Name_of_the_student: "", Year_of_joining: "", Category: "", State_of_Domicile: "", Nationality: "", Email_ID: "", Programme_name: "", Student_Unique_Enrolment_ID: "", Mobile_Number: "", Gender: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Student Satisfaction Survey';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                const { Name_of_the_student, Year_of_joining, Category, State_of_Domicile, Nationality, Email_ID, Programme_name, Student_Unique_Enrolment_ID, Mobile_Number, Gender } = item
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({ Name_of_the_student, Year_of_joining, Category, State_of_Domicile, Nationality, Email_ID, Programme_name, Student_Unique_Enrolment_ID, Mobile_Number, Gender })
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
                            <CTextField label="Name of the student" type="Text" value={values.Name_of_the_student} id="Name_of_the_student" onch={setvalues} />
                            <SYTextField label="Year of joining" value={values.Year_of_joining} id="Year_of_joining" onch={setvalues} />
                            <SCTextField select={Category} label="Category" value={values.Category} id="Category" onch={setvalues} />
                            <SCTextField select={Lists.countrys} label="Nationality" value={values.Nationality} id="Nationality" onch={setvalues} />
                            <CTextField label="State of Domicile" type="Text" value={values.State_of_Domicile} id="State_of_Domicile" onch={setvalues} />
                            <CTextField label="Email ID" type="Text" value={values.Email_ID} id="Email_ID" onch={setvalues} />
                            <SCTextField value={values.Programme_name} id="Programme_name" type="text" label="Program name" required={true} onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />
                            <CTextField label="Student Unique Enrolment ID" type="Text" value={values.Student_Unique_Enrolment_ID} id="Student_Unique_Enrolment_ID" onch={setvalues} />
                            <CTextField label="Mobile Number" type="number" value={values.Mobile_Number} id="Mobile_Number" onch={setvalues} />
                            <SCTextField label="Gender" value={values.Gender} id="Gender" onch={setvalues} select={Lists.gender} />
                            <UTextField label="Upload proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} year='Year_of_joining' fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default StudentSatisfactionSurvey;