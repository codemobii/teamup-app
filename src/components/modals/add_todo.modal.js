import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

export default function AddTodoModal({
  isOpen = false,
  onClose = () => {},
  addTodo = () => {},
  loading,
  card,
}) {
  const [text, setText] = useState('');
  const id = Cookies.get('id');
  const cancelRef = React.useRef();

  const data = {
    text: text,
    user: id,
    card: card,
  };

  return (
    <Modal isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="20px">
            <FormControl id="first-name" isRequired>
              <FormLabel>Todo Description</FormLabel>
              <Textarea
                placeholder="What do you want to get done?"
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            ref={cancelRef}
            variant="ghost"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            isLoading={loading}
            onClick={() => {
              addTodo(data).then(() => {
                setText('');
              });
            }}
            colorScheme="twitter"
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
