import React, { useState } from 'react'
import AcadmicYearSelect from '../components/AcadmicYearSelect'
import AdminSchoolSelect from '../components/AdminSchoolSelect'
import AlumniBusiness from '../tables_alumni/AlumniBusiness'
import AlumniContribution from '../tables_alumni/AlumniContribution'
import Alumnies from '../tables_alumni/Alumnies'
import AlumniJobs from '../tables_alumni/AlumniJobs'
import ProgressionToHE from '../tables_alumni/ProgressionToHE'
import QualifiedExams from '../tables_alumni/QualifiedExams'
import AdminDrower from './AdminDrower'
import JSZip from "jszip";
import Papa from 'papaparse';
import adminExcelObject from '../components/adminExcelObject'

const AdminAlumni = () => {
  const [childData, setChildData] = useState({ alumni: "", alumnicontribution: "", progressiontohe: "", qualifiedexams: "", jobs: "", buisness: "", })
  const [values, setValues] = useState({ yearFilter: [], schoolName: "All Schools" })
  const { yearFilter, schoolName } = values

  const allAlumniComponents = [
    {
      element: <Alumnies id="alumni" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni' />,
      childData: childData?.alumni, filename: 'Alumni.csv', SendReq: "AlumniUser", module: "director",
    },
    {
      element: <ProgressionToHE id="progressiontohe" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Progression To HE' />,
      childData: childData?.progressiontohe, filename: 'Progression To HE.csv', SendReq: "ProgressionToHE", module: "director", proof: "Upload_Proof",
    },
    {
      element: <QualifiedExams id="qualifiedexams" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Qualified Exams' />,
      childData: childData?.qualifiedexams, filename: 'Qualified Exams.csv', SendReq: "QualifiedExams", module: "director", proof: "Upload_Proof",
    },
    {
      element: <AlumniContribution id="alumnicontribution" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Contribution' />,
      childData: childData?.alumnicontribution, filename: 'Alumni Contribution.csv', SendReq: "AlumniContribution", proof: "Upload_Proof", module: "director"
    },
    {
      element: <AlumniJobs id="jobs" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Jobs' />,
      childData: childData?.jobs, filename: 'Alumni Jobs.csv', SendReq: "Placement", proof: "Upload_Proof", module: "director"
    },
    {
      element: <AlumniBusiness id="buisness" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Business' />,
      childData: childData?.buisness, filename: 'Alumni Business.csv', SendReq: "Placement", proof: "Upload_Proof", module: "director"
    },

  ]

  const downloadCSV = async () => {
    const zip = new JSZip();

    // add each CSV file to the zip file
    allAlumniComponents?.forEach(({ childData, filename, SendReq, proof, module }) => {
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
    link.setAttribute('download', 'allAlumniCSV.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminDrower>
      <div className='sub-main' >
        <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
          <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
          <button className='col-md-3 col-lg-3 col-12 btn btn-success btn-sm' style={{ margin: "37px 0px auto 0px" }} onClick={downloadCSV} >Export All Excels</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div className='button-wraper'>

            <div className='flex gap-auto flex-wrap'>
              {
                allAlumniComponents?.map(((item) => item?.element))
              }
            </div>
          </div>
        </div>
      </div>
    </AdminDrower>
  )
}

export default AdminAlumni