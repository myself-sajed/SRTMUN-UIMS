import React from 'react'

const Note = ({ title, classes }) => {
    return (
        <div>
            <p className={`text-sm text-gray-500 ${classes}`}><span className='font-bold'>Note :</span> {title}</p>
        </div>
    )
}

export default Note