import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {CreateApp, Device} from 'components';
import {requestLocationPermission} from 'utils';
import {Leanplum} from 'react-native-leanplum';

export const SetupScreen = () => {
  useEffect(() => {
    requestLocationPermission();
    Leanplum.onStartResponse((success: boolean) => {
      console.log({success});
    });
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
