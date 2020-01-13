import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';

export const CreateApp = () => {
  const [name, setName] = useState('');
  const [appId, setAppId] = useState('APP_ID');
  const [productionKey, setProductionKey] = useState('PROD_KEY');
  const [developmentKey, setDevelopmentKey] = useState('DEV_KEY');

  const startCallback = (success: any) => {
    console.log({startCallback: success});
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Display Name"
        autoCapitalize="none"
        value={name}
        onChangeText={text => setName(text)}
      />
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
        title="Create and Start session"
        buttonStyle={styles.button}
        disabled={
          name === '' ||
          appId === '' ||
          productionKey === '' ||
          developmentKey === ''
        }
        onPress={() => {
          Leanplum.setAppIdForDevelopmentMode(appId, developmentKey);
          Leanplum.setAppIdForProductionMode(appId, productionKey);
          Leanplum.start(startCallback);
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
