import React from 'react'
import AQARStepper from '../components/AQARStepper'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import InvitedTalk from '../../faculty/tables/InvitedTalk';

const DSDAQAR = () => {
    title(siteLinks.dsdAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.dsdHome, siteLinks.dsdAQAR]

    return (
        <div>
            <AQARStepper bredLinks={bredLinks}>
                <InvitedTalk />
            </AQARStepper>
        </div>
    )
}

export default DSDAQAR
