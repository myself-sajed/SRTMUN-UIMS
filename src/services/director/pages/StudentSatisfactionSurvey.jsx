import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import RowRadioButtonsGroup from '../components/FormComponents/RowRadioButtonsGroup';
import SCTextField from '../components/FormComponents/SCTextField';
import CDatePicker from '../components/FormComponents/CDatePicker';
import SubmitButton from '../components/FormComponents/SubmitButton';
import UTextField from "../components/FormComponents/UTextField";
import country from '../components/FormComponents/country'

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SchoolsProgram from "../../../components/SchoolsProgram";
import SYTextField from "../components/FormComponents/SYTextField";

const tableHead = { index: "Sr. no.", Name_of_the_student: "Name of the student", Year_of_joining: "Year of joining", Category: "Category", State_of_Domicile: "State of Domicile", Nationality: "Nationality", Email_ID: "Email ID", Programme_name: "Programme name", Student_Unique_Enrolment_ID: "Student Unique Enrolment ID", Mobile_Number: "Mobile Number", Gender: "Gender", Upload_Proof: "Upload proof", Action: "Action" }

const Category = ["Genral", "OBC", "SC", "ST", "NT", "Others"]

function StudentSatisfactionSurvey({ filterByAcademicYear = false, academicYear }) {

    const SendReq = 'StudentSatisfactionSurvey';
    const module = 'director';

    //--------------fetch data from db----------
    const [tableBody, setTableBody] = useState();
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = yearFilter.length === 0 ? { SchoolName } : { Year_of_joining: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


    //--------------values useState---------------
    const initialState = { sssnots: "", sssyoj: "", sssc: "", ssssod: "", sssnioti: "", sssei: "", ssspn: "", ssssuei: "", sssmn: "", sssg: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Student Satisfaction Survey';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        sssnots: item.Name_of_the_student,
                        sssyoj: item.Year_of_joining,
                        sssc: item.Category,
                        ssssod: item.State_of_Domicile,
                        sssnioti: item.Nationality,
                        sssei: item.Email_ID,
                        ssspn: item.Programme_name,
                        ssssuei: item.Student_Unique_Enrolment_ID,
                        sssmn: item.Mobile_Number,
                        sssg: item.Gender
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
                            <CTextField label="Name of the student" type="Text" value={values.sssnots} id="sssnots" onch={setvalues} />
                            <SYTextField label="Year of joining" value={values.sssyoj} id="sssyoj" onch={setvalues} />
                            <SCTextField select={Category} label="Category" value={values.sssc} id="sssc" onch={setvalues} />
                            <SCTextField select={country()} label="Nationality" value={values.sssnioti} id="sssnioti" onch={setvalues} />
                            <CTextField label="State of Domicile" type="Text" value={values.ssssod} id="ssssod" onch={setvalues} />
                            <CTextField label="Email ID" type="Text" value={values.sssei} id="sssei" onch={setvalues} />
                            <SCTextField value={values.ssspn} id="ssspn" type="text" label="Programme name" required={true} onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />
                            <CTextField label="Student Unique Enrolment ID" type="Text" value={values.ssssuei} id="ssssuei" onch={setvalues} />
                            <CTextField label="Mobile Number" type="number" value={values.sssmn} id="sssmn" onch={setvalues} />
                            <SCTextField label="Gender" value={values.sssg} id="sssg" onch={setvalues} select={["Male", "Female", "Other"]} />
                            <UTextField label="Upload proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile={`StudentSatisfactionSurveyDirector${directorUser.department}`} title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} year='Year_of_joining' fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default StudentSatisfactionSurvey;