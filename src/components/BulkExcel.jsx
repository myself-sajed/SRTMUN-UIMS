import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import DialogBox from './formComponents/DialogBox'
import excelReq from './requestComponents/excelReq';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import UploadFile from './formComponents/UploadFile';
import excelObject from './excelObject';
import ExcelJS from 'exceljs';
// import { CSVLink } from 'react-csv'

const BulkExcel = ({ SendReq, refetch, module, department, sampleFile, title, open, setOpen, note = null, data, proof }) => {
    const initialState = { excelFile: "" }
    const [value, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    
async function generateExcelFile(data, columnMappingKey, fileName, proof) {
    const columnMapping = await excelObject[columnMappingKey];
  
    if (!columnMapping) {
      throw new Error(`Column mapping '${columnMappingKey}' not found.`);
    }
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
  
    const columnNames = Object.values(columnMapping);
    columnNames.unshift('Sr.No.');
  
    // Set column headers and formatting
    const headerRow = worksheet.addRow(columnNames);
    headerRow.font = { bold: true, size: 12 };
  
    // Apply formatting to all cells
    worksheet.columns.forEach((column) => {
      column.width = 20;
      column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    });
  
    // Add data rows with auto-incrementing numbers
    await data.forEach((rowData, index) => {
      const values = Object.keys(columnMapping).map((columnName) => rowData[columnName]);
      values.unshift(index + 1);
      worksheet.addRow(values);
    });
  
    if (proof) {
      const lastColumnIndex = Object.keys(columnMapping).length + 2;
      const proofColumnName = "Link Of Proof";
  
      worksheet.getColumn(lastColumnIndex).header = proofColumnName;
  
      for (let i = 2; i <= data.length + 1; i++) {
        const proofValue = data[i - 2][proof] == undefined || data[i - 2][proof] == "undefined" ? 'File Not Uploaded' : 'View Proof';
        const cell = worksheet.getCell(`${String.fromCharCode(65 + lastColumnIndex-1)}${i}`);
        if (proofValue === 'View Proof') {
          const proofURL = `${process.env.REACT_APP_MAIN_URL}/showFile/${data[i - 2][proof]}/${module}`;
          cell.value = { text: proofValue, hyperlink: proofURL };
          cell.font = { color: { argb: 'FF0000FF' }, underline: true };
        } else {
          cell.value = proofValue;
        }
      }
  
      // Set width and alignment for the last column
      worksheet.getColumn(lastColumnIndex).width = 20;
      worksheet.getColumn(lastColumnIndex).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    }
  
    // Auto-adjust row height based on wrapped text content
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).height = 30;
  
    for (let i = 2; i <= data.length; i++) {
      worksheet.getRow(i).commit();
    }
  
    // Save the workbook as a file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
  
    // Download the Excel file with the specified fileName
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }
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
                    <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100 }} onClick={()=>{generateExcelFile(data, SendReq, `${title}.xlsx`, proof)}} >
                        Download Data In Excel
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