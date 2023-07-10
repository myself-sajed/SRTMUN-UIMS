import axios from 'axios'


// serverFile: fetchFeedbackData.js
const getFeedbackData = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/director/service/getFeedbackData/`,
        { filter })
}

// serverFile: fetchFeedbackData.js
const getTotalFeedbackData = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/director/service/getTotalFeedbackData`,
        { filter })
}

export { getFeedbackData, getTotalFeedbackData }