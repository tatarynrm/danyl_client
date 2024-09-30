import React, { useEffect, useState } from 'react'
import $api from '../../../http';
import { Box, Stack, Text } from '@chakra-ui/react';

const AdminDevices = () => {
    const [devices,setDevices] = useState([])
    const getAllDevices = async ()=>{
        try {
            const data = await $api.get('/devices/admin/devices');
            console.log('DATAAAAAAAAAAAAAAAAAAAAAAA',data);

            if (data.status === 200) {
                setDevices(data.data)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
getAllDevices()
    },[])
  return (
<Stack display={'flex'}>
<Box display={'flex'} flexDir={'column'} gap={'10px'}>
    {devices && devices.map((item,idx) =>{
        return <Box>

            <Text>{item.service_phone_number ? item.service_phone_number : 'Немає'}</Text>
            <Text>{item.phone_number ? item.phone_number : 'Немає' }</Text>
        
        </Box>
    })}
</Box>

</Stack>
  )
}

export default AdminDevices