import React, { useEffect, useState } from 'react'
import navcom from './navcom'
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

export default function AddButton(props) {
    const DirectorActive = useSelector(state => state.directorActive.directorActive)
    const clickd = () => {
        props.onclick(true)
    }
    const excelClicked = () => {
        props.exceldialog(true)
    }
    const [data, setData] = useState(null)

    useEffect(() => {
        if (window.location.pathname === '/director/sdm') {
            navcom.forEach((item) => {
                if (item.name === DirectorActive) {
                    setData(item)
                }
            })
        }
    }, [DirectorActive])


    return (
        <div style={{ display: "flex", width: "100%", background: `${data?.instruction.length > 0 ? '#ebebeb' : 'white'}`, borderRadius: "10px", margin: "auto" }} >
            <div className={`${data?.instruction.length > 0 ? 'text-gray-800 px-4 py-3 rounded-md ' : 'white'}`} style={{ width: "70%" }}>
                {data?.instruction.map((e, index) => {
                    return <p key={index} className='md:text-sm text-xs'>{e}</p>
                })}
            </div>
            <div style={{ display: 'flex', justifyContent: "flex-end", flexDirection: `${data?.instruction.length > 0 ? 'column' : 'row'}`, width: "30%", margin: `${data?.instruction.length > 0 ? "15px 0" : "2px 0"}` }}>
                <Button onClick={excelClicked} startIcon={<UploadFileIcon />} size="large" variant="contained" color="success" style={{ height: 40, backgroundColor: "#759b77", marginTop: 0, marginLeft: 'auto', marginBottom: 3, marginRight: 15 }}>Excel</Button>
                <Button onClick={clickd} startIcon={<AddIcon />} size="large" variant="contained" color="primary" style={{ height: 40, marginBottom: 'auto', marginLeft: 'auto', marginRight: 15 }}>Add</Button>
            </div>
        </div>
    )
}