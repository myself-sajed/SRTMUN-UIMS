import axios from 'axios'

const fetchAllNews = ({ filter }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/api/news/getAllNews`, { filter })
}

const fetchSingleItem = ({ slug }) => {
    return axios.post(`${process.env.REACT_APP_MAIN_URL}/api/news/singleNews`, { slug })
}

const fetchIndexNews = () => {
    return axios.get(`${process.env.REACT_APP_MAIN_URL}/api/news/indexNews`)
}

const searchNews = ({ search }) => {
    console.log('search', search)
    return axios.get(`${process.env.REACT_APP_MAIN_URL}/api/news/search/${search}`)
}

export default fetchAllNews
export { fetchSingleItem, fetchIndexNews, searchNews }