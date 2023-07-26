import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import DialogBox from './formComponents/DialogBox'
import excelReq from './requestComponents/excelReq';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import UploadFile from './formComponents/UploadFile';
import excelObject from './excelObject';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';
import { acadmicYearArr } from './formComponents/YearSelect';

const BulkExcel = ({ SendReq, refetch, module, department, sampleFile, title, open, setOpen, note = null, data, proof }) => {
    const initialState = { excelFile: "" }
    const [value, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const AcademicYears= acadmicYearArr()
    
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

                {/* onClick={() => {}} */}

                    <Button variant="contained" component="label" onClick={() => {  window.open(`${process.env.REACT_APP_MAIN_URL}/downloadSampleExcel/${sampleFile}.xlsx`)  }} startIcon={<CloudUploadRoundedIcon />} sx={{ right: 0, fontSize: 14, maxHeight: 100 }}>
                        Sample Excel File to Fill
                    </Button>
                    <div className='text-xs text-muted mt-2'>{note ? <p>Note: Do not forgot to Upload proofs after bulk entry. <span style={{color:"Red"}}>{note}</span></p> : `Note: Do not forgot to Upload proofs after bulk entry.`}</div>
                </div>
                <div className=''>
                    <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100 }} onClick={()=>{generateExcelFile(data, SendReq, `${title}.xlsx`);}} >
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

    // Create a validation object with field names as keys and their respective validation rules as values
  // const validationObject = {
  //   Award: {
  //     'Year of Award': 'academicYear',
  //     'Category': 'awardCategory',
  //   },
  // };

 
  // Function to generate Excel with validations based on the provided array and model
  // const generateSampleExcel = (excelObject, SendReq, sampleFile, AcademicYears) => {
  //   try {
  //     const columnMapping = excelObject[SendReq];
  
  //     if (!columnMapping) {
  //       throw new Error(`Column mapping '${SendReq}' not found.`);
  //     }

  //       const workbook = new ExcelJS.Workbook();
  //       const worksheet = workbook.addWorksheet('Sheet 1');

  //       const headerArr = Object.values(columnMapping)

  //       const headerRow = worksheet.addRow(headerArr);
  //         headerRow.font = { bold: true, size: 12 };

  //   // Apply validations to the specified columns based on the 'validationObject'
  //   headerArr.forEach((field, i) => {
  //     const validationRule = validationObject[SendReq]?.[field];
  //     const column = worksheet.getColumn(i + 1);

  //     if (validationRule) {
  //       if (validationRule === "num") {
  //         column.numFmt = '0';
  //       } else if (validationRule === "genList") {
  //         column.dataValidation = {
  //           type: 'list',
  //           formulae: ['"Male,Female"'],
  //           showErrorMessage: true,
  //           error: 'Please select a value from the list: Male, Female',
  //         };
  //       } else if (validationRule === "date") {
  //         column.numFmt = 'dd-mm-yyyy';
  //         column.dataValidation = {
  //           type: 'date',
  //           operator: 'between',
  //           allowBlank: true,
  //           formulae: ['"01-01-1996"', '"31-12-9999"'],
  //           showErrorMessage: true,
  //           error: 'Please enter a valid date in the format: dd-mm-yyyy',
  //         };
  //       } else if (validationRule === "academicYear") {
  //         column.dataValidation = {
  //           type: 'list',
  //           formulae: [AcademicYears.map(year => `"${year}"`).join(',')],
  //           showErrorMessage: true,
  //           error: 'Please select a valid academic year from the list',
  //         };
  //       } else if (validationRule === "awardCategory") {
  //         column.dataValidation = {
  //           type: 'list',
  //           formulae: ['"Institution,Teacher,Research Scholar,Student"'],
  //           showErrorMessage: true,
  //           error: 'Please select a value from the list: Male, Female',
  //         };
  //       }
  //     }
  //   });

  //   // Save the Sample Excel file
  //   workbook.xlsx.writeBuffer().then((buffer) => {
  //     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `${sampleFile}.xlsx`;
  //     a.click();
  //     console.log('Excel file generated and downloaded successfully.');
  //       toast.success("Excel generated successfully")
  //     })
  //   } catch(error) {
  //       console.error('Error generating Excel file:', error);
  //       toast.error("Error while generating try again")
  //     }
  // };


  // const generateExcelWithValidations = async () => {
  //   try {
  //     const headings = ['Name', 'Age', 'Gender'];
  
  //     const workbook = new ExcelJS.Workbook();
  //     const worksheet = workbook.addWorksheet('Sheet 1');
  
  //     // Set column headers and formatting
  //     const headerRow = worksheet.addRow(headings);
  //     headerRow.font = { bold: true, size: 12 };
  
  //     // Apply formatting to all cells
  //     worksheet.columns.forEach((column) => {
  //       column.width = 20;
  //       column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
  //     });
  
  //     // Add data rows with validations
  //     const data = [
  //       { Name: 'John', Age: '30', Gender: 'Male' },
  //       { Name: 'Jane', Age: '25', Gender: 'Female' },
  //       // Add more data rows as needed
  //     ];
  
  //     // Apply data validations to 'Age' column
  //     const ageColumn = worksheet.getColumn(2); // Assuming 'Age' is the 2nd column (index 1)
  //     ageColumn.numFmt = '0';
  //     data.forEach((rowData, index) => {
  //       const cell = worksheet.getCell(index + 2, 2); // index + 2 to skip header row
  //       cell.value = rowData.Age;
  //       cell.dataValidation = {
  //         type: 'date',
  //         operator: 'greaterThanOrEqual',
  //         formulae: ['1900-01-01'],
  //         showErrorMessage: true,
  //         errorTitle: 'Invalid Date',
  //         error: 'Please enter a valid date in the format: dd-mm-yyyy',
  //       };
  //     });
  
  //     // Apply data validations to 'Gender' column
  //     const genderColumn = worksheet.getColumn(3); // Assuming 'Gender' is the 3rd column (index 2)
  //     data.forEach((rowData, index) => {
  //       const cell = worksheet.getCell(index + 2, 3); // index + 2 to skip header row
  //       cell.value = rowData.Gender;
  //       cell.dataValidation = {
  //         type: 'list',
  //         formulae: ['"Male", "Female"'],
  //         showErrorMessage: true,
  //         errorTitle: 'Invalid Gender',
  //         error: 'Please select a value from the list: Male, Female',
  //       };
  //     });
  
  //     // Save the Excel file asynchronously
  //     const buffer = await workbook.xlsx.writeBuffer();
  //     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  //     // Download the Excel file
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'SampleFile.xlsx';
  //     a.click();
  //     console.log('Excel file generated and downloaded successfully.');
  //     toast.success('Excel generated successfully');
  //   } catch (error) {
  //     console.error('Error generating Excel file:', error);
  //     toast.error('Error while generating try again');
  //   }
  // };
  

export default BulkExcel