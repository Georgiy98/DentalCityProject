import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Loading({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('skip_registration').then(skipRegistration => {
      if (skipRegistration) navigation.navigate('menu');
      else navigation.navigate('welcome');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>e</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#628',
  },
  text: {
    color: '#fff',
    fontSize: 500,
    paddingBottom: 100,
    fontStyle: 'italic',
  },
});
