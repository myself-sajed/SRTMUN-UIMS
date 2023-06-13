import { Box, Tab, Tabs } from '@mui/material';

const TabBox = ({ value, setValue }) => {
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered >
            <Tab style={{ textTransform: 'none', backgroundColor: '#f2f2ff', margin: '10px', borderRadius: '10px' }} className='bg-blue-100' label="CAS" />
            <Tab style={{ textTransform: 'none', backgroundColor: '#f2f2ff', margin: '10px', borderRadius: '10px' }} className='bg-blue-100' label="PBAS" />
            <Tab style={{ textTransform: 'none', backgroundColor: '#f2f2ff', margin: '10px', borderRadius: '10px' }} className='bg-blue-100' label="AQAR (Faculty)" />
            <Tab style={{ textTransform: 'none', backgroundColor: '#f2f2ff', margin: '10px', borderRadius: '10px' }} className='bg-blue-100' label="AAA" />
            <Tab style={{ textTransform: 'none', backgroundColor: '#f2f2ff', margin: '10px', borderRadius: '10px' }} className='bg-blue-100' label="AQAR (Director)" />
        </Tabs>
    </Box>

}

export default TabBox