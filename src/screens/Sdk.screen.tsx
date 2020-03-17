import React, {useState, useEffect} from 'react';
import {AppsStorage, LeanplumAppConfig} from 'utils';

import {SdkComponent} from 'components';

export const SdkScreen = () => {
  const [app, setApp] = useState<LeanplumAppConfig>();

  useEffect(() => {
    getSession();
  }, []);

  async function getSession() {
    const app = await AppsStorage.currentApp();
    setApp(app);
  }

  return <SdkComponent app={app} />;
};
