import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Switch,
} from 'react-native';
import {CreateApp, Session} from 'components';
import {startUp, startSession, AppsStorage, leanplumStart} from 'utils';
import {useVariablesContext, useAssetContext} from 'contexts';
import {Button} from 'react-native-elements';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from './screens';
import {Leanplum} from 'react-native-leanplum';

export const SetupScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const [productionMode, setProductionMode] = useState(false);
  const variablesContext = useVariablesContext();
  const assetContext = useAssetContext();
  useEffect(() => {
    startUp({...variablesContext, ...assetContext, productionMode});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Session />
        <Button
          title="App Picker"
          style={styles.button}
          onPress={() => {
            navigation.navigate(Screens.AppPicker, {productionMode});
          }}
        />
        <View style={styles.switchView}>
          <Text>Production Mode</Text>
          <Switch
            value={productionMode}
            onValueChange={value => setProductionMode(value)}
          />
        </View>
        <Button
          title="CALL LEANPLUM - START"
          style={styles.button}
          onPress={async () => {
            const app = await AppsStorage.currentApp();
            if (app) {
              await leanplumStart(app, productionMode);
            }
          }}
        />
        <Button
          title="FORCE UPDATE"
          style={styles.button}
          onPress={() => {
            Leanplum.forceContentUpdate();
          }}
        />
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
  switchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  button: {
    marginVertical: 20,
  },
});
