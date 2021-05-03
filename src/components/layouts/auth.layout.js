import { Container } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/layout';
import { VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import React from 'react';

export default function AuthLayout({ children, title = '', desc = '' }) {
  return (
    <Box bg="gray.50">
      <Container maxW="lg">
        <Center minH="100vh">
          <Stack
            w="100%"
            spacing="30px"
            p="50px 30px"
            bg="white"
            rounded="md"
            border="1px"
            borderColor="gray.200"
          >
            <VStack textAlign="center" px="30px">
              <Heading fontSize="3xl">{title}</Heading>
              <Text color="gray.500">{desc}</Text>
            </VStack>
            {children}
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
