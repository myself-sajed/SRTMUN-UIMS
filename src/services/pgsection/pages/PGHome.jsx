import React from 'react'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import { setPGUser } from '../../../redux/slices/UserSlice'
import siteLinks from '../../../components/siteLinks'
import UserLoading from '../../../pages/UserLoading'
import { useSelector } from 'react-redux'
import title from '../../../js/title'
import Footer from '../../../components/Footer'
import GoBack from '../../../components/GoBack'

const pgAuthParams = { shouldNavigate: true, tokenName: "pg-token", setUser: setPGUser, navigationHomeLink: siteLinks.pgHome.link, navigationLoginLink: siteLinks.pgLogin.link, model: "PGUser" }

const PGHome = () => {
    useOtherServiceAuth(pgAuthParams)
    const user = useSelector((state) => state.user.pgUser)
    const bredLinks = [siteLinks.welcome, siteLinks.pgHome]
    title(siteLinks.pgHome.title)
    return (
        <div>
            <GoBack bredLinks={bredLinks} pageTitle={siteLinks.pgHome.title} />
            <div className="min-h-screen">

                {user ?
                    <div>
                        Table will be here
                    </div>
                    :
                    <UserLoading title="Fetching User Details" />}
            </div>
            <Footer />
        </div>
    )
}

export default PGHome

export { pgAuthParams }
