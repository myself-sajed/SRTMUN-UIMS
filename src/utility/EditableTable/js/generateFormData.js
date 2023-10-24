function generateFormData(data, formDataArray, extraDetails = null) {

    let formData = new FormData()

    formDataArray.forEach((item) => {
        formData.append([item.name], data[item.value])
    })

    extraDetails?.forEach((item) => {
        formData.append([item.name], item.value)
    })

    return formData
}

export default generateFormData