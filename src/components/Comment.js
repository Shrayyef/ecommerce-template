/* eslint-disable radix */
import React from 'react';
import {View} from 'react-native';
import Avatar from './Avatar';
import Card from './Card';
import Text from './Text';

export default ({item}) => (
  <Card style={{flexDirection: 'row', paddingVertical: 15}}>
    <Avatar size={50} url={item.user_image} />
    <View>
      <Text p>{item.name}</Text>
      <Text grey>{item.created_at}</Text>
      <Text p>{item.comment}</Text>
    </View>
  </Card>
);
