import React, { useState } from 'react'
import SchoolsProgram from '../../../components/SchoolsProgram'
import AcadmicYearSelect from '../components/AcadmicYearSelect'
import AlumniBusiness from '../tables_alumni/AlumniBusiness'
import AlumniContribution from '../tables_alumni/AlumniContribution'
import Alumnies from '../tables_alumni/Alumnies'
import AlumniJobs from '../tables_alumni/AlumniJobs'
import ProgressionToHE from '../tables_alumni/ProgressionToHE'
import QualifiedExams from '../tables_alumni/QualifiedExams'
import AdminDrower from './AdminDrower'

const AdminAlumni = () => {
  const [childData, setChildData] = useState({ alumni: "", alumnicontribution: "", progressiontohe: "", qualifiedexams: "", jobs: "", buisness: "",})
  const [values, setValues] = useState({ yearFilter: "", schoolName: "" })
  const { yearFilter, schoolName } = values

  const allAlumniComponents = [
    {
      element: <Alumnies id="alumni" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumnies' />,
      childData: childData?.alumni, filename: 'Alumnies.csv', SendReq: "AlumniUsers", module: "director", proof: "Upload_Proof",
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
      element: <AlumniBusiness id="buisness" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} Heading='Alumni Buisness' />,
      childData: childData?.buisness, filename: 'Alumni Buisness.csv', SendReq: "Placement", proof: "Upload_Proof", module: "director"
    },
    
  ]
  return (
    <AdminDrower>
      <div style={{ width: "100%", background: "#b5968575", minHeight: "68vh" }} >
      <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
          <div className='col-12 p-1 col-md-4 col-lg-4'>
            <label htmlFor="choose" className="form-label" >Filter By School</label>
            <select className="form-select" id="schoolName" required="true"
              onChange={(e) => {
                console.log(e.target.value);
                setValues((pri) => {
                  return {
                    ...pri,
                    schoolName: e.target.value
                  }
                })
              }
              } value={values.schoolName}>
              <option selected value="">All School</option>
              {
                Object.keys(SchoolsProgram)?.map((e) => {
                  return <option value={e}>{e}</option>
                })
              }
            </select>
          </div>
          <button className='col-md-3 col-lg-3 col-12 btn btn-success' style={{ margin: "37px 0px auto 0px" }}  >Export All Excels</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div style={{ border: "solid #822500 2px", width: "100%", padding: "3px", marginBottom: "10px", borderRadius: "10px" }}>

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