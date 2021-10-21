import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Card from './Card';
import Text from './Text';

export default ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Blog', {item})}>
      <View style={{marginBottom: 15}}>
        <FastImage
          source={{uri: item.photo}}
          style={{height: 250, width: null, flex: 1}}
        />
        <Card style={{margin: 0}}>
          <Text h6 main>
            {item.title}
          </Text>
          <Text p>{item.meta_description}</Text>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};
