import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../../api';
import {logout as logoutDispatch, setTheme} from '../../../app/reducers/app';
import Card from '../../../components/Card';
import Container from '../../../components/Container';
import ScreenTitle from '../../../components/ScreenTitle';
import SettingItem from '../../../components/SettingItem';
import {changeLang, translate} from '../../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import {currency as currencyDispatch} from '../../../app/reducers/app';

const Profile = ({route, navigation}) => {
  const {currency, currencies, theme} = useSelector(s => s.app);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentLang: '',
  });

  useEffect(() => {
    AsyncStorage.getItem('lang').then(lang =>
      setState(s => ({...s, currentLang: lang})),
    );
  }, []);

  return (
    <Container
      back
      navBarProps={{
        title: translate('settings'),
      }}>
      <ScreenTitle hasBack title={translate('settings')} />
      <Card style={{padding: 0}} title={translate('languages')}>
        <SettingItem
          borderBottom
          selected={state.currentLang === 'en'}
          item={{
            name: translate('english'),
            icon: {
              type: 'antdesign',
              name: 'flag',
            },
            onPress: () => changeLang('en'),
          }}
          style={{margin: 0}}
        />
        <SettingItem
          borderBottom
          selected={state.currentLang === 'tr'}
          item={{
            name: translate('turkish'),
            icon: {
              type: 'antdesign',
              name: 'flag',
            },
            onPress: () => changeLang('tr'),
          }}
          style={{margin: 0}}
        />
        <SettingItem
          selected={state.currentLang === 'ar'}
          item={{
            name: translate('arabic'),
            icon: {
              type: 'antdesign',
              name: 'flag',
            },
            onPress: () => changeLang('ar'),
          }}
          style={{margin: 0}}
        />
      </Card>
      <Card style={{padding: 0}} title={translate('theme')}>
        <SettingItem
          borderBottom
          selected={theme === 'dark'}
          item={{
            name: translate('dark'),
            icon: {
              type: 'Ionicons',
              name: 'bulb',
            },
            onPress: () => dispatch(setTheme({theme: 'dark'})),
          }}
          style={{margin: 0}}
        />
        <SettingItem
          selected={theme === 'light'}
          borderBottom
          item={{
            name: translate('light'),
            icon: {
              type: 'Ionicons',
              name: 'bulb-outline',
            },
            onPress: () => dispatch(setTheme({theme: 'light'})),
          }}
          style={{margin: 0}}
        />
        <SettingItem
          selected={theme === 'system'}
          item={{
            name: translate('system'),
            icon: {
              type: 'MaterialIcons',
              name: 'computer',
            },
            onPress: () => dispatch(setTheme({theme: 'system'})),
          }}
          style={{margin: 0}}
        />
      </Card>
      <Card style={{padding: 0}} title={translate('currency')}>
        {currencies.map(item => (
          <SettingItem
            key={`currency-${item.id}`}
            borderBottom
            selected={currency.id === item.id}
            item={{
              name: item.name,
              onPress: () => dispatch(currencyDispatch({currency: item})),
            }}
            style={{margin: 0}}
          />
        ))}
      </Card>
    </Container>
  );
};

export default Profile;
