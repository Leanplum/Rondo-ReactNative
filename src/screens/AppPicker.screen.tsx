import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Text} from 'react-native';

import {NavigationScreenProp} from 'react-navigation';

export const AppPickerScreen = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    console.log(navigation);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>App Picker</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

AppPickerScreen.navigationOptions = {
  tabBarLabel: 'Home!',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
