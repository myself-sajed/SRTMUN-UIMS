
const baseURL = process.env.REACT_APP_MAIN_URL

const serverLinks = {
    showFile : (photoURL, userType)=>`${baseURL}/showFile/${photoURL}/${userType}`
}

export default serverLinks