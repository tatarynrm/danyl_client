import React, { useState, useCallback } from 'react';
import { Input, Button, Box, useToast, List, ListItem, ListIcon } from '@chakra-ui/react';
import axios from 'axios';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places']; // Ensure Places library is included

const LocationAutocomplete = ({ onLocationChange }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const toast = useToast();

  const handlePlaceSelect = async (place) => {
    try {
      const location = place.geometry.location;
      onLocationChange({ lat: location.lat(), lng: location.lng() });
      console.log('LOCATION',location);
      

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to fetch location.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSearch = async () => {
    if (!address) {
      toast({
        title: 'Error',
        description: 'Please enter an address.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(address)}&key=AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek`
      );
      setSuggestions(response.data.results);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to fetch suggestions.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <LoadScript googleMapsApiKey="AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek" libraries={libraries}>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              handlePlaceSelect(place);
            });
          }}
        >
          <Input
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            mb={2}
          />
        </Autocomplete>
      </LoadScript>
      <Button onClick={handleSearch}>Search</Button>
      {suggestions.length > 0 && (
        <List mt={2} borderWidth="1px" borderRadius="md" padding={2}>
          {suggestions.map((suggestion) => (
            <ListItem key={suggestion.place_id} onClick={() => handlePlaceSelect(suggestion)}>
              <ListIcon  />
              {suggestion.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default LocationAutocomplete;