import axios from 'axios'

const fetchEvents = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/api/event/getEvents`, { filter })
}

const fetchSingleEvent = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/api/event/singleEvent`, { filter })
}

export default fetchEvents
export { fetchSingleEvent }