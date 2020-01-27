import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {CreateApp, Device} from 'components';
import {requestCameraPermission} from 'utils';

export const SetupScreen = () => {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Device />
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
