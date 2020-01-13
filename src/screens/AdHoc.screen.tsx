import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';

import {Event} from 'components';

export const AdHocScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            You can type in custom events, sessions and attributes tp send from
            here.
          </Text>
        </View>
        <Divider style={styles.divider} />
        <Event />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  divider: {
    marginVertical: 5,
  },
  headerContainer: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {textAlign: 'center'},
});
