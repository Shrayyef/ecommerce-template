import React, {memo, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  useWindowDimensions,
  View,
  I18nManager,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../api';
import {increment} from '../../app/reducers/app';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Gradiant from '../../components/Gradiant';
import Line from '../../components/Line';
import Loading from '../../components/Loading';
import Price from '../../components/Price';
import ProductCard from '../../components/ProductCard';
import Text from '../../components/Text';
import Title from '../../components/Title';
import {showToats, translate} from '../../utils';
import Button from '../../components/Button';
import {useTheme} from '@react-navigation/native';
import Review from '../../components/Review';
import Rate from '../../components/Rate';
import Comment from '../../components/Comment';
import Dropdown from '../../components/Dropdown';
import {addToCart} from '../../app/reducers/cart';
import ScreenTitle from '../../components/ScreenTitle';

const Vendor = ({route, navigation}) => {
  const {value} = useSelector(s => s.app);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const theme = useTheme();
  const {id, vendor} = route.params;

  const [state, setState] = useState({
    loading: false,
    products: [],
  });

  useEffect(() => {
    getVendor();
  }, [id]);

  const getVendor = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.vendor(id);

      if (res.status) {
        setState(s => ({
          ...s,
          products: res.data,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const renderItem = ({item}) => <ProductCard item={item} />;

  return (
    <Container
      back
      navBarProps={{
        title: vendor.name,
      }}
      type={'flatlist'}
      flatlistProps={{
        ListHeaderComponent: state.loading ? (
          <Loading size={'large'} style={{marginTop: 100}} />
        ) : (
          <>
            <ScreenTitle hasBack title={vendor.name} />
          </>
        ),
        data: state.products,
        keyExtractor: item => `product-${item.id}`,
        renderItem,
        numColumns: 2,
      }}
    />
  );
};

export default Vendor;
