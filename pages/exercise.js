import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
} from 'react-native';
import Video from 'react-native-video';
import GoodButton from '../widgets/GoodButton';
import Orientation from 'react-native-orientation';
import {useBackHandler} from '@react-native-community/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import AnimatedLoader from 'react-native-animated-loader';
import {useFocusEffect} from '@react-navigation/native';
import {Data} from '../data';
import NativeClipboard from 'react-native/Libraries/Components/Clipboard/NativeClipboard';

export default function Exercise({navigation}) {
  const [paused, setPaused] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(
    (Dimensions.get('window').width * 9) / 16,
  );
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [duration, setDuration] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showAbovePanel, setShowAbovePanel] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [potentialAward, setPotentailAward] = useState();
  const [infoText, setInfoText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const pauseRef = useRef(paused);
  pauseRef.current = paused;
  const videoRef = useRef();

  onBack = () => {
    Orientation.lockToPortrait();
    if (orientation == 'portrait') {
      if (potentialAward == 0 || progress == 0) {
        setIsActive(false);
        navigation.navigate('menu');
      } else if (potentialAward == 1 && progress * 2 > duration)
        Alert.alert(
          'Ви впевнені?',
          'Якщо покинете відео, ви отримаєте лише пів бали!',
          [
            {
              text: 'Ні',
              style: 'cancel',
            },
            {
              text: 'Так',
              onPress: () => {
                setIsActive(false);
                Data.update({
                  points: Data.get('points') + 0.5,
                  last_exercise_completed: false,
                  last_exercise_time: new Date().getTime(),
                });
                navigation.navigate('menu');
              },
            },
          ],
          {
            cancelable: true,
          },
        );
      else
        Alert.alert(
          'Ви впевнені?',
          'Якщо покинете відео, бали не будуть нараховані',
          [
            {
              text: 'Ні',
              style: 'cancel',
            },
            {
              text: 'Так',
              onPress: () => {
                setIsActive(false);
                navigation.navigate('menu');
              },
            },
          ],
          {
            cancelable: true,
          },
        );
    } else handleFullscreenClick();
  };
  updateInfo = () => {
    let nextAvailableTime = new Date(
      Data.get('last_exercise_time') + 1000 * 60 * 60 * 8,
    );
    if (!Data.get('is_registered')) {
      setInfoText(
        'Незареєстровані користувачі не можуть отримати бонус за перегляд відео',
      );
      setPotentailAward(0);
    } else if (
      Data.get('last_exercise_completed') &&
      nextAvailableTime > new Date()
    ) {
      setInfoText(
        'Ви вже отримали бонус за перегляд відео нещодавно\nНаступний раз ви зможете отримати бонус не раніше ніж ' +
          nextAvailableTime.toLocaleDateString() +
          ' o ' +
          nextAvailableTime.toLocaleTimeString(),
      );
      setPotentailAward(0);
    } else if (
      !Data.get('last_exercise_completed') &&
      nextAvailableTime > new Date()
    ) {
      setInfoText(
        'Ви вже 0.5 балів за це відео. За повний перегляд ви отримаєте ще 0.5 балів.\nОновлення ' +
          nextAvailableTime.toLocaleDateString() +
          ' o ' +
          nextAvailableTime.toLocaleTimeString(),
      );
      setPotentailAward(0.5);
    } else {
      setInfoText(
        'За повний перегляд даного відео ви отримаєте 1 бал\nКожні 100 балів ви можете обміняти на безкоштовне обстеження',
      );
      setPotentailAward(1);
    }
    setTimeout(() => {
      if (isActive) updateInfo();
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      onBack();
    });
    updateInfo();
  }, []);

  useBackHandler(() => {
    navigation.goBack();
  });

  handleLoad = meta => {
    setDuration(meta.duration);
  };
  handleProgress = progr => {
    if (progr.currentTime == 0 && progress) {
      videoRef.current.seek(progress);
    } else setProgress(progr.currentTime);
  };
  handlePlayClick = () => {
    if (paused)
      setTimeout(() => {
        // TODO: check last click time
        if (!pauseRef.current) setShowAbovePanel(false);
      }, 1000);
    setPaused(!paused);
  };
  handleEnd = () => {
    console.log('hadleENd');
    setShowCongrats(true);
    setTimeout(() => {
      setShowCongrats(false);
      navigation.navigate('menu');
    }, 5000);
  };
  handleFullscreenClick = () => {
    if (fullscreen) {
      navigation.setOptions({headerShown: true});
      Orientation.lockToPortrait();
      setOrientation('portrait');
      let w = Dimensions.get('window').height;
      let h = (w * 9) / 16;
      setWidth(w);
      setHeight(h);
      StatusBar.setHidden(false);
    } else {
      navigation.setOptions({headerShown: false});
      setOrientation('landscape');
      Orientation.lockToLandscape();
      let w = Dimensions.get('window').height;
      let h = (w * 9) / 16;
      if (h > Dimensions.get('window').width) {
        h = Dimensions.get('window').width;
        w = (h * 16) / 9;
        setOffsetX((w - Dimensions.get('window').height) / 2);
      }
      setWidth(w);
      setHeight(h);
      StatusBar.setHidden(true);
    }
    setFullscreen(!fullscreen);
  };
  invertShowAbovePanel = () => {
    setShowAbovePanel(!showAbovePanel);
  };

  return (
    <View
      style={
        fullscreen
          ? {
              backgroundColor: '#fff',
              alignContent: 'center',
              justifyContent: 'center',
            }
          : {}
      }>
      <AnimatedLoader
        visible={showCongrats}
        overlayColor="rgba(255,255,255,0.95)"
        animationStyle={styles.lottie}
        source={require('../media/animations/exercise_done.json')}
        speed={1}>
        <Text style={styles.lottieText}>
          Кількість ваших балів тепер на {potentialAward} більша!
          {Data.get('poinst') >= 100
            ? '\nВам доступне безкоштовне обстеження!'
            : ''}
        </Text>
      </AnimatedLoader>
      <Video
        source={require('../media/videos/video.mp4')}
        resizeMode="stretch"
        paused={paused}
        onEnd={handleEnd}
        ref={ref => {
          videoRef.current = ref;
        }}
        style={{
          backgroundColor: '#eee',
          width: width,
          height: height,
          right: fullscreen ? offsetX : 0,
        }}
        repeat={true}
        onLoad={handleLoad}
        onProgress={handleProgress}
      />
      <Text
        style={{
          color: potentialAward == 1 ? '#8b8' : '#cc8',
          padding: 10,
        }}>
        {infoText}
      </Text>
      <TouchableWithoutFeedback onPress={invertShowAbovePanel}>
        <View
          style={{
            ...styles.aboveVideoPanel,
            height: height,
            backgroundColor: showAbovePanel
              ? 'rgba(0,0,0, 0.3)'
              : 'rgba(0,0,0,0)',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              display: showAbovePanel ? 'flex' : 'none',
            }}>
            <View style={styles.controlPanel}>
              <Icon
                name={fullscreen ? 'compress' : 'expand'}
                size={30}
                onPress={handleFullscreenClick}
                color="rgba(255,255,255, 0.8)"
              />
            </View>
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: -1,
              }}>
              <Icon
                name={paused ? 'play-circle-o' : 'pause-circle-o'}
                size={80}
                onPress={handlePlayClick}
                color="rgba(255,255,255, 0.8)"
              />
            </View>
          </View>
          <Progress.Bar
            style={{
              position: 'absolute',
              bottom: 0,
            }}
            progress={progress / duration}
            color="#628"
            borderColor="rgba(0,0,0,0)"
            width={
              fullscreen
                ? Dimensions.get('window').width
                : Dimensions.get('window').width
            }
          />
        </View>
      </TouchableWithoutFeedback>
      {!fullscreen && <View style={{height: 200}}></View>}
    </View>
  );
}

// Later on in your styles..
var styles = StyleSheet.create({
  aboveVideoPanel: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    // height: 50,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
  controlPanel: {
    height: 100,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
