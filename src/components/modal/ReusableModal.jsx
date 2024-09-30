import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ReusableModal = ({isOpen,onOpen,onClose,title,children}) => {
  return (
   <>
   
   <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent display={'flex'} flexDir={'column'} padding={'10px'}>
          <ModalHeader>{title ? title : null}</ModalHeader>
          <ModalCloseButton />
            {children}
        </ModalContent>
      </Modal>
   </>
  )
}

export default ReusableModal