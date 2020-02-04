package com.rondoapp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONObject;
import org.json.JSONException;

import android.location.Location;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import static com.leanplum.Leanplum.getContext;
import com.leanplum.Leanplum;
import com.leanplum.LeanplumLocationAccuracyType;
import com.leanplum.annotations.Parser;
import com.leanplum.Var;

import com.rondoapp.variables.Type;
import com.rondoapp.variables.HandlerManager;
import com.rondoapp.variables.JsonHelper;
import com.rondoapp.variables.MapHelper;

public class LeanplumSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static final String TAG = LeanplumSdkModule.class.getName();
    public static List variables = new ArrayList();



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

    /**
     * Define/Set variables using JSON object, we can use this method if we want to define multiple variables at once
     *
     * @param json JSON string
     */
    @ReactMethod
    public void setVariables(String json) throws JSONException {
        try {
             JSONObject jsonObject = new JSONObject(json);
             Map<String, Object> variablesMap = JsonHelper.toMap(jsonObject);
             Map<String, Object> variablesFlatMap = MapHelper.toFlatMap(variablesMap);

             for (Entry<String, Object> entry : variablesFlatMap.entrySet()) {
                 String key = entry.getKey();
                 Object value = entry.getValue();
                if (entry.getValue() instanceof String) {
                    this.setVariable(key, value.toString(), Type.STRING.label);
                }  else if (entry.getValue() instanceof Double) { 
                    this.setVariable(key, value.toString(), Type.NUMBER.label); 
                } else if (entry.getValue() instanceof Boolean) { 
                    this.setVariable(key, value.toString(), Type.BOOLEAN.label);
                } else if(entry.getValue() instanceof List) {
                    variables.add(Var.define(key, (List)value));
                }
            } 
        } catch (JSONException e) {
            e.printStackTrace();
            throw new JSONException(e);
        }
    }

    /**
     * Define/Set variable, we can use this method if we want to define variable
     *
     * @param name name of the variable
     * @param defaultValue default value of the variable
     * @param type type of the variable String | Number | Boolean
     */
    @ReactMethod
    public void setVariable(String name, String defaultValue, String type) {
        if (type.equalsIgnoreCase(Type.STRING.label)) {
            variables.add(Var.define(name, defaultValue));
        }

        if (type.equalsIgnoreCase(Type.NUMBER.label)) {
            variables.add(Var.define(name, Double.parseDouble(defaultValue)));
        }

        if (type.equalsIgnoreCase(Type.BOOLEAN.label)) {
            variables.add(Var.define(name, Boolean.parseBoolean(defaultValue)));
        }
    }
    
    @ReactMethod
    public void start() {
        Leanplum.start(getContext());
    }

    /**
     * add value change handler for specific variable
     * 
     * @param name name of the variable on which we will register the handler
     * @param event name of the event that will be propagated to RN
     */
    @ReactMethod
    public void addValueChangedHandler(String name, String event) {
        for (Object varaible : variables) {
            if (varaible instanceof Var<?>) {
                Var<?> var = (Var<?>)varaible;
                if (var.name().equals(name)){
                    HandlerManager handlerManager = new HandlerManager(reactContext);
                    handlerManager.addValueChangedHandler(var, event);
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
    
    /**
     * parse all variables that were defined using setVariable or setVariables methods
     * 
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
