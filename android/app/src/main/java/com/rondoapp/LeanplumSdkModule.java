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
    public static Map<String, String> variables = new HashMap<String, String>();
    public static List<Var<String>> variablesList = new ArrayList<Var<String>>();



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
    public void setVariables(ReadableMap attributes) {
        Log.d(ReactConstants.TAG, "SET VARIABLES");
        Log.d(ReactConstants.TAG, "attributes:" + attributes.toString());
        ReadableMapKeySetIterator iterator = attributes.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            Log.d(ReactConstants.TAG, "KEY:" + key);
            Log.d(ReactConstants.TAG, "VAL:" + attributes.getString(key));
            variablesList.add(Var.define(key, attributes.getString(key)));
        }
        //Log.d(ReactConstants.TAG, attributes.toString());
        //Log.d(ReactConstants.TAG, attributes.toHashMap().toString());
        //LeanplumSdkModule.variables = attributes.toHashMap();
        //return LeanplumSdkModule.variables.get("welcomeLabel");
    }

    @ReactMethod
    public void setVariable(String variableName, String variableDefaultValue) {
        variablesList.add(Var.define(variableName, variableDefaultValue));
        // Log.d(ReactConstants.TAG, "SET VARIABLES");
        // Log.d(ReactConstants.TAG, "attributes:" + attributes.toString());
        // ReadableMapKeySetIterator iterator = attributes.keySetIterator();
        // while (iterator.hasNextKey()) {
        //     String key = iterator.nextKey();
        //     Log.d(ReactConstants.TAG, "KEY:" + key);
        //     Log.d(ReactConstants.TAG, "VAL:" + attributes.getString(key));
        //     variablesList.add(Var.define(key, attributes.getString(key)));
        // }
        //Log.d(ReactConstants.TAG, attributes.toString());
        //Log.d(ReactConstants.TAG, attributes.toHashMap().toString());
        //LeanplumSdkModule.variables = attributes.toHashMap();
        //return LeanplumSdkModule.variables.get("welcomeLabel");
    }
    
    @ReactMethod
    public void start() {
        if (BuildConfig.DEBUG) {
            Log.d(ReactConstants.TAG, "DEV MODE");
        }
        //Var<String> welcomeLabel = Var.define("welcomeLabel", "Welcome!");
        //Log.d(ReactConstants.TAG, welcomeLabel.toString());
        Parser.parseVariables(LeanplumSdkModule.variablesList);
        Log.d(ReactConstants.TAG, "PARSE FINISHED");
        Leanplum.start(getContext());
        Log.d(ReactConstants.TAG, "START FINISHED");
        //Leanplum.forceContentUpdate();
        //Log.d(ReactConstants.TAG, "FORCE UPDATE FINISHED");
        // Then add a handler and pass it a new callback.
        // Log.d(ReactConstants.TAG, "variablesList: " + String.valueOf(variablesList.size()));
        // for (Var<String> varaibleDefinied : variablesList){
        //     Log.d(ReactConstants.TAG, "variablesList step");
        //     varaibleDefinied.addValueChangedHandler(new VariableCallback<String>() {
        //         @Override
        //         public void handle(Var<String> var) {
        //             //TODO invoke RN function
        //             Log.d(ReactConstants.TAG, "VALUE CHANGED TRIGGERED");
        //             LeanplumSdkModule.variables.put(var.name(), var.stringValue());
        //             Log.d(ReactConstants.TAG, var.name());
        //             Log.d(ReactConstants.TAG, var.stringValue());
        //         }
        //     });
        // }
        /////////////////////////////////////////////////////////
        // Leanplum.addStartResponseHandler(new StartCallback() {
        //     @Override
        //     public void onResponse(boolean b) {
        //         Log.d(ReactConstants.TAG, "CALLBACK TRIGGERED");
        //         Log.d(ReactConstants.TAG, Boolean.toString(b));
        //         // Insert code here.
        //     }
        // });
    }

    public void addStartResponseHandler(String variableName){ 
        Leanplum.addStartResponseHandler(new StartCallback() {
            @Override
            public void onResponse(boolean b) {
              // Insert code here.
            }
          });
    }

    @ReactMethod
    public void addValueChangedHandler(String variableName){
        for (Var<String> varaibleDefinied : variablesList){
            if (varaibleDefinied.name().equals(variableName)) {
                Log.d(ReactConstants.TAG, "Set addValueChangedHandler for: " + variableName);
                varaibleDefinied.addValueChangedHandler(new VariableCallback<String>() {
                    @Override
                    public void handle(Var<String> var) {
                        WritableMap event = Arguments.createMap();
                        event.putString(var.name(), var.stringValue());
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("valueChangedHandler", event);
                        // WritableMap event = Arguments.createMap();
                        // event.putString(var.name(), var.stringValue());
                        // this.reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        //     getId(),
                        //     "topChange",
                        //     event);
                        // Log.d(ReactConstants.TAG, "VALUE CHANGED TRIGGERED");
                        // LeanplumSdkModule.variables.put(var.name(), var.stringValue());
                        // Log.d(ReactConstants.TAG, var.name());
                        // Log.d(ReactConstants.TAG, var.stringValue());
                    }
                });
                break;
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
