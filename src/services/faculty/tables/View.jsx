import React from 'react'
import FileViewer from '../../../components/FileViewer'

const View = ({ proof }) => {
    return (
        <FileViewer fileName={proof} serviceName="faculty" />
    )
}

export default View
