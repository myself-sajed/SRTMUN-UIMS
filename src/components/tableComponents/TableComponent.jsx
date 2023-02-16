import React, { useEffect, useState } from "react";
import { Grid, Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
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
        const cellsrm = ["index", "Upload_Proof", "Proof", "Action"]
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


    return (
        <>
            <Grid container my={2} >
                <TableContainer component={Paper} sx={{ maxHeight: '50vh' }}>
                    <Table area-label='simple tabel' stickyHeader>
                        <TblCellH TblH={props.tableHead} />
                        <TableBody>
                            {
                                props.TB && sortByAcademicYear(props.TB, props.year).map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
                                        <TblCell val={index + 1} />
                                        {
                                            tblCells?.map((key) => {
                                                return <TblCell val={row[key]} />
                                            })
                                        }
                                        
                                        <TblView val={props.getproof?row[props.getproof]:row.Upload_Proof} module={props.proof?props.proof:props.module} />
                                        <TblEditDelete val={row._id} loc={props.SendReq} fatchdata={props.fatchdata} setItemToEdit={props.setItemToEdit} module={props.module} />
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