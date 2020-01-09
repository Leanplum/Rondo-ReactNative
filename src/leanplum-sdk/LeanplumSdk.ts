import {NativeModules, NativeModulesStatic} from 'react-native';

class LeanplumSdkModule {
  private nativeModule: NativeModulesStatic;

  track(event: string, params: any): void {
    this.nativeModule.track(event, params);
  }
  constructor(nativeModule: NativeModulesStatic) {
    this.nativeModule = nativeModule;
  }
}
const LeanplumSdk = new LeanplumSdkModule(NativeModules.LeanplumSdk);
export {LeanplumSdk};
