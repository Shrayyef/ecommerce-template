import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeSplash} from '../app/reducers/app';

const Init = () => {
  const dispatch = useDispatch();
  return (
    <LottieView
      style={{...StyleSheet.absoluteFillObject, backgroundColor: '#288fee'}}
      source={require('../assets/splash.json')}
      autoPlay
      loop={false}
      onAnimationFinish={() => dispatch(removeSplash())}
    />
  );
};

export default Init;
