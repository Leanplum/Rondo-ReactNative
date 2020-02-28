import {Screens, SetupScreen, AppPickerScreen} from 'screens';
import {createStackNavigator} from 'react-navigation-stack';
import {defaultStackConfig} from './app.navigation';

export const SetupStack = createStackNavigator(
  {
    [Screens.Setup]: SetupScreen,
    [Screens.AppPicker]: {
      screen: AppPickerScreen,
      navigationOptions: {
        headerTitle: Screens.AppPicker,
      },
    },
  },
  defaultStackConfig,
);
