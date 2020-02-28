import {Leanplum} from 'react-native-leanplum';
import {requestLocationPermission} from './location.permission';
import {ASSET_VARIABLE_NAME} from 'utils';
import {AppsStorage, LeanplumAppConfig} from './apps.storage';

export const startUp = async ({
  variables,
  setVariables,
  path,
  setPath,
  productionMode,
}: {
  variables: any;
  setVariables: any;
  path: string;
  setPath: any;
  productionMode: boolean;
}) => {
  requestLocationPermission();
  registerVariablesAndCallbacks(variables, setVariables, path, setPath);
  await startCurrentApp(productionMode);
};

export const startCurrentApp = async (productionMode: boolean) => {
  const defaultApp: LeanplumAppConfig = {
    appId: 'app_mdPnGAyQhzV5CcibMb9d9GDQ7oj1J94odFm6lunFd2I',
    productionKey: 'prod_rNf462v60Cl3KA9ntyCiQQup03VyZmkV1Ly21tgKfzg',
    developmentKey: 'dev_S73p5EOeSmH5U2fmT5sH0DENA16qWSnWisUIJtO33qM',
    name: 'RN Rondo',
  };

  const apps = await AppsStorage.getAll();
  if (!apps.length) {
    await AppsStorage.save(defaultApp);
  }

  let currentApp = (await AppsStorage.currentApp()) || defaultApp;
  startLeanplum(currentApp, productionMode);
};

const startLeanplum = (app: LeanplumAppConfig, productionMode: boolean) => {
  if (productionMode) {
    Leanplum.setAppIdForProductionMode(app.appId, app.productionKey);
  } else {
    Leanplum.setAppIdForDevelopmentMode(app.appId, app.developmentKey);
  }
  Leanplum.start();
};

const registerVariablesAndCallbacks = (
  variables: any,
  setVariables: any,
  path: string,
  setPath: any,
) => {
  Leanplum.onStartResponse((success: boolean) => {
    console.log({onStartResponse: success});
  });
  Leanplum.setVariables(variables);
  Leanplum.onVariablesChangedAndNoDownloadsPending(() => {
    console.log('onVariablesChangedAndNoDownloadsPending');
  });
  Leanplum.onceVariablesChangedAndNoDownloadsPending(() => {
    console.log('onceVariablesChangedAndNoDownloadsPending');
  });
  Leanplum.onMessageDisplayed((message: any) => {
    console.log({message});
  });
  Leanplum.onVariablesChanged((value: any) => {
    setVariables(value);
  });
  Leanplum.setVariableAsset(ASSET_VARIABLE_NAME, path, (newPath: string) =>
    setPath(newPath),
  );
};
