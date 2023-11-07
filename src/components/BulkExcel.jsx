import { Button } from '@mui/material';
import React, { useState } from 'react'
import DialogBox from './formComponents/DialogBox'
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import excelObject from './excelObject';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import BulkTableEntry from './BulkTableEntry';
import SchoolsProgram from './SchoolsProgram';
import UploadFile from './formComponents/UploadFile'

const BulkExcel = ({ SendReq, module, title, refetch, open, setOpen, data, proof, serviceName, disableUpload = false, tableHead, typeObject, commonFilds }) => {
  const initialState = { excelFile: "" }
  const [value, setValues] = useState(initialState);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1)

  const generateExcelSampleFile = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    // const school = Object.keys(SchoolsProgram)
    // const schoolNameReplace = Object.keys(SchoolsProgram).map((e) => e.replace(/[^a-zA-Z0-9_]/g, "_"));
    // const columns = ['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS']
    const columns2 = ['BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS']


    // worksheet.getColumn('AA').values = school


    let count = 0
    Object.keys(tableHead).forEach((heading, i) => {
      let objHead = typeObject[heading]
      if (Array.isArray(objHead)) {
        count++
        worksheet.getColumn(columns2[count]).values = objHead
        const rangeStart = `$${columns2[count]}$1`;
        const rangeEnd = `$${columns2[count]}$${objHead.length}`;
        workbook.definedNames.add(`Sheet1!${rangeStart}:${rangeEnd}`, heading);
      }
    });


    for (let rowIndex = 0; rowIndex <= 100; rowIndex++) {
      Object.keys(tableHead).forEach((heading, colIndex) => {
        // const validationRule = headings[heading];
        const cell = worksheet.getCell(rowIndex + 2, colIndex + 1);
        cell.value = "";

        if (Array.isArray(typeObject[heading])) {
          cell.dataValidation = {
            type: 'list',
            formulae: [heading],
            showDropDown: true,
          }
        }

      });

    };

    // schoolNameReplace.forEach((element, i) => {
    //   const e = SchoolsProgram[school[i]]?.map(item => item[0])
    //   worksheet.getColumn(columns[i]).values = e
    //   const rangeStart = `$${columns[i]}$1`;
    //   const rangeEnd = `$${columns[i]}$${e.length}`;
    //   workbook.definedNames.add(`Sheet1!${rangeStart}:${rangeEnd}`, element);
    // });

    // const cellWithDropdown = worksheet.getCell('A1');
    // cellWithDropdown.dataValidation = {
    //   type: 'list',
    //   formulae: [`=$AA$1:$AA$16`],  // Reference the named range
    //   showDropDown: true,
    //   showErrorMessage: true,
    //   errorTitle: 'Invalid value',
    //   error: 'Please select a value from the list',
    // };
    // const cellWithDynamicValues = worksheet.getCell('B1');
    // cellWithDynamicValues.dataValidation = {
    //   type: 'list',
    //   formulae: [`=INDIRECT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE($A$1, " ", "_"), "(", "_"), ")", "_"), ",", "_"))`],  // Reference the named range
    //   showDropDown: true,
    // };

    // Generate the Excel workbook
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link and trigger a click event to download the file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${title}Sample.xlsx`;
    link.click();
  };

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
          const cell = worksheet.getCell(`${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`);
          if (proofValue === 'View Proof') {
            const proofURL = `${process.env.REACT_APP_MAIN_URL}/showFile/${data[i - 2][proof]}/${serviceName ? serviceName : module}`;
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


  const dataBulkEntry = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.post(`${process.env.REACT_APP_MAIN_URL}/bulktableentry/Excel`, { commonFilds, model: SendReq, tableData }).then((res) => {
      if (res.status === 201) { toast.success(res.data) }
      else if (res.status === 500) { toast.error("Something went wrong") }
      setLoading(false);
      refetch();
      setOpen(false);
      setTableData([])
    })
  }

  console.log('Step :', step, tableData)


  const uploadSampleExcel = (e) => {
    e.preventDefault();
    setLoading(true)

    console.log('Function is callled')

    const formData = new FormData()
    formData.append('excelFile', value.excelFile)
    formData.append('tableHead', JSON.stringify(tableHead))

    axios.post(`${process.env.REACT_APP_MAIN_URL}/excel/parseExcelData`, formData).then((res) => {
      if (res.status === 201) {
        toast.success('File Uploaded Successfully')
        console.log(res.data)
        if (res.data.length > 0) {
          setTableData(() => res.data)
          console.log(res.data)
          setStep(2)
        } else {
          throw new Error('File was empty')
        }
      }
      else if (res.status === 500) {
        toast.error("Something went wrong")
        setLoading(false);
        setOpen(false);
        setTableData([])
        setStep(1)

      }
    }).catch(function (err) {
      toast.error(err.message)
      setLoading(false);
      setOpen(false);
      setTableData([])
      setStep(1)

    })
  }



  return <DialogBox title={`${title} Excel Data Entry`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={step === 1 ? uploadSampleExcel : dataBulkEntry} onCancel={onCancel} maxWidth="xl" loading={loading}>
    <div className='p-2 bg-blue-100 rounded-md'>


      {
        step === 1 ?
          <div>
            <div className='p-1 flex items-start justify-between'>
              <div>

                {/* onClick={() => {}} */}

                <div><Button variant="contained" component="label" onClick={generateExcelSampleFile} startIcon={<CloudUploadRoundedIcon />} sx={{ right: 0, fontSize: 14, maxHeight: 100 }} disabled={disableUpload}>
                  Sample Excel File to Fill
                </Button> </div>
              </div>
              <div className=''>
                <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100 }} onClick={() => { generateExcelFile(data, SendReq, `${title}.xlsx`); }} >
                  Download Data In Excel
                </Button>

              </div>
            </div>
            <div className='w-full mt-3'>
              <UploadFile className='col-md-12' accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="excelFile" label="Upload Filled Sample Excel File" setState={setValues} desable={disableUpload} />
            </div>
          </div>
          :
          <BulkTableEntry tableHead={tableHead} typeObject={typeObject} tableData={tableData} setTableData={setTableData} model={SendReq} />
      }



    </div>



  </DialogBox>


}

export default BulkExcel