import { Empty } from 'antd'
import React from 'react'

const EmptyBox = ({ classes }) => {
    return (
        <div className={`w-full flex items-center justify-center ${classes}`}>
            <div className="flex items-center justify-center flex-col">
                <Empty />
            </div>
        </div>
    )
}

export default EmptyBox