package com.rondoapp.variables;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.json.JSONObject;
import org.json.JSONArray;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.common.ReactConstants;

import com.leanplum.Leanplum;
import com.leanplum.callbacks.VariableCallback;
import com.leanplum.callbacks.StartCallback;
import com.leanplum.callbacks.VariablesChangedCallback;
import com.leanplum.internal.Constants;
import com.leanplum.Var;

// HANDLING STREAMS ///////////////////////
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
///////////////////////////////////////////

////////////////////
import android.util.Log;
import com.facebook.react.common.ReactConstants;

/**
 * Class for registering callbacks
 * 
 */
public class CallBackManager {
    //TODO maybe this class needs to be singelton
    private ReactApplicationContext reactContext;

    public CallBackManager(ReactApplicationContext reactContext) {
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
        } else if  (var.kind().equals(Constants.Kinds.FILE)) {
            //TODO handle assets in RN 
            this.addFileValueChangeHandler(var, event);   
        } else if (var.kind().equals(Constants.Kinds.DICTIONARY)) {
            addMapValueChangeHandler(var, event);
        }  else if (var.kind().equals(Constants.Kinds.ARRAY)) {
            addListValueChangeHandler(var, event);
        }
    }   

     /**
     * register start event that will be triggered in RN
     * 
     * @param event name of the event
     */
    public void addStartResponseHandler(final String event){
        Leanplum.addStartResponseHandler(new StartCallback() {
            @Override
            public void onResponse(boolean b) {
                WritableMap args = Arguments.createMap();
                args.putBoolean("b", b);
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, args);
            }
        });
    }

    /**
     * register all values change event that will be triggered in RN
     * 
     * @param event name of the event
     */
    public void addVariablesChangedHandler(final String event){
        Leanplum.addVariablesChangedHandler(new VariablesChangedCallback() {
            @Override
            public void variablesChanged() {
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, null);
            }
        });
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

    private void addMapValueChangeHandler(Var<?> var, final String event){
        Log.d(ReactConstants.TAG, "addMapValueChangeHandler");
        Var<Map> variableMap = (Var<Map>)var;
        variableMap.addValueChangedHandler(new VariableCallback<Map>() {
            @Override
            public void handle(Var<Map> var) {
                Log.d(ReactConstants.TAG, "addMapValueChangeHandler-HANDLER" + var.value().toString());
                WritableMap args = Arguments.createMap();
                JSONObject jsonObject = new JSONObject(var.value());
                args.putString(var.name(), jsonObject.toString());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, args);
            }
        });
    }
    
    private void addListValueChangeHandler(Var<?> var, final String event){
        Log.d(ReactConstants.TAG, "addMapValueChangeHandler");
        Var<List> variableMap = (Var<List>)var;
        variableMap.addValueChangedHandler(new VariableCallback<List>() {
            @Override
            public void handle(Var<List> var) {
                Log.d(ReactConstants.TAG, "addMapValueChangeHandler-HANDLER" + var.value().toString());
                WritableMap args = Arguments.createMap();
                JSONArray jsonArray = new JSONArray(var.value());
                args.putString(var.name(), jsonArray.toString());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, args);
            }
        });
    }

    private void addFileValueChangeHandler(Var<?> var, final String event) {
        Log.d(ReactConstants.TAG, "addFileValueChangeHandler");
        Var<String> variableString = (Var<String>)var;
        variableString.addFileReadyHandler(new VariableCallback<String>() {
            @Override
            public void handle(Var<String> var) {
                try {
                    Log.d(ReactConstants.TAG, "addFileValueChangeHandler-handle");
                    InputStream finput = variableString.stream();
                    if (finput == null){
                        Log.d(ReactConstants.TAG, "VARIABLE STRING STREAM IS NULL");
                        finput = var.stream();
                    }
                    if (finput == null) {
                        Log.d(ReactConstants.TAG, "VARIABLE STREAM IS NULL");
                        return;
                    }
                    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                    int nRead;
                    byte[] data = new byte[1024];
                    while ((nRead = finput.read(data, 0, data.length)) != -1) {
                        buffer.write(data, 0, nRead);
                    }
                    buffer.flush();
                    finput.close();
                    byte[] byteArray = buffer.toByteArray();
                    String imageStr = Base64.getMimeEncoder().encodeToString(byteArray);
                    Log.d(ReactConstants.TAG, "BASE64" + imageStr);
                    //System.out.println("imageStr: " + imageStr);
                    //im.setImageBitmap(BitmapFactory.decodeStream(mario.stream()))
                    WritableMap args = Arguments.createMap();
                    args.putString(var.name(), imageStr);
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event, args);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}