import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {I18nManager, Image, View} from 'react-native';
import Card from './Card';
import Price from './Price';
import Text from './Text';

export default ({item, style}) => {
  const navigation = useNavigation();
  return (
    <Card
      onPress={() => navigation.navigate('Product', {product: item})}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 0,
        ...style,
      }}>
      <Image
        source={{uri: item.thumbnail}}
        style={{
          marginEnd: 10,
          borderRadius: 5,
          overflow: 'hidden',
          width: 75,
          height: 75,
        }}
        resizeMode={'cover'}
      />
      <View style={{flex: 1}}>
        <Text p>{I18nManager.isRTL ? item.title_ar : item.title}</Text>
        <Price old_price={item.previous_price} new_price={item.current_price} />
      </View>
    </Card>
  );
};
