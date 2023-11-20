import axios from "axios";
import toast from "react-hot-toast";

// route available in naac-aqar.js
const saveAQARMatter = (formData, refetch) => {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/saveAQARMatter`
    axios.post(link, { formData }).then((res) => {
        if (res.data.status === 'success') {
            toast.success('Data saved successfully.')
            refetch()
        } else {
            toast.error('Failed saving matter...')
            refetch()
        }
    }).catch((err) => {
        console.log('Error saving in matter', err)
    })
}

function fetchAQARMatter(filter) {
    const link = `${process.env.REACT_APP_MAIN_URL}/aqar/fetchAQARMatter`
    return axios.post(link, { filter })
}

export default fetchAQARMatter
export { saveAQARMatter }