import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';
import {DeviceEventEmitter} from 'react-native';

const LISTENER_NAME: string = 'valueChangedHandler';

function valueChangedHandler(event: any) {
  console.log('HANDLER INVOKED FOR NUMBER TYPE: ', event);
}

export const Varnumber = () => {
  const [variableName, setVariableName] = useState('numVar');
  const [variableDefaultValue, setVariableDefaultValue] = useState('15.0');

  DeviceEventEmitter.addListener(LISTENER_NAME, valueChangedHandler);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Number Variables</Text>
      <Input
        placeholder="Number variable name"
        autoCapitalize="none"
        value={variableName}
        onChangeText={text => setVariableName(text)}
      />
      <Input
        placeholder="Number variable default value"
        autoCapitalize="none"
        value={variableDefaultValue}
        onChangeText={text => setVariableDefaultValue(text)}
      />
      <Button
        title="SET NUMBER VARIABLE"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.setVariable(variableName, Number(variableDefaultValue));
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
