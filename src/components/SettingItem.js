import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Card from './Card';
import Icon from './Icon';
import Loading from './Loading';
import Text from './Text';

const SettingItem = ({item, style, borderBottom, selected}) => {
  const theme = useTheme();
  return (
    <Card
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 1,
        marginTop: 0,
        justifyContent: 'space-between',
        borderBottomWidth: borderBottom ? 1 : 0,
        borderBottomColor: theme.colors.border,
        ...style,
      }}
      onPress={item.onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.icon && (
          <Icon
            name={item.icon.name}
            type={item.icon.type}
            size={16}
            color={theme.colors.primary}
          />
        )}
        <Text p style={{marginStart: item.icon ? 10 : 0}}>
          {item.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        {item.loading && <Loading />}
        {selected && (
          <Icon
            name={'check'}
            size={20}
            color={theme.colors.success}
            style={{marginStart: 10}}
          />
        )}
      </View>
    </Card>
  );
};

export default SettingItem;
