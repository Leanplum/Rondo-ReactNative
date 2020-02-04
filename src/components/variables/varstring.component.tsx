import React, {useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

const VARIABLE_NAME: string = 'stringVar';

function valueChangedHandlerString() {
  console.log(
    'STRING VARIABLE VALUE IS: ',
    Leanplum.getVariable(VARIABLE_NAME),
  );
}

export const Varstring = () => {
  const [variableName, setVariableName] = useState(VARIABLE_NAME);
  const [variableDefaultValue, setVariableDefaultValue] = useState(
    'string var default value',
  );

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
          Leanplum.addValueChangedHandler(
            variableName,
            valueChangedHandlerString,
          );
        }}
      />
      <Button
        title="GET VALUE"
        buttonStyle={styles.button}
        onPress={() => {
          Alert.alert(Leanplum.getVariable(variableName));
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
