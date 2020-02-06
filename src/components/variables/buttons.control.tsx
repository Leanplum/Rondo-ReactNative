import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

function startResponseHandler(event: any) {
  console.log('BOOLEAN VARIABLE VALUE IS: ', event);
}

function variablesChangedHandler() {
  console.log('VARIABLES CHANGED HANDLER');
}

export const Buttons = () => {
  const [variableName, setVariableName] = useState();
  const [variableDefaultValue, setVariableDefaultValue] = useState();

  const myVars = {
    var1: 'val1',
    var2: true,
    var3: 10.9,
    var4: 'some text',
    testArr: [1, 2, 3, 4, 5],
  };

  return (
    <View style={styles.container}>
      <Button
        title="SET COMPLEX VARIABLE - MAP"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.setVariables(myVars);
        }}
      />
      <Button
        title="ADD START RESPONSE HANDLER"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.addStartResponseHandler(startResponseHandler);
        }}
      />
      <Button
        title="ADD ALL VARIABLES HANDLER"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.addVariablesChangedHandler(variablesChangedHandler);
        }}
      />
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
