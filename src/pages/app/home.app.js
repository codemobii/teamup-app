import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { SimpleGrid } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import React, { useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import ContentCard from '../../components/cards/content.card';
import EmptyCard from '../../components/cards/empty.card';
import ItemCard from '../../components/cards/item.card';
import AppLayout from '../../components/layouts/app.layout';
import AddCardModal from '../../components/modals/add_card,modal';
import CardUtils from '../../utils/card.utils';

export default function HomeApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    loading,
    cards,
    cards_,
    adding,
    addCard,
    getCards,
    getCardsJoined,
  } = CardUtils();

  useEffect(() => {
    getCards();
    getCardsJoined();
  }, []);

  return (
    <AppLayout>
      <Stack spacing="50px">
        <ContentCard
          title="My Cards"
          button={
            <Button
              rounded="full"
              size="sm"
              leftIcon={<BsPlus size="24px" />}
              colorScheme="twitter"
              variant="solid"
              onClick={onOpen}
            >
              Add
            </Button>
          }
        >
          {cards.length !== 0 ? (
            <SimpleGrid columns={[1, 1, 2]} spacing="20px">
              {cards.map(e =>
                loading ? <Skeleton w="100%" h="80px" /> : <ItemCard card={e} />
              )}
            </SimpleGrid>
          ) : (
            <EmptyCard />
          )}
        </ContentCard>

        <ContentCard title="Joined">
          {cards_.length !== 0 ? (
            <SimpleGrid columns={[1, 1, 2]} spacing="20px">
              {cards_.map(e =>
                loading ? <Skeleton w="100%" h="80px" /> : <ItemCard card={e} />
              )}
            </SimpleGrid>
          ) : (
            <EmptyCard />
          )}
        </ContentCard>
      </Stack>
      <AddCardModal
        loading={adding}
        addCard={addCard}
        isOpen={isOpen}
        onClose={onClose}
      />
    </AppLayout>
  );
}
