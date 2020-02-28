import {Leanplum} from 'react-native-leanplum';
import {requestLocationPermission} from './location.permission';
import {ASSET_VARIABLE_NAME} from 'utils';
import {AppsStorage} from './apps.storage';

export const startUp = async ({
  variables,
  setVariables,
  path,
  setPath,
}: {
  variables: any;
  setVariables: any;
}) => {
  requestLocationPermission();

  Leanplum.onStartResponse((success: boolean) => {
    console.log({success});
  });
  Leanplum.setVariables(variables);

  const apps = await AppsStorage.getAll();
  if (!apps.length) {
    await AppsStorage.save({
      appId: 'app_mdPnGAyQhzV5CcibMb9d9GDQ7oj1J94odFm6lunFd2I',
      productionKey: 'prod_rNf462v60Cl3KA9ntyCiQQup03VyZmkV1Ly21tgKfzg',
      developmentKey: 'dev_S73p5EOeSmH5U2fmT5sH0DENA16qWSnWisUIJtO33qM',
      name: 'RN Rondo',
    });
  }
  // Leanplum.onVariablesChangedAndNoDownloadsPending(() => {
  //   console.log('onVariablesChangedAndNoDownloadsPending');
  // });
  // Leanplum.onceVariablesChangedAndNoDownloadsPending(() => {
  //   console.log('onceVariablesChangedAndNoDownloadsPending');
  // });
  // Leanplum.onMessageDisplayed((message: any) => {
  //   console.log({message});
  // });
  // Leanplum.onVariablesChanged((value: any) => {
  //   setVariables(value);
  // });
  // Leanplum.setVariableAsset(ASSET_VARIABLE_NAME, path, (newPath: string) =>
  //   setPath(newPath),
  // );
  // Leanplum.setAppIdForDevelopmentMode(
  //   'app_mdPnGAyQhzV5CcibMb9d9GDQ7oj1J94odFm6lunFd2I',
  //   'dev_S73p5EOeSmH5U2fmT5sH0DENA16qWSnWisUIJtO33qM',
  // );
  // Leanplum.start();
};
