import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GoBack = ({ backUrl = -1, pageTitle, children = null }) => {

    const navigate = useNavigate()
    return (
        <div className='py-1 flex items-center justify-between border-b'>
            <div className='flex items-center justify-start'>
                <IconButton onClick={() => { navigate(backUrl) }}>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <span className='mx-2 font-bold text-lg'>{pageTitle}</span>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default GoBack