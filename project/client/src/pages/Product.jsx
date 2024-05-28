import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Flex, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { fetchProducts, addProduct, deleteProduct, updateProduct, fetchProductById } from '../api/product';
import LoadingSpinner from '../components/LoadingSpinner';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProductList = async () => {
    try {
      const productList = await fetchProducts();
      setProducts(productList.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData);
      fetchProductList();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (productId, updatedProductData) => {
    try {
      await updateProduct(productId, updatedProductData);
      fetchProductList();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProductList();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId);
    setIsEditProductModalOpen(true);
  };

  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleCloseEditProductModal = () => {
    setIsEditProductModalOpen(false);
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px">
      <Heading as="h2" size="lg" textAlign="center">Products</Heading>
      <Button onClick={() => setIsAddProductModalOpen(true)} colorScheme="teal" mt={4}>Add Product</Button>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box>
          {products.map(product => (
            <Box key={product.id} p={4} borderWidth="1px" borderRadius="md" mt={4}>
              <Flex align="center" justify="space-between">
                <Heading as="h3" size="md">{product.name}</Heading>
                <Flex>
                  <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit"
                    colorScheme="teal"
                    size="sm"
                    mr={2}
                    onClick={() => handleEditProduct(product.id)}
                  />
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete"
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </Flex>
              </Flex>
              <Text mt={2}><strong>Price:</strong> ${product.price}</Text>
              <Text mt={2}><strong>Stock:</strong> ${product.stock}</Text>
              <Text mt={2}><strong>Description:</strong> {product.description}</Text>
            </Box>
          ))}
        </Box>
      )}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={handleCloseAddProductModal}
        onSubmit={handleAddProduct}
        onUpdateProducts={fetchProductList}
      />
      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={handleCloseEditProductModal}
        productId={selectedProductId}
        onUpdateProducts={fetchProductList}
      />
    </Box>
  );
};

export default Products;
