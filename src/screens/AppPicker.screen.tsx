import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {AppItem} from 'components';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from './screens';
import {AppsStorage, LeanplumAppConfig} from 'utils';

export const AppPickerScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const [apps, setApps] = useState<LeanplumAppConfig[]>([]);
  const app: LeanplumAppConfig = navigation.getParam('app');

  const onAppSelected = async (appSelected: LeanplumAppConfig) => {
    await AppsStorage.selectApp(appSelected.appId);
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
