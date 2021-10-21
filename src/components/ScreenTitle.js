import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from './Text';

export default ({title, hasBack}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingBottom: 25,
        paddingTop: 25,
        marginTop: hasBack ? insets.top + 50 : insets.top,
      }}>
      <Text h1>{title}</Text>
    </View>
  );
};
