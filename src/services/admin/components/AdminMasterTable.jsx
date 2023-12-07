import React from 'react'
import AdminTable from './AdminTable'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import { tableHead } from '../pages/AdminNumaricalData'
import AdminExcelExoprt from './AdminExcelExoprt'

//Extra tableHeads
import { tableHead as Online }  from '../tables_faculty/OrientationRefresherCourse'
import { tableHead as DemandRatio }  from '../tables_director/DemandRatio'
import { tableHead as ReservedSeats }  from '../tables_director/ReservedSeats'
import { tableHead as EsttFullTimeTeacherAgainstSanctioned }  from '../../establishment/pages/EsttFullTimeTeacherAgainstSanctioned'
import { tableHead as EsttFullTimeTeacher }  from '../../establishment/pages/EsttFullTimeTeacher'
import { tableHead as EsttFullTimeTeacherWhoLeft }  from '../../establishment/pages/EsttFullTimeTeacherWhoLeft'
import { tableHead as DateOfResultDiclaration }  from '../../exam/pages/DateOfResultDiclaration'
import { tableHead as StudentComplaintsGrievances }  from '../../exam/pages/StudentComplaintsGrievances'
import { tableHead as ExamPassedDuringYear }  from '../../exam/pages/ExamPassedDuringYear'
import { tableHead as TotalExpenditure }  from '../../other/pages/TotalExpenditure'
import { tableHead as SubscriptionForKRC }  from '../../krc/pages/SubscriptionForKRC'
import { tableHead as DSDSports }  from '../../dsd/pages/DsdAndSports'
import { tableHead as SportsAndCulturalEvents }  from '../../dsd/pages/SportsAndCulturalEvents'
import { tableHead as JrfSrfAdmin }  from '../../admin/tables/AdminJRFSRF'
import { tableHead as ResearchProjectsAdmin }  from '../../admin/tables/AdminResearchProjects'
import { tableHead as ResearchGuideAdmin }  from '../../admin/tables/AdminResearchGuide'
import { tableHead as PhdAwardedAdmin }  from '../../admin/tables/AdminPhdAwarded'
import { tableHead as DemandRatioAdmin }  from '../../admin/tables/AdminDemandRatio'
import { tableHead as HEAdmin }  from '../../admin/tables/AdminHE'
import { tableHead as SwayamEContentDeveloped }  from '../../swayam/pages/SwayamEContentDeveloped'
import { tableHead as SwayamValueAddedCourses }  from '../../swayam/pages/SwayamValueAddedCourses'
import { tableHead as AwardForExtensionActivities }  from '../../nss/pages/NssAwardByInstitution'
import { tableHead as ResearchProject }  from '../../admin/tables_faculty/ResearchProjects'


const updatedTableHead = {...tableHead, Online, DemandRatio, ReservedSeats, EsttFullTimeTeacherAgainstSanctioned, EsttFullTimeTeacher, EsttFullTimeTeacherWhoLeft, DateOfResultDiclaration, StudentComplaintsGrievances, TotalExpenditure, SubscriptionForKRC, ExamPassedDuringYear, DSDSports, SportsAndCulturalEvents, JrfSrfAdmin, ResearchProjectsAdmin, ResearchGuideAdmin, PhdAwardedAdmin, DemandRatioAdmin, HEAdmin, AwardForExtensionActivities, SwayamEContentDeveloped, SwayamValueAddedCourses, ResearchProject }

const AdminMasterTable = ({module="Admin", proof=null, color="#3d3dff", model, academicYear, heading, school, serviceName, customParams }) => {


    const params = customParams || { model, module, filter: academicYear && { year: { $in: academicYear } },
    filterConditios: school && { department: school }}
  
  const { data, isLoading } = useQuery(`${model} ${params}`, () => getReq(params))

  let filterTableHead = {...updatedTableHead[model]}
  if (filterTableHead.hasOwnProperty("Action")){
    delete filterTableHead.Action
  }
  return (
    <div>
        <div className='mr-4 my-3'>
          <div className='flex w-full justify-end'>
            <p className={'px-2 mx-2'} style={{border: `1px solid ${color}`, color: `${color}`, borderRadius: "5px"}}>{data?.data.length}</p>
            <div className='flex items-center' style={{border:`solid 1px ${color}`, borderRadius: "3px" }}>
              <p style={{fontSize:"15px"}} className='px-3 text-[#2f9163]'>Download Excel</p>
              <AdminExcelExoprt data={data?.data} fileTitle={heading} SendReq={model} module={module} proof={proof} />
            </div>
          </div>
        </div>
      <AdminTable data={data?.data} tableHead={filterTableHead} proof={proof} serviceName={serviceName} Heading={heading} SendReq={model} isLoading={isLoading} headColor={color} tableHeight='90vh' />
    </div>
  )
}

export default AdminMasterTable
export {updatedTableHead}
