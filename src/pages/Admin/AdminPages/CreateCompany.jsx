import { Flex } from '@chakra-ui/react'
import React from 'react'
import CompanyCreateForm from '../../../components/forms/CompanyCreateForm'

const CreateCompany = () => {
    return (
        <Flex marginTop={10} flexDir="column">

            <CompanyCreateForm />


        </Flex>
    )
}

export default CreateCompany