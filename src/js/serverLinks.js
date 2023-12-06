
const baseURL = process.env.REACT_APP_MAIN_URL

const serverLinks = {
    showFile: (photoURL, userType) => {
        let fullUrl = `${baseURL}/showFile/${photoURL}/${userType}`
        return (fullUrl)
    }
}

export default serverLinks