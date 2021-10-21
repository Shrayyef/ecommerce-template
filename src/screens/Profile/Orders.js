import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import api from '../../api';
import Container from '../../components/Container';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import ProfileOrder from '../../components/ProfileOrder';
import ScreenTitle from '../../components/ScreenTitle';
import {translate} from '../../utils';

const Orders = ({route, navigation}) => {
  const {token} = useSelector(s => s.app);

  const [state, setState] = useState({
    loading: false,
    orders: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.orders(token);

      if (res.status) {
        setState(s => ({
          ...s,
          orders: res.data,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const renderItem = ({item}) => <ProfileOrder item={item} />;

  return (
    <Container
      back
      navBarProps={{
        title: translate('orders'),
      }}
      type={'flatlist'}
      flatlistProps={{
        ListEmptyComponent: !state.loading && <Empty />,
        ListHeaderComponent: state.loading ? (
          <Loading size={'large'} style={{marginTop: 100}} />
        ) : (
          <>
            <ScreenTitle hasBack title={translate('orders')} />
          </>
        ),
        data: state.orders,
        renderItem,
        keyExtractor: item => `item-${item.id}`,
      }}
    />
  );
};

export default Orders;
