import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, HStack, Spacer, Stack, Text } from '@chakra-ui/layout';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import React from 'react';
import { Link } from 'react-router-dom';

export default function VerifyAuth() {
  return (
    <form>
      <Stack spacing="20px">
        <FormControl id="first-name" isRequired>
          <HStack justify="center">
            <PinInput size="lg" otp>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </FormControl>
        <Button rounded="full" size="lg" colorScheme="twitter">
          Continue
        </Button>
        <HStack justify="center">
          <Link to="/auth/signup">
            <Text color="twitter.500" as="a">
              Resend Code
            </Text>
          </Link>
        </HStack>
      </Stack>
    </form>
  );
}
