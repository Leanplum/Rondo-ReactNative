import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {CreateEnv} from 'components';
import {NavigationStackProp} from 'react-navigation-stack';
export const CreateEnvScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CreateEnv />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
