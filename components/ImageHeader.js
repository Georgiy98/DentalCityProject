import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ImageHeader() {
  const [link, setLink] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('city').then(city => {
      switch (city) {
        case 'Київ':
          setLink('https://dentalcity.com.ua');
          break;
        case 'Чернігів':
          setLink('https://elit.clinic');
          break;
        default:
          setLink('https://elit.co.ua');
      }
    });
  }, []);
  return (
    <TouchableWithoutFeedback onPress={() => Linking.openURL(link)}>
      <Image
        style={styles.header}
        source={require('../media/images/header.jpg')}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    height: null,
    resizeMode: 'stretch',
  },
});
