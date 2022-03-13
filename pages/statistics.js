import React from 'react';
import {View} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

export default function Statistics({navigation}) {
  useBackHandler(() => {
    navigation.navigate('menu');
  });
  return <View></View>;
}
