import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {AppScreens, IScreen} from './screens';
import {withTheme, CurrentTheme} from './utils';
import {Header} from 'react-native-elements';

const screens: any = {};
AppScreens.forEach((screen: IScreen) => {
  screens[screen.name] = withTheme(screen.component);
});

const App = createBottomTabNavigator(screens, {
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const {routeName} = navigation.state;
      const currentScreen =
        AppScreens.find((screen: IScreen) => screen.name === routeName) ||
        AppScreens[0];
      return <Icon name={currentScreen.icon} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    activeBackgroundColor: CurrentTheme.colors?.primary,
    inactiveBackgroundColor: CurrentTheme.colors?.primary,
  },
});

export default createAppContainer(App);
