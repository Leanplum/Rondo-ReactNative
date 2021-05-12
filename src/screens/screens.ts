import {SetupScreen} from './Setup.screen';
import {AdHocScreen} from './AdHoc.screen';
import {InboxScreen} from './Inbox.screen';
import {VariablesScreen} from './Variables.screen';
import {SdkScreen} from './Sdk.screen';

export enum Screens {
  AdHoc = 'AdHoc',
  Setup = 'Setup',
  Inbox = 'Inbox',
  Sdk = 'Sdk',
  Variables = 'Variables',
  AppPicker = 'AppPicker',
  EnvPicker = 'EnvPicker',
  CreateApp = 'CreateApp',
  CreateEnv = 'CreateEnv',
  Triggers = 'Triggers',
  Messages = 'Messages',
  Push = 'Push',
}

export interface IScreen {
  name: Screens;
  component: React.FC;
  icon: string;
}

export const AppTabScreens: IScreen[] = [
  {name: Screens.Setup, component: SetupScreen, icon: 'cog'},
  {name: Screens.AdHoc, component: AdHocScreen, icon: 'square-edit-outline'},
  {name: Screens.Inbox, component: InboxScreen, icon: 'inbox-arrow-down'},
  {name: Screens.Variables, component: VariablesScreen, icon: 'variable'},
  {name: Screens.Sdk, component: SdkScreen, icon: 'format-list-bulleted'},
];
