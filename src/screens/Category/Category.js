import React, {useState, useEffect} from 'react';
import {I18nManager, useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../api';
import Container from '../../components/Container';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import ProductCard from '../../components/ProductCard';
import ScreenTitle from '../../components/ScreenTitle';

const Category = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {category} = route.params;

  const [state, setState] = useState({
    loading: false,
    loading_more: false,
    refreshing: false,
    products: [],
    page: 1,
    total: 0,
  });

  useEffect(() => {
    getData();
  }, [state.page]);

  const getData = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.category(category.category_id, {page: state.page});
      if (res.status) {
        setState(s => ({
          ...s,
          products: s.products.length
            ? [...s.products, ...res.data[0].products.data]
            : res.data[0].products.data,
          total: res.data[0].products.total,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const onRefresh = async () => {
    setState(s => ({...s, refreshing: true}));
    try {
      const res = await api.category(category.category_id, {page: 1});
      if (res.status) {
        setState(s => ({
          ...s,
          products: res.data[0].products.data,
          total: res.data[0].products.total,
        }));
      }
    } catch (error) {
      setState(s => ({...s, refreshing: false}));
    } finally {
      setState(s => ({...s, refreshing: false}));
    }
  };

  const renderItem = ({item}) => <ProductCard item={item} />;

  return (
    <Container
      back
      navBarProps={{
        title: I18nManager.isRTL ? category.name_ar : category.name,
      }}
      type={'flatlist'}
      flatlistProps={{
        ListEmptyComponent: !state.loading && <Empty />,
        numColumns: 2,
        data: state.products,
        keyExtractor: item => `product-${item.id}`,
        renderItem,
        refreshing: state.refreshing,
        ListFooterComponent: state.loading_more && <Loading />,
        onRefresh,
        onEndReachedThreshold: 0.5,
        onEndReached: () => {
          if (state.products.length < state.total && !state.loading_more) {
            setState(s => ({...s, loading_more: true, page: s.page + 1}));
          }
        },
        ListHeaderComponent: state.loading ? (
          <Loading size={'large'} style={{marginTop: 100}} />
        ) : (
          <ScreenTitle
            hasBack
            title={I18nManager.isRTL ? category.name_ar : category.name}
          />
        ),
      }}
    />
  );
};

export default Category;
