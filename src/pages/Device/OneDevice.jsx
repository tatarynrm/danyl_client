import { Box, Button, Flex, Input, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $api from "../../http";
import { GrObjectGroup } from "react-icons/gr";
import { RiArrowGoBackFill } from "react-icons/ri";
import OneDeviceState from "../../components/charts/one-device-state/OneDeviceState";
import OneDeviceSettings from "./OneDeviceSettings";
import ReusableModal from "../../components/modal/ReusableModal";
import TextField from "../../components/forms/TextField";
import EditDevice from "../../components/forms/EditDevice";
import GoogleAutocomplete from "../../components/forms/GoogleAutocomplete";

const OneDevice = () => {
  const [item, setItem] = useState(null);
  const [device, setDevice] = useState([])
  const [deviceProperties, setDeviceProperties] = useState([])

console.log(device);


  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const getOneDevice = async () => {
    try {
      const data = await $api.get(`/devices/${id}`);
      setDevice(data.data)
    } catch (error) {
      console.log(error);

    }
  }
  const getOneDeviceState = async (id) => {
    try {
      const data = await $api.get(`/devices/state/${id}`);
      setItem(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDeviceCreateParams = async () => {
    try {
      const { data } = await $api.get('/devices/params');
      setDeviceProperties(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOneDeviceState(id);
  }, []);

  useEffect(() => {
    getOneDevice(id)
  }, []);
  useEffect(() => {
    getDeviceCreateParams()
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
      <>

        <Flex width={"98%"} height={"90vh"} p={5} flexDir={"column"}>
          <Link to={"/devices"}>
            <Button leftIcon={<RiArrowGoBackFill />} variant={"outline"}>
              Повернутись до усіх апаратів
            </Button>
          </Link>

          <Tabs marginTop={'20px'} variant='enclosed'>
            <TabList>
              <Tab>Загальна інформація</Tab>
              <Tab>Координати</Tab>
              <Tab onClick={onOpen}>Редагувати</Tab>
            </TabList>



            <TabPanels>

              <TabPanel>
             
              </TabPanel>



              <TabPanel display={'flex'} flexDirection={'column'}>
                
                  <GoogleAutocomplete  code={device.code} />
              

              </TabPanel>




            </TabPanels>
          </Tabs>

          <OneDeviceSettings deviceProperties={deviceProperties} device={device} />

          <OneDeviceState id={id} />




          {/* Модальне вікно з формою редагування */}








        </Flex>

        <ReusableModal onClose={onClose} isOpen={isOpen} title={`Редагування апарату`} >
          <EditDevice device={device} />
        </ReusableModal>


      </>
    );
  }
};

export default OneDevice;
