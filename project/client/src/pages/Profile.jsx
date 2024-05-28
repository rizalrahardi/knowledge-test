import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { fetchProfile } from '../api/profile';
import LoadingSpinner from '../components/LoadingSpinner';
import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await fetchProfile();
        setProfile(userProfile.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = (updatedProfileData) => {
    setProfile(updatedProfileData);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px">
      <Heading as="h2" size="lg" textAlign="center">Profile</Heading>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text mt={4}><strong>Name:</strong> {profile.name}</Text>
          <Text mt={2}><strong>Email:</strong> {profile.email}</Text>
          <Text mt={2}><strong>Gender:</strong> {profile.gender}</Text>
          <Button onClick={() => setIsEditProfileModalOpen(true)} colorScheme="teal" mt={4}>Edit Profile</Button>
        </>
      )}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEditProfileModal}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />
    </Box>
  );
};

export default Profile;
