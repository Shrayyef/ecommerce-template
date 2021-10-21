import React from 'react';
import FastImage from 'react-native-fast-image';

const SIZE = 200;
const Avatar = ({
  url = 'https://unsplash.it/400/400?image=1',
  name,
  size = SIZE,
}) => {
  return (
    <FastImage
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        marginTop: 50,
      }}
      source={{
        uri: url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default Avatar;
