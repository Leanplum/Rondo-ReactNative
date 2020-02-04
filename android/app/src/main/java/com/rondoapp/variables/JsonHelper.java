package com.rondoapp.variables;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonHelper {

	/**
	 * convert JSON object to Map
	 * 
	 * @param JSON object that needs to be converted into a Map
	 * @return map created from the input JSON object
	 */
    public static Map<String, Object> toMap(JSONObject object) throws JSONException {
	    Map<String, Object> map = new HashMap<String, Object>();

	    Iterator<String> keysItr = object.keys();
	    while(keysItr.hasNext()) {
	        String key = keysItr.next();
	        Object value = object.get(key);

	        if(value instanceof JSONArray) {
	            value = JsonHelper.toList((JSONArray) value);
	        }

	        else if(value instanceof JSONObject) {
	            value = JsonHelper.toMap((JSONObject) value);
	        }
	        map.put(key, value);
	    }
	    return map;
	}

	/**
	 * convert JSON array to List
	 * 
	 * @param JSON array that needs to be converted into a List
	 * @return list created from the input JSON array
	 */
	public static List<Object> toList(JSONArray array) throws JSONException {
	    List<Object> list = new ArrayList<Object>();
	    for(int i = 0; i < array.length(); i++) {
	        Object value = array.get(i);
	        if(value instanceof JSONArray) {
	            value = toList((JSONArray) value);
	        }

	        else if(value instanceof JSONObject) {
	            value = toMap((JSONObject) value);
	        }
	        list.add(value);
	    }
	    return list;
	}
}