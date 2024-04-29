import { IconButton, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react'
import {FaMoon,FaSun} from 'react-icons/fa'

const ColorModeSwitch = () => {
    const {toggleColorMode} = useColorMode()
    const text = useColorModeValue('dark','light')
    const SwitchIcon = useColorModeValue(FaMoon,FaSun)
  return (
    <Tooltip  label={`Перемкнути на ${text === 'dark' ? 'темний режим' : 'світлий режим'}`}>

   
   <IconButton marginTop={2} display={'flex'} alignItems={'center'} textAlign={'center'} width={'100%'}  size={'md'} fontSize={'xl'} variant={"ghost"}
   color={'current'}
 
   onClick={toggleColorMode}
   aria-label={`Перемкнути на ${text === 'dark' ? 'темний режим' : 'світлий режим'}`}
   icon={<SwitchIcon/>}
   title='dsdass'

   />
    </Tooltip>
  )
}

export default ColorModeSwitch