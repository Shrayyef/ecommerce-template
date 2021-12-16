import React from 'react';
import {View} from 'react-native';
import Text from './Text';
import {useSelector} from 'react-redux';

export default ({old_price, new_price, sm, style}) => {
  const {currency} = useSelector(s => s.app);
  return (
    <View
      style={{
        flexDirection: sm ? 'column' : 'row',
        alignItems: 'center',
        ...style,
      }}>
      <Text
        style={{fontSize: sm ? 16 : 22, marginEnd: sm ? 0 : 10}}
        grey={new_price < old_price}
        lineThrough={new_price < old_price}>
        {(old_price * currency.value).toFixed(2)}
        {currency.sign}
      </Text>
      {new_price < old_price && (
        <Text h3={!sm} p={sm} primary>
          {(new_price * currency.value).toFixed(2)}
          {currency.sign}
        </Text>
      )}
    </View>
  );
};
