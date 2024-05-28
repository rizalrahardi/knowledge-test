import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box maxW="xl" mx="auto" mt={10} p={5}>
      <VStack spacing={6}>
        <Heading as="h1" size="xl">Welcome to Our Website</Heading>
        <Text fontSize="lg" align={'center'}>
          This is a simple homepage created with Chakra UI. You can navigate to different pages using the navbar buttons.
        </Text>
      </VStack>
    </Box>
  );
};

export default HomePage;
