import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import $api from "../../../http";
import UserCreateForm from "../../../components/forms/UserCreateForm";

const CreateUser = () => {
  const { colorMode } = useColorMode();

  const [errorCode,setErrorCode] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password:'',
    name:'',
    lastname:'',
    surname:'',
    phone_number:'',
    role_id:''
  });

  const getMode = () => {
    if (colorMode == "dark") {
      return "white";
    }
    return "blue.700";
  };
  const getPlaceHolderColor = () => {
    if (colorMode == "dark") {
      return "white";
    }
    return "black";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, // Зберігаємо попередні значення
      [name]: value, // Оновлюємо значення поля вводу за іменем
    });
  };

const handleUserCreate = async ()=>{
  try {
    const {data} = await $api.post('/auth/registration',formData);
    console.log(data);
 if (data?.user?.id) {
  setErrorCode('Користувача створено')

 }
 if (data?.message === 'User is already exist') {
  setErrorCode('Користувач з таким e-mail вже існує')

 }
 if (data?.message === "INCORECT DATA") {
  setErrorCode("Заповніть усі поля")

 }

  } catch (error) {
    console.log(error);
  }
}


  return (
    <Flex marginTop={10} flexDir="column">
    
      {/* <Flex
        width={"100%"}
        gap={2}
        flexDir={["column", "column", "column", "row"]}
      >
        <FormControl isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input name="email" onChange={handleChange} _placeholder={{color:getPlaceHolderColor}}  borderColor={getMode} placeholder="Login" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input name="password" onChange={handleChange} _placeholder={{color:getPlaceHolderColor}}  borderColor={getMode} placeholder="Password" />
        </FormControl>
      </Flex>

      <Flex
        marginTop={2}
        gap={2}
        flexDir={["column", "column", "column", "row"]}
      >
        <FormControl isRequired>
          <FormLabel>Ім'я</FormLabel>
          <Input name="name" onChange={handleChange} _placeholder={{color:getPlaceHolderColor}}  borderColor={getMode} placeholder="Ім'я" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Прізвище</FormLabel>
          <Input name="lastname" onChange={handleChange} _placeholder={{color:getPlaceHolderColor}}  borderColor={getMode} placeholder="Прізвище" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>По-батькові</FormLabel>
          <Input name="surname" onChange={handleChange} _placeholder={{color:getPlaceHolderColor}}  borderColor={getMode} placeholder="По-батькові" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Номер телефону</FormLabel>
          <Input name="phone_number" onChange={handleChange} _placeholder={{color:getPlaceHolderColor}}  borderColor={getMode} placeholder="Номер телефону" />
        </FormControl>
      </Flex>

      <Flex width={["100%", "100%", "30%"]} marginTop={4}>
        <Select 
     
        onChange={handleChange} name="role_id" _placeholder={{color:getPlaceHolderColor}}  borderColor={getMode} placeholder="Права користувача">
          <option value='3'>Користувач</option>
          <option value="2">Адміністратор</option>
          <option value="1">Super-Admin</option>
        </Select>
      </Flex>
      <Flex flexDir={'row'} alignItems={'center'} textAlign={'center'} gap={10} marginTop={10}>
        <Button onClick={handleUserCreate} colorScheme={() =>{
     if (errorCode === 'EXIST USER') {
      return 'Користувач вже існує'
     }
        }}variant={'outline'}>Створити користувача</Button>
           {errorCode && <Text color={errorCode.includes('створено') ? 'green' : 'red'}>{errorCode}</Text>}
      </Flex>
   <br /> */}

   <UserCreateForm/>
    </Flex>
  );
};

export default CreateUser;
