import React, {useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';
import GoodButton from '../widgets/GoodButton';
import Orientation from 'react-native-orientation';

export default function VideoPlayer({navigation}) {
  const [paused, setPaused] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(
    (Dimensions.get('window').width * 9) / 16,
  );

  player = useRef();
  onPlayClick = () => {
    setPaused(!paused);
  };
  onEnd = () => {};
  onFullscreenClick = () => {
    if (fullscreen) {
      setFullscreen(false);
      navigation.setOptions({headerShown: true});
      Orientation.lockToPortrait();
      setOrientation('portrait');
      let w = Dimensions.get('window').height;
      let h = (w * 9) / 16;
      setWidth(w);
      setHeight(h);
    } else {
      setFullscreen(true);
      navigation.setOptions({headerShown: false});
      setOrientation('landscape');
      Orientation.lockToLandscape();
      let w = Dimensions.get('window').height;
      let h = (w * 9) / 16;
      if (h > Dimensions.get('window').width) {
        h = Dimensions.get('window').width;
        w = (h * 16) / 9;
      }
      setWidth(w);
      setHeight(h);
    }
    setFullscreen(!fullscreen);
  };

  return (
    <View>
      <Video
        source={require('../media/videos/video.mp4')} // Can be a URL or a local file.
        resizeMode="stretch"
        ref={ref => {
          player = ref;
        }}
        paused={paused}
        style={{
          backgroundColor: '#cc0',
          width: width,
          height: height,
        }}
        repeat={true}
      />

      <GoodButton onPress={onPlayClick}>Play</GoodButton>
      <GoodButton onPress={onFullscreenClick}>Fullscreen</GoodButton>
    </View>
  );
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});
