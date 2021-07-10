import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Center, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React, { useEffect, useState } from 'react';
import { BsAt, BsLock, BsPerson, BsPlus } from 'react-icons/bs';
import ProfileCard from '../../components/cards/profile.card';
import AppLayout from '../../components/layouts/app.layout';
import AuthUtils from '../../utils/auth.utils';
import UserUtils from '../../utils/user.utils';

export default function ProfileApp() {
  const [showInput, setShowInput] = useState(false);

  const {
    _loading,
    user,
    uploading,
    handleProfilePicUpdate,
    getUser,
    updateUser,
  } = UserUtils();

  const { loading, handleLogout } = AuthUtils();

  useEffect(() => {
    getUser();
  }, []);

  const profileCards = [
    {
      label: user.fullname,
      icon: <BsPerson size="24px" />,
      type: 'text',
      data: 'fullname',
    },
    {
      label: user.email,
      icon: <BsAt size="24px" />,
      type: 'email',
      data: 'email',
    },
    // {
    //   label: user.password,
    //   icon: <BsLock size="24px" />,
    //   type: 'password',
    //   data: 'password',
    // },
  ];

  return (
    <AppLayout title="Profile">
      <Stack spacing="50px">
        <Center>
          <Avatar
            name={user.fullname}
            src={user.profilePic}
            pos="relative"
            size="2xl"
            cursor="pointer"
            onMouseOver={() => setShowInput(true)}
            onMouseOut={() => setShowInput(false)}
          >
            <Center
              pos="absolute"
              w="100%"
              h="100%"
              bg="rgba(0,0,0,0.8)"
              rounded="full"
              cursor="pointer"
              overflow="hidden"
              opacity={showInput ? '1' : uploading ? '1' : '0'}
              transition="all 0.3s ease"
            >
              {uploading ? (
                <Spinner color="white" />
              ) : (
                <BsPlus
                  size="38px"
                  color="white"
                  style={{ position: 'absolute' }}
                />
              )}
              <input
                id="imageFile"
                type="file"
                onChange={handleProfilePicUpdate}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '300px',
                  opacity: 1,
                  cursor: 'pointer',
                  bottom: 0,
                }}
              />
            </Center>
          </Avatar>
        </Center>
        <Stack spacing="20px">
          {profileCards.map(e => (
            <ProfileCard
              type={e.type}
              label={e.label}
              icon={e.icon}
              updateUser={updateUser}
              data={e.data}
              loading={_loading}
            />
          ))}
        </Stack>
        <Button
          onClick={handleLogout}
          isLoading={loading}
          size="lg"
          colorScheme="red"
          variant="ghost"
          rounded="full"
        >
          Sign Out
        </Button>
      </Stack>
    </AppLayout>
  );
}
