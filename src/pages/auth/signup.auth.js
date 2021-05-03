import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/auth.layout';
import AuthUtils from '../../utils/auth.utils';

export default function SignUpAuth() {
  const { handleRegister, loading } = AuthUtils();

  // State managers
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Pass the data to the controller
  const data = {
    fullname: fullname,
    email: email,
    password: password,
  };

  return (
    <AuthLayout
      title="Sign Up"
      desc="TeamUp helps small remote teams manage tasks easily and effectively."
    >
      <form>
        <Stack spacing="20px">
          <FormControl id="fullname" isRequired>
            <FormLabel>Fullname</FormLabel>
            <Input
              placeholder="John doe"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="john@doe.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
          <Button
            isLoading={loading}
            onClick={() => handleRegister(data)}
            rounded="full"
            size="lg"
            colorScheme="twitter"
          >
            Continue
          </Button>
          <HStack justify="center">
            <Text>Already have an account?</Text>
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
