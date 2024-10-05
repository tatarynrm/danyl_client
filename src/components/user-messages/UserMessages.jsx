import { BellIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Icon,
  useDisclosure,
  Text,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import "moment/locale/uk";
const UserMessages = () => {
  const userMessages = useSelector((state) => state.messages.data);
const {colorMode} = useColorMode()

  useEffect(() => {}, [userMessages]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box onClick={onOpen} position={"relative"}>
        <Icon color={userMessages ? "red" : "green"} as={BellIcon} />
        <Text position={"absolute"} top={5} right={3} fontSize={"10px"}>
          {userMessages.length}
        </Text>
      </Box>

      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={0}>
          <ModalHeader
            alignItems={"center"}
            textAlign={"center"}
            color={colorMode === 'dark' ? "green.200" : "green.900"}
          >
            Системні сповіщення
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={0} display={"flex"} flexDir={"column"} gap={"10px"}>
            {userMessages &&
              userMessages?.map((item, idx) => {
                return (
                  <Box
                    key={item.id}
                backgroundColor={colorMode === 'dark' ? "gray.900" : "green.200"}
                color={colorMode === 'dark' ? "white" : "black"}
                padding={2}
                paddingBottom={3}
                borderRadius={2}
                    display={"flex"}
                    gap={"10px"}
                    position={'relative'}
                  >
                    <Text>{item.text}</Text>
                    <Text position={'absolute'}
                    bottom={0}
                    right={2}
                    fontSize={10}
                    >{moment(item.created_at).format('LLL')}</Text>
                  </Box>
                );
              })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Закрити
            </Button>
            {/* <Button colorScheme="green" variant="ghost">Прочитати всі</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserMessages;
