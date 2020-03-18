import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from '@leanplum/react-native-sdk';

export const State = () => {
  const [state, setStateName] = React.useState<string | null>(null);
  const [info, setInfo] = useState('');
  const [parameterKey, setParameterKey] = useState('');
  const [parameterValue, setParameterValue] = useState('');
  return (
    <View>
      <Text style={styles.header}>Track State</Text>
      <Input
        placeholder="State Name (String)"
        autoCapitalize="none"
        value={state || ''}
        onChangeText={text => setStateName(text)}
      />
      <Input
        placeholder="State Info (String)"
        autoCapitalize="none"
        value={info}
        onChangeText={text => setInfo(text)}
      />
      <Input
        placeholder="State Parameter Key (String)"
        autoCapitalize="none"
        value={parameterKey}
        onChangeText={text => setParameterKey(text)}
      />
      <Input
        placeholder="State Parameter Value (String)"
        autoCapitalize="none"
        value={parameterValue}
        onChangeText={text => setParameterValue(text)}
      />
      <Button
        title="ADVANCE TO STATE"
        buttonStyle={styles.button}
        onPress={() =>
          Leanplum.advanceTo(state, info, {[parameterKey]: parameterValue})
        }
      />
      <Button
        title="PAUSE STATE"
        buttonStyle={styles.button}
        onPress={() => Leanplum.pauseState()}
      />
      <Button
        title="RESUME STATE"
        buttonStyle={styles.button}
        onPress={() => Leanplum.resumeState()}
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
