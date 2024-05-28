import React from 'react';
import { Box, Flex, HStack, IconButton, Button, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.svg'
const Links = ['Profile', 'Product'];

const NavLink = ({ children }) => (
  <Button
    as={Link}
    to={`/${children.toLowerCase()}`}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}>
    {children}
  </Button>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} mx="auto" maxW="1500px">
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box onClick={() => navigate('/')} cursor={'pointer'}>
            <img src={logo} alt="logo" width="50px" />
          </Box>
          {token && (
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          )}
        </HStack>
        {!token && (
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button
              variant={'outline'}
              colorScheme={'teal'}
              size={'sm'}
              onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </Flex>
        )}
        {token && (
          <Button
            variant={'solid'}
            colorScheme={'red'}
            size={'sm'}
            onClick={logout}>
            Logout
          </Button>
        )}
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;
