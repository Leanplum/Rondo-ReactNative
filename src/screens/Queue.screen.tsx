import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import {Leanplum} from '@leanplum/react-native-sdk';

const globalScope: any = global;

export const QueueScreen = () => {
  const [isQueuePaused, setQueuePaused] = useState(false);
  const [isQueueDisabled, setQueueDisabled] = useState(false);
  const [onMessageDisplayed, setOnMessageDisplayed] = useState(globalScope.onMessageDisplayedSet);
  const [onMessageDismissed, setOnMessageDismissed] = useState(globalScope.onMessageDismissedSet);
  const [onMessageAction, setOnMessageAction] = useState(globalScope.onMessageActionSet);
  useEffect(() => {
    async function initScreen() {
      const queuePaused = await Leanplum.isQueuePaused();
      const queueEnabled = await Leanplum.isQueueEnabled();
      setQueuePaused(queuePaused);
      setQueueDisabled(!queueEnabled);
    }
    initScreen();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.switchView}>
        <Text>Pause Queue</Text>
        <Switch
            value={isQueuePaused}
            onValueChange={value => {
              setQueuePaused(value);
              Leanplum.setQueuePaused(value);
            }}
        />
      </View>
      <View style={styles.switchView}>
        <Text>Disable Queue</Text>
        <Switch
            value={isQueueDisabled}
            onValueChange={value => {
              setQueueDisabled(value);
              Leanplum.setQueueEnabled(!value);
            }}
        />
      </View>
      <View style={styles.switchView}>
        <Text>onMessageDisplayed</Text>
        <Switch
            value={onMessageDisplayed}
            onValueChange={value => {
              globalScope.setOnMessageDisplayed(value);
              setOnMessageDisplayed(value)
            }}
        />
      </View>
      <View style={styles.switchView}>
        <Text>onMessageDismissed</Text>
        <Switch
            value={onMessageDismissed}
            onValueChange={value => {
              globalScope.setOnMessageDismissed(value);
              setOnMessageDismissed(value)
            }}
        />
      </View>
      <View style={styles.switchView}>
        <Text>onMessageAction</Text>
        <Switch
            value={onMessageAction}
            onValueChange={value => {
              globalScope.setOnMessageAction(value);
              setOnMessageAction(value)
            }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  switchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonView: {
    marginVertical: 5,
  },
});
