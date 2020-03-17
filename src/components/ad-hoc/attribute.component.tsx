import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Leanplum} from '@leanplum/react-native-sdk';

export const Attribute = () => {
  const [attributeKey, setAttributeKey] = useState('');
  const [attributeValue, setAttributeValue] = useState('');
  return (
    <View>
      <Text style={styles.header}>Set User Attribute</Text>
      <Input
        placeholder="Key (String)"
        autoCapitalize="none"
        value={attributeKey}
        onChangeText={text => setAttributeKey(text)}
      />
      <Input
        placeholder="Value (String)"
        autoCapitalize="none"
        value={attributeValue}
        onChangeText={text => setAttributeValue(text)}
      />
      <Button
        title="SEND USER ATTRIBUTE"
        buttonStyle={styles.button}
        disabled={attributeKey === ''}
        onPress={() =>
          Leanplum.setUserAttributes({[attributeKey]: attributeValue})
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
