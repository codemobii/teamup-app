import { Button } from '@chakra-ui/button';
import { Flex, Heading, Spacer, Stack } from '@chakra-ui/layout';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

export default function ContentCard({
  children,
  title = 'Title',
  button = false,
}) {
  return (
    <Stack spacing="50px">
      <Stack spacing="20px">
        <Flex align="center">
          <Heading fontSize="xl" fontWeight="medium">
            {title}
          </Heading>

          <Spacer />

          {button}
        </Flex>

        {children}
      </Stack>
    </Stack>
  );
}
