import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import $api from "../../../http";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search,setSearch] = useState('')
  const getAllUsers = async () => {
    try {
      const { data } = await $api.get("/auth/users");
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchByEmail = async (value)=>{
    try {
      const data = await $api.post('/auth/users/by-email',{email:value})
    setUsers(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchByEmail = async(e)=>{
  
    const value = e.target.value

    setSearch(value)

    if (value.length > 1) {
     await searchByEmail(value)
    }
  }
  useEffect(()=>{

  },[search])
  useEffect(() => {
    if (search.length === 0) {
      getAllUsers();
    }
 
  }, [search]);
  
  return (
    <Flex marginTop={10} flexDir="column" gap={3}>
      <Input onChange={handleSearchByEmail} value={search} type="text" placeholder="Пошук за email" />
      {users &&
        users.filter(item => item).sort((a,b) => a.id - b.id).map((item, idx) => {
          return (
            <Flex
              key={idx}
              flexDir={["column", "column", "row"]}
              justifyContent={"space-between"}
              textAlign={"left"}
              alignItems={"flex-start"}
            >
              <Text width={["100%", "100%", "300px"]}>{item.email}</Text>
              <Text width={["100%", "100%", "300px"]}>{item.lastname}</Text>
              <Text width={["100%", "100%", "300px"]}>{item.name}</Text>
              <Text width={["100%", "100%", "300px"]}>{item.surname}</Text>
              <Text width={["100%", "100%", "300px"]}>{item.phone_number}</Text>
              <ButtonGroup onClick={() => alert(item.id)} size="sm" isAttached variant="outline">
                <Button>Редагувати</Button>
                <IconButton icon={<CiEdit />} />
              </ButtonGroup>
            </Flex>
          );
        })}
    </Flex>
  );
};

export default Users;
