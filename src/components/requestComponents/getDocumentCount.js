import axios from "axios";

const getDocumentCount = ({model,setState, filterCundition=null}) => {
    axios.post(`${process.env.REACT_APP_MAIN_URL}/getDocumentCount`,
        { model, filterCundition }).then(response => {
            // console.log(response.data.fetch)
            setState(response.data.fetch)
        }).catch(error => {console.error(error)});
};
export default getDocumentCount;