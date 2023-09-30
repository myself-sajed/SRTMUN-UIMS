import React from 'react'
import GoBack from '../../../components/GoBack'
import {skillsAuthParams} from './SkillsHome'
import siteLinks from '../../../components/siteLinks'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import CounselingAndGuidance from '../../director/pages/CounselingAndGuidance'

const SkillFillData = () => {
    useOtherServiceAuth({ ...skillsAuthParams, shouldNavigate: false })
    const bredLinks = [siteLinks.welcome, siteLinks.skillHome, siteLinks.skillFillData]
    
  return (
    <div>
      <GoBack pageTitle={siteLinks.skillFillData.title} bredLinks={bredLinks} />
      <div className="mt-4">
      <CounselingAndGuidance newSchool="Centre for Competitive Exams, Training & Skills Development" />
      </div>
    </div>
  )
}

export default SkillFillData
