import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Varstring, Varbool, Varnumber, Buttons, Variables} from 'components';

export const VariablesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Variables />
      {/* <Varstring />
        <Varbool /> */}
      {/* <Varnumber /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
