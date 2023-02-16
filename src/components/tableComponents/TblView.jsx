import { TableCell } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';
import FileViewer from '../FileViewer';


export default function TblView({val, module}) {
    const navigate = useNavigate()
  return (
    <TableCell sx={{ fontSize: "12px" }}><FileViewer fileName={val} serviceName={module}/></TableCell>
  )
}
//<p onClick={() => { navigate(`/director/viewFile/${Props.val}`) }} style={{ color: "#0c63e4", cursor: 'pointer' }}>View</p>