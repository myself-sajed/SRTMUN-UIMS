import React, { useState } from 'react'
import AdminExcelExoprt from './AdminExcelExoprt'
import AdminTable from './AdminTable'
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/system';
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from '@mui/material';

const Btn = styled(Button)({
  textTransform: 'none',
});

const AdminAcordinTable = ({ children, Heading, data, SendReq, proof, tableHead, year, module, isLoading }) => {

  const [open, setOpen] = useState(false);
  return (
    <div className='col-md-4 col-12 col-lg-3 col-sm-6 p-2'>
      <div style={{border:"solid 2px #997024",borderRadius:"6px", display: "flex"}}>
        <Btn className='hover:text-[#997024]' sx={{ background: "#f3e9d5",color:"#997024", width: "100%"}} size="small" onClick={()=>{setOpen(true)}} >
          {Heading}
        </Btn>
        <AdminExcelExoprt data={data} fileTitle={Heading} SendReq={SendReq} module={module} proof={proof} />
      </div>
      <Dialog fullScreen open={open} onClose={()=>{setOpen(false)}}>
        <DialogTitle className='flex gap-4 items-center'>
          <IconButton onClick={()=>{setOpen(false)}}>
            <ClearIcon/>
          </IconButton>
          {Heading}
          <div className='flex w-full justify-end'>
            <div className='flex items-center' style={{border:"solid 1px #ae7e28", borderRadius: "3px" }}>
              <p style={{fontSize:"15px"}} className='px-3 text-[#2f9163]'>Download Excel</p>
              <AdminExcelExoprt data={data} fileTitle={Heading} SendReq={SendReq} module={module} proof={proof} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          {children ? children : <AdminTable data={data} tableHead={tableHead} year={year} proof={proof} serviceName={module} Heading={Heading} SendReq={SendReq} isLoading={isLoading} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminAcordinTable