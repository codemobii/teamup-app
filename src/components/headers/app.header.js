import { IconButton } from '@chakra-ui/button';
import { Center, Container } from '@chakra-ui/layout';
import { HStack } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import { Spacer } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { useContext } from 'react';
import { BsAwardFill, BsBell, BsHouseDoor, BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BellContext } from '../layouts/app.layout';

export default function AppHeader() {
  const rings = useContext(BellContext);

  return (
    <Box pos="fixed" top="0" left="0" zIndex="100" bg="twitter.500" w="100%">
      <Container maxW="container.md">
        <Flex align="center" h="60px" color="white">
          <Link to="/">
            <HStack align="center">
              <BsAwardFill size="25px" />
              <Heading fontSize="3xl" fontWeight="medium">
                TeamUp
              </Heading>
            </HStack>
          </Link>

          <Spacer />

          <HStack mr="-8px" align="center">
            {links.map(link => (
              <Link to={link.href}>
                <Tooltip
                  hasArrow
                  rounded="md"
                  label={link.label}
                  placement="bottom"
                  position="relative"
                >
                  <Flex pos="relative">
                    <IconButton
                      rounded="full"
                      variant="ghost"
                      aria-label={link.label}
                      colorScheme="blackAlpha"
                      icon={link.icon}
                    />
                    {link.hasInfo && rings.rings !== 0 && (
                      <Center
                        rounded="full"
                        pos="absolute"
                        right="0"
                        w="25px"
                        h="25px"
                        bg="red"
                        color="white"
                      >
                        {rings.rings}
                      </Center>
                    )}
                  </Flex>
                </Tooltip>
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

const links = [
  {
    label: 'Home',
    icon: <BsHouseDoor color="white" size="24px" />,
    href: '/',
    hasInfo: false,
  },
  {
    label: 'Notifications',
    icon: <BsBell color="white" size="24px" />,
    href: '/bells',
    hasInfo: true,
  },
  {
    label: 'Profile',
    icon: <BsPerson color="white" size="24px" />,
    href: '/me',
    hasInfo: false,
  },
];
