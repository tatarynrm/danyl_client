import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineTimer } from "react-icons/md";
import moment from "moment/moment";
import "moment/locale/uk";
import getMyFormat from '../../../lib/dateFormatterForHomeCards';
import LineChartMoney from '../../charts/one-device-state/LineCharts/LineChartMoney';



const CardWithChart = ({chartColor,chartLabel,data}) => {
  
  return (
<Card height={'200px'} width={['100%','100%']}>
  <CardBody position={'relative'} display={'flex'} flexDir={'column'} gap={12}>
    <Text position={'absolute'} top={0} left={'10px'} fontSize={'14px'}>{chartLabel}</Text>
  <LineChartMoney data={data} chartColor={chartColor} chartLabel={chartLabel} />
  </CardBody>
</Card>
  )
}

export default CardWithChart