import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Linking, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageHeader from '../components/ImageHeader';
// import HTMLView from "react-native-htmlview";
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBackHandler} from '@react-native-community/hooks';
import AnimatedLoader from 'react-native-animated-loader';
import {useFocusEffect} from '@react-navigation/native';

export default function Menu({navigation}) {
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccessful, setShowSuccessful] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [points, setPoints] = useState('');
  const [isRegistered, setIsRegistered] = useState('');
  const [city, setCity] = useState('');
  const [instLink, setInstLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [googleMapLink, setGoogleMapLink] = useState('');
  const [initialized, setInitialzied] = useState(false);

  useFocusEffect(() => {
    AsyncStorage.multiGet(['city', 'points', 'is_registered']).then(data => {
      console.log(2);
      let city = data[0][1];
      setPoints(data[1][1]);
      setCity(city);
      setIsRegistered(data[2][1] == '1');
      switch (city) {
        case 'Київ': {
          setInstLink('https://instagram.com/dentalcity_kyiv');
          setFacebookLink('https://www.facebook.com/dentalcitykiev/');
          setGoogleMapLink('https://g.co/kgs/Hh1sWi');
          break;
        }
        case 'Чернігів': {
          setInstLink('https://instagram.com/elit_clinic_che');
          setFacebookLink('https://www.facebook.com/elitchernigov/');
          setGoogleMapLink('https://g.co/kgs/xZqANn');
          break;
        }
        default: {
          setInstLink('https://instagram.com/elitclinic');
          setFacebookLink('https://www.facebook.com/elitclinicbc/');
          setGoogleMapLink('https://g.co/kgs/dgdSDU');
        }
      }
    });
  });

  useBackHandler(() => true);
  showSuccessAppointment = () => {};
  showFailedAppointment = () => {};
  showLoadingAppointment = () => {};

  makeAppointment = message => {
    setShowLoading(true);
    let receiver;
    switch (city) {
      case 'Київ':
        receiver = 'iasgeo.public@gmail.com';
        break;
      default:
        receiver = 'iasgeo.dev@gmail.com';
    }
    fetch(
      // 'https://rg4b1i3kji.execute-api.eu-west-1.amazonaws.com/default/DentalCityMailer' - PROD
      'https://lpv1unfrsi.execute-api.eu-west-1.amazonaws.com/default/First',
      {
        method: 'POST',
        body: JSON.stringify({
          msg: message,
          receiver: receiver,
        }),
      },
    ).then(response => {
      setShowLoading(false);
      if (response.status == 200) {
        setShowSuccessful(true);
        let points_float = 0;
        if (points) points_float = parseFloat(points);
        if (points_float >= 100) {
          AsyncStorage.setItem('points', points_float - 100 + '');
          setPoints(points_float - 100 + '');
        }
      } else setShowFailed(true);

      setTimeout(() => {
        setShowSuccessful(false);
        setShowFailed(false);
      }, 4000);
    });
  };

  askNotRegisteredMakeAppointment = () => {};

  askRegisteredMakeAppointment = () => {
    let description = '';
    let points_float = 0;
    if (points) points_float = parseFloat(points);
    if (points_float >= 100)
      description =
        'Автоматично будуть використані 100 балів та ви отримаєте безкоштовне обстеження';
    else description = '(накопичуйте бали та отримуйте безкоштовне обстеження)';
    Alert.alert(
      'Бажаєте записатися на прийом?',
      description,
      [
        {
          text: 'Ні',
          style: 'cancel',
        },
        {
          text: 'Так',
          onPress: () => {
            AsyncStorage.multiGet(['name', 'phone', 'birthday']).then(data => {
              let msg =
                '<h2>Користувач мобільного додатку бажає записатися на прийом</h2><br>' +
                "Ім'я: <b>" +
                data[0][1] +
                '</b><br>' +
                'Номер телефону: <b>' +
                data[1][1] +
                '</b><br>' +
                'Дата народження: <b>' +
                data[2][1] +
                '</b><br>' +
                'Обране місто для прийому: <b>' +
                city +
                '</b><br>' +
                'Чи безкоштовно: <b>' +
                (points_float >= 100 ? 'Так' : 'Ні') +
                '</b>';
              makeAppointment(msg);
            });
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  askMakeAppointment = () => {
    if (isRegistered) askRegisteredMakeAppointment();
    else askNotRegisteredMakeAppointment();
  };

  return (
    <View style={{flex: 1}}>
      <AnimatedLoader
        visible={showLoading}
        overlayColor="rgba(255,255,255,0.95)"
        animationStyle={styles.lottie}
        source={require('../media/animations/loading_appointment.json')}
        speed={1.5}>
        <Text style={styles.lottieText}>Запис на прийом...</Text>
      </AnimatedLoader>
      <AnimatedLoader
        visible={showSuccessful}
        overlayColor="rgba(255,255,255,0.95)"
        animationStyle={styles.lottie}
        source={require('../media/animations/success_appointment.json')}
        speed={1}
        loop={false}>
        <Text style={styles.lottieText}>Заявка була успішно подана</Text>
        <Text style={styles.lottieText}>очікуйте на дзвінок</Text>
      </AnimatedLoader>
      <AnimatedLoader
        visible={showFailed}
        overlayColor="rgba(255,255,255,0.95)"
        animationStyle={styles.lottie}
        source={require('../media/animations/failed_appointment.json')}
        speed={1}
        loop={false}>
        <Text style={styles.lottieText}>Не вдалося подати заявку</Text>
        <Text style={styles.lottieText}>
          Будь ласка, зв'яжіться з нами за номером телефону
        </Text>
      </AnimatedLoader>

      <ImageHeader />
      <View style={styles.body}>
        <View style={styles.underLogoContainer}>
          <View style={styles.linkContainer}>
            <Icon
              name="instagram"
              size={45}
              color="#628"
              onPress={() => Linking.openURL(instLink)}
            />
            <Icon
              name="facebook-square"
              size={45}
              color="#628"
              onPress={() => Linking.openURL(facebookLink)}
            />
            <Icon
              name="youtube-play"
              size={45}
              color="#628"
              onPress={() =>
                Linking.openURL(
                  'https://www.youtube.com/channel/UCSTONM0BWgXEZvQazFyjqJQ',
                )
              }
            />
            <Icon
              name="map-marker"
              size={45}
              color="#628"
              onPress={() => Linking.openURL(googleMapLink)}
            />
          </View>
          {isRegistered == '1' && (
            <View style={styles.pointContainer}>
              <Icon name="trophy" size={30} color="#a4a" />
              <Text style={styles.pointText}>{points}</Text>
            </View>
          )}
        </View>
        <View style={styles.newListContainer}>
          <View style={[styles.topBorder, styles.inverseBorder]} />
          <View style={styles.newContainer}>
            <WebView source={{uri: 'https://reactnative.dev/'}} />
            {/* <HTMLView
                value={
                  "<center><h4>Гарантований подарунок за відгук на Google Maps</h4></center>" +
                  "<left><p>Оцініть роботу нашої клінінки від 1 до 5 зірочок та напишіть, що Вам сподобалося</p><br>" +
                  "<p>Для нас дуже важлива Ваша думка!</p><br>" +
                  "<p>Гарантований брендовий подарунок за відгук Ви можете забрати в робочі години клінінки у Вашому місті</p><br>" +
                  "<p>Детальніше: (068) 864 64 64</p></left>"
                }
              /> */}
          </View>
          <View style={[styles.bottomBorder, styles.inverseBorder]} />
        </View>
        <View style={styles.menuButtonsContainer}>
          <Icon
            name="play-circle-o"
            size={50}
            color="#fff"
            style={styles.high1}
            onPress={() => navigation.navigate('exercise')}
          />
          <Icon
            name="pencil"
            size={50}
            color="#fff"
            style={styles.high2}
            onPress={askMakeAppointment}
          />
          <Icon
            name="clock-o"
            size={50}
            color="#fff"
            style={styles.high3}
            onPress={() => navigation.navigate('alarm_tree')}
          />
          <Icon
            name="bar-chart"
            size={50}
            color="#fff"
            style={styles.high2}
            onPress={() => navigation.navigate('statistic')}
          />
          <Icon
            name="user"
            size={50}
            color="#fff"
            style={styles.high1}
            onPress={() => {
              console.log(isRegistered);
              AsyncStorage.setItem('prev', 'menu').then(() => {
                navigation.navigate(isRegistered ? 'profile' : 'registration');
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
  lottieText: {
    color: '#314',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    flex: 4,
    backgroundColor: '#efe',
  },
  underLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#628',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#e0ffe0',
    borderColor: '#628',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    width: '60%',
    borderBottomRightRadius: 10,
  },
  pointContainer: {
    paddingRight: 5,
  },
  pointText: {
    color: '#a4a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newListContainer: {
    height: '80%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  newContainer: {
    height: '90%',
  },
  topBorder: {
    borderTopLeftRadius: 0,
    borderTopEndRadius: 0,
    backgroundColor: '#fff',
  },
  bottomBorder: {
    borderBottomLeftRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: '#628',
  },
  inverseBorder: {
    borderWidth: 2,
    height: 800,
    width: '200%',
    borderColor: '#628',
    borderRadius: 300,
    alignSelf: 'center',
  },
  menuButtonsContainer: {
    backgroundColor: '#628',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  high1: {
    top: 20,
    paddingHorizontal: 10,
  },
  high2: {
    top: 0,
  },
  high3: {
    top: -10,
  },
});
