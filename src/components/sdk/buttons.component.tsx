import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
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
  return (
    <FlatList
      data={sourceData}
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
      keyExtractor={item => item.id}
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
