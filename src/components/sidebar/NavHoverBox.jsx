import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";

const NavHoverBox = ({ icon, title, description }) => {
  return (
    <>
      <Flex
        pos={"absolute"}
        mt="calc(100px -7.5px)"
        ml={"-10px"}
        width={0}
        height={0}
        borderTop={"10px solid tranparent"}
        borderBottom={"10px solid tranparent"}
        borderRight={"10px solid #92AAAD"}
      />
      <Flex
        h={200}
        w={"100%"}
        flexDir={"column"}
        alignItems={"center"}
        justifyItems={"center"}
        backgroundColor={"#82AAAD"}
        borderRadius={"10px"}
        color={"#fff"}
        textAlign={"center"}
      >
        <Icon as={icon} fontSize={"3xl"} mb={4} />

        <Heading  fontSize={'2xl'}>{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
};

export default NavHoverBox;
