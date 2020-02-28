import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CurrentTheme} from 'utils';
import {
  Screens,
  SetupScreen,
  AdHocScreen,
  IScreen,
  AppScreens,
  VariablesScreen,
  InboxScreen,
  AppPickerScreen,
} from 'screens';
import {SetupStack} from './setup.stack';

export const defaultStackConfig: any = {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: CurrentTheme.colors?.primary,
    },
  },
};

const AdHocStack = createStackNavigator({
  [Screens.AdHoc]: AdHocScreen,
});

const InboxStack = createStackNavigator({
  [Screens.Inbox]: InboxScreen,
});

const VariablesStack = createStackNavigator({
  [Screens.Variables]: VariablesScreen,
});

export const AppNavigation = createBottomTabNavigator(
  {
    [Screens.Setup]: SetupStack,
    [Screens.AdHoc]: AdHocStack,
    [Screens.Inbox]: InboxStack,
    [Screens.Variables]: VariablesStack,
  },
  {
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
  },
);
