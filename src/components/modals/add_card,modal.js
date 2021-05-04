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
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

export default function AddCardModal({
  isOpen = false,
  onClose = () => {},
  addCard = () => {},
  loading,
}) {
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState('');
  const cancelRef = React.useRef();

  const id = Cookies.get('id');

  const data = {
    title: title,
    user: id,
    manager: id,
    emails: selected,
    // members: [id],
  };

  return (
    <Modal isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new card</ModalHeader>
        <ModalCloseButton rounded="full" />
        <ModalBody>
          <Stack spacing="20px">
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
              />
            </FormControl>

            <FormControl id="first-name">
              <FormLabel>Invite members</FormLabel>
              <TagsInput
                value={selected}
                onChange={setSelected}
                name="fruits"
                placeHolder="Type email and hit enter to select"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            ref={cancelRef}
            colorScheme="red"
            variant="ghost"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            isLoading={loading}
            onClick={() =>
              addCard(data).then(() => {
                setTitle('');
                setSelected([]);
              })
            }
            colorScheme="twitter"
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
