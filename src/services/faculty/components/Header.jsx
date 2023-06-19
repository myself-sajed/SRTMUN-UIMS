import React, { useEffect } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import useAuth from '../../../hooks/useAuth';

const Header = ({ showTable, icon, title, state, font = 'text-lg', add, editState, clearStates, setIsFormOpen, exceldialog, dataCount }) => {


    useAuth(false)

    return (
        <div className=''>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-2'>
                <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                    <div className='flex items-center justify-start gap-2'>
                        {icon}
                        <p className={font}>{title}</p>
                        {
                            showTable && <span className="px-2 rounded-md bg-blue-200 text-blue-900 font-semibold">
                                {dataCount ? dataCount : 0}
                            </span>
                        }
                    </div>
                </div>

                <button onClick={() => { exceldialog(true) }} className='bg-green-100 px-5 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 p-1 rounded-full'>

                    <UploadFileIcon className='text-green-800' />
                    Excel </button>
                <button onClick={() => { clearStates(); state(true); editState(false); setIsFormOpen(true) }} className='bg-blue-100 px-5 text-blue-800 mt-2 hover:bg-blue-200 border-2 border-blue-200 ease-in-out duration-200 p-1 rounded-full'>

                    <AddRoundedIcon className='text-blue-800' />
                    Add </button>
            </div>

        </div>
    )
}

export default Header