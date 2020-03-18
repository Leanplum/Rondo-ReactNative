import React, {useState, useEffect} from 'react';
import {AppsStorage, LeanplumAppConfig, EnvsStorage, LeanplumEnvConfig} from 'utils';
import {withNavigation, NavigationScreenProp} from 'react-navigation';

import {SdkComponent} from 'components';

const Sdk = ({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) => {
  const [app, setApp] = useState<LeanplumAppConfig>();
  const [env, setEnv] = useState<LeanplumEnvConfig>();

  useEffect(() => {
    getSession()
    navigation.addListener('didFocus', () => {
      getSession();
    });
  }, []);

  async function getSession() {
    const app = await AppsStorage.currentApp();
    const env = await EnvsStorage.currentEnv();
    setApp(app);
    setEnv(env);
  }

  return <SdkComponent app={app} env={env} />;
};

export const SdkScreen = withNavigation(Sdk);
