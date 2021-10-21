import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../../api';
import {logout as logoutDispatch} from '../../../app/reducers/app';
import Card from '../../../components/Card';
import Container from '../../../components/Container';
import Empty from '../../../components/Empty';
import Loading from '../../../components/Loading';
import ScreenTitle from '../../../components/ScreenTitle';
import SettingItem from '../../../components/SettingItem';
import {changeLang, translate} from '../../../utils';

const Transactions = ({route, navigation}) => {
  const {token} = useSelector(s => s.app);
  const [state, setState] = useState({
    loading: false,
    data: [],
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.transactions(token);
      if (res.status) {
        setState(s => ({...s, data: res.data}));
      }
    } catch (err) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  return (
    <Container
      back
      navBarProps={{
        title: translate('transactions'),
      }}
      type={'flatlist'}
      flatlistProps={{
        data: state.data,
        ListEmptyComponent: !state.loading && <Empty />,
        ListHeaderComponent: (
          <>
            <ScreenTitle hasBack title={translate('transactions')} />
            {state.loading && <Loading />}
          </>
        ),
      }}
    />
  );
};

export default Transactions;
