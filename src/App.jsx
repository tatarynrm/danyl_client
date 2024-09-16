import { useEffect, useState } from "react";
import LoginForm from "./components/login/LoginForm";
import generateUserDevice from "./services/generateUniqDeviceId";
import useBrowserDetection from "./hooks/useBrowserDetection";
import usePlatformDetection from "./hooks/usePlatformDetection";
import $api from "./http";
import moment from "moment";
import "moment/locale/uk";

import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { fetchAuthMe } from "./store/auth.slice";
import MainSvgBackground from "./components/svg-background/MainSvgBackground";
import Admin from "./pages/Admin/Admin";
import CreateUser from "./pages/Admin/AdminPages/CreateUser";

import Device from "./pages/Device/Device";
import OneDevice from "./pages/Device/OneDevice";
import { Text } from "recharts";
import Users from "./pages/Admin/AdminPages/Users";
import CreateCompany from "./pages/Admin/AdminPages/CreateCompany";
import Companies from "./pages/Admin/AdminPages/Companies";
import CreateDevice from "./pages/Admin/AdminPages/CreateDevice";

function App() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.700"
      backdropFilter="blur(5px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const userData = useSelector((state) => state.auth.data);
  const browser = useBrowserDetection();
  const platform = usePlatformDetection();
  const navigate = useNavigate();
  const localNavSize = localStorage.getItem("navSize");
  const [tokens, setTokens] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    token && dispatch(fetchAuthMe());
  }, [dispatch, token]);
  useEffect(() => {
    generateUserDevice();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, unauthorized]);


useEffect(()=>{
const getUserGoogle = async ()=>{
  try {
  const data = await $api('/auth/login/success');

  if (data.data.user) {
    console.log(data.data.user);
    localStorage.setItem("token", data.data.user.accessToken);
    navigate("/");
  }
  } catch (error) {
    console.log(error);
  }
}
getUserGoogle()
},[localStorage.getItem('login_count')])

  if (userData?.message === "ERROR_NETWORK") {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        width={"100%"}
        height={"100vh"}
      >
        <h2>Помилка з'єднання з сервером.</h2>
      </Flex>
    );
  }




  return (
    <Flex pos={"relative"} flexDir={"row"} gap={10} height={"100vh"}>
      {token && userData?.userInfo?.email && (
        <>
          <MainSvgBackground />
          <Sidebar localNavSize={localNavSize} />
        </>
      )}
      <Flex width={"100%"}>
        <Routes>
          <Route exact path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<Device />} />
            <Route path="/devices/:id" element={<OneDevice />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="create-user" element={<CreateUser />} />
              <Route path="users" element={<Users />} />

              <Route path="create-company" element={<CreateCompany />} />
              <Route path="companies" element={<Companies />} />

              <Route path="create-device" element={<CreateDevice />} />
              <Route path="companies" element={<Companies />} />
            </Route>
          </Route>

          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
