import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import Container from '../../components/Container';
import {translate, showToats} from '../../utils';
import Input from '../../components/Input';
import Text from '../../components/Text';
import api from '../../api';
import {login} from '../../app/reducers/app';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [state, setState] = useState({
    email: 'shrayyef1790@gmail.com',
    password: '123123',
    loading: false,
  });

  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const signin = async () => {
    const {email, password} = state;
    if (!email || !password) {
      showToats(translate('please_fill_required_fields'));
      return;
    }
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.login({email, password});
      if (res.status) {
        dispatch(login({token: res.data.token, user: res.data.user}));
        const route = await AsyncStorage.getItem('route');
        if (route) {
          AsyncStorage.removeItem('route');
          navigation.navigate(route);
        } else {
          navigation.navigate('Home');
        }
      }
      setState(s => ({...s, loading: false}));
    } catch (err) {
      setState(s => ({...s, loading: false}));
      console.log(err);
    }
  };

  return (
    <Container hideNav={true}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 30,
        }}>
        <Text h3>{translate('login')}</Text>
      </View>
      <Input
        wrapperStyle={{flex: 0}}
        placeholder={translate('email')}
        value={state.email}
        onChangeText={email => setState(s => ({...s, email}))}
        ref={emailRef}
        onSubmitEditing={() => passwordRef.current.focus()}
        returnKeyType={'next'}
      />
      <Input
        wrapperStyle={{flex: 0}}
        placeholder={translate('password')}
        ref={passwordRef}
        value={state.password}
        onChangeText={password => setState(s => ({...s, password}))}
        secureTextEntry={true}
        onSubmitEditing={signin}
        returnKeyType={'done'}
      />
      <Button
        sm
        type={'primary'}
        loading={state.loading}
        onPress={signin}
        label={translate('login')}
      />
      <View style={{flexDirection: 'row'}}>
        <Button
          sm
          type={'secondary'}
          cardStyle={{flex: 1}}
          onPress={() => navigation.goBack()}
          label={translate('back')}
        />
        <Button
          sm
          type={'secondary'}
          cardStyle={{flex: 1}}
          onPress={() => navigation.navigate('Forgot')}
          label={translate('forgot_password')}
        />
      </View>
    </Container>
  );
};

export default Login;
