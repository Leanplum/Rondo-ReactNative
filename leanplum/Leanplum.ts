import {NativeModules, Platform, NativeEventEmitter} from 'react-native';
import {LocationAccuracyType} from './location-accuracy-type';
import {DeviceEventEmitter} from 'react-native';

export type LeanplumVariableValue = String | Boolean | Number;

class LeanplumSdkModule extends NativeEventEmitter {
  private readonly nativeModule: any;
  private static readonly PURCHASE_EVENT_NAME: string = 'Purchase';
  private static readonly VALUE_CHANGE_HANDLER: string = 'valueChangedHandler';
  private static readonly ON_VARIABLE_CHANGE_LISTENER: string =
    'onVariableChanged';
  private static readonly ON_VARIABLES_CHANGE_LISTENER: string =
    'onVariablesChanged';

  private static variableValue = new Map<string, LeanplumVariableValue>();
  private static variableCallbackFunction = new Map<string, Function>();

  valueChangedHandler(event: any) {
    for (var key in event) {
      if (event.hasOwnProperty(key)) {
        LeanplumSdkModule.variableValue.set(key, event[key]);
        if (LeanplumSdkModule.variableCallbackFunction.has(key)) {
          const func = LeanplumSdkModule.variableCallbackFunction.get(key);
          if (func != undefined) func.call(func);
        }
      }
    }
  }

  constructor(nativeModule: any) {
    super(nativeModule);
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      this.nativeModule = nativeModule;
    } else {
      this.throwUnsupportedPlatform();
    }

    this.setListenersNames();

    DeviceEventEmitter.addListener(
      LeanplumSdkModule.VALUE_CHANGE_HANDLER,
      this.valueChangedHandler,
    );
  }

  setListenersNames(): void {
    this.nativeModule.setListenersNames(
      LeanplumSdkModule.ON_VARIABLE_CHANGE_LISTENER,
      LeanplumSdkModule.ON_VARIABLES_CHANGE_LISTENER,
    );
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

  /**
   * Define/Set variables using JSON object, we can use this method if we want to define multiple variables at once
   *
   * @param object object with multiple variables
   */
  setVariables(variablesObject: object) {
    this.nativeModule.setVariables(variablesObject);
  }

  /**
   * Define/Set variable, we can use this method if we want to define variable
   *
   * @param name name of the variable
   * @param defaultValue default value of the variable
   */
  setVariable(name: string, defaultValue: LeanplumVariableValue) {
    LeanplumSdkModule.variableValue.set(name, defaultValue);
    this.nativeModule.setVariable(name, defaultValue.toString(), defaultValue);
  }

  /**
   * Get value for specific variable, if we want to be sure that the method will return latest variable value
   * we need to invoke forceContentUpdate() before invoking getVariable
   *
   * @param name name of the variable
   * @returns a Promise with variable value
   */
  async getVariable(variableName: String): Promise<LeanplumVariableValue> {
    return await this.nativeModule.getVariable(variableName);
  }

  async getVariables(): Promise<any> {
    return await this.nativeModule.getVariables();
  }

  addValueChangedHandler(variableName: string, handler?: Function) {
    if (handler != undefined)
      LeanplumSdkModule.variableCallbackFunction.set(variableName, handler);

    this.nativeModule.addValueChangedHandler(
      variableName,
      LeanplumSdkModule.VALUE_CHANGE_HANDLER,
    );
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
    purchaseEvent: string = LeanplumSdkModule.PURCHASE_EVENT_NAME,
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

  onStartResponse(callback: (success: boolean) => void) {
    this.nativeModule.onStartResponse(callback);
  }

  onVariableChanged(
    variableName: string,
    callback: (value: LeanplumVariableValue) => void,
  ) {
    this.nativeModule.onVariableChanged(variableName);
    this.addListener(
      `${LeanplumSdkModule.ON_VARIABLE_CHANGE_LISTENER}.${variableName}`,
      callback,
    );
  }

  onVariablesChanged(callback: (value: any) => void) {
    this.nativeModule.onVariablesChanged();
    this.addListener(LeanplumSdkModule.ON_VARIABLES_CHANGE_LISTENER, callback);
  }
}

const Leanplum = new LeanplumSdkModule(NativeModules.LeanplumSdk);
export {Leanplum};
