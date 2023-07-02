import Axios from 'axios'
import { toast } from 'react-hot-toast'


// Filename : submitReportForm
const submitReportForm = (navigate, year, filter, model, navigateToDirector) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/services/submitForm`
    Axios.post(link, { year, filter, model })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Form submitted successfully')
                navigate(navigateToDirector ? navigateToDirector : '/faculty')
            } else {
                toast.error('Could not submit the form')
            }
        }).catch((err) => {
            console.log('Submission error :', err)
            toast.error('Error submiting form')
        })
}

// Filename : submitReportForm
const getReportInfo = (model, setData, setLoading, userType = 'faculty') => {
    setLoading(true)
    const link = `${process.env.REACT_APP_MAIN_URL}/services/getTotalReportData`
    Axios.post(link, { model, userType })
        .then((res) => {
            if (res.data.status === 'success') {
                // console.log(res.data.data)
                setData(res.data.data)
                setLoading(false)
            } else {
                toast.error('Could not submit the form')
                setLoading(false)
            }
        }).catch((err) => {
            console.log('Submission error :', err)
            toast.error('Error submiting form')
            setLoading(false)
        })
}


export default submitReportForm
export { getReportInfo }