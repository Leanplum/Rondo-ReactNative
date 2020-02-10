import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Varstring, Varbool, Varnumber, Buttons} from 'components';
import {Button, Input} from 'react-native-elements';
import {Leanplum, LeanplumVariableValue} from 'leanplum';

const variables = {
  myArr: [1, 2, 3, 4, 5],
  iosBool: false,
  iosNumber: 22,
  iosText: 'ios non default',
  Powerups: {
    Power: {
      levels: [1, 2, 3],
      price: 15,
    },
    Speed: {
      levels: [1, 2, 3],
      price: 10,
    },
  },
};

export const VariablesScreen = () => {
  const [variable, setVariable] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Input
          onChangeText={text => setVariable(text)}
          autoCapitalize="none"
          placeholder="variable"
        />
        <Button
          onPress={async () => {
            try {
              const value = await Leanplum.getVariable(variable);
              console.log({value, type: typeof value});
            } catch (e) {
              console.log(e);
            }
          }}
          title="get var"
        />
        <Button
          onPress={async () => {
            try {
              const value = await Leanplum.getVariables();
              console.log({value: JSON.stringify(value), type: typeof value});
            } catch (e) {
              console.log(e);
            }
          }}
          title="get all vars"
        />
        <Button
          onPress={() => Leanplum.setVariables(variables)}
          title="setVars"
        />
        <Button
          onPress={() =>
            Leanplum.onVariableChanged(
              variable,
              (value: LeanplumVariableValue) => {
                console.log(value);
              },
            )
          }
          title="onValueChange"
        />
        <Button
          onPress={() =>
            Leanplum.onVariablesChanged((value: LeanplumVariableValue) =>
              console.log(value),
            )
          }
          title="onValuesChange"
        />
        <Varstring />
        <Varbool />
        <Varnumber />
        <Buttons />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
