import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Switch,
  Platform
} from 'react-native';
import {Session} from 'components';
import {startUp, AppsStorage, leanplumStart, EnvsStorage} from 'utils';
import {useVariablesContext, useAssetContext} from 'contexts';
import {Button} from 'react-native-elements';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from './screens';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

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
        <View style={styles.buttonView}>
          <Button
            title="App Picker"
            onPress={() => {
              navigation.navigate(Screens.AppPicker, {productionMode});
            }}
          />
        </View>
        <View>
          <Button
            title="Env Picker"
            onPress={() => {
              navigation.navigate(Screens.EnvPicker, {productionMode});
            }}
          />
        </View>

        <View style={styles.switchView}>
          <Text>Production Mode</Text>
          <Switch
            value={productionMode}
            onValueChange={value => setProductionMode(value)}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="Call Start"
            onPress={async () => {
              const app = await AppsStorage.currentApp();
              const env = await EnvsStorage.currentEnv();
              if (app) {
                await leanplumStart(app, env, productionMode);
              }
            }}
          />
        </View>
        {Platform.OS === 'ios' ?
        <View style={styles.buttonView}>
          <Button
            title="iOS Push Permission"
            onPress={() => {
              PushNotificationIOS.requestPermissions();
            }}
          />
        </View>
        :
        null}
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
