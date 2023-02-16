import React from 'react'
import { CircularProgress, IconButton, LinearProgress } from '@mui/material';
import Bred from './Bred'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

const GenerateReportTemplate = ({ bredLinks, backLink, title, loading, children, navRightChild = null }) => {

    const navigate = useNavigate()

    return (
        <div>

            <div className='mt-2'>
                <Bred links={bredLinks} />
            </div>


            <div className='flex items-center justify-between border-t border-b mt-3 py-1 my-2'>
                <div className='flex items-center justify-start gap-2 text-base sm:text-xl' >
                    <IconButton onClick={() => { navigate(backLink) }}><ArrowBackRoundedIcon /></IconButton>
                    <p className=' text-sm md:text-lg text-blue-500 mb-1 font-bold'>{title}</p>
                </div>
                <div>
                    {navRightChild}
                </div>
            </div>

            {/* // report gen loading */}

            {
                loading ? <div className='my-3'>
                    <p className='text-center mb-3 text-gray-500'>Generating Report, Please wait...</p>
                    <LinearProgress />
                </div> : null
            }

            {children}
        </div>
    )
}

export default GenerateReportTemplate