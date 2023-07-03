import { toast } from "react-hot-toast"
import Axios from "axios"

const cloneItem = (id, model, refreshFunction) => {
    let link = `${process.env.REACT_APP_MAIN_URL}/service/faculty/cloneItem`

    Axios.post(link, { id, model })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Item cloned successfully.')
                refreshFunction()
            } else if (res.data.status === 'error') {
                toast.error(res.data.error)
                refreshFunction()
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => {
            toast.error('Could not clone item, something went wrong')
            console.log("clone item error: ", err)
            refreshFunction()
        })
}

export default cloneItem