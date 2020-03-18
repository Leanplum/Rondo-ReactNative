import {
  Screens,
  SetupScreen,
  AppPickerScreen,
  CreateAppScreen,
  EnvPickerScreen,
  CreateEnvScreen,
} from 'screens';
import {createStackNavigator} from 'react-navigation-stack';

export const SetupStack = createStackNavigator({
  [Screens.Setup]: SetupScreen,
  [Screens.AppPicker]: AppPickerScreen,
  [Screens.EnvPicker]: EnvPickerScreen,
  [Screens.CreateApp]: CreateAppScreen,
  [Screens.CreateEnv]: CreateEnvScreen,
});
