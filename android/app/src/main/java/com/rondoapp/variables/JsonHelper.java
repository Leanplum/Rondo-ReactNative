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

    public static Map<String, Object> toFlatMap(Map<String, Object> map) {
		Map<String, Object> flatMap = new HashMap<String, Object>();
		for (Entry<String, Object> entry : map.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			if (value instanceof Map) {
				JsonHelper.flatMapHelper((Map<String, Object>) entry.getValue(), flatMap, key + ".");
			} else {
				flatMap.put(entry.getKey(), entry.getValue());
			}
		}

		return flatMap;
	}

	private static void flatMapHelper(Map<String, Object> map, Map<String, Object> flatMap, String sufix) {
		for (Entry<String, Object> entry : map.entrySet()) {
			if (entry.getValue() instanceof String || entry.getValue() instanceof Integer || entry.getValue() instanceof Boolean || entry.getValue() instanceof List) {
				flatMap.put(sufix + entry.getKey(), entry.getValue());
			}

			if (entry.getValue() instanceof Map) {
				JsonHelper.flatMapHelper((Map<String, Object>) entry.getValue(), flatMap, sufix + entry.getKey() + ".");
			}
		}
	}

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