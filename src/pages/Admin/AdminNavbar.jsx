import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();
  const checkLocation = location.pathname.split("/");

  useEffect(() => {}, [location, checkLocation]);

  return (
    <Flex
      flexDir={"column"}
      maxWidth={"100%"}
      flexWrap={["wrap", "wrap", "wrap", "wrap"]}
      gap={2}
    >
      <Flex gap={4} flexDir={["column", "column", "column", "row"]}>
        <Menu>
          <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
            Меню користувачів
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to={"/admin/create-user"}>Створити користувача</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/admin/users"}>Список користувачів</Link>
            </MenuItem>

            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Outlet />
    </Flex>
  );
};

export default AdminNavbar;
