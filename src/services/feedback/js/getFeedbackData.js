import axios from 'axios'


// serverFile: fetchFeedbackData.js
const getFeedbackData = ({ filter, feedbackUser }) => {
    console.log("Getting data", filter, feedbackUser)
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/director/service/getFeedbackData`,
        { filter, feedbackUser })
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

export { getFeedbackData, getTotalFeedbackData, getATRData }