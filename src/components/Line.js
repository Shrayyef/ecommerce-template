import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

export default ({style}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 1,
        marginVertical: 10,
        backgroundColor: theme.colors.backGrey,
        ...style,
      }}
    />
  );
};
