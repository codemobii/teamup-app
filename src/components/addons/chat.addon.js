import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { CloseButton } from '@chakra-ui/close-button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Divider, Flex, HStack, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Textarea } from '@chakra-ui/textarea';
import { Tooltip } from '@chakra-ui/tooltip';
import { Collapse } from '@chakra-ui/transition';
// import _ from 'lodash';
import React, { useState } from 'react';
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsChatDotsFill,
  BsFillCursorFill,
  BsPlusCircleFill,
} from 'react-icons/bs';
// import { useParams } from 'react-router';
import useChat from '../../utils/chat.utils';
import ChatCard from '../cards/chat.card';

export default function ChatAddon({ adding, addTodo }) {
  const { isOpen, onToggle } = useDisclosure();
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [replyMsg, setReplyMsg] = useState(null);

  // const { id } = useParams();

  // Get our utilities from import
  const {
    loading,
    messages,
    sendMessage,
    scrollToBottom,
    uploading,
    sendImage,
  } = useChat();

  function makeId(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <Box
      w={{ base: '100%', md: '400px' }}
      borderTopRadius="lg"
      overflow="hidden"
      boxShadow="2xl"
      bg="white"
      pos="fixed"
      right={{ base: '0', md: '15px' }}
      bottom="0"
      zIndex="100"
    >
      <Button
        leftIcon={<BsChatDotsFill />}
        w="100%"
        borderTopRadius="lg"
        borderBottomRadius="0"
        size="lg"
        colorScheme="twitter"
        onClick={() => {
          onToggle();
          scrollToBottom();
        }}
        rightIcon={
          isOpen ? (
            <BsCaretDownFill
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                marginTop: '-7px',
              }}
            />
          ) : (
            <BsCaretUpFill
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                marginTop: '-7px',
              }}
            />
          )
        }
      >
        Card Chat
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Flex flexDirection="column" h={{ base: '80vh', md: '500px' }}>
          {loading ? (
            <Center id="chat" w="100%" py="20px">
              <Spinner />
            </Center>
          ) : (
            <>
              <Stack
                id="chat"
                h="100%"
                spacing="10px"
                pt="10px"
                overflowX="hidden"
              >
                {messages.map(e => (
                  <>
                    <ChatCard
                      onReply={() => {
                        setReply(e._id);
                        setReplyMsg(e.message);
                      }}
                      message={e}
                      adding={adding}
                      addTodo={addTodo}
                    />
                    <Divider />
                  </>
                ))}
              </Stack>
              <Box pos="relative">
                {replyMsg && (
                  <Flex
                    pos="relative"
                    w="100%"
                    top="0"
                    left="0"
                    zIndex="100"
                    fontSize="xs"
                    fontStyle="italic"
                    color="gray.400"
                    p="4"
                    py="2"
                    pr="25px"
                    bg="white"
                    align="center"
                  >
                    {replyMsg}
                    <CloseButton
                      onClick={() => {
                        setReply('');
                        setReplyMsg(null);
                      }}
                      rounded="full"
                      pos="absolute"
                      right="0"
                    />
                  </Flex>
                )}
                <HStack position="relative">
                  <Textarea
                    size="sm"
                    variant="filled"
                    placeholder="Enter message . . ."
                    pr="130px"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                  <ButtonGroup pos="absolute" right="15px">
                    <Tooltip
                      hasArrow
                      rounded="md"
                      label="Upload an image"
                      placement="top"
                      position="relative"
                    >
                      <Box pos="relative">
                        <IconButton
                          icon={<BsPlusCircleFill size="24px" />}
                          variant="ghost"
                          colorScheme="twitter"
                          size="lg"
                          rounded="full"
                          isLoading={uploading}
                        />
                        <input
                          id="imageFile"
                          type="file"
                          onChange={() => {
                            let sendId = makeId(7);
                            sendImage(sendId, reply);
                            setReply('');
                            setReplyMsg('');
                          }}
                          style={{
                            position: 'absolute',
                            width: '50px',
                            height: '50px',
                            right: '0',
                            opacity: 0,
                            cursor: 'pointer',
                            bottom: 0,
                          }}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip
                      hasArrow
                      rounded="md"
                      label="Send"
                      placement="top"
                      position="relative"
                    >
                      <IconButton
                        icon={<BsFillCursorFill size="24px" />}
                        variant="ghost"
                        colorScheme="twitter"
                        size="lg"
                        rounded="full"
                        onClick={() => {
                          let sendId = makeId(7);
                          sendMessage(message, reply, sendId);
                          setMessage('');
                          setReply('');
                          setReplyMsg(null);
                        }}
                        disabled={message === ''}
                        // isLoading={sending}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </HStack>
              </Box>
            </>
          )}
        </Flex>
      </Collapse>
    </Box>
  );
}
