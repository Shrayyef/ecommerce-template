import React from 'react';
import Card from './Card';
import Row from './Row';
import Text from './Text';
import {translate} from '../utils';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';

export default ({item}) => {
  const navigation = useNavigation();
  return (
    <Card>
      <Row>
        <Text p>{translate('date')}</Text>
        <Text p>{item.created_at?.date}</Text>
      </Row>
      <Row>
        <Text p>{translate('order_number')}</Text>
        <Text p>{item.number}</Text>
      </Row>
      <Row>
        <Text p>{translate('total')}</Text>
        <Text p>{item.total}</Text>
      </Row>
      <Row>
        <Text p>{translate('status')}</Text>
        <Text p>{item.status}</Text>
      </Row>
      <Row>
        <Text p>{translate('products_count')}</Text>
        <Text p>{item?.products?.length}</Text>
      </Row>
      <Row style={{justifyContent: 'flex-end'}}>
        <Button
          cardStyle={{margin: 0, marginEnd: 15}}
          sm
          label={translate('details')}
          onPress={() => navigation.navigate('Order', {order: item})}
        />
        <Button cardStyle={{margin: 0}} sm label={translate('pay')} />
      </Row>
    </Card>
  );
};
