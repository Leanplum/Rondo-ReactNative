import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button, ThemeContext} from 'react-native-elements';
import {Leanplum} from 'leanplum';

export const Event = () => {
  const [event, setEvent] = useState('');
  const [parameterKey, setParameterKey] = useState('');
  const [parameterValue, setParameterValue] = useState('');
  return (
    <View>
      <Text style={styles.header}>Send Track Event</Text>
      <Input
        placeholder="Event Name (String)"
        autoCapitalize="none"
        value={event}
        onChangeText={text => setEvent(text)}
      />
      <Input
        placeholder="Event Parameter Key (String)"
        autoCapitalize="none"
        value={parameterKey}
        onChangeText={text => setParameterKey(text)}
      />
      <Input
        placeholder="Event Parameter Value (String)"
        autoCapitalize="none"
        value={parameterValue}
        onChangeText={text => setParameterValue(text)}
      />
      <Button
        title="SEND TRACK EVENT"
        buttonStyle={styles.button}
        disabled={event === ''}
        onPress={() => Leanplum.track(event, {[parameterKey]: parameterValue})}
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
