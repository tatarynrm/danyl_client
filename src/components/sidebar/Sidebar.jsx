import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useStatStyles,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiHome, FiMenu } from "react-icons/fi";
import { MdOutlineWaterDrop } from "react-icons/md";
import NavItem from "./NavItem";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ColorModeSwitch from "../switch-button/ColorModeSwitch";

import $api from "../../http";
import LogoutButton from "../switch-button/LogoutButton";
import { sidebar_menu } from "../../data/siderbar_menu";

const Sidebar = ({ localNavSize }) => {
  const [navSize, setNavSize] = useState(localNavSize);
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth.data);

  useEffect(() => {
    if (!localNavSize) {
      localStorage.setItem("navSize", "large");
    }
  }, []);
  return (
    <Flex
      className="sidebar"
      pos={"sticky"}
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "65px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
        overflowY={"scroll"}
        style={{
          scrollbarWidth: "none",
        }}
        maxHeight={"70vh"}
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") {
              setNavSize("large");
              localStorage.setItem("navSize", "large");
            } else {
              setNavSize("small");
              localStorage.setItem("navSize", "small");
            }
          }}
        />

        {sidebar_menu.map((item, idx) => {
          return (
            <NavLink key={idx} to={item.link} style={{ width: "100%" }}>
              <NavItem
                icon={item.icon}
                navSize={navSize}
                title={item.title}
                description={item.description}
                active={location.pathname === item.link ? true : false}
                localNavSize={localNavSize}
              />
            </NavLink>
          );
        })}
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex marginTop={4} alignItems={"flex-start"}>
          <Avatar size={"sm"} />
          <Flex
            flexDir={"column"}
            alignItems={"center"}
            textAlign={"center"}
            justifyContent={"center"}
            ml={4}
            display={navSize === "small" ? "none" : "flex"}
          >
            <Heading as={"h3"} size={"sm"}>
              {userInfo?.name}
            </Heading>
          </Flex>
        </Flex>
        <ColorModeSwitch />
        <LogoutButton />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
