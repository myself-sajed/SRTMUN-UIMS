import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function TblCellH(Props) {
    
    return (
        <TableHead>
            <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
                {
                    Object.values(Props.TblH).map((e) => (
                        <TableCell sx={{ fontSize: "12px", fontWeight: "bold"  }}>{e}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}