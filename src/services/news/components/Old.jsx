import React from 'react'

const Old = ({ className }) => {
    return (
        <div className={`${className} cursor-pointer rounded-md p-3 border hover:text-blue-600`}>

            <div>
                <p className='text-xs text-muted'>29/10/2022</p>
                <p className='font-semibold md:text-base text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
        </div>
    )
}

export default Old