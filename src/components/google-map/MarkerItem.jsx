import { Box, Text } from '@chakra-ui/react';
import { GoogleMap, useLoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import { useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useState } from 'react';
const MarkerItem = ({item}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [selectedMarker, setSelectedMarker] = useState(null); //
  return (
    <>
    

    <Marker
   

    position={{
        lat: parseFloat(item?.lat),
        lng: parseFloat(item?.lon)
      }}
    onClick={() => {
      setSelectedMarker({
        lat: parseFloat(item?.lat),
        lng: parseFloat(item?.lon)
    }); // Set marker as selected when clicked

    setInfowindowOpen(true)
    }}
  />

  {infowindowOpen && (
    <InfoWindow
    ref={markerRef}
    options={{ disableAutoPan: true }} 
      position={selectedMarker}
      onCloseClick={() => {
        setSelectedMarker(null); 
        setInfowindowOpen(false)
      }}
    >
      <Box>
        <Text color={'red'}>Kyiv, Ukraine</Text>
        <Text color={'red'}>The capital city of Ukraine.</Text>
      
      </Box>
    </InfoWindow>
  )} 

</>
  )
}

export default MarkerItem