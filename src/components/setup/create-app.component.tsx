import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Leanplum} from 'leanplum';
import {LocationAccuracyType} from 'leanplum/location-accuracy-type';

export const CreateApp = () => {
  const [name, setName] = useState('');
  const [appId, setAppId] = useState('');
  const [productionKey, setProductionKey] = useState('');
  const [developmentKey, setDevelopmentKey] = useState('');

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
        title="SET KEYS"
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
        title="DISABLE LOCATION COLLECTION"
        buttonStyle={styles.button}
        onPress={() => {
          Leanplum.disableLocationCollection();
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
