import React from 'react'
import GoBack from '../../../components/GoBack'
import { useSelector } from 'react-redux'
import siteLinks from '../../../components/siteLinks'

const ActionOnFeedback = () => {

    const user = useSelector((state) => state.user.directorUser)

    return (
        <div>
            <GoBack bredLinks={[siteLinks.welcome, siteLinks.directorHome, siteLinks.feedbackAction]} pageTitle="Feedback Action Taken Report by Director" showAvatar={{ photoURL: user.photoURL, userType: 'director' }} />
        </div>
    )
}

export default ActionOnFeedback
