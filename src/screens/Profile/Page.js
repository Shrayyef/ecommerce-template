import React from 'react';
import Card from '../../components/Card';
import Container from '../../components/Container';
import ScreenTitle from '../../components/ScreenTitle';
import Text from '../../components/Text';
import {translate} from '../../utils';

const Page = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <Container
      back
      navBarProps={{
        title: translate(item.slug),
      }}>
      <ScreenTitle hasBack title={translate(item.slug)} />
      <Card>
        <Text p>{item.content}</Text>
      </Card>
    </Container>
  );
};

export default Page;
