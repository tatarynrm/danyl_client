import { Flex } from '@chakra-ui/react'
import { APIProvider, Map, MapProps } from "@vis.gl/react-google-maps";
import GoogleMap from '../../components/google-map/GoogleMap';
import GoogleMapComponent from '../../components/google-map/GoogleMap';
import $api from '../../http';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Places = () => {
    const userData = useSelector((state) => state.auth.data);
    const [devices,setDevices]= useState([])
    const getAllDevicesCompany = async ()=>{
        try {

          if (userData?.userInfo?.company_id) {
            const data = await $api.post('/devices/allDevices',{company_id:userData?.userInfo?.company_id});
           if (data.status === 200) {
            setDevices(data.data)
           }
            
          }
           
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
getAllDevicesCompany()
    },[userData])
  return (
 <Flex flexDir={'column'} margin={'0 auto'} width={"98%"} height={"90vh"}  overflow={'scroll'} overflowX={'auto'}   sx={ {
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

  <GoogleMapComponent devices={devices}/>
 </Flex>
  )
}

export default Places