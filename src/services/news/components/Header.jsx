import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Header = () => {

    const navigate = useNavigate()
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // update the date every second
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });



    return (
        <div>
            <div className='py-1 border-b'>
                <div className='flex items-center justify-start gap-3'>
                    <div className='w-full'>
                        <IconButton onClick={() => { navigate(-1) }}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                        <span className='mx-2 font-bold text-lg'>News Bulletin</span>
                    </div>
                    <div className='w-full'>
                        <div className='bg-gray-100 p-2 rounded-md flex items-center justify-start gap-2'>
                            <SearchRoundedIcon className='text-muted' />
                            <input type="search" placeholder='Search news articles...' className="outline-none border-none bg-transparent w-full" />
                        </div>
                    </div>
                    <div className='w-full float-right flex items-center justify-end'>
                        <div>
                            <p>{formattedTime}</p>
                            <p className='text-muted text-sm'>{formattedDate}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header