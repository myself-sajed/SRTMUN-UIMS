import React, { useEffect, useState } from 'react'
import AdminDrower from './AdminDrower'
import { downloadExcelZip } from './AdminFaculty';
import CircularProgress from '@mui/material/CircularProgress';
import BtnAdminTable from '../components/BtnAdminTable';
import AcadmicYearSelect from '../components/AcadmicYearSelect';


const AdminCombine = () => {

//   const [childData, setChildData] = useState({ ResearchProjectsAdmin: null, JrfSrfAdmin: null, DSDSports: null, SportsAndCulturalEvents: null, EsttFullTimeTeacherAgainstSanctioned: null, EsttFullTimeTeacher: null, EsttFullTimeTeacherWhoLeft: null, DateOfResultDiclaration: null, ExamPassedDuringYear: null, StudentComplaintsGrievances: null, SubscriptionForKRC: null, AwardForExtensionActivities: null, ExtensionActivities: null, TotalExpenditure: null, PhdAwardedAdmin: null, ResearchGuideAdmin: null, HEAdmin: null, DemandRatioAdmin: null, SwayamValueAddedCourses: null, SwayamEContentDeveloped: null,  })
  const [values, setValues] = useState({ yearFilter: [] })
  const { yearFilter } = values

//   const loadedInitial ={ ResearchProjectsAdmin: false, JrfSrfAdmin: false, DSDSports: false, SportsAndCulturalEvents: false, EsttFullTimeTeacherAgainstSanctioned: false, EsttFullTimeTeacher: false, EsttFullTimeTeacherWhoLeft: false, DateOfResultDiclaration: false, ExamPassedDuringYear: false, StudentComplaintsGrievances: false, SubscriptionForKRC: false, AwardForExtensionActivities: false, ExtensionActivities: false, TotalExpenditure: false, PhdAwardedAdmin: false, ResearchGuideAdmin: false, HEAdmin: false, DemandRatioAdmin: false, SwayamValueAddedCourses: false, SwayamEContentDeveloped: false, }
  const [loaded, setLoaded] = useState(false)
  
  const loading = !(Object.values(loaded).every((value) => value === true));  
let allOtherComponents= "";
//   const allOtherComponents = [
//     {
//       element: <BtnAdminTable model="JrfSrfAdmin" setState={setChildData} customParams={{ model: "JrfSrfAdmin", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='JRF, SRF & PDF (APDS)' setLoaded={setLoaded} proof="proof" serviceName="admin" />,
//       childData: childData?.JrfSrfAdmin, filename: 'JRF, SRF & PDF (APDS).xlsx', SendReq: "JrfSrfAdmin", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="ResearchProjectsAdmin" setState={setChildData} customParams={{ model: "ResearchProjectsAdmin", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Research Projects (APDS)' setLoaded={setLoaded} proof="proof" serviceName="admin" />,
//       childData: childData?.ResearchProjectsAdmin, filename: 'Research Projects (APDS).xlsx', SendReq: "ResearchProjectsAdmin", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="DSDSports" setState={setChildData} customParams={{ model: "DSDSports", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Students Awards & Medals (DSD)' setLoaded={setLoaded} serviceName="dsd" />,
//       childData: childData?.DSDSports, filename: 'Students Awards & Medals (DSD).xlsx', SendReq: "DSDSports", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="SportsAndCulturalEvents" setState={setChildData} customParams={{ model: "SportsAndCulturalEvents", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Information of Sports And Cultural Event (DSD)' setLoaded={setLoaded} serviceName="dsd" />,
//       childData: childData?.SportsAndCulturalEvents, filename: 'Information of Sports And Cultural Event (DSD).xlsx', SendReq: "SportsAndCulturalEvents", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="EsttFullTimeTeacherAgainstSanctioned" setState={setChildData} customParams={{ model: "EsttFullTimeTeacherAgainstSanctioned", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Full Time Teachers Against Sanctioned Posts (Establishment)' setLoaded={setLoaded} serviceName="estt" />,
//       childData: childData?.EsttFullTimeTeacherAgainstSanctioned, filename: 'Full Time Teachers Against Sanctioned Posts (Establishment).xlsx', SendReq: "EsttFullTimeTeacherAgainstSanctioned", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="EsttFullTimeTeacher" setState={setChildData} customParams={{ model: "EsttFullTimeTeacher", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Full Time Teachers (Establishment)' setLoaded={setLoaded} serviceName="estt" />,
//       childData: childData?.EsttFullTimeTeacher, filename: 'Full Time Teachers (Establishment).xlsx', SendReq: "EsttFullTimeTeacher", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="EsttFullTimeTeacherWhoLeft" setState={setChildData} customParams={{ model: "EsttFullTimeTeacherWhoLeft", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Full Time Teachers who left joined the institution (Establishment)' setLoaded={setLoaded} serviceName="estt" />,
//       childData: childData?.EsttFullTimeTeacherWhoLeft, filename: 'Full Time Teachers who left joined the institution (Establishment).xlsx', SendReq: "EsttFullTimeTeacherWhoLeft", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="DateOfResultDiclaration" setState={setChildData} customParams={{ model: "DateOfResultDiclaration", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Date Of Result Declaration (Exam)' setLoaded={setLoaded} serviceName="exam" />,
//       childData: childData?.DateOfResultDiclaration, filename: 'Date Of Result Declaration (Exam).xlsx', SendReq: "DateOfResultDiclaration", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="ExamPassedDuringYear" setState={setChildData} customParams={{ model: "ExamPassedDuringYear", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Students Passed During The Year (Exam)' setLoaded={setLoaded} serviceName="exam" />,
//       childData: childData?.ExamPassedDuringYear, filename: 'Students Passed During The Year (Exam).xlsx', SendReq: "ExamPassedDuringYear", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="StudentComplaintsGrievances" setState={setChildData} customParams={{ model: "StudentComplaintsGrievances", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Student Complaints Grievances (Exam)' setLoaded={setLoaded} serviceName="exam" />,
//       childData: childData?.StudentComplaintsGrievances, filename: 'Student Complaints Grievances (Exam).xlsx', SendReq: "StudentComplaintsGrievances", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="SubscriptionForKRC" setState={setChildData} customParams={{ model: "SubscriptionForKRC", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Institution has subscription (KRC)' setLoaded={setLoaded} serviceName="krc" />,
//       childData: childData?.SubscriptionForKRC, filename: 'Institution has subscription (KRC).xlsx', SendReq: "SubscriptionForKRC", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="AwardForExtensionActivities" setState={setChildData} customParams={{ model: "AwardForExtensionActivities", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Award For Extension Activities (NSS)' setLoaded={setLoaded} serviceName="nss" />,
//       childData: childData?.AwardForExtensionActivities, filename: 'Award For Extension Activities (NSS).xlsx', SendReq: "AwardForExtensionActivities", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="ExtensionActivities" setState={setChildData} customParams={{ model: "ExtensionActivities", module: "Admin", filter: { Year_of_activity: {$in:yearFilter}, SchoolName: "NSS" } }} heading='Extension Activities (NSS)' setLoaded={setLoaded} serviceName="director" proof="Upload_Proof" />,
//       childData: childData?.ExtensionActivities, filename: 'Extension Activities (NSS).xlsx', SendReq: "ExtensionActivities", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="TotalExpenditure" setState={setChildData} customParams={{ model: "TotalExpenditure", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Total Expenditure (FAO)' setLoaded={setLoaded} serviceName="other" />,
//       childData: childData?.TotalExpenditure, filename: 'Total Expenditure (FAO).xlsx', SendReq: "TotalExpenditure", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="PhdAwardedAdmin" setState={setChildData} customParams={{ model: "PhdAwardedAdmin", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Ph.D. Scholars (PG Section)' setLoaded={setLoaded} serviceName="admin" proof="proof" />,
//       childData: childData?.PhdAwardedAdmin, filename: 'Ph.D. Scholars (PG Section).xlsx', SendReq: "PhdAwardedAdmin", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="ResearchGuideAdmin" setState={setChildData} customParams={{ model: "ResearchGuideAdmin", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Research Guide (PG Section)' setLoaded={setLoaded} serviceName="admin" proof="proof" />,
//       childData: childData?.ResearchGuideAdmin, filename: 'Research Guide (PG Section).xlsx', SendReq: "ResearchGuideAdmin", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="HEAdmin" setState={setChildData} customParams={{ model: "HEAdmin", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Progression To HE (PG Section)' setLoaded={setLoaded} serviceName="admin" proof="proof" />,
//       childData: childData?.HEAdmin, filename: 'Progression To HE (PG Section).xlsx', SendReq: "HEAdmin", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="DemandRatioAdmin" setState={setChildData} customParams={{ model: "DemandRatioAdmin", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Demand Ratio (PG Section)' setLoaded={setLoaded} serviceName="admin" proof="proof" />,
//       childData: childData?.DemandRatioAdmin, filename: 'Demand Ratio (PG Section).xlsx', SendReq: "DemandRatioAdmin", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="SwayamValueAddedCourses" setState={setChildData} customParams={{ model: "SwayamValueAddedCourses", module: "Admin", filter: { academicYear: {$in:yearFilter} } }} heading='Value Added Courses (Swayam)' setLoaded={setLoaded} serviceName="swayam" proof="proof" />,
//       childData: childData?.SwayamValueAddedCourses, filename: 'Value Added Courses (Swayam).xlsx', SendReq: "SwayamValueAddedCourses", module: "faculty"
//     },
//     {
//       element: <BtnAdminTable model="SwayamEContentDeveloped" setState={setChildData} customParams={{ model: "SwayamEContentDeveloped", module: "Admin", filter: { year: {$in:yearFilter} } }} heading='E-Content Developed (Swayam)' setLoaded={setLoaded} serviceName="swayam" proof="proof" />,
//       childData: childData?.SwayamEContentDeveloped, filename: 'E-Content Developed (Swayam).xlsx', SendReq: "SwayamEContentDeveloped", module: "faculty"
//     },
//   ]

//   useEffect(() => {
//       setLoaded(loadedInitial);
//   }, [values.yearFilter]);

  return (
    <AdminDrower>
      <div className='sub-main'>
        <div className='flex px-3 flex-wrap gap-2'>
        <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Acadmic Year" />
          <button className='col-md-3 col-lg-3 col-12 btn btn-sm btn-success align-middle' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allOtherComponents, 'allOtherExcel',) }} disabled={loading} >{loading?<CircularProgress color="inherit" size={18}/>:"Export All Excels"}</button>
        </div>
        <div style={{ padding: "10px" }}>

          <div className='button-wraper'>

            <div className='p-2'>
                <div className=''>JRFS</div>
                <div className=''>JRFS</div>
                <div className=''>JRFS</div>
                <div className=''>JRFS</div>
              {/* {
                allOtherComponents?.map(((item) => item?.element))
              } */}
            </div>
          </div>
        </div>
      </div>
    </AdminDrower>
  )
}

export default AdminCombine
