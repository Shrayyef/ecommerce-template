import React, {useState} from 'react';
import {View} from 'react-native';
import Card from './Card';
import Text from './Text';
import Line from './Line';
import Icon from './Icon';

export default ({item}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Card
        sm
        style={{
          marginBottom: 0,
          borderRadius: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifuContent: 'space-between',
        }}
        onPress={() => setVisible(s => !s)}>
        <View style={{flex: 1}}>
          <Text h6 main>
            {item.title}
          </Text>
        </View>
        <Icon name={visible ? 'up' : 'down'} focused size={16} />
      </Card>
      {visible && (
        <>
          <Line style={{marginVertical: 0}} />
          <Card sm style={{marginBottom: 0, borderRadius: 0, marginTop: 0}}>
            <Text p>{item.details}</Text>
          </Card>
        </>
      )}
    </View>
  );
};
