import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { updateProduct, fetchProductById } from '../api/product';

const EditProductModal = ({ isOpen, onClose, productId, onUpdateProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        const product = await fetchProductById(productId);
        const { data } = product
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setDescription(data.description);
      }
    };

    loadProduct();
  }, [productId]);

  const handleSubmit = async () => {
    try {
      const updatedProductData = { name, price, stock, description };
      await updateProduct(productId, updatedProductData);
      toast({
        title: 'Product updated.',
        description: 'The product has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onUpdateProducts();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Error updating product.',
        description: error.message || 'An error occurred while updating product.',
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
        <ModalHeader>Edit Product</ModalHeader>
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

export default EditProductModal;
