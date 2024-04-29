import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Link,
  Tooltip,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import NavHoverBox from "./NavHoverBox";

const NavItem = ({ navSize, icon, title, active, description, href,localNavSize }) => {
  const {colorMode} = useColorMode()

  const textColor = ()=>{
    return colorMode === 'dark' ? 'white' :"black"
  }
  return (
    <Tooltip placement="right"  label={description}>
    <Flex
      mt={30}
      flexDir={"column"}
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
     
      <Menu placement="right">
        <Link as={'span'}
          backgroundColor={active && "#AEC8CA"}
          p={3}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          borderRadius={8}
          w={navSize === "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize={"xl"}
                color={active ? "blue.600" : textColor()}
              />
              <Text 
              color={active ? "blue.600" : textColor()}
              ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        {/* <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList> */}
      </Menu>
  
    </Flex>
    </Tooltip>
  );
};

export default NavItem;
