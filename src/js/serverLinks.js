
const baseURL = process.env.REACT_APP_MAIN_URL

const serverLinks = {
    showFile: (photoURL, userType) => {
        console.log("userType",userType);
        let fullUrl = `${baseURL}/showFile/${photoURL}/${userType}`
        console.log("Full",fullUrl);
        return(fullUrl)}
}

export default serverLinks