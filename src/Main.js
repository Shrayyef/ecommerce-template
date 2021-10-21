import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, useColorScheme, View} from 'react-native';
import Auth from './screens/Auth';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Home from './screens/Home';
import Product from './screens/Product/index';
import Text from './components/Text';
import {translate} from './utils';
import Icon from './components/Icon';
import Categories from './screens/Category';
import SubCategory from './screens/Category/SubCategory';
import Category from './screens/Category/Category';
import Profile from './screens/Profile/index';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Init from './screens/Init';
import {login} from './app/reducers/app';
import Dashboard from './screens/Profile/Dashboard';
import Orders from './screens/Profile/Orders';
import Order from './screens/Profile/Order';
import Wishlist from './screens/Wishlist/index';
import Settings from './screens/Profile/Settings';
import Vendor from './screens/Vendor';
import Cart from './screens/Cart';
import Transactions from './screens/Profile/Transactions';
import Forgot from './screens/Auth/Forgot';
import {setTheme, currencies, currency} from './app/reducers/app';
import Page from './screens/Profile/Page';
import FAQ from './screens/Profile/Faq';
import Blogs from './screens/Profile/Blog';
import Blog from './screens/Profile/Blog/BlogSingle';
import api from './api';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Auth} name={'AuthIndex'} />
    <Stack.Screen component={Login} name={'Login'} />
    <Stack.Screen component={Register} name={'Register'} />
    <Stack.Screen component={Forgot} name={'Forgot'} />
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Categories} name={'Categories'} />
    <Stack.Screen component={SubCategory} name={'SubCategory'} />
    <Stack.Screen component={Category} name={'Category'} />
    <Stack.Screen component={Product} name={'Product'} />
  </Stack.Navigator>
);

const WishlistStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Wishlist} name={'Wishlist'} />
    <Stack.Screen component={Product} name={'Product'} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Profile} name={'Profile'} />
    <Stack.Screen component={Dashboard} name={'Dashboard'} />
    <Stack.Screen component={Orders} name={'Orders'} />
    <Stack.Screen component={Order} name={'Order'} />
    <Stack.Screen component={Settings} name={'Settings'} />
    <Stack.Screen component={Transactions} name={'Transactions'} />
    <Stack.Screen component={Page} name={'Page'} />
    <Stack.Screen component={FAQ} name={'Faq'} />
    <Stack.Screen component={Blogs} name={'Blogs'} />
    <Stack.Screen component={Blog} name={'Blog'} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Cart} name={'Cart'} />
    <Stack.Screen component={Product} name={'Product'} />
  </Stack.Navigator>
);

const VendorStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Vendor} name={'Vendor'} />
    <Stack.Screen component={Product} name={'Product'} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={Home} name={'Home'} />
    <Stack.Screen component={Product} name={'Product'} />
    <Stack.Screen component={VendorStack} name={'VendorStack'} />
  </Stack.Navigator>
);

const HomeTabs = () => {
  const navigation = useNavigation();
  const {loggedIn} = useSelector(s => s.app);
  const {items} = useSelector(s => s.cart);
  const theme = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: ({
            style,
            onPress,
            accessibilityState: {selected: focused},
          }) => (
            <TouchableWithoutFeedback onPress={onPress}>
              <View style={style}>
                <Icon
                  focused={focused}
                  type={'SimpleLineIcons'}
                  name={'home'}
                  size={focused ? 24 : 18}
                  style={{marginBottom: 5}}
                />
                <Text lines={1} primary={focused}>
                  {translate('home')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: ({
            style,
            onPress,
            accessibilityState: {selected: focused},
          }) => (
            <TouchableWithoutFeedback onPress={onPress}>
              <View style={style}>
                <Icon
                  focused={focused}
                  type={'MaterialCommunityIcons'}
                  name={'format-list-bulleted-square'}
                  size={focused ? 24 : 18}
                  style={{marginBottom: 5}}
                />
                <Text lines={1} primary={focused}>
                  {translate('categories')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
        name="CategoriesStack"
        component={CategoriesStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: ({
            style,
            onPress,
            accessibilityState: {selected: focused},
          }) => (
            <TouchableWithoutFeedback
              onPress={async () => {
                if (!loggedIn) {
                  await AsyncStorage.setItem('route', 'WishlistStack');
                  navigation.navigate('Auth');
                  return;
                }
                onPress();
              }}>
              <View style={style}>
                <Icon
                  focused={focused}
                  type={'antdeisgn'}
                  name={'hearto'}
                  size={focused ? 24 : 18}
                  style={{marginBottom: 5}}
                />
                <Text lines={1} primary={focused}>
                  {translate('wishlist')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
        name="WishlistStack"
        component={WishlistStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: ({
            style,
            onPress,
            accessibilityState: {selected: focused},
          }) => (
            <TouchableWithoutFeedback
              onPress={async () => {
                if (!loggedIn) {
                  await AsyncStorage.setItem('route', 'CartStack');
                  navigation.navigate('Auth');
                  return;
                }
                onPress();
              }}>
              <View style={style}>
                {!!items.length && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 10,
                      end: 20,
                      width: 20,
                      height: 20,
                      borderRadius: 20 / 2,
                      backgroundColor: theme.colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 99,
                    }}>
                    <Text white>{items.length}</Text>
                  </View>
                )}
                <Icon
                  focused={focused}
                  type={'MaterialCommunityIcons'}
                  name={'cart-outline'}
                  size={focused ? 24 : 18}
                  style={{marginBottom: 5}}
                />
                <Text lines={1} primary={focused}>
                  {translate('cart')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
        name="CartStack"
        component={CartStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,

          tabBarButton: ({
            style,
            onPress,
            accessibilityState: {selected: focused},
          }) => (
            <TouchableWithoutFeedback
              onPress={async () => {
                if (!loggedIn) {
                  await AsyncStorage.setItem('route', 'ProfileStack');
                  navigation.navigate('Auth');
                  return;
                }
                onPress();
              }}>
              <View style={style}>
                <Icon
                  focused={focused}
                  type={'feather'}
                  name={'user'}
                  size={focused ? 24 : 18}
                  style={{marginBottom: 5}}
                />
                <Text lines={1} primary={focused}>
                  {translate('profile')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  const scheme = useColorScheme();

  const dispatch = useDispatch();

  const {theme, splash_loading} = useSelector(s => s.app);

  const colors = {
    white: 'rgb(255, 255, 255)',
    grey: 'rgb(155, 155, 155)',
    primary: 'rgb(161, 0, 0)',
    secondary: 'rgb(87, 49, 1)',
    success: '#0e5001',
    danger: '#fc2d2d',
    backGrey: '#f1f5f9',
    warning: '#ffbb00',
    lightBlue: '#d3eefa',
    lightDark: 'rgba(0,0,0, .1)',
    lighterDark: 'rgba(0,0,0, .2)',
  };

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
      // card: '#f1f1f1',
      gradiantBackground: 'rgba(255, 255, 255, .3)',
    },
    blur: 'light',
    statusBar: 'dark-content',
  };

  const MyThemeDark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...colors,
      gradiantBackground: 'rgba(0, 0, 0, .3)',
    },
    blur: 'dark',
    statusBar: 'light-content',
  };

  const [state, setstate] = useState({
    loading: true,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = await AsyncStorage.getItem('token');
    const themeStorage = await AsyncStorage.getItem('theme');
    if (themeStorage) {
      dispatch(setTheme({theme: themeStorage}));
    }
    if (token) {
      dispatch(login({token}));
    }

    const res = await Promise.all([api.default_currency(), api.currencies()]);

    const curr = res.length && res[0].status ? res[0].data : {};
    const cuurec = res.length && res[1].status ? res[1].data : [];

    dispatch(currency({currency: curr}));
    dispatch(currencies({currencies: cuurec}));

    setstate(s => ({...s, loading: false}));
  };

  return (
    <NavigationContainer
      theme={
        theme && theme !== 'system'
          ? theme === 'light'
            ? MyTheme
            : MyThemeDark
          : scheme === 'dark'
          ? MyThemeDark
          : MyTheme
      }>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {state.loading || splash_loading ? (
          <Stack.Screen name="Init" component={Init} />
        ) : (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen component={AuthStack} name={'Auth'} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
