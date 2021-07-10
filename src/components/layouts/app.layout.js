import { Container } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import React, { createContext, useEffect, useState } from 'react';
import AppHeader from '../headers/app.header';
// import { spring, AnimatedSwitch } from 'react-router-transition';
import Footer from '../addons/footer.addon';
import axios from 'axios';
import Cookies from 'js-cookie';

export const BellContext = createContext({
  rings: 0,
  bells: [],
  getRings: () => {},
});

export default function AppLayout({ children, title = '' }) {
  const [rings, setRings] = useState(0);
  const [bells, setBells] = useState([]);

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
      .then(res => {
        setRings(res.data.bells.length);
        setBells(res.data.bells);
        console.log(res.data.bells.length);
      })
      .catch(er => {});
  };

  let ringData = {
    rings: rings,
    bells: bells,
    getRings: getRings,
  };

  useEffect(() => {
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
        .then(res => {
          setRings(res.data.bells.length);
          setBells(res.data.bells);
        })
        .catch(er => {});
    };

    getRings();
  }, [id, token]);

  // // to the transform style property
  // function mapStyles(styles) {
  //   return {
  //     opacity: styles.opacity,
  //     transform: `scale(${styles.scale})`,
  //   };
  // }

  // // wrap the `spring` helper to use a bouncy config
  // function bounce(val) {
  //   return spring(val, {
  //     stiffness: 330,
  //     damping: 22,
  //   });
  // }

  // // child matches will...
  // const bounceTransition = {
  //   // start in a transparent, upscaled state
  //   atEnter: {
  //     opacity: 0,
  //     scale: 1.2,
  //   },
  //   // leave in a transparent, downscaled state
  //   atLeave: {
  //     opacity: bounce(0),
  //     scale: bounce(0.8),
  //   },
  //   // and rest at an opaque, normally-scaled state
  //   atActive: {
  //     opacity: bounce(1),
  //     scale: bounce(1),
  //   },
  // };

  return (
    <BellContext.Provider value={ringData}>
      <Box
        bg="gray.50"
        minH="100vh"
        pt="60px"
        pb={{ base: '100px', md: '60px' }}
        pos="relative"
      >
        <AppHeader title={title} />

        <Container maxW="container.md" pos="relative" py="20px">
          {children}
        </Container>

        <Footer />
      </Box>
    </BellContext.Provider>
  );
}
