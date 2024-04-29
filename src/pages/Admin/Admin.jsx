import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import $api from "../../http";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import CrumbsComponent from "../../components/crumbs/CrumbsComponent";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import CreateUser from "./AdminPages/CreateUser";
import Test from "./AdminPages/Test";
const Admin = ({ children }) => {
  const breadcrumbs = useBreadcrumbs();
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const data = await $api.get("/auth/users");
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getAllUsers();
  }, []);

  return (
    <Flex
      flexDir={["column", "column", "column", "column"]}
      width={"98%"}
      height={"90vh"}
      overflowY={"auto"}
      p={5}
    >
      <Link to={"/admin"}>
        <Heading
          bgClip="text"
          fontSize="3xl"
          fontWeight="extrabold"
          //   bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgGradient={"linear-gradient(to top left, #2A3ECF 0%, #B1CFB3 99%)"}
        >
          Адміністративні налаштування
        </Heading>
      </Link>
      <Flex display={"grid"} gridTemplateColumns={"100%"} gap={4}>
        <AdminNavbar>
          <CreateUser />
          <Test />
        </AdminNavbar>
      </Flex>
    </Flex>
  );
};

export default Admin;
