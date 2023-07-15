import React from 'react'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import { downloadAnalysisPDF } from '../js/generateFeedbackReport';

const DownloadReportButtons = ({ schoolName, feedbackUser, academicYear }) => {


    const downloadPDFReport = () => {
        downloadAnalysisPDF({ schoolName, feedbackUser, academicYear })
    }



    return (
        <div className='flex items-center justify-end gap-3'>
            <button onClick={downloadPDFReport} className='flex items-center justify-start gap-2 rounded-md hover:bg-red-900 p-2 bg-red-800 text-white'>
                <PictureAsPdfRoundedIcon /> Download Analysis PDF
            </button>
            <button className='flex items-center justify-start gap-2 rounded-md hover:bg-green-900 p-2 bg-green-800 text-white'>
                <TextSnippetRoundedIcon /> Download Analysis Excel
            </button>
        </div>
    )
}

export default DownloadReportButtons
