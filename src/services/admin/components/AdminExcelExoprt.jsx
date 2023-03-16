import React, { useEffect, useState } from 'react'
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import adminExcelObject from './adminExcelObject'
import { CSVLink } from 'react-csv';

const AdminExcelExoprt = ({ data, SendReq, fileTitle, proof, module }) => {

  const [lastData, setLastData] = useState([]);

  let itemdata = []
  useEffect(() => {
    data?.forEach((data, index) => {
      let newdata = {};


      Object.keys(adminExcelObject[SendReq]).forEach((key) => {
        newdata = Object.assign(newdata, { "Sr.No.": index + 1 })
        if (key === 'userId.name') { newdata[adminExcelObject[SendReq][key]] = data.userId?.name }
        else if (key === 'userId.department') { newdata[adminExcelObject[SendReq][key]] = data.userId?.department }
        else if (key === 'userId.username') { newdata[adminExcelObject[SendReq][key]] = data.userId?.username }
        else { newdata[adminExcelObject[SendReq][key]] = data[key] ? data[key] : "N.A."; }

      })
      if (proof) {
        data[proof] == undefined || data[proof] == "undefined" ? newdata = Object.assign(newdata, { "Link Of Proof": 'File Not Uploaded' }) : newdata = Object.assign(newdata, { "Link Of Proof": `${process.env.REACT_APP_MAIN_URL}/showFile/${data[proof]}/${module}` })
      }
      itemdata.push(newdata)
    })
    setLastData(itemdata)

  }, [data && data])

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton sx={{background: "#c5c2c2", borderRadius: "10px",}}>
        <CSVLink className='text-green-900' data={lastData} filename={fileTitle}><FileDownloadOutlinedIcon/></CSVLink>
      </IconButton>
      {/* <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100, marginBottom: "10px" }}>
        <CSVLink className='text-white' data={lastData} filename={fileTitle}>Export As Excel</CSVLink>
      </Button> */}
    </div>
  )
}

export default AdminExcelExoprt