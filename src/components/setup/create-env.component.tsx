import React, {useState} from 'react';
import {StyleSheet, View, Switch, Text} from 'react-native';
import {Input, Button, CheckBox} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from 'screens';

const CreateEnvComponent = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const [apiHost, setApiHost] = useState('');
  const [apiSsl, setApiSsl] = useState<boolean>(false);
  const [socketHostname, setSocketHostname] = useState('');
  const [socketPort, setSocketPort] = useState(443);

  return (
    <View style={styles.container}>
      <Input
        placeholder="API Host"
        label="API Host"
        autoCapitalize="none"
        onChangeText={text => setApiHost(text)}
      />
      <CheckBox
        title="API SSL"
        checked={apiSsl}
        containerStyle={[
          styles.checkBoxContainer,
          {backgroundColor: 'inherit'},
        ]}
        textStyle={styles.checkBoxTextStyle}
        onPress={() => setApiSsl(!apiSsl)}
      />
      <Input
        placeholder="Socket Hostname"
        label="Socket Hostname:"
        autoCapitalize="none"
        onChangeText={text => setSocketHostname(text)}
      />
      <Input
        placeholder="Socket Port"
        label="Socket Port:"
        autoCapitalize="none"
        onChangeText={number => setSocketPort(+number)}
      />
      <Button
        title="Create"
        style={styles.saveButton}
        onPress={() => {
          navigation.navigate(Screens.EnvPicker, {
            env: {apiHost, apiSsl, socketHostname, socketPort},
          });
        }}
        disabled={apiHost === '' || socketHostname === ''}
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
  checkBoxContainer: {
    borderWidth: 0,
    padding: 0,
    margin: 10,
  },
  checkBoxTextStyle: {
    color: '#86939e',
    marginLeft: 0,
    fontSize: 14,
    marginTop: -2,
  },
});
