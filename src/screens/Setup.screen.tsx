import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {CreateApp} from 'components';

export const SetupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CreateApp />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
