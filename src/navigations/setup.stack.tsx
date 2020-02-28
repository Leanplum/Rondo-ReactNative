import {Screens, SetupScreen, AppPickerScreen} from 'screens';
import {createStackNavigator} from 'react-navigation-stack';

export const SetupStack = createStackNavigator({
  [Screens.Setup]: SetupScreen,
  [Screens.AppPicker]: AppPickerScreen,
});
