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
import {translate} from '../../utils';
import Button from '../../components/Button';
import ScreenTitle from '../../components/ScreenTitle';

const SubCategory = ({route, navigation}) => {
  const {value} = useSelector(s => s.app);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();

  const {item} = route.params;

  const [state, setState] = useState({
    loading: false,
    categories: [],
  });

  useEffect(() => {
    getData();
  }, [item]);

  const getData = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const categories = await api.sub_categories(item.id);
      if (categories.status) {
        setState(s => ({
          ...s,
          categories: categories.data,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const renderItem = ({item: category}) => (
    <Card
      onPress={() => navigation.navigate('Category', {category})}
      style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15}}>
      <Text p>{I18nManager.isRTL ? category.name_ar : category.name}</Text>
    </Card>
  );

  return (
    <Container
      back
      navBarProps={{
        title: I18nManager.isRTL ? item.name_ar : item.name,
      }}
      type={'flatlist'}
      flatlistProps={{
        data: state.categories,
        keyExtractor: item => `cattegory-${item.id}`,
        renderItem,
        ListHeaderComponent: state.loading ? (
          <Loading size={'large'} style={{marginTop: 100}} />
        ) : (
          <ScreenTitle
            hasBack
            title={I18nManager.isRTL ? item.name_ar : item.name}
          />
        ),
      }}
    />
  );
};

export default SubCategory;
