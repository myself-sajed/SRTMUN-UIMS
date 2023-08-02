import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function AddButton(props) {
    const [data, setData] = useState(null);

    const clickd = (e) => {
        props.onclick(true)
    }
    return (


        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                <div className='flex items-center justify-start gap-2'>
                    <p>{props.title}</p>
                </div>
            </div>

            <button onClick={() => { clickd() }} className='bg-blue-100 px-5 text-blue-800 hover:bg-blue-200 border-2 border-blue-200 ease-in-out duration-200 p-1 rounded-full'>

                <AddRoundedIcon className='text-blue-800' />
                Add </button>
        </div>
    )
}