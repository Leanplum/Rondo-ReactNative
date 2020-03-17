import React from 'react';
import {View,StyleSheet} from 'react-native';

import {TriggersComponent} from 'components';

export const TriggersScreen = () => {
  return (
    <View style={styles.container}>
      <TriggersComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
});
