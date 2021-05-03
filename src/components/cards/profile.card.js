import { IconButton } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Center, Flex, HStack, Spacer } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';

export default function ProfileCard(props) {
  const [value, setValue] = useState(props.label);
  const data = props.data;

  return (
    <Flex
      w="100%"
      bg="white"
      border="1px"
      borderColor="gray.200"
      rounded="md"
      align="center"
      p="20px"
    >
      <HStack w="100%" pr="20px">
        <Center
          w="40px"
          h="40px"
          rounded="full"
          color="twitter.500"
          bg="twitter.100"
        >
          {props.icon}
        </Center>
        <Input
          type={props.type}
          variant="flushed"
          onChange={e => setValue(e.target.value)}
          defaultValue={props.label}
          autoComplete={false}
          isReadOnly={props.type === 'email' || 'password'}
        />
      </HStack>

      <Spacer />

      <IconButton
        isLoading={props.loading}
        onClick={() => {
          if (value !== props.label) {
            props.updateUser({
              fullname: props.data === 'fullname' && value,
              email: props.data === 'email' && value,
              password: props.data === 'password' && value,
            });
          }
        }}
        icon={<BsPencil />}
        variant="ghost"
        rounded="full"
      />
    </Flex>
  );
}
