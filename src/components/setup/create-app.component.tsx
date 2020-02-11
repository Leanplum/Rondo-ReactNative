import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

export const CreateApp = () => {
  const [appId, setAppId] = useState(
    'app_mdPnGAyQhzV5CcibMb9d9GDQ7oj1J94odFm6lunFd2I',
  );
  const [productionKey, setProductionKey] = useState(
    'prod_rNf462v60Cl3KA9ntyCiQQup03VyZmkV1Ly21tgKfzg',
  );
  const [developmentKey, setDevelopmentKey] = useState(
    'dev_S73p5EOeSmH5U2fmT5sH0DENA16qWSnWisUIJtO33qM',
  );

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
