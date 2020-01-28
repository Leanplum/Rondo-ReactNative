import {NativeModules, NativeModulesStatic, Platform} from 'react-native';
import {LocationAccuracyType} from './location-accuracy-type';
import {DeviceEventEmitter} from 'react-native';
import {Alert} from 'react-native';

class LeanplumSdkModule {
  private nativeModule: NativeModulesStatic = {};
  private variables: Map<String, any>;
  // var variables = {
  //   welcomeLabel: 'MyLabel',
  //   someOtherLabel: 'other label',
  // };

  PURCHASE_EVENT_NAME: string = 'Purchase';

  constructor(nativeModule: NativeModulesStatic) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      this.nativeModule = nativeModule;
    } else {
      this.throwUnsupportedPlatform();
    }

    this.variables = new Map<String, any>();
    DeviceEventEmitter.addListener(
      'valueChangedHandler',
      this.valueChangedHandler,
    );
  }

  throwUnsupportedPlatform() {
    throw new Error('Unsupported Platform');
  }

  // Handlers
  valueChangedHandler = (event: any) => {
    var keys = Object.keys(event);
    const key = keys[0];
    const value = event[key];
    console.log('valueChangedHandler-event', event);
    console.log('valueChangedHandler-key', key);
    console.log('valueChangedHandler-value', value);
    this.variables.set(key, value);
    Alert.alert('Key: ' + key + ', Value: ' + value);
  };

  setAppIdForDevelopmentMode(appId: string, accessKey: string): void {
    this.nativeModule.setAppIdForDevelopmentMode(appId, accessKey);
  }

  setAppIdForProductionMode(appId: string, accessKey: string): void {
    this.nativeModule.setAppIdForProductionMode(appId, accessKey);
  }

  setDeviceId(id: string) {
    this.nativeModule.setDeviceId(id);
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
    console.log('SET VARIABLE', variableName, variableDefaultValue);
    for (let key of Array.from(this.variables.keys())) {
      console.log('key-before', key);
      console.log(
        'value-before',
        this.variables && this.variables.get(key).toString(),
      );
    }
    this.variables.set(variableName, variableDefaultValue);
    this.nativeModule.setVariable(variableName, variableDefaultValue);
    for (let key of Array.from(this.variables.keys())) {
      console.log('key-after', key);
      console.log('value-after', this.variables.get(key).toString());
    }
  }

  setVariables() {
    this.nativeModule.setVariables(this.variables);
  }

  addValueChangedHandler(variableName: String) {
    this.nativeModule.addValueChangedHandler(variableName);
  }

  start(): void {
    console.log('LeanplumSdkModule.start');
    this.nativeModule.start();
  }

  forceContentUpdate(): void {
    console.log('LeanplumSdkModule.forceContentUpdate');
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
