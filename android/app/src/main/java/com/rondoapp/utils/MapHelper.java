package com.rondoapp.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * Helper methods for Map structure
 * 
 */
public class MapHelper {

    /**
     * flatten Map - convert map into flat map with key, value of boxed primitives
     * 
     * @param map map for flattening
     * @param event name of the event
     */
    public static Map<String, Object> toFlatMap(Map<String, Object> map) {
		Map<String, Object> flatMap = new HashMap<String, Object>();
		for (Entry<String, Object> entry : map.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			if (value instanceof Map) {
				MapHelper.flatMapHelper((Map<String, Object>) entry.getValue(), flatMap, key + ".");
			} else {
				flatMap.put(entry.getKey(), entry.getValue());
			}
		}

		return flatMap;
	}

	private static void flatMapHelper(Map<String, Object> map, Map<String, Object> flatMap, String sufix) {
		for (Entry<String, Object> entry : map.entrySet()) {
			if (entry.getValue() instanceof String || entry.getValue() instanceof Double || entry.getValue() instanceof Boolean || entry.getValue() instanceof List) {
				flatMap.put(sufix + entry.getKey(), entry.getValue());
			}

			if (entry.getValue() instanceof Map) {
				MapHelper.flatMapHelper((Map<String, Object>) entry.getValue(), flatMap, sufix + entry.getKey() + ".");
			}
		}
	}
}