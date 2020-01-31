import {NativeModules, NativeModulesStatic, Platform} from 'react-native';
import {LocationAccuracyType} from './location-accuracy-type';
import {DeviceEventEmitter} from 'react-native';

class LeanplumSdkModule {
  private nativeModule: NativeModulesStatic = {};
  PURCHASE_EVENT_NAME: string = 'Purchase';
  private static readonly VALUE_CHANGE_HANDLER: string = 'valueChangedHandler';
  private static readonly START_RESPONSE_HANDLER: string =
    'startResponseHandler';
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
    console.log('valueChangedHandler', event);
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

  startResponseHandler(event: any) {
    if (
      LeanplumSdkModule.callbackFunction.has(
        LeanplumSdkModule.START_RESPONSE_HANDLER,
      )
    ) {
      const func = LeanplumSdkModule.callbackFunction.get(
        LeanplumSdkModule.START_RESPONSE_HANDLER,
      );
      if (func != undefined) func.call(func, event['b']);
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
  
  constructor(nativeModule: NativeModulesStatic) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      this.nativeModule = nativeModule;
    } else {
      this.throwUnsupportedPlatform();
    }
    
    DeviceEventEmitter.addListener(
      LeanplumSdkModule.VALUE_CHANGE_HANDLER,
      this.valueChangedHandler,
    );
    DeviceEventEmitter.addListener(
      LeanplumSdkModule.START_RESPONSE_HANDLER,
      this.startResponseHandler,
    );
    DeviceEventEmitter.addListener(
      LeanplumSdkModule.ALL_VARIABLES_READY_HANDLER,
      this.variablesReadyHandler,
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
  
  parseVariables() {
    this.nativeModule.parseVariables();
  }

<<<<<<< Upstream, based on origin/develop
  /**
   * Define/Set multiple primitive variables using JSON object, we can use this method if we want to define multiple variables at once
   *
   * @param object object with multiple variables
   */
  setVariables(variablesObject: object) {
    this.nativeModule.setVariables(variablesObject);
  }

 /**
   * Define/Set variable, you can use this method if you want to define variable
   *
   * @param name name of the variable
   * @param defaultValue default value of the variable
   */
  setVariable(
    name: String,
    defaultValue: String | Number | Boolean | object | any[],
  ) {
    LeanplumSdkModule.variableValue.set(name, defaultValue);
    if (
      typeof defaultValue == 'string' ||
      typeof defaultValue == 'number' ||
      typeof defaultValue == 'boolean'
    ) {
      this.nativeModule.setVariable(
        name,
        defaultValue.toString(),
        typeof defaultValue,
      );
    } else if (typeof defaultValue == 'object') {
      if (Array.isArray(defaultValue)) {
        this.nativeModule.setListVariable(name, defaultValue);
      } else {
        this.nativeModule.setMapVariable(name, defaultValue);
      }
    }
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
  getVariable(name: String) {
    if (LeanplumSdkModule.variableValue.has(name))
      return LeanplumSdkModule.variableValue.get(name);
    //return this.nativeModule.getVariable(name);

    return '';
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
  addValueChangedHandler(name: String, handler?: Function) {
    if (handler != undefined)
      LeanplumSdkModule.variableCallbackFunction.set(name, handler);
    console.log('addValueChangedHandler: ', name);

    this.nativeModule.addValueChangedHandler(
      name,
      LeanplumSdkModule.VALUE_CHANGE_HANDLER,
    );
  }

  /**
   * add callback when start finishes
   *
   * @param handler callback that is going to be invoked when start finishes
   */
  addStartResponseHandler(handler: Function) {
    console.log('addStartResponseHandler');
    LeanplumSdkModule.callbackFunction.set(
      LeanplumSdkModule.START_RESPONSE_HANDLER,
      handler,
    );

    this.nativeModule.addStartResponseHandler(
      LeanplumSdkModule.START_RESPONSE_HANDLER,
    );
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
