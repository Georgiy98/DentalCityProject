import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import GoodButton from '../widgets/GoodButton';
import {useBackHandler} from '@react-native-community/hooks';
import {Data} from '../data';

export default function Welcome({navigation}) {
  useEffect(() => {
    Data.getInstance().prev = 'welcome';
    // AsyncStorage.setItem('prev', 'welcome');
  });
  useBackHandler(() => true);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <ImageHeader />
        <View style={styles.body}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Вітаємо Вас!</Text>
          </View>
          <View style={styles.containerDescription}>
            <Text>Наша мета - зберегти вашу яскраву посмішку</Text>
            <Text>ЕЛІТ піклується про ваше здоров'я</Text>
            <View />
            <View />
          </View>
          <View style={styles.containerButton}>
            <GoodButton
              style={styles.button}
              onPress={() => {
                navigation.navigate('registration');
              }}>
              ДАЛІ
            </GoodButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 4,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHeader: {
    justifyContent: 'center',
    flex: 1,
  },
  textHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  containerDescription: {
    flex: 3,
    justifyContent: 'space-around',
  },
  containerButton: {
    flex: 1,
    alignItems: 'flex-end',
    width: '80%',
  },
  button: {
    width: 100,
  },
});
