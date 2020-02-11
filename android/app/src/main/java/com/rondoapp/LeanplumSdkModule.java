package com.rondoapp;

import java.util.ArrayList;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.HashMap;


import org.json.JSONException;

import android.location.Location;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;

import static com.leanplum.Leanplum.getContext;


import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.leanplum.Leanplum;
import com.leanplum.LeanplumInboxMessage;
import com.leanplum.LeanplumLocationAccuracyType;
import com.leanplum.annotations.Parser;
import com.leanplum.Var;

import com.leanplum.callbacks.StartCallback;
import com.leanplum.callbacks.VariableCallback;
import com.leanplum.internal.Constants;
import com.rondoapp.utils.ArrayUtil;
import com.rondoapp.utils.MapUtil;
import com.rondoapp.utils.Type;
import com.rondoapp.utils.CallBackManager;

import android.util.Log;


import com.facebook.react.common.ReactConstants;

public class LeanplumSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    public static Map<String, Object> variables = new HashMap<String, Object>();
    private static String onVariableChangedListenerName;
    private static String onVariablesChangedListenerName;


    public LeanplumSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "LeanplumSdk";
    }

    @ReactMethod
    public void setListenersNames(String onVariableChangedListenerName, String onVariablesChangedListenerName) {
        LeanplumSdkModule.onVariableChangedListenerName = onVariableChangedListenerName;
        LeanplumSdkModule.onVariablesChangedListenerName = onVariablesChangedListenerName;
    }

    @ReactMethod
    public void setAppIdForDevelopmentMode(String appId, String accessKey) {
        Leanplum.setAppIdForDevelopmentMode(appId, accessKey);
    }

    @ReactMethod
    public void setAppIdForProductionMode(String appId, String accessKey) {
        Leanplum.setAppIdForProductionMode(appId, accessKey);
    }

    @ReactMethod
    public void setDeviceId(String id) {
        Leanplum.setDeviceId(id);
    }

    @ReactMethod
    public void setUserId(String id) {
        Leanplum.setUserId(id);
    }

    @ReactMethod
    public void setUserAttributes(ReadableMap attributes) {
        Leanplum.setUserAttributes(attributes.toHashMap());
    }

    /**
     * Define/Set variables using JSON object, we can use this method if we want to define multiple variables at once
     *
     * @param object RN object
     */
    @ReactMethod
    public void setVariables(ReadableMap object) throws JSONException {
        for (Entry<String, Object> entry : object.toHashMap().entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            variables.put(key, Var.define(key, value));
        }
    }

    // TODO handle assets in RN

    /**
     * Define/Set asset, we can use this method if we want to define asset
     *
     * @param name         name of the variable
     * @param defaultValue default value of the variable
     */
    @ReactMethod
    public void setAsset(String name, String defaultValue) {
        Log.d(ReactConstants.TAG, "add asset variable:" + name);
        Var<String> var = Var.defineAsset(name, defaultValue);
        Log.d(ReactConstants.TAG, "var value:" + var.value());
        Log.d(ReactConstants.TAG, "var fileValue:" + var.fileValue());
        variables.put(name, var);
    }

    /**
     * Define/Set variable, we can use this method if we want to define variable
     *
     * @param name         name of the variable
     * @param defaultValue default value of the variable
     * @param type         type of the variable String | Number | Boolean
     */
    @ReactMethod
    public void setVariable(String name, String defaultValue, String type) {
        if (type.equalsIgnoreCase(Type.STRING.label)) {
            variables.put(name, Var.define(name, defaultValue));
        }

        if (type.equalsIgnoreCase(Type.NUMBER.label)) {
            variables.put(name, Var.define(name, Double.parseDouble(defaultValue)));
        }

        if (type.equalsIgnoreCase(Type.BOOLEAN.label)) {
            variables.put(name, Var.define(name, Boolean.parseBoolean(defaultValue)));
        }
    }

    @ReactMethod
    public void getVariable(String name, Promise promise) {
        promise.resolve(getVariableValue(name));
    }

    private Object getVariableValue(String name) {
        if (variables.containsKey(name)) {
            Var<?> variable = (Var<?>) variables.get(name);
            Object variableValue = variable.value();
            Object value;
            switch (variable.kind()) {
                case Constants.Kinds.DICTIONARY:
                    value = MapUtil.toWritableMap((Map<String, Object>) variableValue);
                    break;
                case Constants.Kinds.ARRAY:
                    value = ArrayUtil.toWritableArray((ArrayList) variableValue);
                    break;
                default:
                    value = variableValue;
            }
            return value;
        }
        // TODO throw an Error
        return new Object();
    }

    @ReactMethod
    public void getVariables(Promise promise) {
        WritableMap writableMap = Arguments.createMap();
        for (Entry<String, Object> entry : variables.entrySet()) {
            String key = entry.getKey();
            Var<?> value = (Var<?>) entry.getValue();
            WritableMap variableWritableMap = MapUtil.addValue(key, value.value());
            writableMap.merge(variableWritableMap);
        }
        promise.resolve(writableMap);
    }

    @ReactMethod
    public void start() {
        Leanplum.start(getContext());
    }

    /**
     * add value change callback for specific variable
     *
     * @param name  name of the variable on which we will register the handler
     */
    @ReactMethod
    public void onValueChanged(String name) {
        Var<Object> var = (Var<Object>) variables.get(name);
        var.addValueChangedHandler(new VariableCallback<Object>() {
            @Override
            public void handle(Var<Object> var) {
                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(onVariableChangedListenerName + "." + name, getVariableValue(name));
            }
        });
    }

    /**
     * add callback when start finishes
     *
     * @param successCallback Success Callback
     */
    @ReactMethod
    public void onStartResponse(Callback successCallback) {
        Leanplum.addStartResponseHandler(new StartCallback() {
            @Override
            public void onResponse(boolean success) {
                successCallback.invoke(success);
            }
        });
    }

    /**
     * add callback when all variables are ready
     *
     * @param event name of the event that will be propagated to RN
     */
    @ReactMethod
    public void addVariablesChangedHandler(String event) {
        CallBackManager callBackManager = new CallBackManager(reactContext);
        callBackManager.addVariablesChangedHandler(event);
    }


    @ReactMethod
    public void forceContentUpdate() {
        Leanplum.forceContentUpdate();
    }

    @ReactMethod
    public void track(String event, ReadableMap params) {
        Leanplum.track(event, params.toHashMap());
    }

    @ReactMethod
    public void trackPurchase(String purchaseEvent, Double value, String currencyCode, ReadableMap purchaseParams) {
        Leanplum.trackPurchase(purchaseEvent, value, currencyCode, purchaseParams.toHashMap());
    }


    @ReactMethod
    public void disableLocationCollection() {
        Leanplum.disableLocationCollection();
    }

    /**
     * parse all variables that were defined using setVariable or setVariables methods
     */
    @ReactMethod
    public void parseVariables() {
        Parser.parseVariables(LeanplumSdkModule.variables);
    }

    @ReactMethod
    public void setDeviceLocation(Double latitude, Double longitude, Integer type) {
        Location location = new Location("");
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        LeanplumLocationAccuracyType accuracyType = LeanplumLocationAccuracyType.values()[type];
        Leanplum.setDeviceLocation(location, accuracyType);
    }
}
