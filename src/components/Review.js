/* eslint-disable radix */
import React from 'react';
import {View} from 'react-native';
import Card from './Card';
import Text from './Text';
import Avatar from './Avatar';
import Rate from './Rate';

export default ({item}) => (
  <Card style={{flexDirection: 'row', paddingVertical: 15}}>
    <Avatar size={50} url={item.user_image} />
    <View>
      <Text p>{item.name}</Text>
      <Text grey>{item.review_date}</Text>
      <Rate rate={parseInt(item.rating)} />
      <Text p>{item.review}</Text>
    </View>
  </Card>
);
