import React, {useState, useEffect} from 'react';
import {AppsStorage, LeanplumAppConfig, EnvsStorage, LeanplumEnvConfig} from 'utils';

import {SdkComponent} from 'components';

export const SdkScreen = () => {
  const [app, setApp] = useState<LeanplumAppConfig>();
  const [env, setEnv] = useState<LeanplumEnvConfig>();

  useEffect(() => {
    getSession();
  }, []);

  async function getSession() {
    const app = await AppsStorage.currentApp();
    const env = await EnvsStorage.currentEnv();
    setApp(app);
    setEnv(env);
  }

  return <SdkComponent app={app} env={env} />;
};
