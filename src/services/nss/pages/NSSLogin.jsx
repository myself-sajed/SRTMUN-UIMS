import React from 'react'
import CredSkeleton from '../../../components/CredSkeleton'
import CredInput from '../../../inputs/CredInput'
import CredButton from '../../../inputs/CredButton'
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import siteLinks from '../../../components/siteLinks';
import CredHeading from '../../../inputs/CredHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


let nssLogo = <img src="/assets/nsslogo.png" height="22px" width="22px" />


const NSSLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/nss/student-admission')
        toast.success("Logged in successfully!")
    }





    return (
        <div>
            <CredSkeleton bred={[siteLinks.welcome, siteLinks.nssLogin]} onSubmit={handleSubmit} linkLine={null} head={<CredHeading spacing="mb-3 mt-6" icon={nssLogo}
                title="NSS Login" />}>

                <CredInput state={username} setState={setUsername} placeholder="Username" type="text" spacing="mb-2" size={39} />

                <CredInput state={password} setState={setPassword} placeholder="Enter Password" type="password" spacing="mb-3" />

                <CredButton title="Login" isLoading={isLoading} />

            </CredSkeleton>
        </div>
    )
}

export default NSSLogin

