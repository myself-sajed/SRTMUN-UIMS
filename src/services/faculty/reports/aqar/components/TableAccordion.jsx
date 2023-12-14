import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Typography } from '@mui/material'
import AQARWithProof from './AQARWithProof';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import toast from 'react-hot-toast';

const TableAccordion = ({ AQARTables, showIndex = true }) => {

    const [expandedAccordion, setExpandedAccordion] = useState();

    const handleChangeAccordion = (index) => {
        setExpandedAccordion(index === expandedAccordion ? null : index);
    };


    return AQARTables?.map((table, index) => {
        return <div className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base w-full`}>
            <Accordion sx={{ boxShadow: 'none' }} TransitionProps={{ unmountOnExit: table.shouldUnmount ? table.shouldUnmount : true }} expanded={expandedAccordion === index} onChange={() => handleChangeAccordion(index)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls={`content-${index}`}
                    id={`accordion-${index}`}
                >
                    <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{showIndex ? `${index + 1}.` : ''} {table.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {table?.share && <div className="flex justify-end"><ShareLink table={table} /></div>}
                        {table?.hasSupportingDocument ? <AQARWithProof isAdmin={table?.isAdmin} supportingProofMetaData={table?.proofData} >
                            {table.component}
                        </AQARWithProof> : table.component}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    })
}


export default TableAccordion

const AQARSection = ({ children }) => {
    return <div className="border-[#8c8cd9] rounded-lg p-3 border-2 my-3 text-sm lg:text-base w-full">
        {children}
    </div>
}

export { AQARSection }

const ShareLink = ({ table }) => {

    const copyLink = () => {
        const link = `${process.env.REACT_APP_REPORT_URL}/aqar/other/${table?.academicYear}/${table?.id}`
        navigator.clipboard.writeText(link)
        toast.success('Link copied successfully')
    }

    return <Button variant='contained' className='flex items-center gap-2 bg-green-50 text-green-800 p-2 rounded-full border-2 border-green-600' onClick={copyLink} style={{ textTransform: 'none' }} >
        <SendRoundedIcon sx={{ fontSize: '20px' }} /> Share this module
    </Button>
}