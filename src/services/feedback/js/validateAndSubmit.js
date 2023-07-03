import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Axios from "axios"


const validateForm = (questions, setLoading, responseType, formData, setFormData, data, navigate, setActiveStep) => {

    let isValid = true


    questions.reverse().forEach((question) => {
        if (question.required) {
            if (formData[question.question]) {
                if (question.type === 'check') {
                    if (formData[question.question].length === 0) {
                        const element = document.getElementById(question.question);
                        isValid = false
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

                        }
                    }
                }
            } else {
                isValid = false
                const element = document.getElementById(question.question);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    })

    console.log(data)


    if (isValid) {
        submitResponse(setLoading, responseType, formData, setFormData, data, navigate, setActiveStep)
    }

}

const submitResponse = (setLoading, responseType, formData, setFormData, data, navigate, setActiveStep) => {
    setLoading(true)
    const link = `${process.env.REACT_APP_MAIN_URL}/feedback/${responseType}/collectResponse`
    console.log({ response: formData, academicYear: data.academicYear, schoolName: data.schoolName })
    Axios.post(link, { response: formData, academicYear: data.academicYear, schoolName: data.schoolName })
        .then((res) => {
            if (res.data.status === 'success') {
                toast.success('Your response was successfully submitted.')
                setLoading(false)
                handleReset(false, setFormData, data, responseType)
                setActiveStep(2)
            } else {
                toast.error(res.data.error)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Could not submit the form. Try again later...')
            setLoading(false)
        })
}

const handleReset = (reload = true, setFormData, data, responseType) => {
    setFormData({})
    localStorage.setItem(`${responseType}-FormData-${data.academicYear}-${data.schoolName}`, JSON.stringify({}))
    reload && window.location.reload()
    window.scrollTo(0, 0)
}


export default validateForm
export { submitResponse, handleReset }
