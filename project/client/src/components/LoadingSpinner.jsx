import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Flex align="center" justify="center" height="100vh" position="fixed" top="0" left="0" width="100%" backdropFilter="blur(5px)" zIndex="999">
      <Spinner size="xl" color="teal" />
    </Flex>
  );
};

export default LoadingSpinner;
