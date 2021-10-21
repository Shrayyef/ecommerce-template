import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default ({color, size = 'small', style}) => {
  const theme = useTheme();

  return (
    <View style={{...style}}>
      <ActivityIndicator size={size} color={color || theme.colors.primary} />
    </View>
  );
};
