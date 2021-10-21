import {BlurView} from '@react-native-community/blur';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default ({children, style, type}) => {
  const theme = useTheme();
  const Component = Platform.OS === 'ios' ? BlurView : View;
  let styles = {
    backgroundColor: theme.colors.gradiantBackground,
  };

  if (Platform.OS === 'ios') {
    styles = {};
  }

  if (type === 'dark') {
    return (
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles,
          ...style,
        }}
        colors={['transparent', 'transparent']}>
        {children}
      </LinearGradient>
    );
  }
  if (type === 'blur') {
    return (
      <Component
        style={{
          ...style,
          ...styles,
        }}
        blurType={theme.blur}
        blurAmount={4}
        reducedTransparencyFallbackColor={theme.blur}>
        {children}
      </Component>
    );
  }
  return (
    <Component
      style={{
        ...StyleSheet.absoluteFillObject,
        ...styles,
        ...style,
      }}
      blurType={theme.blur}
      blurAmount={10}
      reducedTransparencyFallbackColor={theme.blur}>
      {children}
    </Component>
  );
};
