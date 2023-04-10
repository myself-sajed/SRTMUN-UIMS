import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import PageNotFound from './PageNotFound'

const DeveloperServices = () => {
    const [validated, setValidated] = useState(false)
    const validation = (e) => {
        if (e.target.value === 'SRTMUN') {
            setValidated(true)
        }
        else {
            setValidated(false)
        }
    }

    return (
        <div>
            {
                validated === false ? <PageNotFound /> :
                    <div style={{ margin: 20, display: "flex", justifyContent: "space-between" }}>
                        <button className='btn btn-outline-warning' onClick={() => { axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/pdfsclear`) }}>Clear Pdfs</button>
                        <button className='btn btn-outline-primary' onClick={() => { axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/excelsclear`) }}>Clear Excels</button>
                        <button className='btn btn-success' onClick={() => { axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/mongodump`) }}>Mongo Dump</button>
                        <button className='btn btn-primary' onClick={() => { axios.post(`${process.env.REACT_APP_MAIN_URL}/developer/networkConnect`) }} >Connect Network</button>
                    </div>
            }
            <input type="password" className='form-control' id='srtmun' onChange={(e) => { validation(e) }} />
        </div>
    )
}

export default DeveloperServices