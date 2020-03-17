import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {EnvItem} from 'components';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from './screens';
import {EnvsStorage, leanplumStart, LeanplumEnvConfig} from 'utils';

export const EnvPickerScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const [envs, setEnv] = useState<LeanplumEnvConfig[]>([]);
  const env: LeanplumEnvConfig = navigation.getParam('env');

  const onEnvSelected = async (envSelected: LeanplumEnvConfig) => {
    const productionMode = navigation.getParam('productionMode');
    //await leanplumStart(undefined, envSelected, productionMode);
  };

  useEffect(() => {
    async function updateEnvs(newEnv: LeanplumEnvConfig) {
      if (newEnv) {
        await EnvsStorage.save(newEnv);
      }
      const allEnvs = await EnvsStorage.getAll();
      setEnv(allEnvs);
    }
    updateEnvs(env);
  }, [env]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Create Leanplum Env"
        style={styles.button}
        onPress={() => {
          navigation.navigate(Screens.CreateEnv);
        }}
      />
      <FlatList
        data={envs}
        renderItem={({item}) => <EnvItem env={item} onPress={onEnvSelected} />}
        keyExtractor={(item: LeanplumEnvConfig) => item.apiHost}
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
