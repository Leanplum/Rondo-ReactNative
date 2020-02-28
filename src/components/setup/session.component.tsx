import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {Leanplum} from 'react-native-leanplum';
import {withNavigation, NavigationScreenProp} from 'react-navigation';

const SessionComponent = ({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) => {
  const [deviceId, setDeviceId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function getSession() {
      const userIdValue = await Leanplum.userId();
      const deviceIdValue = await Leanplum.deviceId();
      setUserId(userIdValue);
      setDeviceId(deviceIdValue);
    }
    navigation.addListener('didFocus', () => {
      getSession();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.propertyView}>
        <Text style={styles.label}>UserId: </Text>
        <Text style={styles.value}>{userId}</Text>
      </View>
      <View style={styles.propertyView}>
        <Text style={styles.label}>DeviceId: </Text>
        <Text style={styles.value}>{deviceId}</Text>
      </View>
    </View>
  );
};

export const Session = withNavigation(SessionComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  propertyView: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    marginTop: 10,
  },
});
