import React from 'react';
import {LeanplumAppConfig} from 'screens';
import {ListItem} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export const AppItem = ({app}: {app: LeanplumAppConfig}) => {
  return (
    <ListItem
      key={app.appId}
      title={app.name}
      subtitle={app.appId}
      subtitleStyle={styles.appSubtitle}
      bottomDivider
    />
  );
};

const styles = StyleSheet.create({
  appSubtitle: {color: 'grey', fontSize: 13},
});
