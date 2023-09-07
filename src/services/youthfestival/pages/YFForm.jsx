import React from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'

const YFForm = () => {

    const bredLinks = [siteLinks.welcome, siteLinks.yfCollegeHome, siteLinks.yfCollegeYouthForm]
    return (
        <div>
            <GoBack pageTitle={siteLinks.yfCollegeYouthForm.title} bredLinks={bredLinks} />
            <div className="my-4 animate-fade-up animate-once">
                <div>
                    1. Choose Academic Year <br />
                    2. One form and Two tables <br />
                    3. Steps on the top <br />
                    4. Generate Report Button in the Home Page of College details
                </div>
            </div>
        </div>
    )
}

export default YFForm
