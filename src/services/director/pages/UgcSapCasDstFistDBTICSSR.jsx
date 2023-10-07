import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";

import SCTextField from "../components/FormComponents/SCTextField";
import SYTextField from "../components/FormComponents/SYTextField";
import CTextField from "../components/FormComponents/CTextField";
import UTextField from "../components/FormComponents/UTextField";
import SubmitButton from "../components/FormComponents/SubmitButton";

import Table from "../../../components/tableComponents/TableComponent";

import GetReq from "../../../components/requestComponents/getReq";
import PostReq from "../../../components/requestComponents/addReq";
import EditReq from "../../../components/requestComponents/editReq";

import AddButton from "../components/UtilityComponents/AddButton";
import Diatitle from "../components/UtilityComponents/Diatitle";
import BulkExcel from '../../../components/BulkExcel';
import SchoolsProgram from "../../../components/SchoolsProgram";
import { academicYearGenerator } from "../../../inputs/Year";

const tableHead = { index: "Sr. no.", Name_of_the_Scheme_Project_Endowments_Chairs: "Name of the Scheme/Project/ Endowments/ Chairs", Name_of_the_Principal_Investigator_Co_Investigator: "Name of the Principal Investigator/ Co Investigator", Name_of_the_Funding_agency: "Name of the Funding agency ", Type_of_Agency: "Type of Agency", Name_of_Department: "Name of Department", Year_of_Award: "Year of Award", Funds_provided_in_lakhs: "Funds provided ( ₹ / in lakhs)", Duration_of_the_project_in_Years: "Duration of the project (in Years)", Upload_Proof: "Upload proof", Action: "Action" }

const TyofAgency = ["Government", "Non-Government"]
function UgcSapCasDstFistDbtICssr({ filterByAcademicYear = false, academicYear }) {

    const SendReq = 'UgcSapCasDstFistDBTICSSR';
    const module = 'director';

    //--------------fetch data from db----------
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const directorUser = useSelector(state => state.user.directorUser)
    const typeObject = {
        Name_of_the_Scheme_Project_Endowments_Chairs: "text", Name_of_the_Principal_Investigator_Co_Investigator: "text", Name_of_the_Funding_agency: "text", Type_of_Agency: TyofAgency, Name_of_Department: Object.keys(SchoolsProgram), Year_of_Award: academicYearGenerator(29, true, true), Funds_provided_in_lakhs: "number", Duration_of_the_project_in_Years: "number"
    }
    const [Filter, setFiletr] = useState({ yearFilter: [], SchoolName: directorUser?.department })
    const { yearFilter, SchoolName } = Filter
    let filter = yearFilter.length === 0 ? { SchoolName } : { Year_of_Award: { $in: yearFilter }, SchoolName };
    const params = { model: SendReq, id: '', module, filter }
    const { data, isLoading, refetch } = useQuery([SendReq, "oi6&|BpE<z'M?@N:S|4U"], () => GetReq(params))


    //--------------values useState---------------
    const initialState = { uscnotspec: "", uscnotpici: "", uscnofa: "", usctoa: "", uscnod: "", uscyoa: "", uscfpil: "", uscdotpiy: "", Upload_Proof: "" }
    const [values, setvalues] = useState(initialState);

    //---------------edit state-------------------
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);
    const title = 'UGC-SAP, CAS, DST-FIST, DBT, ICSSR';

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setAdd(true);
                    setvalues({
                        uscnotspec: item.Name_of_the_Scheme_Project_Endowments_Chairs,
                        uscnotpici: item.Name_of_the_Principal_Investigator_Co_Investigator,
                        uscnofa: item.Name_of_the_Funding_agency,
                        usctoa: item.Type_of_Agency,
                        uscnod: item.Name_of_Department,
                        uscyoa: item.Year_of_Award,
                        uscfpil: item.Funds_provided_in_lakhs,
                        uscdotpiy: item.Duration_of_the_project_in_Years
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
                            <CTextField label="Name of the Scheme/Project/ Endowments/ Chairs" type="text" value={values.uscnotspec} id="uscnotspec" onch={setvalues} required="true" />
                            <CTextField label="Name of the Principal Investigator/ Co Investigator" type="text" value={values.uscnotpici} id="uscnotpici" onch={setvalues} required="true" />
                            <CTextField label="Name of the Funding agency " type="text" value={values.uscnofa} id="uscnofa" onch={setvalues} required="true" />
                            <SCTextField label="Type of Agency" select={TyofAgency} value={values.usctoa} id="usctoa" onch={setvalues} required="true" />
                            <SCTextField label="Name of Department" select={Object.keys(SchoolsProgram)} value={values.uscnod} id="uscnod" onch={setvalues} required="true" />
                            <SYTextField label="Year of Award" value={values.uscyoa} id="uscyoa" onch={setvalues} required="true" />
                            <CTextField label="Funds provided ( ₹ / in lakhs)" type="number" value={values.uscfpil} id="uscfpil" required="true" onch={setvalues} />
                            <CTextField label="Duration of the project (in Years)" type="number" value={values.uscdotpiy} id="uscdotpiy" required="true" onch={setvalues} />
                            <UTextField label="Upload proof" value={values.uscup} id="Upload_Proof" required={!edit} onch={setvalues} />
                            <SubmitButton label="Submit" init={initialState} setval={setvalues} Loading={Loading} />

                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <BulkExcel data={data?.data} tableHead={tableHead} typeObject={typeObject} proof='Upload_Proof' title={title} SendReq={SendReq} refetch={refetch} module={module} commonFilds={{SchoolName:directorUser?.department}} open={open} setOpen={setOpen} />
            
            <Table TB={data?.data} module={module} filterByAcademicYear={filterByAcademicYear} academicYear={academicYear} year="Year_of_Award" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={SendReq} />
        </>
    )
}
export default UgcSapCasDstFistDbtICssr;