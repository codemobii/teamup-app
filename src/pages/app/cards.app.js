import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { HStack, Stack, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Tooltip } from '@chakra-ui/tooltip';
import Cookies from 'js-cookie';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  BsArrowRepeat,
  BsExclamationCircle,
  BsPeople,
  BsPlus,
} from 'react-icons/bs';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ChatAddon from '../../components/addons/chat.addon';
import ContentCard from '../../components/cards/content.card';
import EmptyCard from '../../components/cards/empty.card';
import TodoCard from '../../components/cards/todo.card';
import AppLayout from '../../components/layouts/app.layout';
import AddMembersModal from '../../components/modals/add_members.modal';
import AddTodoModal from '../../components/modals/add_todo.modal';
import CardUtils from '../../utils/card.utils';
import ChatUtils from '../../utils/chat.utils';
import TodoUtils from '../../utils/todo.utils';

export default function CardsApp() {
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [showAddTodo, setShowAddTodo] = useState(false);

  const { card, getCard, loading } = CardUtils();
  const {
    todos,
    getTodos,
    addTodo,
    loading: _loading__,
    _loading,
    editTodo,
    deleteTodo,
    markTodo,
  } = TodoUtils();
  const { id } = useParams();
  const user = Cookies.get('id');

  const members = card.members;
  const _members = [1, 2, 3];

  const getName = name => {
    var firstWord = name.replace(/ .*/, '');
    return firstWord;
  };

  console.log(members);

  useEffect(() => {
    getCard(id);
    getTodos({
      card: id,
      user: null,
    });
  }, []);

  return (
    <AppLayout title={card && card.title}>
      <Stack spacing="50px">
        <ContentCard
          title={card.title}
          button={
            <Link to={`/cards/${card._id}/info`}>
              <Tooltip
                hasArrow
                rounded="md"
                label={'Card Info'}
                placement="bottom"
              >
                <IconButton
                  rounded="full"
                  variant="ghost"
                  aria-label="Refresh List"
                  onClick={() => {
                    getTodos({
                      card: id,
                      user: null,
                    });
                  }}
                  icon={<BsExclamationCircle size="18px" />}
                />
              </Tooltip>
            </Link>
          }
        >
          <HStack
            w="100%"
            bg="white"
            border="1px"
            borderColor="gray.200"
            rounded="md"
            p="20px"
            spacing="20px"
            overflowX="auto"
          >
            {loading ? (
              _members.map(e => <Skeleton w="60px" h="60px" rounded="full" />)
            ) : (
              <>
                <Stack
                  onClick={() => {
                    getTodos({ card: id, user: card.user._id });
                  }}
                  align="center"
                  cursor="pointer"
                  textAlign="center"
                >
                  <Avatar
                    name={card.user && card.user.fullname}
                    src={card.user && card.user.profilePic}
                  />
                  <Text>
                    {card.user && getName(card.user && card.user.fullname)}{' '}
                    (Owner)
                  </Text>
                </Stack>
                {card.members &&
                  card.members.length !== 0 &&
                  members.map(e => (
                    <Stack
                      key={e._id}
                      onClick={() => {
                        getTodos({ card: id, user: e._id });
                      }}
                      align="center"
                      cursor="pointer"
                      textAlign="center"
                    >
                      <Avatar name={e.fullname} src={e.profilePic} />
                      <Text>{getName(e.fullname)}</Text>
                    </Stack>
                  ))}
              </>
            )}
          </HStack>
        </ContentCard>

        <ContentCard
          title="Todo(s)"
          button={
            <HStack>
              <Button
                rounded="full"
                size="sm"
                leftIcon={<BsPlus size="24px" />}
                colorScheme="twitter"
                variant="solid"
                onClick={() => setShowAddTodo(true)}
              >
                Add
              </Button>
              <Tooltip
                hasArrow
                rounded="md"
                label={'Refresh'}
                placement="bottom"
              >
                <IconButton
                  rounded="full"
                  variant="ghost"
                  aria-label="Refresh List"
                  onClick={() => {
                    getTodos({
                      card: id,
                      user: null,
                    });
                  }}
                  icon={<BsArrowRepeat size="18px" />}
                />
              </Tooltip>
            </HStack>
          }
        >
          {todos.length === 0 ? (
            <EmptyCard />
          ) : (
            <Stack w="100%" spacing="20px">
              {todos.map(e =>
                _loading__ ? (
                  <Skeleton w="100%" h="60px" />
                ) : (
                  <TodoCard
                    todo={e}
                    card={id}
                    user={user}
                    editTodo={editTodo}
                    loading={_loading}
                    deleteTodo={deleteTodo}
                    markTodo={markTodo}
                  />
                )
              )}
            </Stack>
          )}
        </ContentCard>
      </Stack>
      <AddMembersModal
        isOpen={showAddMembers}
        onClose={() => setShowAddMembers(false)}
        loading={_loading}
      />
      <AddTodoModal
        isOpen={showAddTodo}
        onClose={() => setShowAddTodo(false)}
        loading={_loading}
        addTodo={addTodo}
        card={id}
      />

      {/* Our chat addon */}
      <ChatAddon adding={_loading} addTodo={addTodo} />
    </AppLayout>
  );
}
