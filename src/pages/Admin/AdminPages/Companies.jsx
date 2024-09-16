import { Button, ButtonGroup, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import $api from '../../../http';
import { GrMoney } from "react-icons/gr";
const Companies = () => {
    const [companies,setCompanies] = useState([])
    const [search,setSearch] = useState('')
    const getAllCompanies = async ()=>{
        try {
            const {data} = await $api.get('/company/companies');
            console.log(data);
            setCompanies(data)
            
        } catch (error) {
            console.log(error);
            
        }
    }


const handleSearch = async (e)=>{
    const value = e.target.value
    setSearch(value)
 
try {
    if (value.length > 2) {
        const {data} = await $api.post('/company/companies-search',{searchValue:search})

        console.log(data);
        
    }
} catch (error) {
    console.log(error);
    
}
}


    useEffect(()=>{
        getAllCompanies()
    },[])

  return (
    <Flex marginTop={10} flexDir="column" gap={3}>
      <Input onChange={handleSearch} value={search} type="text" placeholder="Пошук за email" />
      {companies &&
        companies.filter(item => item).sort((a,b) => a.id - b.id).map((item, idx) => {
          return (
            <Flex
              key={idx}
              flexDir={["column", "column", "row"]}
              justifyContent={"space-between"}
              textAlign={"left"}
              alignItems={"flex-start"}
            >
              <Text width={["100%", "100%", "300px"]}>{item.type} {item.company_name}</Text>
              <Text width={["100%", "100%", "300px"]}>{item.director_surname} {item.director_name} {item.director_last_name}</Text>
              <Text width={["100%", "100%", "300px"]}>{item.phone_number}</Text>
              <Text width={["100%", "100%", "300px"]}>{item.balance === null ? <GrMoney color='red'/> :<Text display={'flex'} gap={'10px'} alignItems={'center'}> <GrMoney color='green'/>{item.balance}</Text> }</Text>

              <ButtonGroup onClick={() => alert(item.id)} size="sm" isAttached variant="outline">
                <Button>Редагувати</Button>
                <IconButton icon={<CiEdit />} />
              </ButtonGroup>
            </Flex>
          );
        })}
    </Flex>
  )
}

export default Companies