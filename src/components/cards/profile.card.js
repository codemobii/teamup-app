import { IconButton } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/input';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';

export default function ProfileCard(props) {
  const [value, setValue] = useState(props.label);
  const data = props.data;

  return (
    <FormControl isRequired>
      <FormLabel>{data}</FormLabel>
      <InputGroup size="lg" bg="white">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={props.icon}
        />
        <Input
          placeholder=""
          type={props.type}
          onChange={e => setValue(e.target.value)}
          defaultValue={props.label}
          autoComplete={false}
          isReadOnly={props.type === 'email' || props.type === 'password'}
        />

        {data === 'fullname' && (
          <Tooltip hasArrow rounded="md" label={'Edit'} placement="bottom">
            <InputRightElement>
              <IconButton
                rounded="full"
                variant="ghost"
                isLoading={props.loading}
                onClick={() => {
                  if (value !== props.label) {
                    props.updateUser({
                      fullname: props.data === 'fullname' && value,
                      // email: props.data === 'email' && value,
                      password: props.data === 'password' && value,
                    });
                  }
                }}
                icon={<BsPencil size="18px" />}
              />
            </InputRightElement>
          </Tooltip>
        )}
      </InputGroup>
    </FormControl>
  );
}
