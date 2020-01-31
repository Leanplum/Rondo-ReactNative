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
import java.util.Map.Entry;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.rondoapp.variables.Type;
import com.rondoapp.variables.HandlerManager;
import com.rondoapp.variables.JsonHelper;
import org.json.JSONObject;
import java.util.Iterator;


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
    public void setVariables(String json) {
        try {
             JSONObject jsonObject = new JSONObject(json);
             Map<String, Object> variablesMap = JsonHelper.toMap(jsonObject);
             Map<String, Object> variablesFlatMap = JsonHelper.toFlatMap(variablesMap);

             for (Entry<String, Object> entry : variablesFlatMap.entrySet()) {
                 String key = entry.getKey();
                 Object value = entry.getValue();
                if (entry.getValue() instanceof String) {
                    Log.d(ReactConstants.TAG, "IS STRING key:" + key + " value:" + value.toString());
                    this.setVariable(key, value.toString(), "string");
                }  else if (entry.getValue() instanceof Double) { 
                    Log.d(ReactConstants.TAG, "IS NUMBER key:" + key + " value:" + value.toString());
                    this.setVariable(key, value.toString(), "number"); 
                } else if (entry.getValue() instanceof Boolean) { 
                    Log.d(ReactConstants.TAG, "IS BOOLEAN key:" + key + " value:" + value.toString());
                    this.setVariable(key, value.toString(), "boolean");
                } else if(entry.getValue() instanceof List) {
                    Log.d(ReactConstants.TAG, "IS LIST key:" + key + " value:" + value.toString());
                    variablesList.add(Var.define(key, (List)value));
                }
            }
            
        } catch (Exception e) {
            // TODO check how to throw exception in react method
            e.printStackTrace();
        }
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
