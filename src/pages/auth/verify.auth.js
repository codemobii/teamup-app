import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { HStack, Stack } from '@chakra-ui/layout';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/auth.layout';
import AuthUtils from '../../utils/auth.utils';

export default function VerifyAuth() {
  const email = Cookies.get('email');

  const { loading, handleVerify } = AuthUtils();
  const toast = useToast();

  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const data = {
    resetCode: parseFloat(code),
  };

  const resendCode = async () => {
    if (!email) {
      setSending(true);
      await axios({
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          host: '104.236.174.88',
          port: 3128,
        },
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}sendCode`,
        data: {
          email: 'colourjim@gmail.com',
        },
      })
        .then(() => {
          toast({
            title: 'Success',
            description: `Code sent to ${email}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setSent(true);
        })
        .finally(() => {
          setSending(false);
        });
    }
  };

  return (
    <AuthLayout
      desc={`Enter the 6-digit code sent to ${email}`}
      title="Verify Account"
    >
      <form>
        <Stack spacing="20px">
          <FormControl id="first-name" isRequired>
            <HStack justify="center">
              <PinInput size="lg" otp value={code} onChange={e => setCode(e)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </FormControl>
          <Button
            isLoading={loading}
            onClick={() => handleVerify(data)}
            rounded="full"
            size="lg"
            colorScheme="twitter"
          >
            Continue
          </Button>
          <HStack justify="center">
            <Button
              size="sm"
              fontWeight="normal"
              variant="ghost"
              colorScheme="twitter"
              isLoading={sending}
              disabled={sent}
              onClick={resendCode}
            >
              Resend Code
            </Button>
          </HStack>
        </Stack>
      </form>
    </AuthLayout>
  );
}
