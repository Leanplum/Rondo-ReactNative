import React from 'react';
import {FlatList, StyleSheet, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import {NavigationStackProp} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';

const ButtonsComponent = ({
  navigation,
  sourceData,
}: {
  navigation: NavigationStackProp;
  sourceData: Object;
}) => {
  let filteredData = sourceData;
  if (Platform.OS === "android") {
    filteredData = filteredData = sourceData.filter(item => item.iOSOnly === undefined)
  };
  return (
    <FlatList
      data={filteredData}
      renderItem={({item}) => (
        <Button
          title={item.name}
          containerStyle={styles.button}
          onPress={
            item.onPress === 'navigation'
              ? () => navigation.navigate(item.name)
              : item.onPress
          }
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export const Buttons = withNavigation(ButtonsComponent);

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    marginTop: 10,
  },
});
