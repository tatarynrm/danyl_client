import React, { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import useBrowserDetection from "../../hooks/useBrowserDetection";
import usePlatformDetection from "../../hooks/usePlatformDetection";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../store/auth.slice";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import GoogleLoginButton from "../google/google-login/GoogleLoginButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const browser = useBrowserDetection();
  const platform = usePlatformDetection();
  const device_id = localStorage.getItem("device_id");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const [showError, setShowError] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      fetchAuth({
        email,
        password,
      })
    );
   
    if (data.payload.message === "Невірний логін чи пароль") {
      alert("Невірний логін чи пароль!");
    }
    if (!data.payload || data.payload.length === 0) {
      return alert("Не вдалось авторизуватись");
    }
    if (data.payload.status === 401) {
      setShowError(true);
    }
    if (data.payload.accessToken) {
      localStorage.setItem("token", data.payload.accessToken);
    
      navigate("/");
      // window.location.reload();
    }
  };

  const login = async () => {
    try {
      const response = await AuthService.login(
        email,
        password,
        platform,
        browser,
        device_id
      );
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      if (!response.data.accessToken) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [userData, token]);

  return (
    <Flex flexDir={"column"} gap={10} alignItems={'center'} pos={"relative"} zIndex={9999}>
      {showError && (
        <Text
          pos="absolute"
          top="-100"
          left="0"
          width="100%"
          fontWeight="bold"
          color="red.400"
        >
          Невірний логін або пароль
        </Text>
      )}
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setShowError(false);
          setEmail(e.target.value);
        }}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setShowError(false);
          setPassword(e.target.value);
        }}
      />
      <Button width={'100%'} onClick={signIn}>Логін</Button>

      <GoogleLoginButton/>
    </Flex>
  );
};

export default LoginForm;
