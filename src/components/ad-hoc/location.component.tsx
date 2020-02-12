import React, {useContext, useState} from 'react';
import {View, StyleSheet, Picker} from 'react-native';
import {Text, Input, Button, ThemeContext} from 'react-native-elements';
import {Leanplum} from 'leanplum';
import {LocationAccuracyType} from 'leanplum/location-accuracy-type';

export const Location = () => {
  //55.5807481  36.8251398 RUSIA
  // CUBA 23.0977862 -82.3787488
  const [latitude, setLatitude] = useState('23.0977862');
  const [longitude, setLongitude] = useState('-82.3787488');
  const [locationType, setLocationType] = useState(LocationAccuracyType.GPS);
  return (
    <View>
      <Text style={styles.header}>Set Device Location</Text>
      <Input
        placeholder="Latitude"
        autoCapitalize="none"
        value={latitude}
        onChangeText={text => setLatitude(text)}
      />
      <Input
        placeholder="Longitude"
        autoCapitalize="none"
        value={longitude}
        onChangeText={text => setLongitude(text)}
      />
      <Picker
        selectedValue={locationType}
        style={{flex: 1}}
        onValueChange={(itemValue, itemIndex) => setLocationType(itemValue)}>
        <Picker.Item
          label="IP => Lowest accuracy"
          value={LocationAccuracyType.IP}
        />
        <Picker.Item
          label="CELL => Default accuracy"
          value={LocationAccuracyType.CELL}
        />
        <Picker.Item
          label="GPS => Highest accuracy"
          value={LocationAccuracyType.GPS}
        />
      </Picker>
      <Button
        title="SET DEVICE LOCATION"
        buttonStyle={styles.button}
        onPress={() =>
          Leanplum.setDeviceLocation(
            Number(latitude),
            Number(longitude),
            locationType,
          )
        }
      />
      <Button
        title="DISABLE LOCATION COLLECTION"
        buttonStyle={styles.button}
        onPress={() => Leanplum.disableLocationCollection()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  },
});
