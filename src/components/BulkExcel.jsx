import { Button } from '@mui/material';
import React, { useState } from 'react'
import DialogBox from './formComponents/DialogBox'
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import excelObject from './excelObject';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import BulkTableEntry from './BulkTableEntry';

const BulkExcel = ({ SendReq, module, title, refetch, open, setOpen, data, proof, disableUpload = false, tableHead, typeObject, commonFilds }) => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    async function generateExcelFile(data, columnMappingKey, fileName) {
      try {
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
        data.forEach((rowData, index) => {
          const values = Object.keys(columnMapping).map((columnName) => rowData[columnName]);
          values.unshift(index + 1);
          worksheet.addRow(values);
        });
    
        if (proof) {
          const lastColumnIndex = Object.keys(columnMapping).length + 2;
          const proofColumnName = "Link Of Proof";
    
          worksheet.getColumn(lastColumnIndex).header = proofColumnName;
    
          for (let i = 2; i <= data.length + 1; i++) {
            const proofValue = data[i - 2][proof] == undefined || data[i - 2][proof] == "undefined" ? 'Not Uploaded' : 'View Proof';
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
    
        console.log('Excel file generated and downloaded successfully.');
        toast.success("Excel generated successfully")
      } catch (error) {
        console.error('Error generating Excel file:', error);
        toast.error("Error while generating try again")
      }
    }

    const onCancel = () => {
        setOpen(false); 
        setLoading(false); 
        setTableData([])
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(`${process.env.REACT_APP_MAIN_URL}/bulktableentry/Excel`,{ commonFilds, model: SendReq, tableData }).then((res)=>{
          if(res.status===201){toast.success(res.data)}
          else if(res.status===500){toast.error("Something went wrong")}
          setLoading(false); 
          refetch(); 
          setOpen(false); 
          setTableData([])
        })
    }

    return <DialogBox title={`${title} Excel Data Entry`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} disableButton={disableUpload} maxWidth="xl" loading={loading}>
        <div className='p-2 bg-blue-100'>
            <div className='p-1 flex items-start justify-end'>
                <div className=''>
                    <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100 }} onClick={()=>{generateExcelFile(data, SendReq, `${title}.xlsx`);}} >
                        Download Data In Excel
                    </Button>
                </div>
            </div>
            <div className='mt-2'>
              <BulkTableEntry tableHead={tableHead} typeObject={typeObject} tableData={tableData} setTableData={setTableData} model={SendReq} />
            </div>
        </div>

    </DialogBox>

}  

export default BulkExcel