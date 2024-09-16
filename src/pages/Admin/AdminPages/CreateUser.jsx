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
       <UserCreateForm/>
    </Flex>
  );
};

export default CreateUser;
