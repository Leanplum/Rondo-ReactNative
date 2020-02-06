import React, {useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

type VariableProps = {
  name: String;
  defaultValue: String;
};

export const Var = ({name, defaultValue}: VariableProps) => {
  return (
    <View style={styles.container}>
      <Input autoCapitalize="none" value={name} />
      <Input autoCapitalize="none" value={defaultValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  },
});
