import React from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Text from '../../components/Text';
import {translate} from '../../utils';

const Auth = ({navigation}) => {
  return (
    <Container hideNav={true}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 30,
        }}>
        <Text h3>{translate('authorization')}</Text>
      </View>
      <View>
        <Button
          sm
          label={translate('login')}
          onPress={() => navigation.navigate('Login')}
        />
        <View style={{flexDirection: 'row'}}>
          <Button
            sm
            type={'secondary'}
            cardStyle={{flex: 1}}
            label={translate('register')}
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            sm
            type={'secondary'}
            cardStyle={{flex: 1}}
            label={translate('forgot_password')}
            onPress={() => navigation.navigate('Forgot')}
          />
        </View>
      </View>
    </Container>
  );
};

export default Auth;
