import React ,{ useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SubmitButton from "../components/FormComponents/SubmitButton";
import CTextField from "../components/FormComponents/CTextField";
import UTextField from "../components/FormComponents/UTextField";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from "../../../components/BulkExcel";

const tableHead = { index: "Sr. no." ,  Room_number_or_Name_of_Classrooms: "Room number or Name of Classrooms" ,  Type_of_ICT_facility: "Type of ICT facility " ,  Upload_Proof: "Gio taged photo" ,  Action: "Action" }

function IctClassrooms() {

    const SendReq = "IctClassrooms";
    const module = "director"

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)

    const params = { model: SendReq, id: directorUser.department, module }
    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => GetReq(params))

    //--------------values useState---------------
    const initialState = { icrnonoc: "", ictoif: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title="ICT Classrooms";

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        icrnonoc: item.Room_number_or_Name_of_Classrooms,
                        ictoif: item.Type_of_ICT_facility,
                    })
                }
            })
        }
    }, [itemToEdit])

   
    //--------------Frant end ui------------
    return (
        <>
            <AddButton onclick={setAdd} exceldialog={setOpen}/>
            <Dialog fullWidth maxWidth='lg' open={add}>
                <Diatitle title={title} clear={setAdd} setItemToEdit={setItemToEdit} EditClear={setEdit} Edit={edit} init={initialState} setval={setvalues} />
                <DialogContent dividers sx={{background:"#e5eaf0" }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true)
                        edit ?
                            EditReq({id:itemToEdit}, SendReq, initialState, values, setvalues, refetch, setAdd, setEdit, setItemToEdit, setLoading, module) :
                            PostReq({School:directorUser.department}, SendReq, initialState, values, setvalues, refetch, setAdd, setLoading, module)
                    }}>
                        <Grid container>
                            <CTextField label="Room number or Name of Classrooms" type="text" value={values.icrnonoc} id="icrnonoc" required={true} onch={setvalues} />
                            <CTextField label="Type of ICT facility" type="text" value={values.ictoif} id="ictoif" required={true} onch={setvalues} />
                            <UTextField label="Upload Geo tagged Photo" id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} proof='Upload_Proof' sampleFile="IctCLassroomDirector" title={title} SendReq={SendReq} refetch={refetch} module={module} department={directorUser.department} open={open} setOpen={setOpen} />
            <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default IctClassrooms;