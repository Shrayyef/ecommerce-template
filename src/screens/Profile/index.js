import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../api';
import {logout as logoutDispatch} from '../../app/reducers/app';
import Container from '../../components/Container';
import ScreenTitle from '../../components/ScreenTitle';
import SettingItem from '../../components/SettingItem';
import {translate} from '../../utils';
import {getVersion} from 'react-native-device-info';
import {View} from 'react-native';
import Text from '../../components/Text';

const Profile = ({route, navigation}) => {
  const {token} = useSelector(s => s.app);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    rows: [
      {
        name: translate('faq'),
        onPress: () => navigation.navigate('Faq'),
        icon: {
          type: 'Octicons',
          name: 'question',
        },
      },
      {
        name: translate('blog'),
        onPress: () => navigation.navigate('Blogs'),
        icon: {
          type: 'Ionicons',
          name: 'newspaper-outline',
        },
      },
      {
        name: translate('dashboard'),
        onPress: () => navigation.navigate('Dashboard'),
        icon: {
          type: 'Octicons',
          name: 'dashboard',
        },
      },
      {
        name: translate('purchased_items'),
        onPress: () => navigation.navigate('Orders'),
        icon: {
          type: 'AntDesign',
          name: 'CodeSandbox',
        },
      },
      {
        name: translate('deposit'),
        icon: {
          type: 'MaterialIcons',
          name: 'money',
        },
      },
      {
        name: translate('transactions'),
        onPress: () => navigation.navigate('Transactions'),

        icon: {
          type: 'MaterialCommunityIcons',
          name: 'transcribe',
        },
      },
      {
        name: translate('order_tracking'),
        icon: {
          type: 'Ionicons',
          name: 'analytics-outline',
        },
      },
      {
        name: translate('favorite_sellers'),
        icon: {
          type: 'Fontisto',
          name: 'heart-alt',
        },
      },
      {
        name: translate('messages'),
        icon: {
          type: 'Feather',
          name: 'message-square',
        },
      },
      {
        name: translate('tickets'),
        icon: {
          type: 'Entypo',
          name: 'ticket',
        },
      },
      {
        name: translate('disputes'),
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'emoticon-angry-outline',
        },
      },
      {
        name: translate('edit_profile'),
        icon: {
          type: 'Feather',
          name: 'user',
        },
      },
      {
        name: translate('reset_password'),
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'form-textbox-password',
        },
      },
      {
        name: translate('settings'),
        onPress: () => navigation.navigate('Settings'),
        icon: {
          type: 'Feather',
          name: 'settings',
        },
      },
      {
        name: translate('logout'),
        onPress: () => logout(),
        id: 'logout',
        icon: {
          type: 'AntDesign',
          name: 'logout',
        },
      },
    ],
    pages: [],
  });

  useEffect(() => {
    getPages();
  }, []);

  const getPages = async () => {
    try {
      const res = await api.pages(token);
      if (res.status)
        setState(s => ({
          ...s,
          pages: res.data.map(one => ({
            id: one.id,
            name: translate(one.slug),
            onPress: () => navigation.navigate('Page', {item: one}),
            icon: {
              name: 'info',
            },
          })),
        }));
    } catch (err) {}
  };

  const logout = async () => {
    setState(s => ({
      ...s,
      rows: s.rows.map(one => {
        if (one.id === 'logout') {
          one.loading = true;
        }
        return one;
      }),
    }));

    try {
      await api.logout(token);
      dispatch(logoutDispatch());
      navigation.navigate('Home');
    } catch (err) {
      setState(s => ({
        ...s,
        rows: s.rows.map(one => {
          if (one.id === 'logout') {
            one.loading = false;
          }
          return one;
        }),
      }));
    } finally {
      setState(s => ({
        ...s,
        rows: s.rows.map(one => {
          if (one.id === 'logout') {
            one.loading = false;
          }
          return one;
        }),
      }));
    }
  };

  const renderItem = ({item}) => <SettingItem item={item} />;

  return (
    <Container
      navBarProps={{
        title: translate('profile'),
      }}
      type={'flatlist'}
      flatlistProps={{
        data: state.rows,
        keyExtractor: (item, index) => `menu-${index}`,
        renderItem,
        ListFooterComponent: (
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{translate('version', {version: getVersion()})}</Text>
          </View>
        ),
        ListHeaderComponent: (
          <>
            <ScreenTitle title={translate('profile')} />
            {state.pages.map(item => (
              <SettingItem key={`page-${item.id}`} item={item} />
            ))}
          </>
        ),
      }}
    />
  );
};

export default Profile;
