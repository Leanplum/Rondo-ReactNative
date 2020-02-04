import React, {useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

const VARIABLE_NAME: string = 'boolVar';

function valueChangedHandlerBoolean(event: any) {
  console.log(
    'BOOLEAN VARIABLE VALUE IS: ',
    Leanplum.getVariable(VARIABLE_NAME),
  );
}

export const Varbool = () => {
  const [variableName, setVariableName] = useState(VARIABLE_NAME);
  const [variableDefaultValue, setVariableDefaultValue] = useState('true');

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
          Leanplum.addValueChangedHandler(
            variableName,
            valueChangedHandlerBoolean,
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
