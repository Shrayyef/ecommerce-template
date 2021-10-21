import {useTheme} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {View, I18nManager, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../components/Container';
import Loading from '../../components/Loading';
import ProductCartCard from '../../components/ProductCartCard';
import ScreenTitle from '../../components/ScreenTitle';
import {translate} from '../../utils';
import Button from '../../components/Button';
import Card from '../../components/Card';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from '../../components/Icon';
import {removeFromCart} from '../../app/reducers/cart';

const Cart = ({route, navigation}) => {
  const {items} = useSelector(s => s.cart);
  const dispatch = useDispatch();

  const theme = useTheme();

  const [state, setState] = useState({
    loading: false,
    products: [],
  });

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
          onPress={() => dispatch(removeFromCart({item}))}>
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
        <ProductCartCard style={{margin: 0}} item={item} />
      </Swipeable>
    );
  };

  const checkout = () => navigation.navigate('Checkout');

  const swipeRefs = useRef({}).current;
  swipeRefs.current = {};

  const addToRefs = (index, ref) => {
    swipeRefs.current[index] = ref;
  };

  return (
    <Container
      navBarProps={{
        title: translate('cart'),
      }}
      type={'flatlist-swipable'}
      screenFooter={
        <Card
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}>
          <Button
            iconBefore={{
              type: 'MaterialCommunityIcons',
              name: 'check',
              size: 16,
              color: '#fff',
            }}
            cardStyle={{flex: 1}}
            sm
            label={translate('checkout')}
            onPress={checkout}
          />
        </Card>
      }
      flatlistProps={{
        onScroll: () => {
          Object.keys(swipeRefs.current).map(key => {
            swipeRefs.current[key]?.close();
          });
        },
        ListHeaderComponent: state.loading ? (
          <Loading size={'large'} style={{marginTop: 100}} />
        ) : (
          <>
            <ScreenTitle title={translate('cart')} />
          </>
        ),
        data: items,
        keyExtractor: item => `product-${item.id}`,
        renderItem,
      }}
    />
  );
};

export default Cart;
