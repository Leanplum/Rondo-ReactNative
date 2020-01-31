import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Leanplum from 'react-native-leanplum';

export const User = () => {
  const [userId, setUserId] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set user id manually</Text>
      <Input
        placeholder="User Id"
        autoCapitalize="none"
        value={userId}
        onChangeText={text => setUserId(text)}
      />
      <Button
        title="SET USER ID"
        buttonStyle={styles.button}
        disabled={userId === ''}
        onPress={() => Leanplum.setUserId(userId)}
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
