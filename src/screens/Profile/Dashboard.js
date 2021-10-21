import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../api';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Loading from '../../components/Loading';
import Row from '../../components/Row';
import ScreenTitle from '../../components/ScreenTitle';
import Text from '../../components/Text';
import Title from '../../components/Title';
import {translate} from '../../utils';

const Dashboard = ({route, navigation}) => {
  const {token} = useSelector(s => s.app);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const theme = useTheme();

  const [state, setState] = useState({
    loading: false,
    user: {},
    recent_orders: [],
    pending_orders: 0,
    completed_orders: 0,
    current_balance: '0$',
    affilate_income: '0$',
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.dashboard(token);

      if (res.status) {
        setState(s => ({
          ...s,
          user: res.data.user,
          affilate_income: res.data.affilate_income,
          completed_orders: res.data.completed_orders,
          current_balance: res.data.current_balance,
          pending_orders: res.data.pending_orders,
          recent_orders: res.data.recent_orders,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  return (
    <Container
      back
      navBarProps={{
        title: translate('dashboard'),
      }}>
      {state.loading ? (
        <Loading size={'large'} style={{marginTop: 100}} />
      ) : (
        <>
          <ScreenTitle hasBack title={translate('dashboard')} />
          <Card sm title={translate('purchase_information')}>
            <Row>
              <Text p>{translate('current_balance')}</Text>
              <Text p primary>
                {state.current_balance}
              </Text>
            </Row>
            <Row>
              <Text p>{translate('pending_orders')}</Text>
              <Text p primary>
                {state.pending_orders}
              </Text>
            </Row>
            <Row>
              <Text p>{translate('completed_orders')}</Text>
              <Text p primary>
                {state.completed_orders}
              </Text>
            </Row>
            <Row>
              <Text p>{translate('affilate_income')}</Text>
              <Text p primary>
                {state.affilate_income}
              </Text>
            </Row>
          </Card>
          <Card sm title={translate('profile_information')}>
            <Row>
              <Text p>{translate('name')}</Text>
              <Text p>{state.user.name}</Text>
            </Row>
            <Row>
              <Text p>{translate('email')}</Text>
              <Text p>{state.user.email}</Text>
            </Row>
            <Row>
              <Text p>{translate('phone')}</Text>
              <Text p>{state.user.phone}</Text>
            </Row>
            <Row>
              <Text p>{translate('address')}</Text>
              <Text p>{state.user.address}</Text>
            </Row>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
