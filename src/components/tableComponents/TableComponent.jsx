import React, { useEffect, useState } from "react";
import { Avatar, Grid, Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import TblCellH from "./TblCellH";
import TblCell from "./TblCell";
import TblView from "./TblView";
import TblEditDelete from "./TblEditDelete";
import Loader from "../Loader"
import EmptyBox from "../EmptyBox";
import sortByAcademicYear from "../../js/sortByAcademicYear";


function TableComponent(props) {

    const [tblCells, setTblCells] = useState();

    useEffect(() => {
        let tblCells = [];
        const cellsrm = ["index", "propic", "link", "Upload_Proof", "Proof", "Action"]
        Object.keys(props?.tableHead).map((e) => {
            tblCells.push(e)
        })
        cellsrm.map((e) => {
            var index = tblCells.indexOf(e);
            if (index !== -1) {
                tblCells.splice(index, 1);
            }
        })

        setTblCells(tblCells)
    }, [props.tableHead])
    let tableKeys = Object.keys(props?.tableHead)
    console.log();

    return (
        <>
            <Grid container my={2} >
                <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
                    <Table area-label='simple tabel' stickyHeader>
                        <TblCellH TblH={props.tableHead} SendReq={props.SendReq} />
                        <TableBody>
                            {
                                props.TB && sortByAcademicYear(props.TB, props.year, props.filterByAcademicYear, props.academicYear).map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TblCell val={index + 1} />
                                        {Object.keys(props?.tableHead).includes("propic") ? <TblCell val={<Avatar src={`${process.env.REACT_APP_MAIN_URL}/showFile/${row[props.propic]}/${props.proof ? props.proof : props.module}`} />} /> : ""}
                                        {
                                            tblCells?.map((key) => {
                                                return <TblCell key={key} val={row[key]} />
                                            })
                                        }
                                        {tableKeys.includes("link")&& <TblCell val={row.link==="N/A" ? row.link : <a href={row.link} target="_blank" style={{ color: "blue" }} rel="noreferrer">{row.link}</a>} />}
                                        {tableKeys.includes("Upload_Proof") || tableKeys.includes("Proof") ? <TblView val={props.getproof ? row[props.getproof] : row.Upload_Proof} module={props.proof ? props.proof : props.module} /> : ""}
                                        <TblEditDelete val={row._id} loc={props.SendReq} fatchdata={props.fatchdata} setItemToEdit={props.setItemToEdit} module={props.module} editIcon={props.editIcon} deleteDisabled={props.deleteDisabled} EditDisabled={props.EditDisabled} CheckBox={props.CheckBox} checkedData={props.checkedData} setCheckedData={props.setCheckedData} customDelete={props.customDelete} />
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


            </Grid>
            {props.isLoading ? <Loader /> : ""}
            {!props.isLoading && props.TB?.length === 0 ? <EmptyBox /> : ""}
        </>
    );
}
export default TableComponent;