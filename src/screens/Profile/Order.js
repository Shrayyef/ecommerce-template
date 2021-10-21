import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import api from '../../api';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Loading from '../../components/Loading';
import ProductOrder from '../../components/ProductOrder';
import ProfileOrder from '../../components/ProfileOrder';
import Row from '../../components/Row';
import ScreenTitle from '../../components/ScreenTitle';
import Text from '../../components/Text';
import {translate} from '../../utils';

const Order = ({route, navigation}) => {
  const {token} = useSelector(s => s.app);

  const [state, setState] = useState({
    loading: false,
    order: {},
  });

  const {order} = route.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.order({token, id: order.id});

      if (res.status) {
        setState(s => ({
          ...s,
          order: res.data,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const renderItem = ({item}) => <ProductOrder item={item} />;

  return (
    <Container
      back
      navBarProps={{
        title: translate('order'),
      }}
      type={'flatlist'}
      flatlistProps={{
        ListHeaderComponent: state.loading ? (
          <Loading size={'large'} style={{marginTop: 100}} />
        ) : (
          <>
            <ScreenTitle hasBack title={translate('order')} />
            <Card title={translate('order_details')}>
              <Row>
                <Text p>{translate('order_number')}</Text>
                <Text p>{state.order.number}</Text>
              </Row>
              <Row>
                <Text p>{translate('date')}</Text>
                <Text p>{state.order?.created_at?.date}</Text>
              </Row>
              <Row>
                <Text p>{translate('payment_method')}</Text>
                <Text p>{state.order.payment_method}</Text>
              </Row>
              <Row>
                <Text p>{translate('payment_status')}</Text>
                <Text p>{state.order.payment_status}</Text>
              </Row>
              <Row>
                <Text p>{translate('packing_cost')}</Text>
                <Text p>{state.order.packing_cost}</Text>
              </Row>
              <Row>
                <Text p>{translate('paid_amount')}</Text>
                <Text p>{state.order.paid_amount}</Text>
              </Row>
            </Card>
            <Card title={translate('customer_information')}>
              <Row>
                <Text p>{translate('customer_name')}</Text>
                <Text p>{state.order.customer_name}</Text>
              </Row>
              <Row>
                <Text p>{translate('customer_email')}</Text>
                <Text p>{state.order.customer_email}</Text>
              </Row>
              <Row>
                <Text p>{translate('customer_phone')}</Text>
                <Text p>{state.order.customer_phone}</Text>
              </Row>
              <Row>
                <Text p>{translate('customer_country')}</Text>
                <Text p>{state.order.customer_country}</Text>
              </Row>
              <Row>
                <Text p>{translate('customer_city')}</Text>
                <Text p>{state.order.customer_city}</Text>
              </Row>
              <Row>
                <Text p>{translate('customer_address')}</Text>
                <Text p>{state.order.customer_address}</Text>
              </Row>
            </Card>
            <Card title={translate('shipping_information')}>
              <Row>
                <Text p>{translate('shipping_name')}</Text>
                <Text p>{state.order.shipping_name}</Text>
              </Row>
              <Row>
                <Text p>{translate('shipping_email')}</Text>
                <Text p>{state.order.shipping_email}</Text>
              </Row>
              <Row>
                <Text p>{translate('shipping_phone')}</Text>
                <Text p>{state.order.shipping_phone}</Text>
              </Row>
              <Row>
                <Text p>{translate('shipping_country')}</Text>
                <Text p>{state.order.shipping_country}</Text>
              </Row>
              <Row>
                <Text p>{translate('shipping_city')}</Text>
                <Text p>{state.order.shipping_city}</Text>
              </Row>
              <Row>
                <Text p>{translate('shipping_address')}</Text>
                <Text p>{state.order.shipping_address}</Text>
              </Row>
            </Card>
          </>
        ),
        data: state.order?.ordered_products || [],
        renderItem,
        keyExtractor: item => `item-product-${item.id}`,
      }}
    />
  );
};

export default Order;
