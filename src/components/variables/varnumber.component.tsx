import React, {useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';
import {DeviceEventEmitter} from 'react-native';

const VARIABLE_NAME: string = 'numVar';

function valueChangedHandlerNumber(event: any) {
  console.log(
    'NUMBER VARIABLE VALUE IS: ',
    Leanplum.getVariable(VARIABLE_NAME),
  );
}

export const Varnumber = () => {
  const [variableName, setVariableName] = useState(VARIABLE_NAME);
  const [variableDefaultValue, setVariableDefaultValue] = useState('15.0');

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
          Leanplum.addValueChangedHandler(
            variableName,
            valueChangedHandlerNumber,
          );
        }}
      />
      <Button
        title="GET VALUE"
        buttonStyle={styles.button}
        onPress={() => {
          Alert.alert(Leanplum.getVariable(variableName)?.toString());
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
