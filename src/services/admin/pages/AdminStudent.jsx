import React, { useState } from 'react';
import AdminDrower from './AdminDrower';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import Students from '../tables_student/Students';
import adminExcelObject from '../components/adminExcelObject';
import JSZip from 'jszip';
import Papa from 'papaparse';
import JrfSrfPdf from '../tables_student/JrfSrfPdf';

const AdminStudent = () => {

  const [ childData, setChildData ] = useState({ student: "", jrfsrfpdf: ""})
  
  const [values, setValues] = useState({ yearFilter: [], schoolName: "All Schools" })
  const { yearFilter, schoolName } = values

  const allStudentComponents = [
    {
      element: <Students id="student" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Students' />,
      childData: childData?.student, filename: 'Student.csv', SendReq: "StudentUser", module: "director",
    },
    {
      element: <JrfSrfPdf id="jrfsrfpdf" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='JRF, SRF, PDF, Research Associate' />,
      childData: childData?.jrfsrfpdf, filename: 'JrfSrfPdf.csv', SendReq: "JrfSrf", proof: "proof", module: "faculty"
    },
  ]

  const downloadCSV = async () => {
    const zip = new JSZip();

    // add each CSV file to the zip file
    allStudentComponents?.forEach(({ childData, filename, SendReq, proof, module }) => {
      let itemdata = []

      childData?.forEach((data, index) => {
        let newdata = {};

        Object.keys(adminExcelObject[SendReq]).forEach((key) => {
          newdata = Object.assign(newdata, { "Sr.No.": index + 1 })
          newdata[adminExcelObject[SendReq][key]] = data[key] ? data[key] : "N.A.";

        })
        if (proof) {
          data[proof] == undefined || data[proof] == "undefined" ? newdata = Object.assign(newdata, { "Link Of Proof": 'File Not Uploaded' }) : newdata = Object.assign(newdata, { "Link Of Proof": `${process.env.REACT_APP_MAIN_URL}/showFile/${data[proof]}/${module}` })
        }

        itemdata.push(newdata)
      })
      zip.file(filename, Papa.unparse(itemdata));
    });

    // generate the zip file and download it
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(content);
    link.setAttribute('download', 'allStudentsCSV.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminDrower>
      <div className='sub-main'>
      <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
          <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
          <button className='col-md-3 col-lg-3 col-12 btn btn-success btn-sm' style={{ margin: "37px 0px auto 0px" }} onClick={downloadCSV} >Export All Excels</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div className='button-wraper'>

            <div className='flex gap-auto flex-wrap'>
              {
                allStudentComponents?.map(((item) => item?.element))
              }
            </div>
          </div>
        </div>
      </div>
    </AdminDrower>
  )
}

export default AdminStudent