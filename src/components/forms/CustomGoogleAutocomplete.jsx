import React, { useState, useRef } from 'react';
import {
    Input,
    FormControl,
    FormLabel,
    Box,
    List,
    ListItem,
    Spinner,
    useOutsideClick,
} from '@chakra-ui/react';
import axios from 'axios';

const CustomAutocompleteInput = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const refContainer = useRef();

    useOutsideClick({
        ref: refContainer,
        handler: () => setShowSuggestions(false),
    });

    const handleChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.length > 0);
        
        if (value.length > 2) { // Start fetching suggestions after 2 characters
            setLoading(true);
            try {
                // const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
                //     params: {
                //         input: value,
                //         key: process.env.REACT_APP_GOOGLE_API_KEY, // Replace with your API key
                //         types: 'address', // or 'establishment' for businesses
                //     },
                // });
                const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
                    params: {
                        input: value,
                        key: process.env.REACT_APP_GOOGLE_API_KEY,
                        types: 'address',
                    },
                });
                setSuggestions(response.data.predictions);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (suggestion) => {
        setInputValue(suggestion.description);
        setShowSuggestions(false);
        // You can extract lat/lng here if needed
    };

    return (
        <FormControl>
            <FormLabel htmlFor="autocomplete">Пошук адреси</FormLabel>
            <Box ref={refContainer}>
                <Input
                    id="autocomplete"
                    placeholder="Type a location or street"
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
                                onClick={() => handleSelect(suggestion)}
                            >
                                {suggestion.description}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </FormControl>
    );
};

export default CustomAutocompleteInput;