import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import DialogBox from './formComponents/DialogBox'
import excelReq from './requestComponents/excelReq';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import UploadFile from './formComponents/UploadFile';
import excelObject from './excelObject';
import { CSVLink } from 'react-csv'

const BulkExcel = ({ SendReq, refetch, module, department, sampleFile, title, open, setOpen, note = null, data, proof }) => {
    const initialState = { excelFile: "" }
    const [value, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [lastData, setLastData] = useState([]);

    let itemdata = []
    useEffect(() => {
        data?.forEach((data, index) => {
            let newdata = {};

            Object.keys(excelObject[SendReq]).forEach((key) => {
                newdata = Object.assign(newdata, { "Sr.No.": index + 1 })
                newdata[excelObject[SendReq][key]] = data[key]
            })
            if (proof) {
                data[proof] == undefined || data[proof] == "undefined" ? newdata = Object.assign(newdata, { "Link Of Proof": 'File Not Uploaded' }) : newdata = Object.assign(newdata, { "Link Of Proof": `${process.env.REACT_APP_MAIN_URL}/showFile/${data[proof]}/${module}` })
            }


            itemdata.push(newdata)
        })
        setLastData(itemdata)

    }, [data])

    const onCancel = () => {
        setOpen(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        excelReq({ School: department }, SendReq, initialState, value, setValues, refetch, setOpen, setLoading, module)
    }
    return <DialogBox title={`${title} Excel Data Entry`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel}>


        <div className='p-2 bg-blue-100 rounded-md'>
            <div className='p-1 flex items-start justify-between'>
                <div>
                    <Button variant="contained" component="label" onClick={() => { window.open(`${process.env.REACT_APP_MAIN_URL}/downloadSampleExcel/${sampleFile}.xlsx`) }} startIcon={<CloudUploadRoundedIcon />} sx={{ right: 0, fontSize: 14, maxHeight: 100 }}>
                        Sample Excel File to Fill
                    </Button>
                    <div className='text-xs text-muted mt-2'>{note ? `Note: ${note} Do not forgot to Upload proofs after bulk entry.` : `Note: Do not forgot to Upload proofs after bulk entry.`}</div>
                </div>
                <div className=''>
                    <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100 }}>
                        <CSVLink className='text-white' data={lastData} filename={title}>Download Data In Excel</CSVLink>
                    </Button>

                </div>
            </div>
            <div className='w-full mt-3'>
                <UploadFile className='col-md-12' accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="excelFile" label="Upload Filled Sample Excel File" setState={setValues} />
            </div>
        </div>

    </DialogBox>


}

export default BulkExcel