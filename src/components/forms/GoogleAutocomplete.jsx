import React, { useEffect, useState } from 'react';
import {
    Input,
    FormControl,
    FormLabel,
    Box,
    List,
    ListItem,
    Spinner,
    useOutsideClick,
    Button,
} from '@chakra-ui/react';
import { usePlacesWidget } from 'react-google-autocomplete';
import $api from '../../http';
const GoogleAutocomplete = ({code}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [cords,setCords] = useState(null)

const handleChangeLocation = async ()=>{

    const obj = {
        location:cords.location,
        lat:cords.lat,
        lon:cords.lon,
        code
    }
    try {
        const data = await $api.post('/devices/change-location',obj);
       
        if (data.status === 200) {
            
            alert('Ви успішно змінили адресу')
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

    const { ref } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY, // Replace with your API key
        onPlaceSelected: (place) => {
            const lat = place.geometry.location.lat();
            const lon = place.geometry.location.lng();
            console.log('Selected Place:', place.formatted_address);
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);
            setCords({
                location:place.formatted_address,
                lat,
                lon
            })
            setInputValue(place.formatted_address); // Use formatted_address for display
            setShowSuggestions(false);

       
        },
        options: {
            types: ['address'],
        },
    });

    // Handle input change and fetch suggestions
    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.length > 0);
        // Fetch suggestions manually if needed
        setLoading(true);
        setSuggestions([]); // Clear previous suggestions

        // Using Google Places API directly (this would require implementing fetch logic)
        // fetchSuggestions(value);
        // After fetching, set the suggestions and loading state
        setLoading(false);
    };

    // Handle outside click to close suggestions
    const refContainer = React.useRef();
    useOutsideClick({
        ref: refContainer,
        handler: () => setShowSuggestions(false),
    });

    return (
        <FormControl width={'30%'}>
            <FormLabel htmlFor="autocomplete">Пошук адреси</FormLabel>
            <Box ref={refContainer}>
                <Input
                    id="autocomplete"
                    ref={ref}
                    placeholder="Вулиця №, місто"
                    variant="filled"
                    value={inputValue}
                    onChange={handleChange}
                />
                {loading && <Spinner size="sm" />}
                {showSuggestions && suggestions.length > 0 && (
                    <List spacing={1} borderWidth="1px" borderColor="gray.200" mt={1} borderRadius="md" boxShadow="md">
                        {suggestions.map((suggestion, index) => (
                            <ListItem
                                key={index}
                                p={2}
                                bg="white"
                                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                                onClick={() => {
                                    setInputValue(suggestion.description);
                                    setShowSuggestions(false); // Close dropdown
                                }}
                            >
                                {suggestion.description}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>

{cords && <Button onClick={handleChangeLocation}>Змінити розташування</Button>}

        </FormControl>
    );
};

export default GoogleAutocomplete;