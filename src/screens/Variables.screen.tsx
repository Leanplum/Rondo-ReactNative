import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Varstring, Varbool, Varnumber, Buttons} from 'components';

export const VariablesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Varstring />
        <Varbool />
        <Varnumber />
        <Buttons />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
