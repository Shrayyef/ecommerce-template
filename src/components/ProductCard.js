import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  I18nManager,
  ImageBackground,
  useWindowDimensions,
  View,
} from 'react-native';
import Card from './Card';
import Gradiant from './Gradiant';
import Price from './Price';
import Text from './Text';

export default ({item, style}) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Card
      style={{
        margin: 0,
        padding: 0,
        marginHorizontal: 10,
        marginTop: 20,
        overflow: 'hidden',
      }}
      onPress={() => navigation.navigate('Product', {product: item})}>
      <ImageBackground
        source={{uri: item.thumbnail}}
        style={{
          height: 200,
          maxWidth: width / 2 - 20,
          overflow: 'hidden',
          ...style,
        }}
        resizeMode={'cover'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Gradiant type="blur" style={{padding: 15, width: width / 2 - 20}}>
            <Text p>{I18nManager.isRTL ? item.title_ar : item.title}</Text>
            <Price
              old_price={item.previous_price}
              new_price={item.current_price}
            />
          </Gradiant>
        </View>
      </ImageBackground>
    </Card>
  );
};
