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
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { TagsInput } from 'react-tag-input-component';
import CardUtils from '../../utils/card.utils';

export default function AddMembersModal({
  isOpen = false,
  onClose = () => {},
}) {
  const [selected, setSelected] = useState([]);

  const user = Cookies.get('id');
  const cancelRef = React.useRef();
  const { id } = useParams();

  const data = {
    card: id,
    sender: user,
    recievers: selected.toString(),
  };

  const { inviteMembers, inviting } = CardUtils();

  return (
    <Modal leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new member(s)</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="20px">
            <FormControl id="first-name" isRequired>
              <FormLabel>Invite members</FormLabel>
              <TagsInput
                value={selected}
                onChange={setSelected}
                name="fruits"
                placeHolder="Enter email"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            variant="ghost"
            mr={3}
            ref={cancelRef}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            isLoading={inviting}
            onClick={() =>
              inviteMembers(data).then(() => {
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
