import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Leanplum} from 'leanplum';
import {Var} from './var.component';
import {Button, Image} from 'react-native-elements';

const STRING_VARIABLE_NAME: string = 'var_text';
const NUM_VARIABLE_NAME: string = 'var_number';
const BOOL_VARIABLE_NAME: string = 'var_bool';
const MAP_VARIABLE_NAME: string = 'var_map';
const ARR_VARIABLE_NAME: string = 'myArr';
const ASSET_VARIABLE_NAME: string = 'var_file';

export const Variables = () => {
  const [variables, setVariables] = useState({
    [STRING_VARIABLE_NAME]: 'string var default value',
    [NUM_VARIABLE_NAME]: 12,
    [BOOL_VARIABLE_NAME]: true,
    [ARR_VARIABLE_NAME]: [2],
    [MAP_VARIABLE_NAME]: {
      var1: 'default var 1',
      var2: 'default var 2',
    },
  });
  const [assetVariablePath, setAssetVariablePath] = useState('');
  const [assetReady, setAssetReady] = useState(false);

  useEffect(() => {
    Leanplum.setVariables(variables);
    Leanplum.onVariablesChanged((value: any) => {
      console.log(value);
      setVariables({...variables, ...value});
    });
    Leanplum.setVariableAsset(
      ASSET_VARIABLE_NAME,
      'Mario.png',
      (path: string) => {
        setAssetVariablePath(path);
        setAssetReady(true);
      },
    );
  }, []);

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
      {assetReady ? (
        <Image
          source={{uri: assetVariablePath}}
          style={{width: 80, height: 80}}
        />
      ) : (
        <Text>No asset ready</Text>
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
