import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'

const StatElement = ({label,count}) => {
  return (
<StatGroup>
  <Stat >
    <StatLabel textAlign={'center'} fontSize={'24px'}>{label ? label : null}</StatLabel>
    <StatNumber>{count ? count : null}</StatNumber>
    <StatHelpText>
      <StatArrow type='increase' />
      23.36%
    </StatHelpText>
  </Stat>
  </StatGroup>
  )
}

export default StatElement