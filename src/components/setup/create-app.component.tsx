import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

export const CreateApp = () => {
  const [appId, setAppId] = useState('');
  const [productionKey, setProductionKey] = useState('');
  const [developmentKey, setDevelopmentKey] = useState('');

  const [variableName, setVariableName] = useState();
  const [variableDefaultValue, setVariableDefaultValue] = useState();

  return (
    <View style={styles.container}>
      <Input
        placeholder="App ID"
        autoCapitalize="none"
        value={appId}
        onChangeText={text => setAppId(text)}
      />
      <Input
        placeholder="Prod Key"
        autoCapitalize="none"
        value={productionKey}
        onChangeText={text => setProductionKey(text)}
      />
      <Input
        placeholder="Dev Key"
        autoCapitalize="none"
        value={developmentKey}
        onChangeText={text => setDevelopmentKey(text)}
      />
      <Button
        title="SET KEYS"
        buttonStyle={styles.button}
        disabled={appId === '' || productionKey === '' || developmentKey === ''}
        onPress={() => {
          Leanplum.setAppIdForDevelopmentMode(appId, developmentKey);
          Leanplum.setAppIdForProductionMode(appId, productionKey);
        }}
      />
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
        title="SET VARIABLE"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.setVariable(variableName, variableDefaultValue);
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
        title="ADD VALUE CHANGE HANDLER"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.addValueChangedHandler(variableName);
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
