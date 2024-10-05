import { Box, Flex, Grid, Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Login from "../Login/Login";
import $api from "../../http";
import moment from "moment";
import "moment/locale/uk";
import LineChartMoney from "../../components/charts/one-device-state/LineCharts/LineChartMoney";
import StatElement from "../../components/stat/Stat";
import TopCardHome from "../../components/cards/HomeTopCard/TopCardHome";
import { FcBullish, FcCurrencyExchange, FcMoneyTransfer, FcPaid } from "react-icons/fc";
import CardWithChart from "../../components/cards/CardWithChart/CardWithChart";
import { chartColorsEnum } from "../../contants/chartColors";
import { fakeDataIncomeLittle, fakeDataLiters, fakeDataSessions } from './../../contants/fakeChartData';
import { hiddenScroll } from './../../lib/transparentThumbScroll';
const Home = () => {
  const { userInfo } = useSelector((state) => state.auth.data);
  const { colorMode } = useColorMode();
  const [deviceLog, setDeviceLog] = useState([]);
  const data = [
    {
      "name": "Page A",
      "date": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "date": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "date": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "date": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "date": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "date": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "date": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

  // useEffect(() => {
  //   const getOneDeviceLog = async (id) => {
  //     try {
  //       const data = await $api.post(`/mainlog/device/${id}`);

  //       console.log(data);
  //       setDeviceLog(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getOneDeviceLog(3242);
  // }, []);
  if (!userInfo) {
    return null;
  }

  return (
    <Flex flexDir={'column'} margin={'0 auto'} width={"100%"} height={"90vh"}  overflow={'scroll'} overflowX={'auto'}   sx={ {
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        background: "transparent",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "transparent",
      },
    }}      p={5}>
      {/* 4 карточки на основній сторінці */}
<Grid  gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)','repeat(2, 1fr)', 'repeat(4, 1fr)']} width={'100%'} margin={'0 auto'} gap={'20px'} flexWrap={'wrap'}>
  <TopCardHome data={`${100}`}  updateTime={'29.09 19:41:19'} text={'Сеансів за сьогодні'} icon = { <FcPaid size={36}/>}/>
  <TopCardHome data={`${3232} л`} updateTime={'29.09 19:41:19'} text={'Літрів за сьогодні'}  icon = { <FcBullish size={36}/>}/>
  <TopCardHome spending={true} data={`${3223} грн`} updateTime={'29.09 19:41:19'} text={'Витрати за сьогодні'}  icon = { <FcMoneyTransfer style={{color:'red',fill:'red',fontSize:'50px'}} fill={'yellow'} color={'yellow'} size={36}/>}/>
  <TopCardHome income={true} data={`${3232} грн`} updateTime={'29.09 19:41:19'} text={'Дохід за сьогодні'}  icon = { <FcCurrencyExchange size={36}/>}/>
</Grid>

{/* Графік доходу за місяць -- Великий */}
      <Flex  margin={'0 auto'} marginTop={'40px'} width={'100%'} height={'200px'} flexDir={"column"}>
        <StatElement label={'Дохідність за цей місяць'}/>
        <LineChartMoney  chartColor={chartColorsEnum.income} chartLabel={'Дохід'}  />
      </Flex>



{/* Графіки нижні */}

<Grid  gridTemplateColumns={['repeat(1, 1fr)','repeat(2, 1fr)', 'repeat(2, 1fr)','repeat(3, 1fr)']} width={'100%'} margin={'0 auto'}  marginTop={'140px'} gap={'20px'} flexWrap={'wrap'}>
  <CardWithChart  chartLabel={'Дохід'} chartColor={chartColorsEnum.income} data={`${100}`}  updateTime={'29.09 19:41:19'} text={'Сеансів за сьогодні'} icon = { <FcPaid size={36}/>}/>
  <CardWithChart  chartLabel={'Літрів'}  chartColor={chartColorsEnum.liters} data={`${3232} л`} updateTime={'29.09 19:41:19'} text={'Літрів за сьогодні'}  icon = { <FcBullish size={36}/>}/>
  <CardWithChart  chartLabel={'Сеансів'}  chartColor={chartColorsEnum.session} spending={true} data={`${3223} грн`} updateTime={'29.09 19:41:19'} text={'Витрати за сьогодні'}  icon = { <FcMoneyTransfer style={{color:'red',fill:'red',fontSize:'50px'}} fill={'yellow'} color={'yellow'} size={36}/>}/>
  
</Grid>




    </Flex>
  );
};

export default Home;
