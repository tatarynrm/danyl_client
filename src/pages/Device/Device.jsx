import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import $api from "../../http";
import DeviceItem from "./DeviceItem";

const Device = () => {
  const [device, setDevice] = useState([]);
  const [search, setSearch] = useState("");
  const getDevices = async () => {
    try {
      const data = await $api.get("/devices");
      setDevice(data.data);
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);


  return (
    <Flex width={"98%"} height={"90vh"} p={5} flexDir={"column"}>
      <Box marginBottom={'10px'} width={["100%", "100%", "30%", "30%"]}  > 
        <Input 
            
        onChange={e => setSearch(e.target.value)}
        placeholder="Пошук за кодом,розсташуванням..." />

        
      </Box>
      {!device ? (
        <Text> Loading ...</Text>
      ) : (
        <Flex
          gap={4}
          flexWrap={"wrap"}
          overflowY={"scroll"}
          style={{
            scrollbarWidth: "none",
          }}
        >
          {device
            ?.filter((item) => item)
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.code.toString().includes(search) ||
                  item.code.toString().includes(search) 
                    // item.ROZV.toLowerCase().includes(search) ||
                    // item.PIP.toUpperCase().includes(search) ||
                    // item.PIP.toLowerCase().includes(search) ||
                    // item.ZAM?.toLowerCase().includes(search) ||
                    // item.ZAM?.toUpperCase().includes(search) ||
                    // item.KOD.toString().includes(search) ||
                    // item.ZAPNUM.toString().includes(search) ;
            })
            .sort((a, b) => a.code - b.code)
            .map((item, idx) => {
              return <DeviceItem key={idx} item={item} />;
            })}
        </Flex>
      )}
    </Flex>
  );
};

export default Device;
