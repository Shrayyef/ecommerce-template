import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {I18nManager, Image, View} from 'react-native';
import Card from './Card';
import Price from './Price';
import Text from './Text';
import {translate} from '../utils';
import Row from './Row';

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
        source={{uri: item.feature_image}}
        style={{
          marginEnd: 10,
          borderRadius: 5,
          overflow: 'hidden',
          width: 75,
          height: 75,
          ...style,
        }}
        resizeMode={'cover'}
      />
      <View style={{flex: 1}}>
        <Text p>{item.name}</Text>
        <Row style={{paddingVertical: 0}}>
          <Text p>{translate('price')}</Text>
          <Text p>{item.item_price}</Text>
        </Row>
        <Row style={{paddingVertical: 0}}>
          <Text p>{translate('quantity')}</Text>
          <Text p>{item.qty}</Text>
        </Row>
        <Row style={{paddingVertical: 0}}>
          <Text p>{item.keys}</Text>
          <Text p>{item.values}</Text>
        </Row>
      </View>
    </Card>
  );
};
