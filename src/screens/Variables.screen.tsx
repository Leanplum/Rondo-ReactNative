import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Variables} from 'components';

export const VariablesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Variables />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
