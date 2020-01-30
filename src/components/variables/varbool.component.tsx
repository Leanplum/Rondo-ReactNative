import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';
import {DeviceEventEmitter} from 'react-native';

const LISTENER_NAME: string = 'valueChangedHandler';

function valueChangedHandler(event: any) {
  console.log('HANDLER INVOKED FOR BOOLEAN TYPE: ', event);
}

export const Varbool = () => {
  const [variableName, setVariableName] = useState('boolVar');
  const [variableDefaultValue, setVariableDefaultValue] = useState('true');

  DeviceEventEmitter.addListener(LISTENER_NAME, valueChangedHandler);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Boolean Variables</Text>
      <Input
        placeholder="Boolean variable name"
        autoCapitalize="none"
        value={variableName}
        onChangeText={text => setVariableName(text)}
      />
      <Input
        placeholder="Boolean variable default value"
        autoCapitalize="none"
        value={variableDefaultValue}
        onChangeText={text => setVariableDefaultValue(text)}
      />
      <Button
        title="SET BOOL VARIABLE"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.setVariable(variableName, variableDefaultValue == 'true');
        }}
      />
      <Button
        title="ADD VALUE CHANGE HANDLER"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.addValueChangedHandler(variableName, LISTENER_NAME);
        }}
      />
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
