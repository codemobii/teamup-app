import { Box, Center, HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { BsBellFill } from 'react-icons/bs';
import TimeAgo from 'react-timeago';
import Linkify from 'react-linkify';

export default function NotificationCard({ bell = {} }) {
  return (
    <HStack
      w="100%"
      bg="white"
      border="1px"
      borderColor="gray.200"
      rounded="md"
      p="20px"
      align="flex-start"
    >
      <Box w="10%" d={{ base: 'none', md: 'block' }}>
        <Center
          w="40px"
          h="40px"
          rounded="full"
          color="twitter.500"
          bg="twitter.100"
        >
          <BsBellFill />
        </Center>
      </Box>
      <Box w="90%">
        <Stack spacing="1">
          <Text>
            <Linkify>{bell.text}</Linkify>
          </Text>
          <Text fontSize="xs" color="gray.400">
            <TimeAgo date={bell.createdAt} />
          </Text>
        </Stack>
      </Box>
    </HStack>
  );
}
