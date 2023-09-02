import Axios from 'axios'

function fetchRegistrations({ filter }) {
    const link = `${process.env.REACT_APP_MAIN_URL}/programs/getRegistrations`
    return Axios.post(link, { filter })
}

export { fetchRegistrations }