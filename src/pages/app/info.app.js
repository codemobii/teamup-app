import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex, HStack, Spacer, Stack, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { useParams } from 'react-router';
import ContentCard from '../../components/cards/content.card';
import AppLayout from '../../components/layouts/app.layout';
import AddMembersModal from '../../components/modals/add_members.modal';
import CardUtils from '../../utils/card.utils';
import UserUtils from '../../utils/user.utils';

export default function InfoApp() {
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [title, setTitle] = useState('');

  const { card, getCard, loading } = CardUtils();
  const { user, getUser } = UserUtils();
  const { id } = useParams();

  const members = card.members;
  const _members = [1, 2, 3];

  useEffect(() => {
    getCard(id).then(() => setTitle(card.title));
    getUser();
  }, []);

  return (
    <AppLayout title="Card info">
      <Stack spacing="50px">
        <ContentCard
          title="Manager"
          //   button={
          //     <Button
          //       rounded="full"
          //       size="sm"
          //       colorScheme="twitter"
          //       variant="solid"
          //       onClick={() => setShowAddMembers(true)}
          //     >
          //       Switch Manager
          //     </Button>
          //   }
        >
          {loading ? (
            <Skeleton rounded="md" bg="white" h="50px" />
          ) : (
            <Flex bg="white" p="15px" rounded="md">
              <HStack>
                <Avatar
                  size="sm"
                  name={card.manager && card.manager.fullname}
                  src={card.manager && card.manager.profilePic}
                />
                <Text>{card.manager && card.manager.fullname}</Text>
              </HStack>
            </Flex>
          )}
        </ContentCard>
        <ContentCard
          title="Members"
          button={
            <Button
              rounded="full"
              size="sm"
              colorScheme="twitter"
              variant="solid"
              onClick={() => setShowAddMembers(true)}
            >
              Invite
            </Button>
          }
        >
          {loading ? (
            _members.map(e => (
              <Skeleton key={e} rounded="md" bg="white" h="50px" />
            ))
          ) : (
            <>
              <Flex bg="white" p="15px" rounded="md">
                <HStack>
                  <Avatar
                    size="sm"
                    name={card.user && card.user.fullname}
                    src={card.user && card.user.profilePic}
                  />
                  <Text>{card.user && card.user.fullname}</Text>
                </HStack>
                {/* <Spacer />
                <Button size="sm" rounded="full">
                  Leave
                </Button> */}
              </Flex>
              {card.members &&
                card.members.length !== 0 &&
                members.map(e => (
                  <Flex key={e._id} bg="white" p="15px" rounded="md">
                    <HStack>
                      <Avatar size="sm" name={e.fullname} src={e.profilePic} />
                      <Text>{e.fullname}</Text>
                    </HStack>
                    <Spacer />
                    {e.fullname === user.fullname && (
                      <Button size="sm" rounded="full">
                        Leave
                      </Button>
                    )}
                    {card.manager.fullname === user.fullname && (
                      <Button size="sm" rounded="full">
                        Remove
                      </Button>
                    )}
                  </Flex>
                ))}
            </>
          )}
        </ContentCard>
        <ContentCard title="Details">
          <FormControl isRequired>
            <FormLabel>Card title</FormLabel>
            <InputGroup size="lg" colorScheme="whiteAlpha" variant="flushed">
              <Input
                placeholder="Card title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              <Tooltip hasArrow rounded="md" label={'Edit'} placement="bottom">
                <InputRightElement>
                  <IconButton
                    rounded="full"
                    variant="ghost"
                    icon={<BsPencil size="18px" />}
                  />
                </InputRightElement>
              </Tooltip>
            </InputGroup>
          </FormControl>
        </ContentCard>
        <Button size="lg" colorScheme="red" variant="ghost" rounded="full">
          Delete Card
        </Button>
      </Stack>
      <AddMembersModal
        isOpen={showAddMembers}
        onClose={() => setShowAddMembers(false)}
      />
    </AppLayout>
  );
}
