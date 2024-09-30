import { Box, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react'

const OneDeviceSettings = ({device,deviceProperties}) => {
   const item = device;
   const properties = deviceProperties;
    

    
  return (
 <Stack>
    <Flex gap={'10px'} padding={'4px'}  dir='row'>
      
      <Box>
         <Text color={'green'}>№ {item.code}</Text>
      </Box>
      <Divider orientation='vertical' />
      <Box>
         <Text color={'green'} display={'flex'} gap={'4px'} alignItems={'center'} textAlign={'center'}>Сервісний номер: {item.service_phone_number ? item.service_phone_number : <Text color={'red'}>Не встановлено</Text> }</Text>
      </Box>
      <Divider orientation='vertical' />
      <Box>
         <Text color={'green'} display={'flex'} gap={'4px'} alignItems={'center'} textAlign={'center'}>Номер GSM: {item.phone_number ? item.phone_number : <Text color={'red'}>Не встановлено</Text> }</Text>
      </Box>
      

    </Flex>
 </Stack>
  )
}

export default OneDeviceSettings