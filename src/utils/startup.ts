import {Leanplum} from 'react-native-leanplum';
import {requestLocationPermission} from './location.permission';
import {ASSET_VARIABLE_NAME} from 'utils';

export const startUp = ({
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
  Leanplum.onVariablesChanged((value: any) => {
    setVariables(value);
  });
  Leanplum.setVariableAsset(ASSET_VARIABLE_NAME, path, (newPath: string) =>
    setPath(newPath),
  );
  Leanplum.setAppIdForDevelopmentMode(
    'app_mdPnGAyQhzV5CcibMb9d9GDQ7oj1J94odFm6lunFd2I',
    'dev_S73p5EOeSmH5U2fmT5sH0DENA16qWSnWisUIJtO33qM',
  );
  Leanplum.start();
};
