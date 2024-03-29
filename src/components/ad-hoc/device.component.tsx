import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from '@leanplum/react-native-sdk';

export const Device = () => {
  const [deviceId, setDeviceId] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set device id manually</Text>
      <Input
        placeholder="Device Id"
        autoCapitalize="none"
        value={deviceId}
        onChangeText={text => setDeviceId(text)}
      />
      <Button
        title="SET DEVICE ID"
        buttonStyle={styles.button}
        disabled={deviceId === ''}
        onPress={() => {
          if (Platform.OS === 'android') {
            Leanplum.forceNewDeviceId(deviceId);
          } else {
            Leanplum.setDeviceId(deviceId);
          }
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
