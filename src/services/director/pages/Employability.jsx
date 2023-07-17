import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import SYTextField from "../components/FormComponents/SYTextField";
import CDatePicker from "../components/FormComponents/CDatePicker";
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

const tableHead = { index: "Sr. no.",Program_Name: "Program Name", Course_Code: "Course Code", Name_of_the_Course: "Course name", Academic_Year: "Academic Year", Year_of_introduction: "Year of introduction", Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: "Activities / Content with direct bearing on Employability / Entrepreneurship / Skill development", Upload_Proof: "Proof", Action: "Action" }

function Employability({ filterByAcademicYear = false, academicYear }) {

    const SendReq = "Employability";
    const module = 'director';

    //--------------fetch data from db----------
    const [tableBody, setTableBody] = useState();
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = yearFilter.length === 0 ? { SchoolName } : { Academic_Year: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


    //--------------values useState---------------
    const initialState = {  Program_Name: "", Course_Code: "", Name_of_the_Course: "", Upload_Proof: "", Year_of_introduction: "", Academic_Year: "", Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Employability';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                const { Course_Code,Name_of_the_Course, Academic_Year, Year_of_introduction, Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development,Program_Name } = item
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        Course_Code,Name_of_the_Course, Academic_Year, Year_of_introduction, Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development,Program_Name
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
                            PostReq({ School: directorUser?.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                            <SCTextField label= "Program Name" value={values.Program_Name} id="Program_Name" required={true} type="text" onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />
                            <CTextField label="Course Code" type="text" value={values.Course_Code} id="Course_Code" required={true} onch={setvalues} />
                            <CTextField label="Name of the Course" type="text" value={values.Name_of_the_Course} id="Name_of_the_Course" required={true} onch={setvalues} />
                            <CDatePicker label="Year of introduction" value={values.Year_of_introduction} id="Year_of_introduction" required={true} onch={setvalues} />
                            <SYTextField label="Academic Year" value={values.Academic_Year} id="Academic_Year" required={true} onch={setvalues} />
                            <CTextField label="Activities/Content with direct bearing on Employability/ Entrepreneurship/ Skill development" type="text" value={values.Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development} id="Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development" required={true} onch={setvalues} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='EmployabilityDirector' title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />
            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Academic_Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default Employability;