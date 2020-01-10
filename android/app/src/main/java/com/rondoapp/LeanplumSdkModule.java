package com.rondoapp;

import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;


import com.facebook.react.bridge.ReadableMap;
import com.leanplum.Leanplum;

import static com.leanplum.Leanplum.getContext;


public class LeanplumSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;


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
    public void start(Callback startCallback) {
        Leanplum.start(getContext());
        startCallback.invoke(Leanplum.getInbox().count());
    }



    @ReactMethod
    public void track(String event, ReadableMap params) {
        Leanplum.track(event, params.toHashMap());
    }
}
