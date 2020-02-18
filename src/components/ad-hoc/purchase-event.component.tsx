import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button, ThemeContext} from 'react-native-elements';
import Leanplum from 'react-native-leanplum';

export const PurchaseEvent = () => {
  const [event, setEvent] = useState('Purchase');
  const [value, setValue] = useState('1');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [parameterKey, setParameterKey] = useState('');
  const [parameterValue, setParameterValue] = useState('');
  return (
    <View>
      <Text style={styles.header}>Send Purchase Event</Text>
      <Input
        placeholder="Event Name (String)"
        autoCapitalize="none"
        value={event}
        onChangeText={text => setEvent(text)}
      />
      <Input
        placeholder="Value (Number)"
        autoCapitalize="none"
        value={value}
        onChangeText={text => setValue(text)}
        keyboardType="decimal-pad"
      />
      <Input
        placeholder="Currency code (String)"
        autoCapitalize="none"
        value={currencyCode}
        onChangeText={text => setCurrencyCode(text)}
      />

      <Input
        placeholder="Parameter Key (String)"
        autoCapitalize="none"
        value={parameterKey}
        onChangeText={text => setParameterKey(text)}
      />
      <Input
        placeholder="Parameter Value (String)"
        autoCapitalize="none"
        value={parameterValue}
        onChangeText={text => setParameterValue(text)}
      />
      <Button
        title="SEND PURCHASE EVENT"
        buttonStyle={styles.button}
        disabled={event === '' || Number(value) <= 0 || currencyCode === ''}
        onPress={() =>
          Leanplum.trackPurchase(
            Number(value),
            currencyCode,
            {[parameterKey]: parameterValue},
            event,
          )
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
