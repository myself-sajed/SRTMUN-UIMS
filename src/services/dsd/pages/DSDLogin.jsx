import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import title from '../../../js/title';
import serviceLoginHandler from '../js/serviceLoginHandler';
import { setDSDUser } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth';
import { dsdAuthParams } from './DSDHome';



const DSDLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    title(siteLinks.dsdLogin.title)
    useOtherServiceAuth(dsdAuthParams)



    const handleSubmit = (e) => {
        e.preventDefault();
        serviceLoginHandler({ email: username, password, model: "DSDUser", setUser: setDSDUser, navigate, navigationLink: siteLinks.dsdHome.link, tokenName: "dsd-token", setIsLoading, dispatch })
    }


    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.dsdLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={<AutoGraphRoundedIcon className="text-orange-700" />}
                title={siteLinks.dsdLogin.title} />}>

                <CredInput state={username} setState={setUsername} placeholder="Enter your email" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default DSDLogin

