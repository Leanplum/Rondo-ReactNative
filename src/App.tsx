import React from 'react';
import {} from 'react-native';

import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SetupScreen from './screens/Setup.screen';
import AdHocScreen from './screens/AdHoc.screen';
import InboxScreen from './screens/Inbox.screen';
import VariablesScreen from './screens/Variables.screen';
import SdkScreen from './screens/Sdk.screen';

const App = createBottomTabNavigator({
  Setup: SetupScreen,
  AdHoc: AdHocScreen,
  Inbox: InboxScreen,
  Variables: VariablesScreen,
  Sdk: SdkScreen,
});

export default createAppContainer(App);
