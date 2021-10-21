import {Text, useColorScheme, Platform, I18nManager} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default ({
  children,
  xl,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  bold,
  light,
  main,
  darkMain,
  sec,
  grey,
  lightGrey,
  white,
  lines,
  center,
  lineThrough,
  lightMain,
  weight,
  danger,
  con,
  ltr,
  warn,
  rtl,
  right,
  left,
  primary,
  style,
  ...props
}) => {
  const theme = useTheme();

  const styles = {
    color: theme.colors.text,
    fontSize: 12,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  };

  if (I18nManager.isRTL) {
    styles.fontFamily =
      Platform.OS === 'ios' ? 'ElMessiri-Regular' : 'ElMessiri-Regular';
  }

  if (ltr) {
    styles.writingDirection = 'ltr';
  }
  if (xl) {
    styles.fontSize = 54;
    styles.fontWeight = '800';
    styles.lineHeight = 66;
  }
  if (h1) {
    styles.fontSize = 34;
    styles.fontWeight = '600';
    styles.lineHeight = 46;
  }
  if (h2) {
    styles.fontSize = 30;
    styles.fontWeight = '500';
    styles.lineHeight = 42;
  }
  if (h3) {
    styles.fontSize = 26;
    styles.fontWeight = '400';
    styles.lineHeight = 32;
  }
  if (h4) {
    styles.fontSize = 22;
    styles.lineHeight = 30;
  }
  if (h5) {
    styles.fontSize = 20;
    styles.lineHeight = 30;
  }
  if (h6) {
    styles.fontSize = 18;
    styles.lineHeight = 26;
  }
  if (p) {
    styles.fontSize = 14;
    styles.lineHeight = 24;
  }
  if (bold) {
    styles.fontFamily =
      Platform.OS === 'android' ? 'ElMessiri-Bold' : 'ElMessiri-Bold';
    if (Platform.OS === 'ios') {
      styles.fontWeight = '700';
    }
  }
  if (light) {
    styles.fontWeight = '100';
  }

  if (center) {
    styles.textAlign = 'center';
    styles.alignSelf = 'center';
  }
  if (right) {
    styles.textAlign = 'right';
    styles.writingDirection = 'rtl';
  }
  if (rtl) {
    styles.writingDirection = 'rtl';
  }
  if (left) {
    styles.textAlign = 'left';
    styles.writingDirection = 'ltr';
  }
  if (lineThrough) {
    styles.textDecorationLine = 'line-through';
    styles.textDecorationStyle = 'solid';
  }
  if (weight) {
    styles.fontWeight = weight;
  }
  if (primary) {
    styles.color = theme.colors.primary;
  }
  if (white) {
    styles.color = theme.colors.white;
  }
  if (grey) {
    styles.color = theme.colors.grey;
  }

  return (
    <Text numberOfLines={lines} style={{...styles, ...style}} {...props}>
      {children}
    </Text>
  );
};
