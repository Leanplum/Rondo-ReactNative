import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button, ThemeContext} from 'react-native-elements';
import {LeanplumSdk} from '../leanplum-sdk';

export const Event = () => {
  const [event, setEvent] = useState('');
  const [parameterKey, setParameterKey] = useState('');
  const [parameterValue, setParameterValue] = useState('');
  return (
    <View>
      <Text style={styles.header}>Send Track Event</Text>
      <Input
        placeholder="Event Name (String)"
        value={event}
        onChangeText={text => setEvent(text)}
      />
      <Input
        placeholder="Event Parameter Key (String)"
        value={parameterKey}
        onChangeText={text => setParameterKey(text)}
      />
      <Input
        placeholder="Event Parameter Value (String)"
        value={parameterValue}
        onChangeText={text => setParameterValue(text)}
      />
      <Button
        title="SEND TRACK EVENT"
        buttonStyle={styles.button}
        disabled={event === '' || parameterKey === '' || parameterValue === ''}
        onPress={() =>
          LeanplumSdk.track(event, {[parameterKey]: parameterValue})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  },
});
