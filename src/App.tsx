import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {
  SetupScreen,
  AdHocScreen,
  InboxScreen,
  VariablesScreen,
  SdkScreen,
  Screens,
} from './screens';

const App = createBottomTabNavigator(
  {
    [Screens.Setup]: SetupScreen,
    [Screens.AdHoc]: AdHocScreen,
    [Screens.Inbox]: InboxScreen,
    [Screens.Variables]: VariablesScreen,
    [Screens.Sdk]: SdkScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case Screens.Setup:
            iconName = 'settings';
            break;
          case Screens.AdHoc:
            iconName = 'square-edit-outline';
            break;
          case Screens.Inbox:
            iconName = 'inbox-arrow-down';
            break;
          case Screens.Variables:
            iconName = 'variable';
            break;
          case Screens.Sdk:
            iconName = 'format-list-bulleted';
            break;
          default:
            iconName = 'power-settings';
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(App);
