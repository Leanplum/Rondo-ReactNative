import React from 'react';
import {Theme, ThemeProvider, Header} from 'react-native-elements';

export const CurrentTheme: Theme = {
  colors: {
    primary: 'teal',
    secondary: 'gray',
  },
};

export const withTheme = (Component: React.FC): React.FC => {
  return () => (
    <ThemeProvider theme={CurrentTheme}>
      <Header
        placement="left"
        centerComponent={{text: 'Rondo', style: {color: '#fff'}}}
      />
      <Component />
    </ThemeProvider>
  );
};
