import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';
import { updateProfile } from '../api/profile';

const EditProfileModal = ({ isOpen, onClose, profile, onUpdateProfile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setGender(profile.gender);
    }
  }, [profile]);

  const handleSubmit = async () => {
    try {
      const updatedProfileData = { name, email, gender };
      await updateProfile(updatedProfileData);
      toast({
        title: 'Profile updated.',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onUpdateProfile(updatedProfileData);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile.',
        description: error.message || 'An error occurred while updating profile.',
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
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Gender</FormLabel>
            <Select placeholder="Select gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
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

export default EditProfileModal;
