import { Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import ContentCard from '../../components/cards/content.card';
import EmptyCard from '../../components/cards/empty.card';
import NotificationCard from '../../components/cards/notification.card';
import AppLayout, { BellContext } from '../../components/layouts/app.layout';

export default function BellsApp() {
  const [bells, setBells] = useState([{ bells: [1, 2] }, { bells: [1, 2] }]);
  const [loading, setLoading] = useState(true);

  const rings = useContext(BellContext);

  const id = Cookies.get('id');
  const token = Cookies.get('token');

  const getRings = async () => {
    await axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      proxy: {
        host: '104.236.174.88',
        port: 3128,
      },
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}notifications/unread/${id}`,
    })
      .then(async res => {
        const bels = res.data.bells;
        var ids = bels.map(function (a) {
          return a._id;
        });

        await axios({
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
          proxy: {
            host: '104.236.174.88',
            port: 3128,
          },
          method: 'PUT',
          url: `${process.env.REACT_APP_API_URL}notifications/read`,
          data: {
            bells: ids,
            user: id,
          },
        })
          .then(async res => {
            rings.getRings();
            await axios({
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
              },
              proxy: {
                host: '104.236.174.88',
                port: 3128,
              },
              method: 'GET',
              url: `${process.env.REACT_APP_API_URL}notifications/all/${id}`,
            })
              .then(res => {
                const data = res.data.bells;
                const groups = data.reduce((groups, bell) => {
                  const date = bell.createdAt.split('T')[0];
                  if (!groups[date]) {
                    groups[date] = [];
                  }
                  groups[date].push(bell);
                  return groups;
                }, {});

                // Edit: to add it in the array format instead
                const groupArrays = Object.keys(groups).map(date => {
                  return {
                    date,
                    bells: groups[date],
                  };
                });

                setBells(groupArrays);

                rings.getRings();
                console.log(groupArrays);
                // console.log(res.data.bells.length);
              })
              .catch(er => {
                console.log(er);
              });
          })
          .catch(er => {
            console.log(er);
          });
      })
      .catch(er => {
        console.log(er);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getRings();
  }, []);

  return (
    <AppLayout title="Notifications">
      <Stack spacing="50px">
        {bells.length === 0 ? (
          <EmptyCard />
        ) : (
          bells.map(e => (
            <ContentCard
              title={
                loading ? (
                  <Skeleton w="200px" h="20px" rounded="base" />
                ) : (
                  e.date
                )
              }
            >
              <Stack spacing="20px">
                {e.bells.map(e =>
                  loading ? (
                    <Skeleton w="100%" h="60px" rounded="base" />
                  ) : (
                    <NotificationCard bell={e} />
                  )
                )}
              </Stack>
            </ContentCard>
          ))
        )}
      </Stack>
    </AppLayout>
  );
}
