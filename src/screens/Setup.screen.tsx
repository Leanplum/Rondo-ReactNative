import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {CreateApp, Device} from 'components';
import {requestLocationPermission} from 'utils';

export const SetupScreen = () => {
  useEffect(() => {
    requestLocationPermission();
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
