import React from 'react';
import {I18nManager} from 'react-native';
import StarRating from 'react-native-star-rating';
import {useTheme} from '@react-navigation/native';

export default ({style, rate, starSize = 18, disabled = true, ...props}) => {
  const theme = useTheme();
  return (
    <StarRating
      fullStarColor={theme.colors.warning}
      emptyStarColor={theme.colors.backGrey}
      starSize={starSize}
      disabled={disabled}
      maxStars={5}
      rating={rate}
      starStyle={{transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}]}}
      containerStyle={{...style}}
      {...props}
    />
  );
};
