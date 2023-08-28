import Axios from 'axios'

function fetchPrograms({ filter, select, singleItem }) {
    console.log('Made a request')
    const link = `${process.env.REACT_APP_MAIN_URL}/programs/fetch`
    return Axios.post(link, { filter, select, singleItem })
}

export { fetchPrograms }