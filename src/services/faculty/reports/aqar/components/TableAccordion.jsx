import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material'
import AQARWithProof from './AQARWithProof';

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
                    {table?.hasSupportingDocument ? <AQARWithProof isAdmin={table?.isAdmin} supportingProofMetaData={table?.proofData} >
                        {table.component} 
                    </AQARWithProof> : table.component}
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