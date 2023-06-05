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

const tableHead = { index: "Sr. no.", Course_Code: "Course Code", Name_of_the_Course: "Course name", Academic_Year: "Academic Year", Year_of_introduction: "Year of introduction", Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development: "Activities / Content with direct bearing on Employability / Entrepreneurship / Skill development", Upload_Proof: "Proof", Action: "Action" }

function Employability({ filterByAcademicYear = false, academicYear }) {

    const SendReq = "Employability";
    const module = 'director';

    //--------------fetch data from db----------
    const [tableBody, setTableBody] = useState();
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const params = { model: SendReq, id: directorUser.department, module }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


    //--------------values useState---------------
    const initialState = { ecc: "", enotc: "", Upload_Proof: "", eyoi: "", eay: "", eacwdboeesd: "" }
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
                        ecc: item.Course_Code,
                        enotc: item.Name_of_the_Course,
                        eay: item.Academic_Year,
                        eyoi: item.Year_of_introduction,
                        eacwdboeesd: item.Activities_Content_with_direct_bearing_on_Employability_Entrepreneurship_Skill_development,
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
                            PostReq({ School: directorUser?.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                            <CTextField label="Course Code" type="text" value={values.ecc} id="ecc" required={true} onch={setvalues} />
                            <CTextField label="Name of the Course" type="text" value={values.enotc} id="enotc" required={true} onch={setvalues} />
                            <CDatePicker label="Year of introduction" value={values.eyoi} id="eyoi" required={true} onch={setvalues} />
                            <SYTextField label="Academic Year" value={values.eay} id="eay" required={true} onch={setvalues} />
                            <CTextField label="Activities/Content with direct bearing on Employability/ Entrepreneurship/ Skill development" type="text" value={values.eacwdboeesd} id="eacwdboeesd" required={true} onch={setvalues} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='EmployabilityDirector' title='Employability' SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />
            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Academic_Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default Employability;