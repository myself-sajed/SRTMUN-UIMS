import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'

const CollegeRegistration = () => {

    const bredLinks = [siteLinks.welcome, siteLinks.yfCollegeRegistration]
    return (
        <div>
            <GoBack pageTitle="College Registration" bredLinks={bredLinks} />
        </div>
    )
}

export default CollegeRegistration
