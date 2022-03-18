import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Data} from '../data';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Loading({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      let context = Data.getInstance();
      AsyncStorage.getAllKeys().then(keys => {
        AsyncStorage.multiGet(keys).then(data => {
          for (let elem of data) {
            context[elem[0]] = elem[1];
          }
          if (context.is_registered) {
            context.is_registered = context.is_registered == 'true';
            context.skip_registration = context.skip_registration == 'true';
            context.last_exercise_time = parseInt(context.last_exercise_time);
            context.last_exercise_completed =
              context.last_exercise_completed == 'true';
            context.points = parseFloat(context.points);
          }
          console.log(context);
          navigation.navigate(context.skip_registration ? 'menu' : 'welcome');
        });
      });
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={true}
        overlayColor="#628"
        animationStyle={styles.lottie}
        source={require('../media/animations/launch.json')}
        speed={1}>
        <Text style={styles.text}>e</Text>
      </AnimatedLoader>
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
    position: 'absolute',
    color: '#rgba(200,200,200,0.5)',
    fontSize: 700,
    paddingBottom: 100,
    fontStyle: 'italic',
  },
});
