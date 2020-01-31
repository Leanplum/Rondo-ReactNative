import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';
import {DeviceEventEmitter} from 'react-native';

const LISTENER_NAME: string = 'valueChangedHandlerString';

function valueChangedHandlerString(event: any) {
  console.log('HANDLER INVOKED FOR STRING TYPE: ', event);
}

export const Varstring = () => {
  const [variableName, setVariableName] = useState('stringVar');
  const [variableDefaultValue, setVariableDefaultValue] = useState(
    'string var default value',
  );

  DeviceEventEmitter.addListener(LISTENER_NAME, valueChangedHandlerString);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>String Variables</Text>
      <Input
        placeholder="Variable Name"
        autoCapitalize="none"
        value={variableName}
        onChangeText={text => setVariableName(text)}
      />
      <Input
        placeholder="Variable Default Value"
        autoCapitalize="none"
        value={variableDefaultValue}
        onChangeText={text => setVariableDefaultValue(text)}
      />
      <Button
        title="SET STRING VARIABLE"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.setVariable(variableName, variableDefaultValue);
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
