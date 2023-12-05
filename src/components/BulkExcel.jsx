import { Button } from "@mui/material";
import React, { useState } from "react";
import DialogBox from "./formComponents/DialogBox";
import SimCardDownloadTwoToneIcon from "@mui/icons-material/SimCardDownloadTwoTone";
import ExcelJS from "exceljs";
import { toast } from "react-hot-toast";
import axios from "axios";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import BulkTableEntry from "./BulkTableEntry";
import SchoolsProgram from "./SchoolsProgram";
import UploadFile from "./formComponents/UploadFile";

const BulkExcel = ({ SendReq, module, title, refetch, open, setOpen, data, proof, serviceName, disableUpload = false, tableHead, typeObject, commonFilds, schoolPrograms = null, }) => {
  const initialState = { excelFile: "" };
  const [value, setValues] = useState(initialState);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const modifyedHeads = { ...tableHead }
      delete modifyedHeads.index;
      delete modifyedHeads.Action;
      if(proof){delete modifyedHeads[proof];}

  const generateExcelSampleFile = async () => {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Sheet");
    const worksheet2 = workbook.addWorksheet("Lists");
    
    const school = Object.keys(SchoolsProgram);
    const columnNames = Object.values(modifyedHeads);
    const schoolNameReplace = Object.keys(SchoolsProgram).map((e) =>
      e.replace(/[^a-zA-Z0-9_]/g, "_")
    );
    const columns = [ "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", ];

    const columns2 = [ "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", ];

    const headerRow = worksheet.addRow(columnNames);
    headerRow.font = { bold: true, size: 12 };
    columnNames.forEach((col, index)=>{
      let column = worksheet.getColumn(index+1)
      column.width = 20;
      column.alignment = { vertical: "middle", horizontal: 'center', wrapText: true };
   })

    let count = 0;
    Object.keys(tableHead).forEach((heading, i) => {
      let objHead = typeObject[heading];
      if (Array.isArray(objHead)) {
        count++;
        worksheet2.getColumn(columns2[count]).values = objHead;
        const rangeStart = `$${columns2[count]}$1`;
        const rangeEnd = `$${columns2[count]}$${objHead.length}`;
        workbook.definedNames.add(`Lists!${rangeStart}:${rangeEnd}`, heading);
      }
    });

    for (let rowIndex = 0; rowIndex <= 100; rowIndex++) {
      Object.keys(tableHead).forEach((heading, colIndex) => {
        const cell = worksheet.getCell(rowIndex + 2, colIndex + 1);
        cell.value = "";

        if (Array.isArray(typeObject[heading])) {
          cell.dataValidation = {
            type: "list",
            formulae: [heading],
            showDropDown: true,
          };
        }
      });
    }

    //Lists sheet
    worksheet2.getColumn("A").values = school;
    const startCell = `A1`;
    const endCell = `A${school.length}`;
    workbook.definedNames.add(`Lists!$${startCell}:$${endCell}`, "allSchools");
    
    schoolNameReplace.forEach((element, i) => {
      const e = SchoolsProgram[school[i]]?.map((item) => item[0]);
      worksheet2.getColumn(columns[i]).values = e;
      const rangeStart = `$${columns[i]}$1`;
      const rangeEnd = `$${columns[i]}$${e.length}`;
      workbook.definedNames.add(`Lists!${rangeStart}:${rangeEnd}`, element);
    });

    // const cellWithDropdown = worksheet.getCell("A1");
    // cellWithDropdown.dataValidation = {
    //   type: "list",
    //   formulae: [`allSchools`],
    //   showDropDown: true,
    //   showErrorMessage: true,
    //   errorTitle: "Invalid value",
    //   error: "Please select a value from the list",
    // };
    // const cellWithDynamicValues = worksheet.getCell("B1");
    // cellWithDynamicValues.dataValidation = {
    //   type: "list",
    //   formulae: [
    //     `=INDIRECT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE($A$1, " ", "_"), "(", "_"), ")", "_"), ",", "_"))`,
    //   ],
    //   showDropDown: true,
    // };
    worksheet2.protect("abc", { selectLockedCells: false, selectUnlockedCells: true, } )
    worksheet2.state = 'hidden';

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Sample File ${title}.xlsx`;
    link.click();
  };

  async function generateExcelFile(data, tableHead, fileName) {
    try {
      
      const columnMapping = await tableHead ;

      if (!columnMapping) {
        throw new Error(`Column mapping '${module}' not found.`);
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      const columnNames = Object.values(columnMapping);
      columnNames.unshift("Sr.No.");

      const headerRow = worksheet.addRow(columnNames);
      headerRow.font = { bold: true, size: 12 };

      data.forEach((rowData, index) => {
        const values = Object.keys(columnMapping).map(
          (columnName) => rowData[columnName]
        );
        values.unshift(index + 1);
        worksheet.addRow(values);
      });

      if (proof) {
        const lastColumnIndex = Object.keys(columnMapping).length + 2;
        const proofColumnName = "Link Of Proof";

        worksheet.getColumn(lastColumnIndex).header = proofColumnName;

        for (let i = 2; i <= data.length + 1; i++) {
          const proofValue =
            data[i - 2][proof] == undefined || data[i - 2][proof] == "undefined"
              ? "Not Uploaded"
              : "View Proof";
          const cell = worksheet.getCell(
            `${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`
          );
          if (proofValue === "View Proof") {
            const proofURL = `${process.env.REACT_APP_MAIN_URL}/showFile/${
              data[i - 2][proof]
            }/${serviceName ? serviceName : module}`;
            cell.value = { text: proofValue, hyperlink: proofURL };
            cell.font = { color: { argb: "FF0000FF" }, underline: true };
          } else {
            cell.value = proofValue;
          }
        }

        worksheet.getColumn(lastColumnIndex).width = 20;
        worksheet.getColumn(lastColumnIndex).alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
        };
      }
      worksheet.getRow(1).font = { bold: true, size: 12 };
      worksheet.getRow(1).height = 30;

      for (let i = 2; i <= data.length; i++) {
        worksheet.getRow(i).commit();
      }

      // Save the workbook as a file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);

      // Download the Excel file with the specified fileName
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      console.log("Excel file generated and downloaded successfully.");
      toast.success("Excel generated successfully");
    } catch (error) {
      console.error("Error generating Excel file:", error);
      toast.error("Error while generating try again");
    }
  }

  const onCancel = () => {
    setOpen(false);
    setLoading(false);
    setTableData([]);
    setStep(1);
  };

  const dataBulkEntry = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_MAIN_URL}/bulktableentry/Excel`, {
        commonFilds,
        model: SendReq,
        tableData,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data);
        } else if (res.status === 500) {
          toast.error("Something went wrong");
        }
        setLoading(false);
        refetch();
        setOpen(false);
        setTableData([]);
      });
  };


  const uploadSampleExcel = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("excelFile", value.excelFile);
      formData.append("tableHead", JSON.stringify(tableHead));

      const response = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/excel/parseExcelData`,
        formData
      );

      if (response.status === 201) {
        toast.success("File Uploaded Successfully");

        const arrayItems = Object.keys(typeObject).filter((e) =>
          Array.isArray(typeObject[e])
        );

        const updatedData = response.data.map((item) => {
          arrayItems.forEach((key) => {
            if (!typeObject[key].includes(item[key])) {
              item[key] = "";
            }
          });
          return item;
        });

        setTableData(updatedData);
        setStep(2);
        setLoading(false);
      } else if (response.status === 500) {
        toast.error("Something went wrong");
        setLoading(false);
        setOpen(false);
        setTableData([]);
        setStep(1);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      setOpen(false);
      setTableData([]);
      setStep(1);
    }
  };

  return (
    <DialogBox
      title={`${title} Excel Data Entry`}
      buttonName="Submit"
      isModalOpen={open}
      setIsModalOpen={setOpen}
      onClickFunction={step === 1 ? uploadSampleExcel : dataBulkEntry}
      onCancel={onCancel}
      maxWidth={step === 1 ? "md" : "xl"}
      loading={loading}
    >
      {step === 1 ? (
        <div className="p-2 bg-blue-100 rounded-md">
          <div>
            <div className="p-1 flex items-start justify-between">
              <div>
                {/* onClick={() => {}} */}

                <div>
                  <Button variant="contained" component="label" onClick={generateExcelSampleFile} startIcon={<CloudUploadRoundedIcon />} sx={{ right: 0, fontSize: 14, maxHeight: 100 }} disabled={disableUpload}>Sample Excel File to Fill</Button>
                </div>
              </div>
              <div className="">
                <Button variant="contained" component="label" startIcon={<SimCardDownloadTwoToneIcon />} color="success" sx={{ right: 0, fontSize: 14, maxHeight: 100 }}
                  onClick={() => {
                    generateExcelFile(data, modifyedHeads, `${title}.xlsx`);
                  }} > Download Data In Excel </Button>
              </div>
            </div>
            <div className="w-full mt-3">
              <UploadFile
                className="col-md-12"
                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                id="excelFile"
                label="Upload Filled Sample Excel File"
                setState={setValues}
                desable={disableUpload}
              />
            </div>
          </div>
        </div>
      ) : (
        <BulkTableEntry
          tableHead={tableHead}
          typeObject={typeObject}
          tableData={tableData}
          setTableData={setTableData}
          model={SendReq}
        />
      )}
    </DialogBox>
  );
};

export default BulkExcel;
