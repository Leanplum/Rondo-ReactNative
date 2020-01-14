import React from 'react';
import {Theme, ThemeProvider} from 'react-native-elements';

export const CurrentTheme: Theme = {
  colors: {
    primary: 'teal',
    secondary: 'gray',
  },
};

export const withTheme = (Component: any) => (props: any) => (
  <ThemeProvider theme={CurrentTheme}>
    <Component {...props} />
  </ThemeProvider>
);
