import {NativeModules, NativeModulesStatic, Platform} from 'react-native';
import {LocationAccuracyType} from './location-accuracy-type';

class LeanplumSdkModule {
  private nativeModule: NativeModulesStatic = {};
  PURCHASE_EVENT_NAME: string = 'Purchase';

  constructor(nativeModule: NativeModulesStatic) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      this.nativeModule = nativeModule;
    } else {
      this.throwUnsupportedPlatform();
    }
  }

  throwUnsupportedPlatform() {
    throw new Error('Unsupported Platform');
  }

  setAppIdForDevelopmentMode(appId: string, accessKey: string): void {
    this.nativeModule.setAppIdForDevelopmentMode(appId, accessKey);
  }

  setAppIdForProductionMode(appId: string, accessKey: string): void {
    this.nativeModule.setAppIdForProductionMode(appId, accessKey);
  }

  setDeviceId(id: string) {
    this.nativeModule.setDeviceId(id);
  }

  parseVariables() {
    this.nativeModule.parseVariables();
  }

  setUserId(id: string) {
    this.nativeModule.setUserId(id);
  }

  setUserAttributes(attributes: any) {
    this.nativeModule.setUserAttributes(attributes);
  }

  setVariable(
    variableName: String,
    variableDefaultValue: String | Number | Boolean,
  ) {
    this.nativeModule.setVariable(
      variableName,
      variableDefaultValue.toString(),
      typeof variableDefaultValue,
    );
  }

  addValueChangedHandler(variableName: String, listenerName: String) {
    this.nativeModule.addValueChangedHandler(variableName, listenerName);
  }

  start(): void {
    this.nativeModule.start();
  }

  forceContentUpdate(): void {
    this.nativeModule.forceContentUpdate();
  }

  track(event: string, params: any = {}): void {
    this.nativeModule.track(event, params);
  }

  trackPurchase(
    value: number,
    currencyCode: string,
    purchaseParams: any,
    purchaseEvent: string = this.PURCHASE_EVENT_NAME,
  ) {
    this.nativeModule.trackPurchase(
      purchaseEvent,
      value,
      currencyCode,
      purchaseParams,
    );
  }

  disableLocationCollection() {
    this.nativeModule.disableLocationCollection();
  }

  setDeviceLocation(
    latitude: number,
    longitude: number,
    type: LocationAccuracyType = LocationAccuracyType.CELL,
  ) {
    this.nativeModule.setDeviceLocation(latitude, longitude, type);
  }
}

const Leanplum = new LeanplumSdkModule(NativeModules.LeanplumSdk);
export {Leanplum};
