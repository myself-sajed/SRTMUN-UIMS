import React, { useEffect, useState } from 'react'
import AdminTable from './AdminTable'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import { updatedTableHead as tableHead } from './AdminMasterTable'
import AdminExcelExoprt from './AdminExcelExoprt'
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from '@mui/material';

const updatedTableHead = {...tableHead }

const BtnAdminTable = ({module="Admin", proof=null, color="#ae7e28", model, academicYear, heading, school, serviceName, customParams, setState, setLoaded }) => {

  const [open, setOpen] = useState(false);

    const params = customParams || { model, module, filter: academicYear && { year: { $in: academicYear } },
    filterConditios: school && { department: school }}
  
    const { data, isLoading } = useQuery(`${model} ${params}`, () => getReq(params))

  let filterTableHead = {...updatedTableHead[model]}
  if (filterTableHead.hasOwnProperty("Action")){
    delete filterTableHead.Action
  }

  useEffect(() => {
    setState((pri) => {
       return {
          ...pri,
           [model]: data?.data
       }
   })
  if (!isLoading) {
        setLoaded((pre) => {return{...pre,[model]: true}});
      }
   }, [data && data])

  return (
    <div className='h-full w-full'>
        <div style={{border:`solid 2px #997024`,borderRadius:"6px", display: "flex"}}>
        <Button className='adminBtn normalBtn' sx={{ background: '#f3e9d5'}} size="small" onClick={()=>{setOpen(true)}} >
          <div>{heading}<span className='px-2' style={{ border: '1px solid',borderRadius: '4px', margin: '0 5px', color: '#ae7e28', fontWeight: '700'}}>{data?.data?.length}</span></div>
        </Button>
        <AdminExcelExoprt data={data?.data} fileTitle={heading} SendReq={model} module={module} proof={proof} isLoading={isLoading} />
      </div>
      <Dialog fullScreen open={open} onClose={()=>{setOpen(false)}}>
        <DialogTitle className='flex gap-4 items-center'>
          <IconButton onClick={()=>{setOpen(false)}}>
            <ClearIcon/>
          </IconButton>
          {heading}
          <div className='flex w-full justify-end'>
            <p className='px-2 mx-2 text-[#ae7e28]'style={{border: "1px solid",borderRadius: "5px"}}>{data?.data?.length}</p>
            <div className='flex items-center' style={{border:"solid 1px #ae7e28", borderRadius: "3px" }}>
              <p style={{fontSize:"15px"}} className='px-3 text-[#2f9163]'>Download Excel</p>
              <AdminExcelExoprt data={data?.data} fileTitle={heading} SendReq={model} module={module} proof={proof} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
        <AdminTable data={data?.data} tableHead={filterTableHead} proof={proof} serviceName={serviceName} Heading={heading} SendReq={model} isLoading={isLoading} headColor={color} tableHeight='90vh' />
        </DialogContent>
      </Dialog>
      
    </div>
  )
}

export default BtnAdminTable
