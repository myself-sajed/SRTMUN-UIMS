import React from 'react'
import navcom from './navcom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import UploadFileIcon from '@mui/icons-material/UploadFile';


const TableTitle = ({ title, clickd, excelClicked }) => {

    const [currentPage, setCurrentPage] = useState(null)
    const DirectorActive = useSelector(state => state.directorActive.directorActive)
    const [data, setData] = useState(null)

    useEffect(() => {
        // get current url
        navcom.forEach((item) => {
            if (item.value === title) {
                setCurrentPage(item.value)
                setData(item)
            }
        })
    }, [DirectorActive])


    return (
        <div className='my-3'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-2'>
                <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                    <div className='flex items-center justify-start gap-2 text-lg'>
                        {data?.icon}
                        <p>{currentPage}</p>
                    </div>
                </div>

                <button onClick={() => { excelClicked() }} className='bg-green-100 px-5 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 p-1 rounded-full'>

                    <UploadFileIcon className='text-green-800' />
                    Excel </button>
                <button onClick={() => { clickd() }} className='bg-blue-100 px-5 text-blue-800 mt-2 hover:bg-blue-200 border-2 border-blue-200 ease-in-out duration-200 p-1 rounded-full'>

                    <AddRoundedIcon className='text-blue-800' />
                    Add </button>
            </div>

        </div>
    )
}

export default TableTitle
