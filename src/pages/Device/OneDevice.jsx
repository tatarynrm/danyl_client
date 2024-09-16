import { Button, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $api from "../../http";
import { GrObjectGroup } from "react-icons/gr";
import { RiArrowGoBackFill } from "react-icons/ri";
import OneDeviceState from "../../components/charts/one-device-state/OneDeviceState";

const OneDevice = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const getOneDevice = async (id) => {
    try {
      const data = await $api.get(`/devices/state/${id}`);
      setItem(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOneDevice(id);
  }, []);
 

  if (!item) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width={"98%"}
        height={"90vh"}
        p={5}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  } else {
    return (
      <Flex width={"98%"} height={"90vh"} p={5} flexDir={"column"}>
        <Link to={"/devices"}>
          <Button leftIcon={<RiArrowGoBackFill />} variant={"outline"}>
            Повернутись до усіх апаратів
          </Button>
        </Link>
        <Flex marginTop={2}>
          {/* {item.code} */}
        </Flex>
        <OneDeviceState id={id}/>
      </Flex>
    );
  }
};

export default OneDevice;
