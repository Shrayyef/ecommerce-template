import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  I18nManager,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Gradiant from './Gradiant';
import Text from './Text';
import Price from './Price';
import Card from './Card';

export default ({item, style}) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Card
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
      sm>
      <Image
        source={{uri: item.thumbnail}}
        style={{
          marginHorizontal: 10,
          borderRadius: 5,
          overflow: 'hidden',
          width: 75,
          height: 75,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View>
          <Text
            p
            onPress={() => navigation.navigate('Product', {product: item})}>
            {I18nManager.isRTL ? item.title_ar : item.title}
          </Text>
          <Price
            old_price={item.previous_price}
            new_price={item.current_price}
          />
        </View>
      </View>
    </Card>
  );
};
