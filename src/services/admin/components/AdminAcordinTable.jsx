import React, { useState } from 'react'
import AdminExcelExoprt from './AdminExcelExoprt'
import AdminTable from './AdminTable'
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';

const AdminAcordinTable = ({ children, Heading, data, SendReq, proof, tableHead, year, module, isLoading }) => {

  const [open, setOpen] = useState(false);
  return (
    <div className='col-md-4 col-12 col-lg-4 col-sm-6 p-2'>
      <div style={{border:"solid 2px #764799",borderRadius:"6px", display: "flex"}}>
      <Button className='hover:text-purple-900' sx={{ background: "#764799", color: "#FFF", width: "100%"}} onClick={()=>{setOpen(true)}} >{Heading}</Button><AdminExcelExoprt data={data} fileTitle={Heading} SendReq={SendReq} module={module} proof={proof} />
      </div>
      <Dialog fullScreen open={open} onClose={()=>{setOpen(false)}}>
        <DialogTitle className='flex gap-4 items-center'><IconButton onClick={()=>{setOpen(false)}}><ClearIcon/></IconButton>{Heading}</DialogTitle>
        <DialogContent>
          {children ? children : <AdminTable data={data} tableHead={tableHead} year={year} proof={proof} serviceName={module} isLoading={isLoading} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminAcordinTable