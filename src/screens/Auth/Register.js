import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import Container from '../../components/Container';
import {translate, showToats} from '../../utils';
import Input from '../../components/Input';
import Text from '../../components/Text';
import api from '../../api';

const Register = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    fullname: '',
    address: '',
    phone: '',
    loading: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullnameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submit = async () => {
    const {email, password, fullname, address, phone} = state;
    if (!email || !password) {
      showToats(translate('please_fill_required_fields'));
      return;
    }
    setState(s => ({...s, loading: true}));
    try {
      const res = await api.register({
        email,
        password,
        fullname,
        address,
        phone,
      });
      console.log({res});
      // if (res.user) {
      // }
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
        <Text h3>{translate('register')}</Text>
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
        onSubmitEditing={() => fullnameRef.current.focus()}
        returnKeyType={'next'}
      />
      <Input
        wrapperStyle={{flex: 0}}
        placeholder={translate('fullname')}
        ref={fullnameRef}
        value={state.fullname}
        onChangeText={fullname => setState(s => ({...s, fullname}))}
        secureTextEntry={true}
        onSubmitEditing={() => addressRef.current.focus()}
        returnKeyType={'next'}
      />
      <Input
        wrapperStyle={{flex: 0}}
        placeholder={translate('address')}
        ref={addressRef}
        value={state.address}
        onChangeText={address => setState(s => ({...s, address}))}
        secureTextEntry={true}
        onSubmitEditing={() => phoneRef.current.focus()}
        returnKeyType={'next'}
      />
      <Input
        wrapperStyle={{flex: 0}}
        placeholder={translate('phone')}
        ref={phoneRef}
        value={state.phone}
        onChangeText={phone => setState(s => ({...s, phone}))}
        secureTextEntry={true}
        onSubmitEditing={submit}
        returnKeyType={'done'}
      />
      <Button
        sm
        loading={state.loading}
        onPress={submit}
        label={translate('register')}
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

export default Register;
