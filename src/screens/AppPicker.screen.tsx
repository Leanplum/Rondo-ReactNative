import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {AppItem} from 'components';

export interface LeanplumAppConfig {
  productionKey: string;
  developmentKey: string;
  appId: string;
  name: string;
}

export const AppPickerScreen = ({navigation}: {navigation: any}) => {
  const [apps, setApps] = useState<LeanplumAppConfig[]>([
    {
      productionKey: 'prod_rNf462v60Cl3KA9ntyCiQQup03VyZmkV1Ly21tgKfzg',
      developmentKey: 'dev_S73p5EOeSmH5U2fmT5sH0DENA16qWSnWisUIJtO33qM',
      appId: 'app_mdPnGAyQhzV5CcibMb9d9GDQ7oj1J94odFm6lunFd2I',
      name: 'RN Rondo',
    },
  ]);
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={apps}
        renderItem={({item}) => <AppItem app={item} />}
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
});
