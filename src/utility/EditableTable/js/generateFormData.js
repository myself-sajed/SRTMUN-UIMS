function generateFormData(data, formDataArray, extraDetails = null, isProof = false) {

    let formData = new FormData()

    extraDetails?.forEach((item) => {
        formData.append([item.name], item.value);
    })

    formDataArray?.forEach((item) => {
        formData.append([item.name], data?.[item.value]);
    })

    formData.append("isNew", "isNew");

    return formData;
}

export default generateFormData