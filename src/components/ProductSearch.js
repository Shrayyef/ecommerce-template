import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {I18nManager, Image, useWindowDimensions, View} from 'react-native';
import Card from './Card';
import Gradiant from './Gradiant';
import Text from './Text';

export default ({item, style}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Card
      onPress={() => navigation.navigate('Product', {product: item})}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.border,
      }}>
      <Image
        source={{uri: item.thumbnail}}
        style={{
          marginEnd: 10,
          borderRadius: 5,
          overflow: 'hidden',
          width: 30,
          height: 30,
          ...style,
        }}
        resizeMode={'cover'}
      />
      <Text p>{I18nManager.isRTL ? item.title_ar : item.title}</Text>
    </Card>
  );
};
