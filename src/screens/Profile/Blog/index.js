import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import api from '../../../api';
import BlogCard from '../../../components/BlogCard';
import Container from '../../../components/Container';
import Empty from '../../../components/Empty';
import Loading from '../../../components/Loading';
import ScreenTitle from '../../../components/ScreenTitle';
import {translate} from '../../../utils';

const Blogs = ({route, navigation}) => {
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
      const res = await api.blogs(token);
      if (res.status) {
        setState(s => ({...s, data: res.data}));
      }
    } catch (err) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const renderItem = ({item}) => <BlogCard item={item} />;

  return (
    <Container
      back
      navBarProps={{
        title: translate('blog'),
      }}
      type={'flatlist'}
      flatlistProps={{
        data: state.data,
        ListEmptyComponent: !state.loading && <Empty />,
        renderItem,
        ListHeaderComponent: (
          <>
            <ScreenTitle hasBack title={translate('blog')} />
            {state.loading && <Loading />}
          </>
        ),
      }}
    />
  );
};

export default Blogs;
