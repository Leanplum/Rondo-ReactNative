import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {CreateApp, Session} from 'components';
import {startUp} from 'utils';
import {useVariablesContext, useAssetContext} from 'contexts';
import {Button} from 'react-native-elements';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from './screens';

export const SetupScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const variablesContext = useVariablesContext();
  const assetContext = useAssetContext();
  useEffect(() => {
    startUp({...variablesContext, ...assetContext});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Session />
        <Button
          title="App Picker"
          onPress={() => {
            navigation.navigate(Screens.AppPicker);
          }}
        />
        <CreateApp />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
});
