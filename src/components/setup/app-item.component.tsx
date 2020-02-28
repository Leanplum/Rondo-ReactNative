import React from 'react';
import {ListItem} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {LeanplumAppConfig} from 'utils';

export const AppItem = ({
  app,
  onPress,
}: {
  app: LeanplumAppConfig;
  onPress: (appId: string) => void;
}) => {
  return (
    <ListItem
      key={app.appId}
      title={app.name}
      subtitle={app.appId}
      subtitleStyle={styles.appSubtitle}
      onPress={() => onPress(app.appId)}
      bottomDivider
    />
  );
};

const styles = StyleSheet.create({
  appSubtitle: {color: 'grey', fontSize: 13},
});
