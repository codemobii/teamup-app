import { Stack } from '@chakra-ui/layout';
import { HStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { BsClock, BsDot, BsPeople } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

export default function ItemCard({ card }) {
  return (
    <Link to={`/cards/${card && card._id}`}>
      <Box
        w="100%"
        bg="white"
        border="1px"
        borderColor="gray.200"
        rounded="md"
        p="20px"
      >
        <Stack>
          <Text fontSize="lg" fontWeight="medium">
            {card && card.title}
          </Text>
          <HStack lineHeight="1">
            <Text d="flex" color="gray.500" align="center">
              <BsPeople />{' '}
              <Text ml="10px">
                {card.members && card.members.length} Members
              </Text>
            </Text>
            <BsDot />
            <Text d="flex" color="gray.500" align="center">
              <BsClock />
              <Text ml="10px">{card && <TimeAgo date={card.createdAt} />}</Text>
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Link>
  );
}
