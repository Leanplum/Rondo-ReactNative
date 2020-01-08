import React from 'react';
import {Theme, ThemeProvider} from 'react-native-elements';

export const CurrentTheme: Theme = {
  colors: {
    primary: 'teal',
    secondary: 'gray',
  },
};

export const withTheme = (Component: React.FC): React.FC => {
  return () => (
    <ThemeProvider theme={CurrentTheme}>
      <Component />
    </ThemeProvider>
  );
};
