package com.rondoapp.variables;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.common.ReactConstants;

import com.leanplum.callbacks.VariableCallback;
import com.leanplum.internal.Constants;
import com.leanplum.Var;

/**
 * Class for registering a value change handler for specific variable 
 * 
 */
public class HandlerManager {

    private ReactApplicationContext reactContext;

    public HandlerManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    /**
     * register value change handler for specific variable and register event that will be triggered in RN
     * 
     * @param var variable instance
     * @param event name of the event
     */
    public void addValueChangedHandler(Var<?> var, final String event){
        if (var.kind().equals(Constants.Kinds.STRING)) {
            this.addStringValueChangeHandler(var, event);
        } else if  (var.kind().equals(Constants.Kinds.FLOAT) || var.kind().equals(Constants.Kinds.INT)) {
            this.addDoubleValueChangeHandler(var, event);
        } else if  (var.kind().equals(Constants.Kinds.BOOLEAN)) {
            this.addBooleanValueChangeHandler(var, event);
        }
    }

    private void addStringValueChangeHandler(Var<?> var, final String event){
        Var<String> variableString = (Var<String>)var;
        variableString.addValueChangedHandler(new VariableCallback<String>() {
            @Override
            public void handle(Var<String> var) {
                WritableMap args = Arguments.createMap();
                args.putString(var.name(), var.value());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, args);
            }
        });
    }
    
    private void addDoubleValueChangeHandler(Var<?> var, final String event){
        Var<Double> variableFloat = (Var<Double>)var;
        variableFloat.addValueChangedHandler(new VariableCallback<Double>() {
            @Override
            public void handle(Var<Double> var) {
                WritableMap args = Arguments.createMap();
                args.putDouble(var.name(), var.value());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, args);
            }
        });
    }

    private void addBooleanValueChangeHandler(Var<?> var, final String event){
        Var<Boolean> variableBool = (Var<Boolean>)var;
        variableBool.addValueChangedHandler(new VariableCallback<Boolean>() {
            @Override
            public void handle(Var<Boolean> var) {
                WritableMap args = Arguments.createMap();
                args.putBoolean(var.name(), var.value());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, args);
            }
        });
    }
}