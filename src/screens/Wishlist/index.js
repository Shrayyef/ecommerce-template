import {useFocusEffect} from '@react-navigation/core';
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {I18nManager} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useSelector} from 'react-redux';
import api from '../../api';
import Container from '../../components/Container';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';
import ProductWishlist from '../../components/ProductWishlist';
import ScreenTitle from '../../components/ScreenTitle';
import {translate} from '../../utils';

const Wishlist = ({route, navigation}) => {
  const {token, loggedIn} = useSelector(s => s.app);

  const theme = useTheme();
  const [state, setState] = useState({
    loading: false,
    data: [],
  });

  useFocusEffect(
    useCallback(() => {
      if (loggedIn) {
        getData();
      } else {
        navigation.navigate('Auth');
      }
    }, []),
  );

  useEffect(() => {
    if (loggedIn) getData();
  }, [loggedIn]);

  const getData = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.wishlists(token);
      if (res.status) {
        setState(s => ({
          ...s,
          data: res.data,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const swipeRefs = useRef({}).current;
  swipeRefs.current = {};

  const addToRefs = (index, ref) => {
    swipeRefs.current[index] = ref;
  };

  const removeWish = item => {
    try {
      api.remove_wishlist({token, id: item.id});
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({item, index}) => {
    const swipableProps = {
      ref: e => addToRefs(index, e),
      onSwipeableWillOpen: () => {
        Object.keys(swipeRefs.current).map(key => {
          if (key != index) {
            swipeRefs.current[key]?.close();
          }
        });
      },
    };

    const renderRightActions = props => {
      return (
        <RectButton
          style={{
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 25,
          }}
          onPress={() => removeWish(item)}>
          <Icon type={'antdesign'} name={'delete'} size={24} color={'#fff'} />
        </RectButton>
      );
    };

    if (I18nManager.isRTL) {
      swipableProps.renderLeftActions = renderRightActions;
    } else {
      swipableProps.renderRightActions = renderRightActions;
    }
    return (
      <Swipeable {...swipableProps}>
        <ProductWishlist item={item} style={{margin: 0}} />
      </Swipeable>
    );
  };

  return (
    <Container
      navBarProps={{
        title: translate('wishlist'),
      }}
      type={'flatlist'}
      flatlistProps={{
        data: state.data,
        keyExtractor: item => `wishlist-${item.id}`,
        renderItem,
        ListHeaderComponent:
          state.loading && state.data.length === 0 ? (
            <Loading size={'large'} style={{marginTop: 100}} />
          ) : (
            <ScreenTitle title={translate('wishlist')} />
          ),
      }}
    />
  );
};

export default Wishlist;
