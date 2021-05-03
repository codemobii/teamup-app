import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import RoutesConfig from './routes/index.routes';
import './index.css';

function App() {
  const theme = extendTheme({
    fonts: {
      heading: 'acumin-pro, sans-serif',
      body: 'acumin-pro, sans-serif',
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <RoutesConfig />
    </ChakraProvider>
  );
}

export default App;
