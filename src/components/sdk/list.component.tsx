import React from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface WelcomeProps {
  emotions: Object;
}


export const ListComponent = ({sourceData}: {sourceData: Object}) => {
  return (
    <FlatList
      data={sourceData}
      renderItem={({item}) => (
        <TouchableOpacity onPress={item.onPress} style={styles.container}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingBottom: 22,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  text: {
    marginLeft: 15,
    fontSize: 15,
  },
});
