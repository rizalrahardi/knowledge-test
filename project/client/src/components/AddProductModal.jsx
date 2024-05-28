import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { addProduct } from '../api/product';

const AddProductModal = ({ isOpen, onClose, onUpdateProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const productData = { name, price, stock, description };
      await addProduct(productData);
      toast({
        title: 'Product added.',
        description: 'New product has been successfully added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onUpdateProducts();
      // Reset form fields
      setName('');
      setPrice('');
      setStock('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: 'Error adding product.',
        description: error.message || 'An error occurred while adding product.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Stock</FormLabel>
            <Input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
