import {NativeModules, NativeModulesStatic} from 'react-native';

class LeanplumSdkModule {
  private nativeModule: NativeModulesStatic;

  start(callback: any): void {
    this.nativeModule.start(callback);
  }

  setAppIdForDevelopmentMode(appId: string, accessKey: string): void {
    this.nativeModule.setAppIdForDevelopmentMode(appId, accessKey);
  }

  setAppIdForProductionMode(appId: string, accessKey: string): void {
    this.nativeModule.setAppIdForProductionMode(appId, accessKey);
  }

  track(event: string, params: any = {}): void {
    this.nativeModule.track(event, params);
  }
  constructor(nativeModule: NativeModulesStatic) {
    this.nativeModule = nativeModule;
  }
}

const Leanplum = new LeanplumSdkModule(NativeModules.LeanplumSdk);
export {Leanplum};
