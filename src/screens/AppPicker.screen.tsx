import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {AppItem} from 'components';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from './screens';
import {AppsStorage, LeanplumAppConfig, startLeanplum} from 'utils';
import {Leanplum} from 'react-native-leanplum';

export const AppPickerScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const [apps, setApps] = useState<LeanplumAppConfig[]>([]);
  const app: LeanplumAppConfig = navigation.getParam('app');

  const onAppSelected = async (appId: string) => {
    console.log('onAppSelected');
    await AppsStorage.selectApp(appId);
    const appToStart = await AppsStorage.getApp(appId);
    const productionMode = navigation.getParam('productionMode');
    if (appToStart) {
      startLeanplum(appToStart, productionMode);
    }
  };

  useEffect(() => {
    async function updateApps(newApp: LeanplumAppConfig) {
      if (newApp) {
        await AppsStorage.save(newApp);
      }
      const allApps = await AppsStorage.getAll();
      setApps(allApps);
    }
    updateApps(app);
  }, [app]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Create Leanplum App"
        style={styles.button}
        onPress={() => {
          navigation.navigate(Screens.CreateApp);
        }}
      />
      <FlatList
        data={apps}
        renderItem={({item}) => <AppItem app={item} onPress={onAppSelected} />}
        keyExtractor={(item: LeanplumAppConfig) => item.appId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    margin: 10,
  },
});
