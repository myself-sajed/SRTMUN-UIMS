import React from 'react'
// import SwayamEContentDeveloped from '../services/swayam/pages/SwayamEContentDeveloped'
// import SwayamValueAddedCourses from '../services/swayam/pages/SwayamValueAddedCourses'
import AdminPhdAwarded from '../services/admin/tables/AdminPhdAwarded'
import AdminHE from '../services/admin/tables/AdminHE'
import AdminDemandRatio from '../services/admin/tables/AdminDemandRatio'
import AdminResearchGuide from '../services/admin/tables/AdminResearchGuide'
import TPOCounselingAndGuiance from '../services/placement/pages/TPOCounselingAndGuiance'
// import AdminJRFSRF from '../services/admin/tables/AdminJRFSRF'
// import AdminResearchProjects from '../services/admin/tables/AdminResearchProjects'

const Test2 = () => {
  return (
    <div>
      {/* <AdminJRFSRF/>
      <AdminResearchProjects/> */}
      {/* <AdminPhdAwarded/>
      <AdminHE/>
      <AdminDemandRatio/>
      <AdminResearchGuide/> */}
      {/* <SwayamValueAddedCourses/>
      <SwayamEContentDeveloped/> */}

      <TPOCounselingAndGuiance />
    </div>
  )
}

export default Test2



// import React, { useState } from 'react';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { useEffect } from 'react';
// import toast from 'react-hot-toast';

// function Test2({tableHead, typeObject, tableData, setTableData, model }) {
//   const [filds, setFilds] = useState("");
//   const [columnToFill, setColumnToFill] = useState("");
  
//   useEffect(() => {
//     setTableData((pri) => {
//       if (pri.length > filds) {
//         return pri.slice(0, filds);
//       } else if (pri.length < filds) {
//         const extraEmptyObjects = Array.from({ length: filds - pri.length }, () => ({}));
//         return [...pri, ...extraEmptyObjects];
//       }
//       return pri;
//     });
//   }, [filds]);

//   const handleDeleteRow = (index) => {
//     const updatedTableData = [...tableData];
//     updatedTableData.splice(index, 1);
//     setTableData(updatedTableData);
//     setFilds(updatedTableData.length)
//   };
// // console.log(filds);
//   const handleInputChange = (event, index, columnName) => {
//     const newValue = event.target.value;

//     const updatedTableData = [...tableData];
//     updatedTableData[index][columnName] = newValue;
//     setTableData(updatedTableData);
//   };

//   useEffect(()=>{
//     console.log('Table data is:', tableData)
//   }, [tableData])

//   const HandleDataPaste = async (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').trim();
//     let filteredData = [];
  
//     if (pastedData) {
//       const cleanedData = pastedData.replace(/\r/g, '');

  
//       if (cleanedData.includes("\n")) {
//         filteredData = cleanedData.split('\n');
//       } else if (cleanedData.includes("\t")) {
//         filteredData = cleanedData.split('\t');
//       }
  
//       if (filteredData.includes("") || columnToFill === "") {
//         toast.error(filteredData.includes("") ? "Randomly cell selection or Empty cell selection not allowed" : "Column Field can not be empty");
//         filteredData = [];
//       }

//       if (filteredData.length > 0) {
//         filteredData.forEach((e,i) => {
//           setTableData((prev)=>{
//             return [...prev , {[columnToFill]: filteredData[i]}]
//           })
//         });
//       } else {
//         toast.error("no data");
//       }
//     }
//   };

//   return (
//     <div>
      
//       <div className='flex w-full'>
//         <div className='col-12 col-md-6 col-lg-4 px-1'>
//         <label htmlFor="colSelect" className="form-label">Select Column</label>
//           <select
//             value={columnToFill} className='form-select' id="colSelect"
//             onChange={(e) => {setColumnToFill(e.target.value)}}
//           >
//             <option selected disabled value="">Choose</option>
//             {Object.keys(typeObject).map((option) => (
//               <option key={`opt${option}`} value={option}>
//                 {tableHead[option]}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className='col-12 col-md-6 col-lg-4 px-1'>
//           <label htmlFor="dataSetter" className="form-label">Paste Here</label>
//           <input className='form-control' id='dataSetter' onPaste={HandleDataPaste} />
//         </div>
//       </div>
//       <div className='table-responsive mt-4' style={{ maxHeight: "80vh" }}>
//       <table className="table table-bordered" >
//         <thead className="sticky-top bg-blue-600 text-[#fff]" >
//           {
//             model==="ReservedSeats"?
//             <tr>
//               <th colSpan={2}></th>
//               <th colSpan={6}>Number of seats earmarked for reserved category as per GOI or State Government rule</th>
//               <th colSpan={6}>Number of students admitted from the reserved category</th>
//               <th></th>
//             </tr>: null
//           }
//           <tr>
//             {Object.keys(typeObject).map((columnName) => (
//               <th key={columnName}>{tableHead[columnName]}</th>
//             ))}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody className='bg-slate-300'>
//           {tableData.map((rowData, rowIndex) => (
//             <tr key={`row${rowIndex}`} >
//               {Object.keys(typeObject).map((columnName, cellIndex) => (
//                 <td key={`${columnName}${cellIndex}`} className='px-1 w-full'>
//                   {Array.isArray(typeObject[columnName]) ? (
//                     <select
//                       value={rowData[columnName]}
//                       className="w-full"
//                       onChange={(e) => handleInputChange(e, rowIndex, columnName)}
//                     >
//                       <option selected disabled value="">Choose</option>
//                       {typeObject[columnName].map((option, index) => (
//                         <option key={`option${index}`} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       type={typeObject[columnName]}
//                       className={`${typeObject[columnName]==="number"?"w-24":"w-full"}`}
//                       value={rowData[columnName]}
//                       onChange={(e) => handleInputChange(e, rowIndex, columnName)}
//                     />
//                   )}
                
//                 </td>
//               ))}
//               <td>
//                 <button onClick={() => handleDeleteRow(rowIndex)}><DeleteOutlineIcon color='error'/></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Test2;

// const TableLengthHandler = (e) => {
  //   const value = e.target.value
  //   if(!isNaN(value)  || value===""){
  //     const newRowCount = parseInt(value);
  //     setFilds( newRowCount || 1 );
  //   }
  // }
  // const handleAddRow = () => {
  //   const newRow = {};
  //   for (const key in typeObject) {
  //     newRow[key] = '';
  //   }
  //   setTableData([...tableData, newRow]);
  //   setFilds([...tableData, newRow].length)
  // };
// {/* <button onClick={handleAddRow}>Add Row</button> */}
  // {/* <div>
  //       <label>Enter Filds</label>
  //       <input type="number" value={filds} onChange={(e)=>{TableLengthHandler(e)}} />
  //     </div> */}
// if (tableData.length === i) {
          //   await setTableData((pri) => [
          //     ...pri,
          //     ...Array.from({ length: filteredData.length - pri.length }, () => ({})),
          //   ]);

          //   const tb =[
          //     {}, {}, {}
          //   ]
            
          //   setFilds(filteredData.length)
          // }


//file viewer changes
// fileName===""||fileName===undefined?<Button sx={{ textTransform: "none", border: 'none', color: '#9a3412', outline: 'none', backgroundColor: '#ffedd5' }}>
//                             No File
//                         </Button>



// import { Button } from '@mui/material';
// import React, { useState, useEffect } from 'react'
// import DialogBox from './formComponents/DialogBox'
// import excelReq from './requestComponents/excelReq';
// import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
// import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
// import UploadFile from './formComponents/UploadFile';
// import excelObject from './excelObject';
// import ExcelJS from 'exceljs';
// import { toast } from 'react-hot-toast';
// import { acadmicYearArr } from './formComponents/YearSelect';
// import axios from 'axios';

// const BulkExcel = ({ SendReq, refetch, module, department, sampleFile, title, open, setOpen, note = null, data, proof, disableUpload = false }) => {
//     const initialState = { excelFile: "" }
//     const [value, setValues] = useState(initialState);
//     const [loading, setLoading] = useState(false);
    
//     async function generateExcelFile(data, columnMappingKey, fileName) {
//       try {
//         const columnMapping = await excelObject[columnMappingKey];
    
//         if (!columnMapping) {
//           throw new Error(`Column mapping '${columnMappingKey}' not found.`);
//         }
    
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Sheet 1');
    
//         const columnNames = Object.values(columnMapping);
//         columnNames.unshift('Sr.No.');
    
//         // Set column headers and formatting
//         const headerRow = worksheet.addRow(columnNames);
//         headerRow.font = { bold: true, size: 12 };
    
//         // Apply formatting to all cells
//         worksheet.columns.forEach((column) => {
//           column.width = 20;
//           column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
//         });
    
//         // Add data rows with auto-incrementing numbers
//         data.forEach((rowData, index) => {
//           const values = Object.keys(columnMapping).map((columnName) => rowData[columnName]);
//           values.unshift(index + 1);
//           worksheet.addRow(values);
//         });
    
//         if (proof) {
//           const lastColumnIndex = Object.keys(columnMapping).length + 2;
//           const proofColumnName = "Link Of Proof";
    
//           worksheet.getColumn(lastColumnIndex).header = proofColumnName;
    
//           for (let i = 2; i <= data.length + 1; i++) {
//             const proofValue = data[i - 2][proof] == undefined || data[i - 2][proof] == "undefined" ? 'Not Uploaded' : 'View Proof';
//             const cell = worksheet.getCell(`${String.fromCharCode(65 + lastColumnIndex-1)}${i}`);
//             if (proofValue === 'View Proof') {
//               const proofURL = `${process.env.REACT_APP_MAIN_URL}/showFile/${data[i - 2][proof]}/${module}`;
//               cell.value = { text: proofValue, hyperlink: proofURL };
//               cell.font = { color: { argb: 'FF0000FF' }, underline: true };
//             } else {
//               cell.value = proofValue;
//             }
//           }
    
//           // Set width and alignment for the last column
//           worksheet.getColumn(lastColumnIndex).width = 20;
//           worksheet.getColumn(lastColumnIndex).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
//         }
//         worksheet.getRow(1).font = { bold: true, size: 12 };
//         worksheet.getRow(1).height = 30;
    
//         for (let i = 2; i <= data.length; i++) {
//           worksheet.getRow(i).commit();
//         }
    
//         // Save the workbook as a file
//         const buffer = await workbook.xlsx.writeBuffer();
//         const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         const url = URL.createObjectURL(blob);
    
//         // Download the Excel file with the specified fileName
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = fileName;
//         link.click();
    
//         console.log('Excel file generated and downloaded successfully.');
//         toast.success("Excel generated successfully")
//       } catch (error) {
//         console.error('Error generating Excel file:', error);
//         toast.error("Error while generating try again")
//       }
//     }

//     const onCancel = () => {
//         setOpen(false)
//     }
//     const onSubmit = (e) => {
//         e.preventDefault();
//         excelReq({ School: department }, SendReq, initialState, value, setValues, refetch, setOpen, setLoading, module)
//     }
//     return <DialogBox title={`${title} Excel Data Entry`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} disableButton={disableUpload}>


//         <div className='p-2 bg-blue-100 rounded-md'>
//             <div className='p-1 flex items-start justify-between'>
//                 <div>

//                 {/* onClick={() => {}} */}

//                     <div><Button variant="contained" component="label" onClick={ ()=>{window.open(`${process.env.REACT_APP_MAIN_URL}/downloadSampleExcel/${sampleFile}/${SendReq}/${department}`)}} startIcon={<CloudUploadRoundedIcon />} sx={{ right: 0, fontSize: 14, maxHeight: 100 }} disabled={disableUpload}>
//                         Sample Excel File to Fill
//                     </Button> </div>
//                     <div className='text-xs text-muted mt-2'>{disableUpload? <p>Due to the large validation, bulk data upload using Excel is not available for this table.</p>:note ? <p>Note: Do not forgot to Upload proofs after bulk entry. <span style={{color:"Red"}}>{note}</span></p> : `Note: Do not forgot to Upload proofs after bulk entry.`}</div>
//                 </div>
//                 <div className=''>
//                     <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100 }} onClick={()=>{generateExcelFile(data, SendReq, `${title}.xlsx`);}} >
//                         Download Data In Excel
//                     </Button>

//                 </div>
//             </div>
//             <div className='w-full mt-3'>
//                 <UploadFile className='col-md-12' accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="excelFile" label="Upload Filled Sample Excel File" setState={setValues} desable={disableUpload}/>
//             </div>
//         </div>

//     </DialogBox>

// }  

// export default BulkExcel