import React from 'react'
import DateOfResultDiclaration from '../services/exam/pages/DateOfResultDiclaration'
import ExamPassedDuringYear from '../services/exam/pages/ExamPassedDuringYear'
import StudentComplaintsGrievances from '../services/exam/pages/StudentComplaintsGrievances'
import DsdAndSports from '../services/dsd/pages/DsdAndSports'
import SportsAndCulturalEvents from '../services/dsd/pages/SportsAndCulturalEvents'
import SubscriptionForKRC from '../services/krc/pages/SubscriptionForKRC'
import NssAwardByInstitution from '../services/nss/pages/NssAwardByInstitution'
import NssExtensionActivity from '../services/nss/pages/NssExtensionActivity'
import TotalExpenditure from '../services/other/pages/TotalExpenditure'
import OtherDemandRatio from '../services/other/pages/OtherDemandRatio'
import Placements from '../services/director/pages/Placements'
import ProgressionToHE from '../services/director/pages/ProgressionToHE'

const Test2 = () => {
  return (
    <div>
      <h2>Exam</h2>
      <DateOfResultDiclaration/> {/* 2.5.1 */}
      <StudentComplaintsGrievances/> {/* 2.5.3 */}
      <ExamPassedDuringYear/> {/* 2.6.3 */}
      <h2>DSD / Sports</h2>
      <DsdAndSports/> {/* 5.3.1 */}
      <SportsAndCulturalEvents/> {/* 5.3.3 */}
      <h2>KRC</h2>
      <SubscriptionForKRC/> {/* 4.2.3 */}
      <h2>NSS</h2>
      <NssAwardByInstitution/> {/* 3.6.2 */}
      <NssExtensionActivity/> {/* 3.6.3 */}
      <h2>Other</h2>
      <TotalExpenditure/> {/* 4.1.4 */}
      <OtherDemandRatio/> {/* 2.1.1 */}

      <Placements school={true} />
      <ProgressionToHE school={true} />
    </div>
  )
}

export default Test2
