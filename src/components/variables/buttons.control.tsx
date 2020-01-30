import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

export const Buttons = () => {
  const [variableName, setVariableName] = useState();
  const [variableDefaultValue, setVariableDefaultValue] = useState();

  return (
    <View style={styles.container}>
      <Button
        title="PARSE ALL VARIABLES"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.parseVariables();
        }}
      />
      <Button
        title="CALL LEANPLUM - START"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.start();
        }}
      />
      <Button
        title="FORCE UPDATE"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.forceContentUpdate();
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
