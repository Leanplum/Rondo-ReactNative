import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {CreateApp} from 'components';
import {NavigationStackProp} from 'react-navigation-stack';
export const CreateAppScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CreateApp />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
