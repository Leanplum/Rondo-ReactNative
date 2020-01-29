package com.rondoapp;

import android.location.Location;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMapKeySetIterator;


import com.facebook.react.bridge.ReadableMap;
import com.leanplum.Leanplum;
import com.leanplum.LeanplumLocationAccuracyType;
import com.leanplum.annotations.Parser;

import static com.leanplum.Leanplum.getContext;
import com.leanplum.Var;
import android.util.Log;
import com.facebook.react.common.ReactConstants;
import com.leanplum.callbacks.VariableCallback;
import com.leanplum.callbacks.StartCallback;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;


public class LeanplumSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static final String TAG = LeanplumSdkModule.class.getName();
    public static List variablesList = new ArrayList();



    public LeanplumSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "LeanplumSdk";
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
    
    // @ReactMethod
    // public void setVariables(ReadableMap attributes) {
    //     Log.d(ReactConstants.TAG, "SET VARIABLES");
    //     Log.d(ReactConstants.TAG, "attributes:" + attributes.toString());
    //     ReadableMapKeySetIterator iterator = attributes.keySetIterator();
    //     while (iterator.hasNextKey()) {
    //         String key = iterator.nextKey();
    //         Log.d(ReactConstants.TAG, "KEY:" + key);
    //         Log.d(ReactConstants.TAG, "VAL:" + attributes.getString(key));
    //         variablesList.add(Var.define(key, attributes.getString(key)));
    //     }
    // }

    @ReactMethod
    public void setStringVariable(String variableName, String variableDefaultValue) {
        Log.d(ReactConstants.TAG, "VAR IS STRING");    
        Log.d(ReactConstants.TAG, "VAR TYPE:" + variableDefaultValue.getClass().getSimpleName());
        Var<String> var = Var.define(variableName, variableDefaultValue);
        variablesList.add(var);
    }

    @ReactMethod
    public void setBooleanVariable(String variableName, Boolean variableDefaultValue) {
        Log.d(ReactConstants.TAG, "VAR IS BOOLEAN");    
        Log.d(ReactConstants.TAG, "VAR TYPE:" + variableDefaultValue.getClass().getSimpleName());
        Var<Boolean> var = Var.define(variableName, variableDefaultValue);
        variablesList.add(var);
    }

    @ReactMethod
    public void setNumberVariable(String variableName, Double variableDefaultValue) {
        Log.d(ReactConstants.TAG, "VAR IS Double");    
        Log.d(ReactConstants.TAG, "VAR TYPE:" + variableDefaultValue.getClass().getSimpleName());
        Var<Double> var = Var.define(variableName, variableDefaultValue);
        variablesList.add(var);
    }
    
    @ReactMethod
    public void start() {
        if (BuildConfig.DEBUG) {
            Log.d(ReactConstants.TAG, "DEV MODE");
        }
        Parser.parseVariables(LeanplumSdkModule.variablesList);
        Log.d(ReactConstants.TAG, "PARSE FINISHED");
        Leanplum.start(getContext());
        Log.d(ReactConstants.TAG, "START FINISHED");
    }

    @ReactMethod
    public void addValueChangedHandler(String variableName){
        for (Object varaibleDefinied : variablesList){
            if (varaibleDefinied instanceof Var<?>) {
                Var<?> var = (Var<?>)varaibleDefinied;
                if (var.name().equals(variableName)){
                    Log.d(ReactConstants.TAG, "VAR: " + var.name() + " - " + var.kind());
                    if (var.kind().equals("string")) {
                        Var<String> variableString = (Var<String>)varaibleDefinied;
                        Log.d(ReactConstants.TAG, "variableString: " + variableString.name() + " - " + variableString.value());
                        variableString.addValueChangedHandler(new VariableCallback<String>() {
                                @Override
                                public void handle(Var<String> var) {
                                    WritableMap event = Arguments.createMap();
                                    Log.d(ReactConstants.TAG, "var.value().getClass(): " + var.value().getClass());
                                    event.putString(var.name(), var.value());
                                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("valueChangedHandler", event);
                                }
                            });
                    } else if  (var.kind().equals("float")) {
                        Var<Double> variableFloat = (Var<Double>)varaibleDefinied;
                        //Log.d(ReactConstants.TAG, "variableFloat: " + variableFloat.name() + " - " + variableFloat.value().toString());
                        variableFloat.addValueChangedHandler(new VariableCallback<Double>() {
                            @Override
                            public void handle(Var<Double> var) {
                                WritableMap event = Arguments.createMap();
                                Log.d(ReactConstants.TAG, "var.value().getClass(): " + var.value().getClass());
                                event.putDouble(var.name(), var.value());
                                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("valueChangedHandlerDouble", event);
                            }
                        });
                    } else if  (var.kind().equals("bool")) {
                        Var<Boolean> variableBool = (Var<Boolean>)varaibleDefinied;
                        Log.d(ReactConstants.TAG, "variableBool: " + variableBool.name() + " - " + variableBool.value().toString());
                        variableBool.addValueChangedHandler(new VariableCallback<Boolean>() {
                            @Override
                            public void handle(Var<Boolean> var) {
                                WritableMap event = Arguments.createMap();
                                Log.d(ReactConstants.TAG, "var.value().getClass(): " + var.value().getClass());
                                event.putBoolean(var.name(), var.value());
                                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("valueChangedHandlerBool", event);
                            }
                        });
                    }
                }
            }
        }
    }

    @ReactMethod
    public void forceContentUpdate() {
        Log.d(ReactConstants.TAG, "FORCE CONTENT UPDATE");
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
    
    @ReactMethod
    public void parseVariables() {
        Var<String> welcomeLabel = Var.define("welcomeLabel", "Welcome!");
        Parser.parseVariables(welcomeLabel);
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
