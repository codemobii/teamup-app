import { Avatar } from '@chakra-ui/avatar';
import { Image } from '@chakra-ui/image';
import { HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import {
  BsDot,
  BsPlusCircleFill,
  BsReplyFill,
  BsThreeDots,
} from 'react-icons/bs';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
} from '@chakra-ui/react';
import { useParams } from 'react-router';
import Cookies from 'js-cookie';
import TimeAgo from 'react-timeago';

export default function ChatCard({
  message,
  onReply = () => {},
  addTodo = () => {},
  adding,
}) {
  const { id } = useParams();
  const user = Cookies.get('id');

  const data = {
    text: message.message,
    user: user,
    card: id,
  };

  return (
    <HStack align="flex-start" px="10px" pos="relative">
      <Avatar
        size="sm"
        name={message.user.fullname}
        src={message.user.profilePic}
      />
      <Stack spacing="1">
        <HStack spacing="1">
          <Text fontSize="xs" fontWeight="bold">
            {message.user.fullname}
          </Text>
          <BsDot />
          <Text fontSize="xs">
            <TimeAgo date={message.createdAt} />
          </Text>
        </HStack>
        <Text fontSize="xs">{message.message}</Text>
        {message.file && (
          <Image w="auto" objectFit="contain" src={message.file} rounded="lg" />
        )}
        {message.replyTo && (
          <Text
            fontSize="xs"
            fontStyle="italic"
            color="gray.400"
            px="4"
            borderLeft="4px"
          >
            {message.replyTo.message}
          </Text>
        )}
      </Stack>

      {!message.file && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDots />}
            size="xs"
            pos="absolute"
            right="15px"
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={() => onReply()} icon={<BsReplyFill />}>
              Reply
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<BsPlusCircleFill />} onClick={() => addTodo(data)}>
              {adding ? 'Adding . . .' : 'Add to todo'}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </HStack>
  );
}
