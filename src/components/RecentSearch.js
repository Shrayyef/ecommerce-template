import {useTheme} from '@react-navigation/native';
import React from 'react';
import Card from './Card';
import Text from './Text';

const RecentSearch = ({item, onPress}) => {
  const theme = useTheme();
  return (
    <Card
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 0,
        marginBottom: 5,
        marginTop: 0,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.border,
      }}
      onPress={onPress}>
      <Text>{item}</Text>
    </Card>
  );
};

export default RecentSearch;
