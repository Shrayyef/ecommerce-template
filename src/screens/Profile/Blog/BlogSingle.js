import React, {useState} from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import Card from '../../../components/Card';
import Container from '../../../components/Container';
import Line from '../../../components/Line';
import Text from '../../../components/Text';
import {translate} from '../../../utils';

const Blog = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <Container
      back
      navBarProps={{
        title: translate('blog'),
      }}>
      <Image
        source={{uri: item.photo}}
        style={{height: 300, width: null, flex: 1}}
        resizeMode={'cover'}
      />
      <Card style={{margin: 0, borderRadius: 0}}>
        <Text h3>{item.title}</Text>
        <Text grey>{item.created_at.date}</Text>
        <Line />
        <Text p>{item.details}</Text>
      </Card>
    </Container>
  );
};

export default Blog;
