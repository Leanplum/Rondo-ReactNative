import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';

import {Event, Location, User, Attribute, PurchaseEvent} from 'components';

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
        <View style={styles.component}>
          <Event />
        </View>
        <View style={styles.component}>
          <PurchaseEvent />
        </View>
        <View style={styles.component}>
          <Location />
        </View>
        <View style={styles.component}>
          <User />
        </View>
        <View>
          <Attribute />
        </View>
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
  component: {
    marginBottom: 30,
  },
});
