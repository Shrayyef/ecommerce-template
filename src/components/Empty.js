import React from 'react';
import {translate} from '../utils';
import Card from './Card';
import Icon from './Icon';
import Text from './Text';
import {useTheme} from '@react-navigation/native';

export default ({}) => {
  const theme = useTheme();
  return (
    <Card style={{justifyContent: 'center', alignItems: 'center'}}>
      <Icon
        type={'Entypo'}
        name={'emoji-sad'}
        size={65}
        color={theme.colors.primary}
        style={{marginBottom: 15}}
      />
      <Text h4>{translate('empty_data')}</Text>
    </Card>
  );
};
