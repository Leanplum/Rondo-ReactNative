package com.rondoapp.variables;
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

public class HandlerManager {

    private ReactApplicationContext reactContext;

    public HandlerManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void addValueChangedHandler(Var<?> var, final String listenerName){
        if (var.kind().equals("string")) {
            this.addStringValueChangeHandler(var, listenerName);
        } else if  (var.kind().equals("float")) {
            this.addNumberValueChangeHandler(var, listenerName);
        } else if  (var.kind().equals("bool")) {
            this.addBooleanValueChangeHandler(var, listenerName);
        }
    }

    private void addStringValueChangeHandler(Var<?> var, final String listenerName){
        Var<String> variableString = (Var<String>)var;
        variableString.addValueChangedHandler(new VariableCallback<String>() {
            @Override
            public void handle(Var<String> var) {
                WritableMap event = Arguments.createMap();
                event.putString(var.name(), var.value());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(listenerName, event);
            }
        });
    }
    private void addNumberValueChangeHandler(Var<?> var, final String listenerName){
        Var<Double> variableFloat = (Var<Double>)var;
        variableFloat.addValueChangedHandler(new VariableCallback<Double>() {
            @Override
            public void handle(Var<Double> var) {
                WritableMap event = Arguments.createMap();
                event.putDouble(var.name(), var.value());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(listenerName, event);
            }
        });
    }

    private void addBooleanValueChangeHandler(Var<?> var, final String listenerName){
        Var<Boolean> variableBool = (Var<Boolean>)var;
        variableBool.addValueChangedHandler(new VariableCallback<Boolean>() {
            @Override
            public void handle(Var<Boolean> var) {
                WritableMap event = Arguments.createMap();
                event.putBoolean(var.name(), var.value());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(listenerName, event);
            }
        });
    }
}