package com.rondoapp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.HashMap;

import org.json.JSONObject;
import org.json.JSONException;

import android.location.Location;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;

import static com.leanplum.Leanplum.getContext;
import com.leanplum.Leanplum;
import com.leanplum.LeanplumLocationAccuracyType;
import com.leanplum.annotations.Parser;
import com.leanplum.Var;

import com.rondoapp.variables.Type;
import com.rondoapp.variables.CallBackManager;
import com.rondoapp.variables.MapHelper;

////////////////////////////////////////////////
import android.util.Log;
import com.facebook.react.common.ReactConstants;

public class LeanplumSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static final String TAG = LeanplumSdkModule.class.getName();
    //public static List variables = new ArrayList();
    public static Map<String, Object> variables = new HashMap<String, Object>();



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
     * @param object RN object
     */
    @ReactMethod
    public void setVariables(ReadableMap object) throws JSONException {
        Map<String, Object> variablesFlatMap = MapHelper.toFlatMap(object.toHashMap());
        for (Entry<String, Object> entry : variablesFlatMap.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (entry.getValue() instanceof String) {
                this.setVariable(key, value.toString(), Type.STRING.label);
            }  else if (entry.getValue() instanceof Double || entry.getValue() instanceof Integer || entry.getValue() instanceof Float) { 
                this.setVariable(key, value.toString(), Type.NUMBER.label); 
            } else if (entry.getValue() instanceof Boolean) {
                this.setVariable(key, value.toString(), Type.BOOLEAN.label);
            } else if(entry.getValue() instanceof List) {
                variables.put(key, Var.define(key, (List)value));
            }
        }
    }

    // TODO handle assets in RN
    /**
     * Define/Set asset, we can use this method if we want to define asset
     *
     * @param name name of the variable
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
     * @param name name of the variable
     * @param defaultValue default value of the variable
     * @param type type of the variable String | Number | Boolean
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

    /**
     * Define/Set variable, we can use this method if we want to define map variable
     *
     * @param name name of the variable
     * @param defaultValue default value of the variable
     */
    @ReactMethod
    public void setMapVariable(String name, ReadableMap defaultValue) {
        Log.d(ReactConstants.TAG, "add map variable" + defaultValue.toHashMap().toString());
        variables.put(name, Var.define(name, defaultValue.toHashMap()));
    }

    /**
     * Define/Set variable, we can use this method if we want to define list variable
     *
     * @param name name of the variable
     * @param defaultValue default value of the variable
     */
    @ReactMethod
    public void setListVariable(String name, ReadableArray defaultValue) {
        Log.d(ReactConstants.TAG, "add list variable" + defaultValue.toArrayList().toString());
        variables.put(name, Var.define(name, defaultValue.toArrayList()));
    }

    @ReactMethod
    public Object getVariable(String name) {
        Log.d(ReactConstants.TAG, "get variable" + name);
        if (variables.containsKey(name)){
            Log.d(ReactConstants.TAG, "getting variable" + name);
            return ((Var<?>)variables.get(name)).value();
        }
        return new Object();
    }
    
    @ReactMethod
    public void start() {
        Leanplum.start(getContext());
    }

    /**
     * add value change callback for specific variable
     * 
     * @param name name of the variable on which we will register the handler
     * @param event name of the event that will be propagated to RN
     */
    @ReactMethod
    public void addValueChangedHandler(String name, String event) {
        //for (Object varaible : variables) {
          //  if (varaible instanceof Var<?>) {
                Var<?> var = (Var<?>)variables.get(name);
                if (var.name().equals(name)){
                    CallBackManager callBackManager = new CallBackManager(reactContext);
                    callBackManager.addValueChangedHandler(var, event);
                }
           // }
        //}
    }

    /**
     * add callback when start finishes
     * 
     * @param event name of the event that will be propagated to RN
     */
    @ReactMethod
    public void addStartResponseHandler(String event) {
        CallBackManager callBackManager = new CallBackManager(reactContext);
        callBackManager.addStartResponseHandler(event);
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
