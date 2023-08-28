import Axios from 'axios'
import { toast } from 'react-hot-toast'


const handleRegistration = (setLoading, formData, programId, program, navigate) => {
    setLoading(true)
    const link = `${process.env.REACT_APP_MAIN_URL}/program/registration`
    Axios.post(link, { formData, programId })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Registered Successfully')
                setLoading(false)
                localStorage.removeItem(`${programId}-ProgramRegistration-FormData`)
                navigate(`/program/${programId}/registration-form/acknowledgement`, { state: program })
            } else {
                toast.error(res.data.error)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Could not submit the form. Try again later...')
            setLoading(false)
        })
}

export default handleRegistration