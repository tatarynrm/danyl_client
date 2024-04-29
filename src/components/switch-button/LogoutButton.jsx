import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import $api from "../../http";

const LogoutButton = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.700"
      backdropFilter="blur(5px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const navigate = useNavigate();

  const logoutFromServer = async () => {
    try {
      const data = await $api.get("/auth/logout");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    logoutFromServer();
    window.localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <Tooltip label={`Вийти з аккаунту`}>
        <IconButton
          marginTop={2}
          display={"flex"}
          alignItems={"center"}
          textAlign={"center"}
          width={"100%"}
          size={"md"}
          fontSize={"xl"}
          variant={"ghost"}
          color={"red"}
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
          // onClick={logout}
          icon={<RiLogoutCircleRLine />}
        />
      </Tooltip>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          bg={"rgba(255, 255, 255, 0.1)"}
          boxShadow={"0 4px 30px rgba(0, 0, 0, 0.1)"}
          backdropFilter={"blur(5px)"}
        >
          <ModalHeader>Вихід з системи</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={20}>Ви дійсно хочете вийти з системи?</Text>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"space-between"}>
            <Button colorScheme="red" onClick={logout}>
              Так,вийти!
            </Button>
            <Button colorScheme="green" onClick={onClose}>
              Ні,залишитись!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutButton;
