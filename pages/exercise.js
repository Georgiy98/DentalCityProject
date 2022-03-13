import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import GoodButton from '../widgets/GoodButton';
import Orientation from 'react-native-orientation';
import {useBackHandler} from '@react-native-community/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

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
  const pauseRef = useRef(paused);
  pauseRef.current = paused;
  const videoRef = useRef();

  useBackHandler(() => {
    Orientation.lockToPortrait();
    if (orientation == 'portrait') navigation.navigate('menu');
    else handleFullscreenClick();
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
  handleEnd = () => {};
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
      <Video
        source={require('../media/videos/video.mp4')}
        resizeMode="stretch"
        paused={paused}
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
