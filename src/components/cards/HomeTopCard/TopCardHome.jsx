import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineTimer } from "react-icons/md";
import moment from "moment/moment";
import "moment/locale/uk";
import getMyFormat from '../../../lib/dateFormatterForHomeCards';



const TopCardHome = ({icon,text,data,updateTime,spending,income}) => {
  const date = moment(new Date()).format('llll');
  return (
<Card height={'120px'} width={['100%','100%']}>
  <CardBody position={'relative'} display={'flex'} flexDir={'column'} gap={12}>
   <Flex justifyContent={'space-between'}>
<Box display={'flex'}>
  <Text>{icon}</Text>
</Box>
<Box display={'flex'} flexDirection={'column'} gap={2}>
  <Text  fontSize={'14px'} textAlign={'right'}>{text}</Text>
  <Text color={spending ? 'red' : '' || income ? 'green' : ''}  fontSize={'14px'} textAlign={'right'}>{data}</Text>
</Box>
   </Flex>

   <Box display={'flex'} gap={'4px'} fontSize={'12px'} position={'absolute'} bottom={'4px'} left={'8px'}>
   <MdOutlineTimer size={18} />
   <Text>Оновлено: {getMyFormat(date)} </Text>
   </Box>
  </CardBody>
</Card>
  )
}

export default TopCardHome