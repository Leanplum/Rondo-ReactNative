import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {withTheme, CurrentTheme} from 'utils';
import {
  Screens,
  SetupScreen,
  AdHocScreen,
  IScreen,
  AppScreens,
  VariablesScreen,
} from 'screens';

const defaultStackConfig: any = {
  defaultNavigationOptions: {
    title: 'Rondo',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: CurrentTheme.colors?.primary,
    },
  },
};

const SetupStack = createStackNavigator(
  {
    [Screens.Setup]: withTheme(SetupScreen),
  },
  defaultStackConfig,
);

const AdHocStack = createStackNavigator(
  {
    [Screens.AdHoc]: withTheme(AdHocScreen),
  },
  defaultStackConfig,
);

const VariablesStack = createStackNavigator(
  {
    [Screens.Variables]: withTheme(VariablesScreen),
  },
  defaultStackConfig,
);

export const AppNavigation = createBottomTabNavigator(
  {
    [Screens.Setup]: SetupStack,
    [Screens.AdHoc]: AdHocStack,
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
