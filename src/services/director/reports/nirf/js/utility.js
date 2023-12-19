import axios from 'axios'
import toast from 'react-hot-toast'

const submitStrength = (values, refetch, module, model, setIsSubmitLoading) => {
    setIsSubmitLoading(true)
    axios.post(`${process.env.REACT_APP_MAIN_URL}/${module}/${!values.hasOwnProperty("_id") ? "threeYearSubmit" : "threeYearEdit"}/${model}`, values).then(res => {
        if (res.status === 200) {
            toast.success(res.data)
        }
        if (res.status === 500) {
            toast.error("Error while submiting data pleae try again")
        }
    }).catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
    }).finally(() => {
        refetch()
        setIsSubmitLoading(false)
    })
}



export { submitStrength }