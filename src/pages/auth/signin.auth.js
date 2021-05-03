import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, HStack, Spacer, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/auth.layout';
import AuthUtils from '../../utils/auth.utils';

export default function SignInAuth() {
  // State managers
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //
  const { handleLogin, loading } = AuthUtils();

  const data = {
    email: email,
    password: password,
  };

  return (
    <AuthLayout title="Sign In" desc="Welcome back, Teamup missed you">
      <Stack spacing="20px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="john@doe.com"
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <Flex>
            <FormLabel>Password</FormLabel>
            <Spacer />
            <Link to="/auth/forgot-password">
              <Text color="twitter.500" as="a">
                Forgot password
              </Text>
            </Link>
          </Flex>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
        </FormControl>
        <Button
          isLoading={loading}
          type="submit"
          rounded="full"
          size="lg"
          colorScheme="twitter"
          onClick={() => handleLogin(data)}
        >
          Continue
        </Button>
        <HStack justify="center">
          <Text>No account yet?</Text>
          <Link to="/auth/signup">
            <Text color="twitter.500" as="a">
              Sign up
            </Text>
          </Link>
        </HStack>
      </Stack>
    </AuthLayout>
  );
}
