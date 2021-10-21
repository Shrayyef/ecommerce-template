import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  useWindowDimensions,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../api';
import {addToCart} from '../../app/reducers/cart';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Comment from '../../components/Comment';
import Container from '../../components/Container';
import Dropdown from '../../components/Dropdown';
import ImagesGallery from '../../components/ImagesGallery';
import Line from '../../components/Line';
import Loading from '../../components/Loading';
import Price from '../../components/Price';
import ProductCard from '../../components/ProductCard';
import Rate from '../../components/Rate';
import Review from '../../components/Review';
import Text from '../../components/Text';
import Title from '../../components/Title';
import {showToats, translate} from '../../utils';

const Product = ({route, navigation}) => {
  const {loading} = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const theme = useTheme();
  const {product} = route.params;

  const [state, setState] = useState({
    loading: false,
    product: {},
    selected_tab: 1,
    attributes: '',
    show_gallery: false,
  });

  useEffect(() => {
    getProduct();
    // getReplies();
    // getComments();
    // getRatings();
    setState(s => ({
      ...s,
      product,
    }));
  }, [product]);

  const getRatings = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const productRatings = await api.productRatings(product.id);
      console.log(productRatings);
      //   if (products.data) {
      //     setState(s => ({...s, products: products.data}));
      //   }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const getComments = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const productComments = await api.productComments(product.id);
      console.log(productComments);
      //   if (products.data) {
      //     setState(s => ({...s, products: products.data}));
      //   }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const getReplies = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const productReplies = await api.productReplies(product.id);
      console.log(productReplies);
      //   if (products.data) {
      //     setState(s => ({...s, products: products.data}));
      //   }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const getProduct = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const productDetails = await api.productDetails(product.id);

      if (productDetails.status) {
        productDetails.data.images = [
          ...productDetails.data.images,
          {id: -1, image: product.thumbnail},
        ];
        setState(s => ({
          ...s,
          product: {...s.product, ...productDetails.data},
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const renderRelated = ({item}) => (
    <ProductCard item={item} style={{marginTop: 0}} />
  );
  const renderImages = ({item}) => (
    <Card
      style={{padding: 0, margin: 0, borderRadius: 0}}
      onPress={() => setState(s => ({...s, show_gallery: true}))}>
      <Image
        source={{uri: item.image}}
        style={{width, height: height / 1.8}}
        resizeMode={'cover'}
      />
    </Card>
  );

  const add_to_cart = () => {
    if (Object.keys(state.product.attributes).length) {
      if (state.attributes === '') {
        showToats(translate('please_select_options'));
        return;
      }
    }
    dispatch(addToCart({item: {...state.product}}));
  };

  return (
    <Container
      back
      navBarProps={{
        title: I18nManager.isRTL ? state.product.title_ar : state.product.title,
      }}
      screenFooter={
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            iconBefore={{
              type: 'MaterialCommunityIcons',
              name: 'cart-plus',
              size: 16,
              color: '#fff',
            }}
            cardStyle={{flex: 1}}
            sm
            label={translate('add_to_cart')}
            onPress={add_to_cart}
          />
          <Button
            iconBefore={{
              type: 'MaterialCommunityIcons',
              name: 'cart-plus',
              size: 16,
              color: '#fff',
            }}
            cardStyle={{flex: 1}}
            sm
            label={translate('buy_now')}
          />
          <Price
            sm
            old_price={state.product.previous_price}
            new_price={state.product.current_price}
            style={{marginEnd: 10}}
          />
        </View>
      }>
      {state.loading ? (
        <Loading size={'large'} style={{marginTop: 100}} />
      ) : (
        <>
          <FlatList
            horizontal
            pagingEnabled={true}
            data={state.product?.images || []}
            renderItem={renderImages}
            keyExtractor={item => `image-${item.id}`}
          />

          <Card style={{margin: 0, borderRadius: 0}}>
            <Text p>
              {I18nManager.isRTL ? state.product.title_ar : state.product.title}
            </Text>
            <Text
              primary
              onPress={() => {
                if (state.product?.shop?.id) {
                  navigation.navigate('VendorStack', {
                    screen: 'Vendor',
                    params: {
                      id: state.product?.shop?.id,
                      vendor: state.product?.shop,
                    },
                  });
                }
              }}>
              {state.product?.shop?.name}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Rate rate={state.product.rating} />
            </View>
            <Line />
            <Price
              old_price={state.product.previous_price}
              new_price={state.product.current_price}
            />
            <Text p>{state.product.details}</Text>

            {state.product?.attributes &&
              Object.keys(state.product?.attributes).map(key => (
                <Dropdown
                  style={{marginTop: 10}}
                  key={`option-${key}`}
                  value={state.attributes}
                  placeholder={key}
                  onChange={attributes => setState(s => ({...s, attributes}))}
                  items={state.product?.attributes[key].values.map(
                    (val, index) => ({
                      id: index,
                      name: val,
                      price: state.product?.attributes[key][index],
                      label: val,
                    }),
                  )}
                  itemId="id"
                  itemLabel="name"
                  modalStyle={{height: 360}}
                />
              ))}
          </Card>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              cardStyle={{
                flex: 1,
                paddingHorizontal: 5,
                paddingVertical: 15,
                margin: 0,
                borderRadius: 0,
                backgroundColor: theme.colors.background,
                borderBottomWidth: 3,
                borderBottomColor:
                  state.selected_tab === 1
                    ? theme.colors.primary
                    : 'transparent',
              }}
              onPress={() => setState(s => ({...s, selected_tab: 1}))}
              textStyle={{
                fontSize: 12,
                color:
                  state.selected_tab === 1
                    ? theme.colors.primary
                    : theme.colors.text,
              }}
              label={translate('return_policy')}
            />
            <Button
              cardStyle={{
                flex: 1,
                paddingHorizontal: 5,
                paddingVertical: 15,
                margin: 0,
                borderRadius: 0,
                backgroundColor: theme.colors.background,
                borderBottomWidth: 3,
                borderBottomColor:
                  state.selected_tab === 2
                    ? theme.colors.primary
                    : 'transparent',
              }}
              onPress={() => setState(s => ({...s, selected_tab: 2}))}
              textStyle={{
                fontSize: 12,
                color:
                  state.selected_tab === 2
                    ? theme.colors.primary
                    : theme.colors.text,
              }}
              label={translate('reviews', {
                num: state.product?.reviews?.length || 0,
              })}
            />
            <Button
              cardStyle={{
                flex: 1,
                paddingHorizontal: 5,
                paddingVertical: 15,
                margin: 0,
                borderRadius: 0,
                backgroundColor: theme.colors.background,
                borderBottomWidth: 3,
                borderBottomColor:
                  state.selected_tab === 3
                    ? theme.colors.primary
                    : 'transparent',
              }}
              onPress={() => setState(s => ({...s, selected_tab: 3}))}
              textStyle={{
                fontSize: 12,
                color:
                  state.selected_tab === 3
                    ? theme.colors.primary
                    : theme.colors.text,
              }}
              label={translate('comments', {
                num: state.product?.comments?.length || 0,
              })}
            />
          </View>

          {state.selected_tab === 1 && (
            <Card style={{margin: 0, borderRadius: 0}}>
              <Text p>{state.product.policy}</Text>
            </Card>
          )}

          {state.selected_tab === 2 && (
            <View>
              {state.product?.reviews?.map(one => (
                <Review item={one} key={`review-${one.id}`} />
              ))}
            </View>
          )}
          {state.selected_tab === 3 && (
            <View>
              {state.product?.comments?.map(one => (
                <Comment item={one} key={`comment-${one.id}`} />
              ))}
            </View>
          )}

          {!!state.product?.related_products?.length && (
            <Title title={translate('relatedProducts')} />
          )}
          <FlatList
            horizontal
            data={state.product?.related_products || []}
            renderItem={renderRelated}
            keyExtractor={item => `related-${item.id}`}
          />
          <ImagesGallery
            images={state.product?.images}
            visible={state.show_gallery}
            onClose={() => setState(s => ({...s, show_gallery: false}))}
          />
        </>
      )}
    </Container>
  );
};

export default Product;
