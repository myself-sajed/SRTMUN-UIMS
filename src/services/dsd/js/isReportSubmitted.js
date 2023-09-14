import toast from "react-hot-toast"
import Axios from 'axios'

// route filename : dsd-routes.js
const isReportSubmitted = (year, model, handleNext, customMessage) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/other/services/isReportSubmitted`
    Axios.post(link, { year, model })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success(customMessage ? customMessage : res.data.message)
                handleNext();
            } else {
                toast.error('Could not submit the form')
            }
        }).catch((err) => {
            console.log('Submission error :', err)
            toast.error('Error submiting form')
        })
}

export default isReportSubmitted