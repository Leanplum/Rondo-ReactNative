import {
  Screens,
  SdkScreen,
  TriggersScreen,
  MessagesScreen,
  PushScreen,
} from 'screens';
import {createStackNavigator} from 'react-navigation-stack';

export const SdkStack = createStackNavigator({
  [Screens.Sdk]: {
    screen: SdkScreen,
    navigationOptions: {
      title: 'SDK QA',
    },
  },
  [Screens.Triggers]: TriggersScreen,
  [Screens.Messages]: {
    screen: MessagesScreen,
    navigationOptions: {
      title: 'In App Messages',
    },
  },
  [Screens.Push]: {
    screen: PushScreen,
    navigationOptions: {
      title: 'Push Notifications',
    },
  },
});
