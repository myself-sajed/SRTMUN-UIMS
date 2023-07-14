import { DialogTitle, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react'
import navcom from './navcom';
import { useSelector } from 'react-redux';

export default function Diatitle({title, clear, setItemToEdit, EditClear, Edit, init, setval}) {
    const DirectorActive = useSelector(state => state.directorActive.directorActive)
    const [currentPage, setcurrentPage] = useState('')
    useEffect(() => {
        navcom.forEach((item) => {
            if (item.name === DirectorActive) {
                setcurrentPage(item.value)
            } 
        })
    }, [document.location.pathname])

    const HandleChange = (e) => {
        setval(init)
        clear(false)
        EditClear(false)
        setItemToEdit(null)
    }

    return (
        <DialogTitle style={{ display: "flex", background:"#e5eaf0" }}>
            <span style={{ width: '50%', display: 'flex', justifyContent: "flex-start" }}>{Edit ?`Edit ${title}`: title} </span>
            <span style={{ width: '50%', display: 'flex', justifyContent: "flex-end" }}>
                <IconButton color="error" onClick={HandleChange}>
                    <ClearIcon />
                </IconButton></span>
        </DialogTitle>
    )
}
