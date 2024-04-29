import React from "react";
import backgroundPhoto from "../../assets/jpg/login.jpg";
import LoginForm from "../../components/login/LoginForm";
import { Flex } from "@chakra-ui/react";
import MainSvgBackground from "../../components/svg-background/MainSvgBackground";
const Login = () => {
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      pos={"relative"}
      zIndex={9999}
      style={
        {
          // backgroundImage: `url(${backgroundPhoto})`,
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }
      }
    >
      <MainSvgBackground />

      <LoginForm />
    </Flex>
  );
};

export default Login;
