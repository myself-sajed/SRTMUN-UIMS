import axios from "axios";

const getDocumentCount = ({model,setState, filterCundition=null}) => {
    axios.post(`${process.env.REACT_APP_MAIN_URL}/getDocumentCount`,
        { model, filterCundition }).then(response => {
            setState(response.data.report)
        }).catch(error => {console.error(error)});
};
export default getDocumentCount;