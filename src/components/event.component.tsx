import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button, ThemeContext} from 'react-native-elements';
import {CurrentTheme} from '../utils';

export const Event = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <View>
      <Text style={styles.header}>Send Track Event</Text>
      <Input placeholder="Event Name (String)" />
      <Input placeholder="Event Parameter Key (String)" />
      <Input placeholder="Event Parameter Value (String)" />
      <Button title="SEND TRACK EVENT" buttonStyle={styles.button} />
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
