import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import Login from "../Login/Login";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth.data);
  const {colorMode} = useColorMode()
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "Апарати": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "Апарати": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "Апарати": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "Апарати": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "Апарати": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "Апарати": 3800,
      "amt": 2500
    },
    {
      // "name": "Page G",
      "uv": 3490,
      "Апарати": 4300,
      "amt": 2100
    }
  ]
  if (!userInfo) {
    return null
  }
  return (
    <Flex width={"98%"} height={'90vh'}  p={5}>
      <Flex flexDir={"column"}>
        <Heading as="h1">Привіт {userInfo?.name}</Heading>

        {/* <Flex flexDir={'row'}>
        <Flex>
          <Heading>REE</Heading>
          </Flex>
        <Box flexDir={"row"} alignItems={"center"} gap={20} width={300} height={100}  >
   
          <ResponsiveContainer width={"100%"} height={'100%'}>
            <LineChart width={300} height={100} data={data}>
              <Tooltip contentStyle={{background:'transparent',border:'none'}}
              labelStyle={{display:'none'}}

              position={{x:10,y:80}}
              />
          
              <Line
              dataKey={'Апарати'}
              stroke={colorMode =='dark' ? "white" : "darkblue"}
              strokeWidth={2}
              dot={false}
              
              type={'monotone'}/>
              
            </LineChart>
          </ResponsiveContainer>
        </Box>
 

        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default Home;
