import {Leanplum} from '@leanplum/react-native-sdk';
import {requestLocationPermission} from './location.permission';
import {ASSET_VARIABLE_NAME} from 'utils';
import {AppsStorage, LeanplumAppConfig} from './apps.storage';
import {Alert,Platform} from 'react-native';
import {LeanplumEnvConfig, EnvsStorage} from './envs.storage';

const globalScope: any = global;

const musalaApp: LeanplumAppConfig = {
  appId: 'app_qA781mPlJYjzlZLDlTh68cdNDUOf31kcTg1TCbSXSS0',
  productionKey: 'prod_kInQHXLJ0Dju7QJRocsD5DYMdYAVbdGGwhl6doTfH0k',
  developmentKey: 'dev_WqNqX0qOOHyTEQtwKXs5ldhqErHfixvcSAMlYgyIL0U',
  name: 'Musala QA',
};

const qaApp: LeanplumAppConfig = {
  appId: 'app_ve9UCNlqI8dy6Omzfu1rEh6hkWonNHVZJIWtLLt6aLs',
  productionKey: 'prod_D5ECYBLrRrrOYaFZvAFFHTg1JyZ2Llixe5s077Lw3rM',
  developmentKey: 'dev_cKF5HMpLGqhbovlEGMKjgTuf8AHfr2Jar6rrnNhtzQ0',
  name: 'Rondo QA Production',
};

const rnApp: LeanplumAppConfig = {
  appId: 'app_shxl80IUpE1HjYhhN2SciY13T0gmKXkbHzqrNzoTOCQ',
  productionKey: 'prod_7iNXSEWVdxZDATwaJvr2QfwT5b7pD5Xh3iLXrt5X8ZM',
  developmentKey: 'dev_jgkNruibwmMDzVlkabAjL4fW2GCbX6iVzB05u9yeQC4',
  name: 'Rondo QA RN Production',
};

const prodApp: LeanplumAppConfig = {
  appId: 'app_UQcFGVeXzOCVsovrlUebad9R67hFJqzDegfQPZRnVZM',
  productionKey: 'prod_lL8RSFzmHy0iVYXQpzjUVEHDlaUz5idT0H7BVs6Bn1Q',
  developmentKey: 'dev_b9qX0tcazL5PCQFuZ7pxsfT6XHA7xQkaFtYVrgt4Kq0',
  name: 'Rondo QA Automation',
};

const defaultEnv: LeanplumEnvConfig = {
  apiHost: 'api.leanplum.com',
  apiSsl: true,
  socketHostname: 'dev.leanplum.com',
  socketPort: 443,
};

const qaEnv: LeanplumEnvConfig = {
  apiHost: 'api-qa.leanplum.com',
  apiSsl: true,
  socketHostname: 'dev-qa.leanplum.com',
  socketPort: 443,
};

const stageEnv: LeanplumEnvConfig = {
  apiHost: 'api-staging.leanplum.com',
  apiSsl: true,
  socketHostname: 'dev-staging.leanplum.com',
  socketPort: 443,
};

export const startUp = async ({
  variables,
  setVariables,
  path,
  setPath,
}: {
  variables: any;
  setVariables: any;
  path: string;
  setPath: any;
}) => {
  requestLocationPermission();
  registerVariablesAndCallbacks(variables, setVariables, path, setPath);
  registerMessageDisplayListener();
  await storeDefaultApp();
  await storeDefaultEnv();
  await setProductionMode();
  let currentApp = (await AppsStorage.currentApp()) || rnApp;
  let currentEnv = (await EnvsStorage.currentEnv()) || defaultEnv;
  let productionMode = (await AppsStorage.getProductionMode() === "true");
  leanplumStart(currentApp, currentEnv, productionMode);
};

export const leanplumStart = async (
  app: LeanplumAppConfig | undefined,
  env: LeanplumEnvConfig | undefined,
  productionMode: boolean,
) => {
  if (app == undefined) {
    app = rnApp;
  }

  if (env == undefined) {
    env = defaultEnv;
  }
  
  if (productionMode) {
    Leanplum.setAppIdForProductionMode(app.appId, app.productionKey);
  } else {
    Leanplum.setAppIdForDevelopmentMode(app.appId, app.developmentKey);
  }

  Leanplum.setSocketConnectionSettings(env.socketHostname, env.socketPort);
  Leanplum.setApiConnectionSettings(env.apiHost, 'api', env.apiSsl);
  Leanplum.start();
  await AppsStorage.selectApp(app.appId);
  await EnvsStorage.selectEnv(env.apiHost);
};

const storeDefaultApp = async () => {
  const apps = await AppsStorage.getAll();
  if (!apps.length) {
    await AppsStorage.save(musalaApp);
    await AppsStorage.save(qaApp);
    await AppsStorage.save(rnApp);
    await AppsStorage.save(prodApp);
  }
};

const storeDefaultEnv = async () => {
  const envs = await EnvsStorage.getAll();
  if (!envs.length) {
    await EnvsStorage.save(defaultEnv);
    await EnvsStorage.save(qaEnv);
    await EnvsStorage.save(stageEnv);
  }
};

const setProductionMode = async () => {
  const mode = await AppsStorage.getProductionMode();
  if(mode === null || undefined) {
    await AppsStorage.setProductionMode("false")
  } else {
    await AppsStorage.setProductionMode(mode.toString())
  }
}

const registerVariablesAndCallbacks = (
  variables: any,
  setVariables: any,
  path: string,
  setPath: any,
) => {
  Leanplum.onStartResponse((success: boolean) => {
    const alertTitle = success
      ? 'Leanplum session started'
      : 'Leanplum session not started';
    Alert.alert(alertTitle);
  });
  Leanplum.setVariables(variables);
  Leanplum.onVariablesChangedAndNoDownloadsPending(() => {
    console.log('onVariablesChangedAndNoDownloadsPending');
  });
  Leanplum.onceVariablesChangedAndNoDownloadsPending(() => {
    console.log('onceVariablesChangedAndNoDownloadsPending');
  });
  Leanplum.onVariablesChanged((value: any) => {
    setVariables(value);
  });
  Leanplum.setVariableAsset(ASSET_VARIABLE_NAME, path, (newPath: string) =>
    setPath(newPath),
  );
};

const registerMessageDisplayListener = () => {
  globalScope.setOnMessageDisplayed = (enable: boolean) => {
    if (enable) {
      Leanplum.onMessageDisplayed(data =>
        console.log('message displayed: ', data),
      );
    } else {
      Leanplum.onMessageDisplayed(null);
    }
    globalScope.onMessageDisplayedSet = enable;
  };

  globalScope.setOnMessageDismissed = (enable: boolean) => {
    if (enable) {
      Leanplum.onMessageDismissed(data =>
        console.log('message dismissed: ', data),
      );
    } else {
      Leanplum.onMessageDismissed(null);
    }
    globalScope.onMessageDismissedSet = enable;
  };

  globalScope.setOnMessageAction = (enable: boolean) => {
    if (enable) {
      Leanplum.onMessageAction(data =>
        console.log('message action: ', data),
      );
    } else {
      Leanplum.onMessageAction(null);
    }
    globalScope.onMessageActionSet = enable;
  };

  globalScope.setOnMessageDisplayed(true);
  globalScope.setOnMessageDismissed(true);
  globalScope.setOnMessageAction(true);
};
