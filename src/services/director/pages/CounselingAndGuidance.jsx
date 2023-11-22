import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import CTextField from "../components/FormComponents/CTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
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
import Lists from "../../../components/tableComponents/Lists";

const tableHead = { index: "Sr. no.", SchoolName: "School Name", activityType: "Type Of Activity", Name_of_the_Activity_conducted_by_the_HEI: "Name of the Activity conducted by the HEI", Number_of_Students_Attended: "Number of Students Attended", Year_of_Activity: "Year of Activity", Upload_Proof: "Link to the relevant document", Action: "Action" }



function CounselingAndGuidance({ filterByAcademicYear = false, academicYear, newSchool=false, school }) {

    const SendReq = "CounselingAndGuidance";
    const module = 'director'
    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    
    
    const typeObject = {activityType: Lists.counselingActivities, Name_of_the_Activity_conducted_by_the_HEI: "text", Number_of_Students_Attended: "number", Year_of_Activity: academicYearGenerator(29, true),}

    const [Filter, setFiletr] = useState({ yearFilter: filterByAcademicYear? [academicYear] : [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = school ? yearFilter.length === 0 ? {} : { Academic_Year: { $in: yearFilter } } : yearFilter.length === 0 ? { SchoolName } : { Year_of_Activity: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }

    const { data, isLoading, refetch } = useQuery(`${SendReq}fUAjg+wzc-MW^;R&V-hI`, () => GetReq(params))

   

    //--------------values useState---------------
    const initialState = { cagnotacbth: "", cagnosa: "", Upload_Proof: "", cagyoa: "", activityType: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'Counseling And Guidance';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        cagnotacbth: item.Name_of_the_Activity_conducted_by_the_HEI,
                        cagnosa: item.Number_of_Students_Attended,
                        cagyoa: item.Year_of_Activity,
                        activityType: item.activityType
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
                            PostReq({ School: directorUser?.department }, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container className="flex_between">
                            <SCTextField value={values.activityType} id="activityType" label={tableHead.activityType} required={true} onch={setvalues} select={Lists.counselingActivities} />
                            <CTextField label="Name of the Activity conducted by the HEI" type="text" value={values.cagnotacbth} id="cagnotacbth" required={true} onch={setvalues} />
                            <CTextField label="Number of Students Attended" type="number" value={values.cagnosa} id="cagnosa" required={true} onch={setvalues} />
                            <SYTextField label="Year of Activity" value={values.cagyoa} id="cagyoa" required={true} onch={setvalues} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Year_of_Activity" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default CounselingAndGuidance;