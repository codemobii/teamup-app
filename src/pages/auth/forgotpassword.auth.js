import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/auth.layout';
import AuthUtils from '../../utils/auth.utils';

export default function ForgotPAsswordAuth() {
  const { handleForgotPassword, loading } = AuthUtils();

  // The state managers
  const [email, setEmail] = useState('');

  const data = {
    email: email,
  };
  return (
    <AuthLayout
      title="Forgot Password"
      desc="Please enter the email you used during signup to reset your password"
    >
      <form>
        <Stack spacing="20px">
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="john@doe.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <Button
            isLoading={loading}
            onClick={() => handleForgotPassword(data)}
            rounded="full"
            size="lg"
            colorScheme="twitter"
          >
            Continue
          </Button>
          <HStack justify="center">
            <Text>Go back to</Text>
            <Link to="/auth/signin">
              <Text color="twitter.500" as="a">
                Sign in
              </Text>
            </Link>
          </HStack>
        </Stack>
      </form>
    </AuthLayout>
  );
}
