import Text from './Text';
import React from 'react';

export default ({title}) => {
  return (
    <Text
      h4
      style={{paddingHorizontal: 15, marginVertical: 15, fontWeight: '300'}}>
      {title}
    </Text>
  );
};
