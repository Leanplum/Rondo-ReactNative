package com.rondoapp.variables;

public enum Type {
	STRING("string"), NUMBER("number"), BOOLEAN("boolean");
	
	public final String label;
	
	private Type(String label) {
        this.label = label;
    }
}