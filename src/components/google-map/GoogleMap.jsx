import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { GoogleMap, useLoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import { useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import MarkerItem from './MarkerItem';

const GoogleMapComponent = ({devices}) => {
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

    // Initial map center coordinates
    const center = {
        lat: 50.4501, // Kyiv, Ukraine
        lng: 30.5234,
      };
  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // Add your API key here
  });

  if (loadError) return <Box>Error loading maps</Box>;
  if (!isLoaded) return <Box>Loading Maps...</Box>;

  return (
    <Box>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
      >
        {/* Add markers or other map elements */}

        {devices && devices.map((item,idx) =>{
       
            return    <MarkerItem item={item}/>
        })}
     




      </GoogleMap>
    </Box>
  );
}

export default GoogleMapComponent