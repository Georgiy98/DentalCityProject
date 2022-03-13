import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageHeader from '../components/ImageHeader';
import {useBackHandler} from '@react-native-community/hooks';

export default function Profile({navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    AsyncStorage.multiGet(['name', 'phone', 'city', 'birthday']).then(data => {
      setName(data[0][1]);
      setPhone(data[1][1]);
      setCity(data[2][1]);
      setBirthday(data[3][1]);
    });
  }, []);
  useBackHandler(() => {
    navigation.navigate('menu');
  });
  askLogOut = () => {
    Alert.alert('Ви впевнені?', 'Дані будуть втрачені назавжди!', [
      {
        text: 'Ні',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Так',
        onPress: () => {
          // TODO: reset all
          AsyncStorage.setItem('is_registered', '');
          AsyncStorage.setItem('skip_registration', '');
          AsyncStorage.setItem('points', '0');
          AsyncStorage.setItem('prev', 'menu').then(() => {
            navigation.navigate('registration');
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <ImageHeader />
        <View style={styles.bg}>
          <View>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View>
            <Text style={styles.phone}>Телефон: {phone}</Text>
          </View>
          <View>
            <Text style={styles.city}>Місто: {city}</Text>
          </View>
          <View>
            <Text style={styles.birthday}>День народження: {birthday}</Text>
          </View>
        </View>
        <View style={styles.exit_icon}>
          <Icon name="logout" size={60} color="black" onPress={askLogOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#649',
    width: '100%',
    borderBottomWidth: 2,
    flex: 1,
    borderStyle: 'solid',
  },
  bg: {
    marginTop: 1,
    marginBottom: 240,
    width: 400,
    height: 335,
    backgroundColor: '#a6e',
  },
  exit_icon: {
    backgroundColor: '#a6e',
    position: 'absolute',
    right: 10,
    top: 555,
    borderRadius: 20,
  },
  name: {
    color: 'black',
    position: 'absolute',
    left: 100,
    top: 30,
    fontSize: 30,
  },
  phone: {
    color: 'black',
    position: 'absolute',
    left: 10,
    top: 110,
    fontSize: 25,
  },
  city: {
    color: 'black',
    position: 'absolute',
    left: 10,
    top: 180,
    fontSize: 24,
  },
  birthday: {
    color: 'black',
    position: 'absolute',
    left: 10,
    top: 250,
    fontSize: 23,
  },
});
