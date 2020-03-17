import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Buttons} from './buttons.component';

export const SdkComponent = ({app}: {app: any}) => {
  const buttonsData = [
    {
      id: 1,
      name: 'Triggers',
      onPress: 'navigation',
    },
    {
      id: 2,
      name: 'Messages',
      onPress: 'navigation',
    },
    {
      id: 3,
      name: 'Push',
      onPress: 'navigation',
    },
  ];

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.textCenter}>SDK Version: 2.6.2</Text>
        <Text style={styles.textCenter}>Leanplum App: {app?.name}</Text>
        <Text style={styles.textCenter}>API URL: api.leanplum.com</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Buttons sourceData={buttonsData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  buttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
