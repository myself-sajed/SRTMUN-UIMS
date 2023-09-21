import toast from "react-hot-toast"
import Axios from "axios"

function getYFDashboardData(dataFilter) {
    const link = `${process.env.REACT_APP_MAIN_URL}/dsd/youthfestival/dashboard`
    return Axios.post(link, { dataFilter })
}

export default getYFDashboardData