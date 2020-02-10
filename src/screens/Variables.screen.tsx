import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Variables} from 'components';

export const VariablesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Variables />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
