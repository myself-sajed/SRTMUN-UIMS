import React, { useEffect, useState } from 'react'
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import adminExcelObject from './adminExcelObject'
// import { CSVLink } from 'react-csv';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';

const IBtn = styled(IconButton)({
  padding: "3px"
});

const AdminExcelExoprt = ({ data, SendReq, fileTitle, proof, module }) => {

  // const [lastData, setLastData] = useState([]);

  // useEffect(() => {
  //   let itemdata = []
  //   data?.forEach((data, index) => {
  //     let newdata = {};


  //     Object.keys(adminExcelObject[SendReq]).forEach((key) => {
  //       newdata = Object.assign(newdata, { "Sr.No.": index + 1 })
  //       if (key === 'userId.name') { newdata[adminExcelObject[SendReq][key]] = data.userId?.name }
  //       else if (key === 'userId.department') { newdata[adminExcelObject[SendReq][key]] = data.userId?.department }
  //       else if (key === 'userId.username') { newdata[adminExcelObject[SendReq][key]] = data.userId?.username }
  //       else { newdata[adminExcelObject[SendReq][key]] = data[key] ? data[key] : "N.A."; }

  //     })
  //     if (proof) {
  //       data[proof] == undefined || data[proof] == "undefined" ? newdata = Object.assign(newdata, { "Link Of Proof": 'File Not Uploaded' }) : newdata = Object.assign(newdata, { "Link Of Proof": `${process.env.REACT_APP_MAIN_URL}/showFile/${data[proof]}/${module}` })
  //     }
  //     itemdata.push(newdata)
  //   })
  //   setLastData(itemdata)

  // }, [data && data])

  async function generateExcelFile(data, columnMappingKey, fileName) {
    try {
      const columnMapping = await adminExcelObject[columnMappingKey];
  
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
        const values = Object.keys(columnMapping).map((columnName) => columnName === 'userId.name'?rowData.userId.name:columnName === 'userId.username'?rowData.userId.username:columnName === 'userId.department'?rowData.userId.department:rowData[columnName]||'N.A.' );
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

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IBtn sx={{background: "#dee1e6", borderRadius: "5px",}} onClick={()=>{generateExcelFile(data, SendReq, `${fileTitle}.xlsx`)}}>
      <FileDownloadOutlinedIcon color='primary'/></IBtn>
    </div>
  )
}

export default AdminExcelExoprt