import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { swayamAuthParams } from './SwayamHome'
import title from '../../../js/title'

const SwayamDataCenter = () => {
    useOtherServiceAuth({ ...swayamAuthParams, shouldNavigate: false })
    const bredLinks = [siteLinks.welcome, siteLinks.swayamHome, siteLinks.swayamFillData]
    title(siteLinks.swayamFillData.title)


    return (
        <div>
            <GoBack pageTitle={siteLinks.swayamFillData.title} bredLinks={bredLinks} />
            <div className="mt-4">
                <p className="text-center my-5">This page is under construction, please come back later...</p>
            </div>
        </div>
    )
}

export default SwayamDataCenter
