import React, { PureComponent, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
  Bar,
  BarChart,
  Legend,
} from "recharts";
import $api from "../../../http";
import moment from "moment/moment";
import "moment/locale/uk";
import { Flex, Heading, useColorMode } from "@chakra-ui/react";
const OneDeviceState = ({ id }) => {
  const [state, setState] = useState([]);
  const { colorMode } = useColorMode();
  console.log(state);
  const getColor = () => {
    return colorMode === "dark" ? "whitesmoke" : "lightgrey";
  };

  useEffect(() => {
    const getOneData = async () => {
      try {
        const data = await $api.get(`/device/state/${id}`);

        setState(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneData();
    // setInterval(() => {
    //   getOneData();
    // }, 10000);
  }, []);

  function CustomTooltip({ active, payload, label }) {
    // console.log("PAYLOAD", payload);
    // console.log("LABEL", label);
    if (active) {
      return (
        <Flex
          style={{
            backgroundColor: "white",
          }}
          borderRadius={10}
          padding={4}
          flexDir={"column"}
        >
          <Flex color={"green.800"} fontWeight={"bold"} flexDir={"column"}>
            <Text>{`Дата оновлення: ${moment(label).calendar()}`}</Text>
            <Text
              style={{
                color: `${payload[0]?.payload?.water === 1 ? "blue" : "red"}`,
              }}
            >
              {`Датчик рівня води: ${
                payload[0]?.payload?.water === 1 ? "Активний" : "Помилка"
              }`}
            </Text>
            <Text
              style={{
                color: `${payload[1]?.payload?.money === 1 ? "blue" : "red"}`,
              }}
            >
              {`Датчик купюрника: ${
                payload[1]?.payload?.money === 1 ? "Активний" : "Помилка"
              }`}
            </Text>
          </Flex>
        </Flex>
      );
    }

    return null;
  }
  if (state.length <= 0) {
    return null;
  }
  return (
    <ResponsiveContainer width="100%" height="30%">
      <BarChart
        width={500}
        height={300}
        data={state.toSorted((a, b) => a.id - b.id)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis
          dataKey="created_at"
          scale="point"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            return moment(str).format("LTS");
          }}
          padding={{ left: 10, right: 10 }}
        />
 {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip content={<CustomTooltip />} />
        <Legend  verticalAlign="bottom" height={70}/>
        <Bar
          dataKey={"water"}
          fill={"rgba(51, 77, 163, 0.8)"}
          name="Датчик тиску води"
          background={{ color: "rgba(51, 77, 163, 0.8)" }}
        />
        <Bar
          dataKey={"money"}
          fill="rgba(66, 161, 81, 0.8)"
          name="Датчик купюромонетника"
          background={{ color: "rgba(66, 161, 81, 0.8)" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OneDeviceState;
