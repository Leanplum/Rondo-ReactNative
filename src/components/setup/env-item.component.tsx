import React from 'react';
import {ListItem} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {LeanplumEnvConfig} from 'utils';

export const EnvItem = ({
  env,
  onPress,
}: {
  env: LeanplumEnvConfig;
  onPress: (envSelected: LeanplumEnvConfig) => void;
}) => {
  return (
    <ListItem
      key={env.apiHost}
      title={env.apiHost}
      titleStyle={styles.titleStyle}
      onPress={() => onPress(env)}
      bottomDivider
    />
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'center'
  },
});
