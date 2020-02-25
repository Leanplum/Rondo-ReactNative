import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {CreateApp, Session} from 'components';
import {startUp} from 'utils';
import {useVariablesContext, useAssetContext} from 'contexts';

export const SetupScreen = () => {
  const variablesContext = useVariablesContext();
  const assetContext = useAssetContext();
  useEffect(() => {
    startUp({...variablesContext, ...assetContext});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Session />
        <CreateApp />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
