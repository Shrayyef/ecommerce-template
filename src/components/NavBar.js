import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Animated,
  I18nManager,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import Gradiant from './Gradiant';
import Text from './Text';
import Icon from './Icon';
import {getNotchHeight, translate} from '../utils';
import {useSelector, useDispatch} from 'react-redux';
import Dropdown from './Dropdown';
import {currency} from '../app/reducers/app';

export default ({
  headerHeight,
  titleHeight,
  opacityDark,
  onBack,
  back,
  type,
  headerType,
  page,
  onMenuPress,
  fixedNav,
  rightButtonAfter,
  rightButtonBefore,
  leftButtonAfter,
  leftButtonBefore,
  title,
  showCart = true,
  onLayout,
  backgroundImage,
  showMenu,
  navComponent,
}) => {
  const navigation = useNavigation();
  const cart = useSelector(s => s.cart);
  const {currency: default_currency, currencies} = useSelector(s => s.app);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        zIndex: 99,
        height: getNotchHeight(),
        position: fixedNav ? 'relative' : 'absolute',
        right: 0,
        left: 0,
        justifyContent: 'flex-end',
      }}
      onLayout={onLayout}>
      <Animated.View
        opacity={fixedNav ? 1 : headerHeight}
        style={{...StyleSheet.absoluteFillObject}}>
        <Gradiant type={'header'} />

        <ImageBackground
          source={{uri: backgroundImage}}
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          resizeMode={'cover'}
        />
        {!!backgroundImage && (
          <Animated.View
            opacity={headerHeight}
            style={{...StyleSheet.absoluteFillObject}}>
            <Gradiant darker />
          </Animated.View>
        )}
      </Animated.View>
      {!fixedNav && (
        <Animated.View
          opacity={opacityDark}
          style={{...StyleSheet.absoluteFillObject}}>
          <Gradiant type={'dark'} />
        </Animated.View>
      )}
      {navComponent ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {navComponent}
          {/* <Dropdown
            style={{flex: 0, width: 75}}
            showIcon={false}
            buttonStyle={{
              backgroundColor: theme.colors.card,
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            value={default_currency.id}
            placeholder={translate('currency')}
            onChange={one => {
              const sel_curr = currencies.filter(item => item.id === one)[0];
              dispatch(currency({currency: sel_curr}));
            }}
            items={currencies.map(one => ({
              ...one,
              label: `${one.name} ${one.sign}`,
            }))}
            itemId="id"
            itemLabel="label"
            modalStyle={{height: 360}}
          /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{padding: 5, marginEnd: 10}}>
            <View style={{position: 'relative'}}>
              {!!cart?.items?.length && (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 99,
                    borderRadius: 15,
                    backgroundColor: theme.colors.primary,
                    minWidth: 15,
                    top: 0,
                    start: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text white>{cart?.items?.length}</Text>
                </View>
              )}
              <Icon name={'shoppingcart'} type={'antdesign'} size={24} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              alignItems: 'center',
              height: 50,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 45,
              }}>
              {rightButtonBefore}
              {back ? (
                <TouchableOpacity
                  onPress={() => {
                    if (onBack) {
                      return onBack(true);
                    }
                    navigation.goBack();
                  }}
                  style={{padding: 5}}>
                  <Icon
                    name={
                      headerType === 'modal'
                        ? 'down'
                        : I18nManager.isRTL
                        ? 'right'
                        : 'left'
                    }
                    type={'antdesign'}
                    size={24}
                  />
                </TouchableOpacity>
              ) : showMenu ? (
                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={
                    onMenuPress ? onMenuPress : () => navigation.openDrawer()
                  }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name={'menu'} type={'Feather'} size={24} />
                  </View>
                </TouchableOpacity>
              ) : (
                <View />
              )}
              {rightButtonAfter}
            </View>
            {!!title && !leftButtonBefore && !leftButtonAfter && (
              <Animated.View
                opacity={fixedNav ? 1 : titleHeight}
                // opacity={1}
                style={{
                  maxWidth: 150,
                  justifySelf: 'center',
                  flex: 1,
                }}>
                <Text style={{fontSize: 14, lineHeight: 24}} lines={1} center>
                  {title}
                </Text>
              </Animated.View>
            )}
            {showCart && page !== 'cart' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  minWidth: 45,
                }}>
                {leftButtonBefore}
                {leftButtonAfter}
                {/* <Dropdown
                  style={{flex: 0, width: 75}}
                  showIcon={false}
                  buttonStyle={{
                    backgroundColor: theme.colors.card,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  value={default_currency.id}
                  placeholder={translate('currency')}
                  onChange={one => {
                    const sel_curr = currencies.filter(
                      item => item.id === one,
                    )[0];
                    dispatch(currency({currency: sel_curr}));
                  }}
                  items={currencies.map(one => ({
                    ...one,
                    label: `${one.name} ${one.sign}`,
                  }))}
                  itemId="id"
                  itemLabel="label"
                  modalStyle={{height: 360}}
                /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Cart')}
                  style={{padding: 5}}>
                  <View style={{position: 'relative'}}>
                    {!!cart?.items?.length && (
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 99,
                          borderRadius: 15,
                          backgroundColor: theme.colors.primary,
                          minWidth: 25,
                          top: -10,
                          start: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text p white>
                          {cart?.items?.length}
                        </Text>
                      </View>
                    )}
                    <Icon name={'shoppingcart'} type={'antdesign'} size={24} />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 45,
                }}>
                {leftButtonBefore}
                {leftButtonAfter}
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
