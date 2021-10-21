import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  useWindowDimensions,
  View,
} from 'react-native';
import api from '../api';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import Gradiant from '../components/Gradiant';
import Input from '../components/Input';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import ProductSearch from '../components/ProductSearch';
import RecentSearch from '../components/RecentSearch';
import Text from '../components/Text';
import {getNotchHeight, translate} from '../utils';

const Home = ({navigation}) => {
  const {width} = useWindowDimensions();

  const [state, setState] = useState({
    loading: false,
    searching: false,
    loading_more: false,
    refreshing: false,
    slides: [],
    banners: [],
    links: [],
    services: [],
    products: [],
    query: '',
    per_page: 10,
    page: 1,
    total: 0,
    searchMode: false,
    recent_searches: ['shoes', 'pants', 'graphit'],
    search_data: [],
  });

  useEffect(() => {
    getSlides();
    getFeaturedBanners();
    getFeaturedLinks();
    getServices();
    getPartners();
  }, []);

  useEffect(() => {
    getProducts();
  }, [state.per_page, state.page]);

  const getProducts = async () => {
    setState(s => ({...s, loading_more: true}));
    try {
      const products = await api.products({
        params: {paginate: state.per_page, page: state.page},
      });
      if (products.data) {
        setState(s => ({
          ...s,
          products:
            state.page === 1
              ? products.data.data
              : [...s.products, ...products.data.data],
          total: products.data.meta.total,
        }));
      }
    } catch (error) {
      setState(s => ({...s, loading_more: false}));
    } finally {
      setState(s => ({...s, loading_more: false}));
    }
  };

  const onRefresh = async () => {
    setState(s => ({...s, refreshing: true}));
    try {
      const products = await api.products({
        params: {paginate: state.per_page, page: state.page},
      });
      if (products.data) {
        setState(s => ({
          ...s,
          products: products.data.data,
          total: products.data.meta.total,
        }));
      }
    } catch (error) {
      setState(s => ({...s, refreshing: false}));
    } finally {
      setState(s => ({...s, refreshing: false}));
    }
  };

  const getPartners = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const partners = await api.partners();
      if (partners.data) {
        setState(s => ({...s, partners: partners.data}));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const getServices = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const services = await api.services();
      if (services.data) {
        setState(s => ({...s, services: services.data}));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const getFeaturedLinks = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const links = await api.featured_links();
      if (links.data) {
        setState(s => ({...s, links: links.data}));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const getSlides = async () => {
    setState(s => ({...s, loading: true}));
    try {
      const slides = await api.slides();
      if (slides.data) {
        setState(s => ({...s, slides: slides.data}));
      }
    } catch (error) {
      setState(s => ({...s, loading: false}));
    } finally {
      setState(s => ({...s, loading: false}));
    }
  };

  const getFeaturedBanners = async () => {
    setState(s => ({...s, banners_loading: true}));
    try {
      const banners = await api.featured_banners();
      if (banners.data) {
        setState(s => ({...s, banners: banners.data}));
      }
    } catch (error) {
      setState(s => ({...s, banners_loading: false}));
    } finally {
      setState(s => ({...s, banners_loading: false}));
    }
  };

  const renderLinks = ({item, index}) => (
    <ImageBackground
      source={{uri: item.photo}}
      style={{
        height: 150,
        width: width / 1.5,
        marginEnd: 15,
        borderRadius: 15,
        overflow: 'hidden',
      }}
      resizeMode={'cover'}>
      <Gradiant style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>{item.name}</Text>
      </Gradiant>
    </ImageBackground>
  );

  const renderPartners = ({item, index}) => (
    <ImageBackground
      source={{uri: item.image}}
      style={{
        height: 75,
        width: width / 1.8,
        marginEnd: 15,
        borderRadius: 15,
        overflow: 'hidden',
        marginStart: index === 0 ? 15 : 0,
      }}
      resizeMode={'cover'}
    />
  );

  const renderBanner = ({item, index}) => (
    <ImageBackground
      source={{uri: item.photo}}
      style={{
        height: 150,
        width: width / 1.5,
        marginStart: index === 0 ? 15 : 0,
        marginEnd: index < state.banners.length ? 15 : 0,
        borderRadius: 15,
        overflow: 'hidden',
      }}
      resizeMode={'cover'}
    />
  );

  const renderService = ({item, index}) => (
    <Card resizeMode={'cover'} style={{flexDirection: 'row'}}>
      <Image
        source={{uri: item.photo}}
        style={{
          width: 30,
          height: 30,
          marginEnd: 10,
          marginStart: index === 0 ? 10 : 0,
        }}
        resizeMode={'contain'}
      />
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Text h6>{item.title}</Text>
        <Text>{item.details}</Text>
      </View>
    </Card>
  );

  const renderSlide = ({item}) => (
    <ImageBackground
      source={{uri: item.image}}
      style={{width, height: 300}}
      resizeMode={'cover'}>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Gradiant type="blur" style={{padding: 15, width}}>
          <Text h6>{item.title}</Text>
          <Text p>{item.subtitle}</Text>
          <Text>{item.small_text}</Text>
        </Gradiant>
      </View>
    </ImageBackground>
  );

  const renderProduct = ({item}) => <ProductCard item={item} />;

  const renderRecent = ({item}) => (
    <RecentSearch
      item={item}
      onPress={() => setState(s => ({...s, query: item}))}
    />
  );

  const renderSearchProducts = ({item}) => <ProductSearch item={item} />;

  useEffect(() => {
    if (state.query) search();
  }, [state.query]);

  const search = async () => {
    setState(s => ({...s, searching: true}));
    try {
      const searchRes = await api.search({term: state.query});
      if (searchRes.status) {
        setState(s => ({...s, search_data: searchRes.data}));
      }
    } catch (err) {
      setState(s => ({...s, searching: false}));
    } finally {
      setState(s => ({...s, searching: false}));
    }
  };

  const theme = useTheme();

  const inputRef = useRef(null);

  return (
    <Container
      type={'flatlist-fixed'}
      screenFooter={
        state.searchMode && (
          <Card
            style={{
              position: 'absolute',
              top: getNotchHeight(),
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9,
              borderRadius: 0,
              margin: 0,
              padding: 10,
            }}>
            {state.searching && <Loading />}
            {!!state.search_data.length && (
              <FlatList
                data={state.search_data}
                renderItem={renderSearchProducts}
                keyExtractor={(item, index) => `search-product-${index}`}
              />
            )}
            {!state.query.length && (
              <FlatList
                data={state.recent_searches}
                renderItem={renderRecent}
                keyExtractor={(item, index) => `search-recent-${index}`}
              />
            )}
          </Card>
        )
      }
      navBarProps={{
        navComponent: (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}>
            <Input
              iconBefore={{
                name: 'search1',
                type: 'antdesign',
                size: 16,
                color: theme.colors.primary,
              }}
              value={state.query}
              placeholder={translate('search_text')}
              style={{
                paddingVertical: 5,
              }}
              onFocus={() => {
                setState(s => ({...s, searchMode: true}));
              }}
              onChangeText={query => setState(s => ({...s, query}))}
              wrapperStyle={{
                borderRadius: 10,
              }}
              ref={inputRef}
            />
            {state.searchMode && (
              <Button
                cardStyle={{
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  margin: 0,
                  marginEnd: 10,
                }}
                label={translate('cancel')}
                onPress={() => {
                  setState(s => ({
                    ...s,
                    searchMode: false,
                    query: '',
                    search_data: [],
                  }));
                  inputRef.current.blur();
                }}
              />
            )}
          </View>
        ),
      }}
      flatlistProps={{
        data: state.products,
        renderItem: renderProduct,
        refreshing: state.refreshing,
        onRefresh,
        numColumns: 2,
        keyExtractor: item => `product-${item.id}`,
        onEndReachedThreshold: 0.5,
        onEndReached: () => {
          if (state.products.length < state.total && !state.loading_more) {
            setState(s => ({...s, loading_more: true, page: s.page + 1}));
          }
        },
        ListFooterComponent: state.loading_more && <Loading />,
        ListHeaderComponent: (
          <>
            {state.loading && <Loading />}
            <FlatList
              horizontal
              pagingEnabled={true}
              data={state.slides}
              renderItem={renderSlide}
              keyExtractor={item => `slide-${item.id}`}
            />
            <FlatList
              style={{marginTop: 15}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={state.banners}
              renderItem={renderBanner}
              keyExtractor={item => `banner-${item.id}`}
            />
            <FlatList
              style={{marginTop: 15}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={state.links}
              renderItem={renderLinks}
              keyExtractor={item => `link-${item.id}`}
            />
            <FlatList
              style={{marginTop: 15}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={state.services}
              renderItem={renderService}
              keyExtractor={item => `service-${item.id}`}
            />
            <FlatList
              style={{marginTop: 15}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={state.partners}
              renderItem={renderPartners}
              keyExtractor={item => `partner-${item.id}`}
            />
          </>
        ),
      }}
    />
  );
};

export default Home;
