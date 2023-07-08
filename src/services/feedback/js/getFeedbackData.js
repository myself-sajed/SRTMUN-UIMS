import axios from 'axios'

const getFeedbackData = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/director/service/getFeedbackData/`,
        { filter })
}

export { getFeedbackData }