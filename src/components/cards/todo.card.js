import { Checkbox } from '@chakra-ui/checkbox';
import { CloseButton } from '@chakra-ui/close-button';
import { Flex, Spacer } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function TodoCard({
  todo = {},
  user = '',
  card = '',
  editTodo = () => {},
  deleteTodo = () => {},
  markTodo = () => {},
  loading = false,
}) {
  const [showKill, setShowKill] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMark, setShowMark] = useState(false);
  const [value, setValue] = useState(todo.text);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const data = {
    todoId: todo._id,
    text: value,
    user: user,
    card: card,
  };

  const deleteData = {
    todoId: todo._id,
    text: value,
    user: user,
    card: card,
  };

  const markData = {
    todoId: todo._id,
    user: user,
    card: card,
  };

  return (
    <>
      <Flex
        w="100%"
        bg="white"
        border="1px"
        borderColor="gray.200"
        rounded="md"
        align="center"
        p="20px"
        onMouseOver={() => setShowKill(true)}
        onMouseOut={() => setShowKill(false)}
        onDoubleClick={() => !todo.done && setShowEdit(true)}
      >
        {showEdit ? (
          <Textarea
            placeholder="Enter content"
            onBlur={() => {
              setShowEdit(false);
              if (value !== todo.text) {
                editTodo(data);
              }
            }}
            autoFocus
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        ) : (
          <Checkbox
            disabled={todo.done || loading}
            isChecked={todo.done}
            onChange={() => {
              !todo.done && setShowMark(true);
            }}
          >
            {todo && todo.text}
          </Checkbox>
        )}

        <Spacer />

        <CloseButton
          onClick={onOpen}
          rounded="full"
          opacity={showKill ? '1' : '0'}
        />
      </Flex>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Todo Item?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are your sure you want delete this todo item. It will be removed
            entirely from this card. And other team members will be notified.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => deleteTodo(deleteData)}
              colorScheme="red"
              ml={3}
              isLoading={loading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={() => setShowMark(false)}
        isOpen={showMark}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Complete Todo Item?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are your sure you want mark this todo item as done. Other team
            members will be notified.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => markTodo(markData)}
              colorScheme="twitter"
              ml={3}
              isLoading={loading}
            >
              Complete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
