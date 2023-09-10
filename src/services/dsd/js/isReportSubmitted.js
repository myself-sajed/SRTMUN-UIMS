import toast from "react-hot-toast"
import Axios from 'axios'

const isReportSubmitted = (year, model, handleNext) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/other/services/isReportSubmitted`
    Axios.post(link, { year, model })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message)
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