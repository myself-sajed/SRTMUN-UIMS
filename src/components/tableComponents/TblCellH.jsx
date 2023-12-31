import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function TblCellH(Props) {

    return (
        <TableHead>
            {Props.SendReq == "ReservedSeats" ?
                <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
                    <TableCell colSpan={3} sx={{ border: "solid 1px #c4d5e1" }} > </TableCell>
                    <TableCell colSpan={6} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }} >Number of seats earmarked for reserved category as per GOI or State Government rule</TableCell>
                    <TableCell colSpan={6} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }} >Number of students admitted from the reserved category</TableCell>
                    <TableCell colSpan={2} sx={{ border: "solid 1px #c4d5e1" }} > </TableCell>
                </TableRow> : null}
                {Props.SendReq == "Scholarship" ?
                <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
                    <TableCell colSpan={3} sx={{ border: "solid 1px #c4d5e1" }} > </TableCell>
                    <TableCell colSpan={2} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }} >Number of students benefited by government scheme and amount</TableCell>
                    <TableCell colSpan={2} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }} >Number of students benefited by  the institution's schemes and amount</TableCell>
                    <TableCell colSpan={3} sx={{ fontSize: "12px", fontWeight: "bold", border: "solid 1px #c4d5e1" }} >Number of students benefited by  the non-government agencies (NGOs) and amount</TableCell>
                    <TableCell colSpan={2} sx={{ border: "solid 1px #c4d5e1" }} > </TableCell>
                </TableRow> : null}
            <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
                {
                    Object.values(Props.TblH).map((e) => (
                        <TableCell key={e} sx={{ fontSize: "12px", fontWeight: "bold", border: Props.SendReq == "ReservedSeats" ? "solid 1px #c4d5e1" : "" }}>{e}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}