import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SYTextField from "../components/FormComponents/SYTextField";
import CTextField from "../components/FormComponents/CTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import UTextField from "../components/FormComponents/UTextField";
import SCTextField from "../components/FormComponents/SCTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SchoolsProgram from "../../../components/SchoolsProgram";


const tableHead = { index: "Sr. no.", Name_of_student_placed: "Name of student placed/started Business", Program_graduated_from: "Program graduated from", Name_of_the_employer: "Name of the employer/business", Employer_contact_details: "Employer/business contact details", Pay_package_annum: "Pay package ( ₹ / annum)", Academic_Year: "Year of Placement", Type_Of_Placement: "Type of placemnt", Upload_Proof: "Upload Proof", Action: "Action" }
const typesOfPlacements = ["Placement", "Business Started"];

function Placements({ filterByAcademicYear = false, academicYear }) {

    const SendReq = "Placement";
    const module = 'director';

    //--------------fetch data from db----------
    const [tableBody, setTableBody] = useState();
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)

    const params = { model: SendReq, id: directorUser.department, module }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


    //--------------values useState---------------
    const initialState = { Name_of_student_placed: "", Program_graduated_from: "", Name_of_the_employer: "", Employer_contact_details: "", Pay_package_annum: "", Academic_Year: "", Type_Of_Placement: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    const { Name_of_student_placed, Program_graduated_from, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year, Type_Of_Placement } = item
                    setEdit(true); setAdd(true);
                    setvalues({
                        Name_of_student_placed, Program_graduated_from, Name_of_the_employer, Employer_contact_details, Pay_package_annum, Academic_Year, Type_Of_Placement
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
                            <CTextField label="Name of student placed/started Business" type="text" value={values.Name_of_student_placed} id="Name_of_student_placed" required={true} onch={setvalues} />
                            <SCTextField value={values.Program_graduated_from} id="Program_graduated_from" type="text" label="Program Graduated From" required={true} onch={setvalues} select={directorUser ? SchoolsProgram[directorUser.department].map(item => { return item[0] }) : []} />
                            <CTextField label="Name of the employer/business" type="text" value={values.Name_of_the_employer} id="Name_of_the_employer" required={true} onch={setvalues} />
                            <CTextField label="Employer/business contact details" type="text" value={values.Employer_contact_details} id="Employer_contact_details" required={true} onch={setvalues} />
                            <CTextField label="Pay package ( ₹ / annum)" value={values.Pay_package_annum} id="Pay_package_annum" required={true} onch={setvalues} />
                            <SYTextField label="Academic year of placement" value={values.Academic_Year} id="Academic_Year" required={true} onch={setvalues} />
                            <SCTextField label="Type of placemnt" value={values.Type_Of_Placement} id="Type_Of_Placement" required={true} onch={setvalues} select={typesOfPlacements} />
                            <UTextField label="Upload Proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile={`PlacementsDirector${directorUser.department}`} title='Placements' SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Academic_Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}

export default Placements;