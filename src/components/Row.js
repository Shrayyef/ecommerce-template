import React from 'react';
import {View} from 'react-native';

export default ({children, style}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      ...style,
    }}>
    {children}
  </View>
);
