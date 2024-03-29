import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CurrentTheme} from 'utils';
import {
  Screens,
  AdHocScreen,
  IScreen,
  AppTabScreens,
  VariablesScreen,
  InboxScreen,
  MigrationScreen
} from 'screens';
import {SetupStack} from './setup.stack';
import {SdkStack} from './sdk.stack';

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

const MigrationStack = createStackNavigator({
  [Screens.Migration]: MigrationScreen,
});

export const AppNavigation = createBottomTabNavigator(
  {
    [Screens.Setup]: SetupStack,
    [Screens.AdHoc]: AdHocStack,
    [Screens.Inbox]: InboxStack,
    [Screens.Variables]: VariablesStack,
    [Screens.Sdk]: SdkStack,
    [Screens.Migration]: MigrationStack
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        const currentScreen =
          AppTabScreens.find((screen: IScreen) => screen.name === routeName) ||
          AppTabScreens[0];
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
