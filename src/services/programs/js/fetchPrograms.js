import Axios from 'axios'

function fetchPrograms({ filter, select, singleItem, shouldPopulate = false }) {
    const link = `${process.env.REACT_APP_MAIN_URL}/programs/fetch`
    return Axios.post(link, { filter, select, singleItem, shouldPopulate })
}

export { fetchPrograms }