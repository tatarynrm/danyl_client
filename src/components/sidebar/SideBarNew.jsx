import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
  } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { sidebar_menu } from '../../data/siderbar_menu'
import { useSelector } from 'react-redux'
import { accessLevels } from '../../contants/access'
import { NavLink, useLocation } from 'react-router-dom'
import NavItem from './NavItem'
import ColorModeSwitch from '../switch-button/ColorModeSwitch'


const SideBarNew = ({onOpen,onClose,isOpen,localNavSize}) => {
    const { userInfo } = useSelector((state) => state.auth.data);
    const [navSize, setNavSize] = useState(localNavSize);
    const location = useLocation();
  const btnRef = useRef()
  const closeMenu = ()=>{
    onClose()
  }

  return (
    <>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={'green.200'} textAlign={'center'} alignItems={'center'} >Навігація</DrawerHeader>

          <DrawerBody>
       
          {sidebar_menu.filter(item =>{
          if (userInfo?.role_id === 3) {
            return item.role !== accessLevels.ADMIN 
          }
          // ADMIN
          if (userInfo?.role_id === 2) {
            return item.role !== accessLevels.SUPER_ADMIN
          }
           // SUPER_ADMIN
          if (userInfo?.role_id === 1) {
            return item.role 
          }
      
        }
        ).map((item, idx) => {
          return (
     <React.Fragment  key={idx}>



                <NavLink    onClick={onClose} to={item.link} style={{ width: "100%" }}>
              <NavItem
             
                icon={item.icon}
                // navSize={navSize}
                title={item.title}
                description={item.description}
                active={location?.pathname === item.link ? true : false}
             
                // localNavSize={localNavSize}
              />
            </NavLink>
            </React.Fragment>
          );
        })}
            <ColorModeSwitch/>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button> */}
        
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideBarNew