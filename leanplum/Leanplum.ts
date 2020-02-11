import {NativeModules, Platform, NativeEventEmitter} from 'react-native';
import {LocationAccuracyType} from './location-accuracy-type';
import {DeviceEventEmitter} from 'react-native';

export type VariableValue = string | boolean | number | Array<any> | object;

interface AllVariablesValue {
  [name: string]: VariableValue;
}

class LeanplumSdkModule extends NativeEventEmitter {
  private nativeModule: any;
  PURCHASE_EVENT_NAME: string = 'Purchase';
  private static readonly VALUE_CHANGE_HANDLER: string = 'valueChangedHandler';
  private static readonly ALL_VARIABLES_READY_HANDLER: string =
    'variablesReadyHandler';

  private static variableValue: Map<
    String,
    String | Boolean | Number | object
  > = new Map<String, String | Boolean | Number | object>();
  private static variableAsset = new Map<String, String>();
  private static variableCallbackFunction: Map<String, Function> = new Map<
    String,
    Function
  >();

  private static callbackFunction: Map<String, Function> = new Map<
    String,
    Function
  >();

  valueChangedHandler(event: any) {
    for (var key in event) {
      if (event.hasOwnProperty(key)) {
        // console.log('valueChangedHandler-key', key);
        // console.log(
        //   'valueChangedHandler-variableAsset',
        //   LeanplumSdkModule.variableAsset,
        // );
        if (LeanplumSdkModule.variableAsset.has(key)) {
          LeanplumSdkModule.variableAsset.set(key, event[key][key + '-asset']);
          LeanplumSdkModule.variableValue.set(key, event[key][key + '-value']);
        } else {
          try {
            LeanplumSdkModule.variableValue.set(key, JSON.parse(event[key]));
          } catch (e) {
            LeanplumSdkModule.variableValue.set(key, event[key]);
          }
        }
        if (LeanplumSdkModule.variableCallbackFunction.has(key)) {
          const func = LeanplumSdkModule.variableCallbackFunction.get(key);
          if (func != undefined) func.call(func);
        }
      }
    }
  }

  variablesReadyHandler() {
    if (
      LeanplumSdkModule.callbackFunction.has(
        LeanplumSdkModule.ALL_VARIABLES_READY_HANDLER,
      )
    ) {
      const func = LeanplumSdkModule.callbackFunction.get(
        LeanplumSdkModule.ALL_VARIABLES_READY_HANDLER,
      );
      if (func != undefined) func.call(func);
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
  }

  setListenersNames(): void {
    this.nativeModule.setListenersNames(
      LeanplumSdkModule.VALUE_CHANGE_HANDLER,
      LeanplumSdkModule.ALL_VARIABLES_READY_HANDLER,
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
   * Define/Set multiple primitive variables using JSON object, we can use this method if we want to define multiple variables at once
   *
   * @param object object with multiple variables
   */
  setVariables(variablesObject: object): void {
    this.nativeModule.setVariables(variablesObject);
  }

  /**
   * Define/Set asset, we can use this method if we want to define asset
   *
   * @param name name of the variable
   * @param defaultValue default value of the variable
   */
  setAsset(name: String, defaultValue: String) {
    LeanplumSdkModule.variableValue.set(name, defaultValue);
    LeanplumSdkModule.variableAsset.set(name, '');
    this.nativeModule.setAsset(name, defaultValue);
  }

  /**
   * Get value for specific variable, if we want to be sure that the method will return latest variable value
   * we need to invoke forceContentUpdate() before invoking getVariable
   *
   * @param name name of the variable
   * @param defaultValue default value of the variable
   */
  getVariable(name: String): Promise<VariableValue> {
    return this.nativeModule.getVariable(name);
  }

  /**
   * Get value for specific variable, if we want to be sure that the method will return latest variable value
   * we need to invoke forceContentUpdate() before invoking getVariable
   *
   * @param name name of the variable
   * @param defaultValue default value of the variable
   */
  getVariables(): Promise<AllVariablesValue> {
    return this.nativeModule.getVariables();
  }

  getAsset(name: String) {
    if (LeanplumSdkModule.variableAsset.has(name))
      return LeanplumSdkModule.variableAsset.get(name);

    return '';
  }

  /**
   * add value change handler for specific variable
   *
   * @param name name of the variable on which we will register the handler
   * @param handler function that is going to be invoked when value is changed
   */
  onValueChanged(
    variableName: string,
    callback: (value: VariableValue) => void,
  ) {
    this.nativeModule.onValueChanged(variableName);
    this.addListener(
      `${LeanplumSdkModule.VALUE_CHANGE_HANDLER}.${variableName}`,
      callback,
    );
  }

  /**
   * add callback when start finishes
   *
   * @param handler callback that is going to be invoked when start finishes
   */
  onStartResponse(handler: (success: boolean) => void) {
    this.nativeModule.onStartResponse(handler);
  }

  /**
   * add callback when all variables are ready
   *
   * @param handler callback that is going to be invoked when all variables are ready
   */
  addVariablesChangedHandler(handler: Function) {
    console.log('addVariablesChangedHandler');
    LeanplumSdkModule.callbackFunction.set(
      LeanplumSdkModule.ALL_VARIABLES_READY_HANDLER,
      handler,
    );

    this.nativeModule.addVariablesChangedHandler(
      LeanplumSdkModule.ALL_VARIABLES_READY_HANDLER,
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
