import React, {useState} from 'react';
import {StyleSheet, View, Switch, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Leanplum} from '@leanplum/react-native-sdk';
import {withNavigation} from 'react-navigation';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from 'screens';

const CreateAppComponent = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const [name, setName] = useState('');
  const [appId, setAppId] = useState('');
  const [productionKey, setProductionKey] = useState('');
  const [developmentKey, setDevelopmentKey] = useState('');

  return (
    <View style={styles.container}>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="App ID"
        autoCapitalize="none"
        value={appId}
        onChangeText={text => setAppId(text)}
      />
      <Input
        placeholder="Prod Key"
        autoCapitalize="none"
        value={productionKey}
        onChangeText={text => setProductionKey(text)}
      />
      <Input
        placeholder="Dev Key"
        autoCapitalize="none"
        value={developmentKey}
        onChangeText={text => setDevelopmentKey(text)}
      />
      <Button
        title="Save"
        style={styles.saveButton}
        onPress={() => {
          navigation.navigate(Screens.AppPicker, {
            app: {name, appId, productionKey, developmentKey},
          });
        }}
        disabled={
          name === '' ||
          appId === '' ||
          productionKey === '' ||
          developmentKey === ''
        }
      />
    </View>
  );
};
export const CreateApp = withNavigation(CreateAppComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  saveButton: {
    margin: 10,
  },
});
