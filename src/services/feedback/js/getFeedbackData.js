import axios from 'axios'
import toast from 'react-hot-toast'


// serverFile: fetchFeedbackData.js
const getFeedbackData = ({ filter, feedbackUser }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/director/service/getFeedbackData`,
        { filter, feedbackUser })
}

const getSSSData = (filter, academicYearsToFetch) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/SSS/getNumericalData`,
        { filter, academicYearsToFetch })
}

const getSSSAnalytics = (schoolName, academicYear) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/SSS/generateAnalytics`,
        { schoolName, academicYear })
}

const generateSSSReportPDF = ({ schoolName, academicYear, setReportLoading }) => {
    setReportLoading({ title: `Generating SSS Report for ${schoolName} (${academicYear})`, loading: true })
    axios.post(`${process.env.REACT_APP_MAIN_URL}/SSS/generatePDFReport`,
        { schoolName, academicYear }).then(function (res) {
            if (res.data.status === 'generated') {
                setReportLoading(false)
                toast.success('Report generated successfully');
                window.open(`${process.env.REACT_APP_MAIN_URL}/downloadPdf/${res.data.fileName}`, '_blank');
            }
            else if (res.data.status === 'error') {
                setReportLoading(false)
                toast.error(res.data.message);
            }
        })
        .catch(function (err) {
            setReportLoading(false)
            toast.error('Something went wrong');
        })

}

const getATRData = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/director/service/getFeedbackATRData`,
        { filter })
}

// serverFile: fetchFeedbackData.js
const getTotalFeedbackData = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/director/service/getTotalFeedbackData`,
        { filter })
}

export { getFeedbackData, getTotalFeedbackData, getATRData, getSSSData, getSSSAnalytics, generateSSSReportPDF }