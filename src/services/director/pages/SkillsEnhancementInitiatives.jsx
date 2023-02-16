import React ,{ useState, useEffect } from "react";
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

const tableHead = { index: "Sr. no." ,  Name_of_the_capacity_development_schemes: "Name of the capacity development schemes" ,  Academic_Year: "Academic Year" ,  Date_of_implementation: "Date of implementation" ,  Number_of_students_enrolled: "Number of students enrolled" ,  Upload_Proof: "Upload proof" ,  Action: "Action" }

function SkillsEnhancementInitiatives() {

    const SendReq = 'SkillsEnhancementInitiatives';
    const module = 'director'

    //--------------fetch data from db----------
    const [tableBody, setTableBody] = useState();
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const params = { model: SendReq, id: directorUser?.department, module }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))


    //--------------values useState---------------
    const initialState = { seiianotcds: "", seiiaay: "", seiiadoi: "", seiianose: "", Upload_Proof: "" }
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
                        seiianotcds: item.Name_of_the_capacity_development_schemes,
                        seiiaay: item.Academic_Year,
                        seiiadoi: item.Date_of_implementation,
                        seiianose: item.Number_of_students_enrolled,
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
                <DialogContent dividers sx={{background:"#e5eaf0" }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true)
                        edit ?
                            EditReq({id:itemToEdit}, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
                            PostReq({School:directorUser.department}, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container >
                            <CTextField value={values.seiianotcds} id="seiianotcds" label="Name of the capacity development schemes" type="text" onch={setvalues} required={true} />
                            <SYTextField value={values.seiiaay} id="seiiaay" label="Academic Year" onch={setvalues} required={true} />
                            <CTextField value={values.seiiadoi} id="seiiadoi" label="Date of implementation" type="date" onch={setvalues} required={true} />
                            <CTextField value={values.seiianose} id="seiianose" label="Number of students enrolled" type="number" onch={setvalues} required={true} />
                            <UTextField label="Upload proof" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile='SckilsEnhancementInitiativesDirector' title='Sckils Enhancement Initiatives' SendReq={SendReq} refetch={refetch} module={module} department={directorUser?.department} open={open} setOpen={setOpen} />

            <Table TB={data?.data} module={module} year="Academic_Year" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}

export default SkillsEnhancementInitiatives;