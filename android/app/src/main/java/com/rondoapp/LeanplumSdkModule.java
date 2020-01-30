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
import com.rondoapp.variables.Type;
import com.rondoapp.variables.HandlerManager;


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

    @ReactMethod
    public void setVariable(String variableName, String variableDefaultValue, String type) {
        if (type.equalsIgnoreCase(Type.STRING.label)) {
            variablesList.add(Var.define(variableName, variableDefaultValue));
        }

        if (type.equalsIgnoreCase(Type.BOOLEAN.label)) {
            variablesList.add(Var.define(variableName, Boolean.parseBoolean(variableDefaultValue)));
        }

        if (type.equalsIgnoreCase(Type.NUMBER.label)) {
            variablesList.add(Var.define(variableName, Double.parseDouble(variableDefaultValue)));
        }
    }
    
    @ReactMethod
    public void start() {
        Leanplum.start(getContext());
    }

    @ReactMethod
    public void addValueChangedHandler(String variableName, String listenerName) {
        for (Object varaibleDefinied : variablesList) {
            if (varaibleDefinied instanceof Var<?>) {
                Var<?> var = (Var<?>)varaibleDefinied;
                if (var.name().equals(variableName)){
                    HandlerManager handlerManager = new HandlerManager(reactContext);
                    handlerManager.addValueChangedHandler(var, listenerName);
                }
            }
        }
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
    
    @ReactMethod
    public void parseVariables() {
        Parser.parseVariables(LeanplumSdkModule.variablesList);
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
