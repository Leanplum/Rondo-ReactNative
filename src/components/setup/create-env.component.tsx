import React, {useState} from 'react';
import {StyleSheet, View, Switch, Text} from 'react-native';
import {Input, Button, CheckBox} from 'react-native-elements';
import {Leanplum} from 'react-native-leanplum';
import {withNavigation} from 'react-navigation';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from 'screens';

const CreateEnvComponent = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const [apiHost, setApiHost] = useState('');
  const [apiSsl, setAppId] = useState<boolean>();
  const [productionKey, setProductionKey] = useState('');
  const [developmentKey, setDevelopmentKey] = useState('');

  return (
    <View style={styles.container}>
      <Input
        placeholder="API Host"
        label="API Host"
        value={apiHost}
        onChangeText={text => setApiHost(text)}
      />
      <CheckBox title="API SSL" checked={apiSsl} />
      <Input
        placeholder="SocketHostname"
        label="Socket Hostname:"
        autoCapitalize="none"
        value={productionKey}
        onChangeText={text => setProductionKey(text)}
      />
      <Input
        placeholder="SocketPort"
        label="Socket Port:"
        autoCapitalize="none"
        value={developmentKey}
        onChangeText={text => setDevelopmentKey(text)}
      />
      <Button
        title="Create"
        style={styles.saveButton}
        onPress={() => {
          navigation.navigate(Screens.AppPicker, {
            app: {name: apiHost, appId: apiSsl, productionKey, developmentKey},
          });
        }}
        disabled={
          apiHost === '' ||
          apiSsl === '' ||
          productionKey === '' ||
          developmentKey === ''
        }
      />
    </View>
  );
};
export const CreateEnv = withNavigation(CreateEnvComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  saveButton: {
    margin: 10,
  },
});
