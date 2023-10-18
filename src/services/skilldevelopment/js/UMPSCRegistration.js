import Axios from 'axios'
import toast from 'react-hot-toast'

const handleUMPSCRegistration = async (formData, titleOfStorage, handleNext) => {
    try {
        const link = `${process.env.REACT_APP_MAIN_URL}/skill/umpsc-studentRegistration`
        const res = await Axios.post(link, formData)
        if (res.data.status === 'success') {
            toast.success('Registration Successfull for MPSC UPSC Foundation Couse')
            handleNext()
            localStorage.removeItem(titleOfStorage)
        } else {
            toast.error(res.data.message)
        }
    } catch (error) {
        toast.error('Server Error')
    }
}


export { handleUMPSCRegistration }