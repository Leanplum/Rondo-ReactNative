import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Leanplum} from '@leanplum/react-native-sdk';
import {Var} from './var.component';
import {Button, Image} from 'react-native-elements';
import {useVariablesContext, useAssetContext} from 'contexts';
import {
  STRING_VARIABLE_NAME,
  NUM_VARIABLE_NAME,
  BOOL_VARIABLE_NAME,
  ARR_VARIABLE_NAME,
  MAP_VARIABLE_NAME,
} from 'utils';

export const Variables = () => {
  const {variables} = useVariablesContext();
  const {path} = useAssetContext();
  return (
    <View style={styles.container}>
      <Var
        name={STRING_VARIABLE_NAME}
        defaultValue={variables[STRING_VARIABLE_NAME]}
      />
      <Var
        name={NUM_VARIABLE_NAME}
        defaultValue={variables[NUM_VARIABLE_NAME]}
      />
      <Var
        name={BOOL_VARIABLE_NAME}
        defaultValue={variables[BOOL_VARIABLE_NAME]}
      />
      <Var
        name={ARR_VARIABLE_NAME}
        defaultValue={JSON.stringify(variables[ARR_VARIABLE_NAME])}
      />
      <Var
        name={MAP_VARIABLE_NAME}
        defaultValue={JSON.stringify(variables[MAP_VARIABLE_NAME])}
      />
      {path ? (
        <Image source={{uri: path}} style={{width: 80, height: 80}} />
      ) : (
        <Text>No asset</Text>
      )}

      <Button
        title="FORCE UPDATE"
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
});
