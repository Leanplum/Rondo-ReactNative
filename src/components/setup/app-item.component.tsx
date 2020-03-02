import React from 'react';
import {ListItem} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {LeanplumAppConfig} from 'utils';

export const AppItem = ({
  app,
  onPress,
}: {
  app: LeanplumAppConfig;
  onPress: (appSelected: LeanplumAppConfig) => void;
}) => {
  return (
    <ListItem
      key={app.appId}
      title={app.name}
      subtitle={app.appId}
      subtitleStyle={styles.appSubtitle}
      onPress={() => onPress(app)}
      bottomDivider
    />
  );
};

const styles = StyleSheet.create({
  appSubtitle: {color: 'grey', fontSize: 13},
});
