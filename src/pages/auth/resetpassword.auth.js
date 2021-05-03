import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { SimpleGrid, Stack } from '@chakra-ui/layout';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/auth.layout';
import AuthUtils from '../../utils/auth.utils';

export default function ResetPasswordAuth() {
  const { handleResetPassword, loading } = AuthUtils();
  const email = Cookies.get('email');

  // The state managers
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const data = {
    resetCode: parseFloat(code),
    password: password,
  };

  return (
    <AuthLayout
      desc={`Enter the 6-digit code sent to ${email}`}
      title="Reset Password"
    >
      <form>
        <Stack spacing="20px">
          <FormControl id="otp" isRequired>
            <FormLabel>6 digit code</FormLabel>
            <SimpleGrid columns={6} spacing="10px" justify="center">
              <PinInput size="lg" otp value={code} onChange={e => setCode(e)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </SimpleGrid>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>New password</FormLabel>
            <Input
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
          <Button
            isLoading={loading}
            onClick={() => handleResetPassword(data)}
            rounded="full"
            size="lg"
            colorScheme="twitter"
          >
            Continue
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
