import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAppContainer} from 'react-navigation';

import {AppNavigation} from 'navigations';
import {VariablesProvider, AssetProvider} from 'contexts';
import {CurrentTheme} from 'utils';
import {ThemeProvider} from 'react-native-elements';

const AppContainer = createAppContainer(AppNavigation);

export default () => {
  return (
    <ThemeProvider theme={CurrentTheme}>
      <VariablesProvider>
        <AssetProvider>
          <AppContainer />
        </AssetProvider>
      </VariablesProvider>
    </ThemeProvider>
  );
};
