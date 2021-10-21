import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import Text from './Text';
import Title from './Title';

const Card = ({children, style, shadow = true, sm, title, ...props}) => {
  const theme = useTheme();
  let styles = {
    backgroundColor: theme.colors.card,
    margin: 10,
    padding: sm ? 10 : 25,
    borderRadius: 3,
  };

  if (shadow) {
    styles = {
      ...styles,
      elevation: 5,
      shadowColor: theme.colors.card,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 1,
    };
  }

  const Component = props.onPress ? TouchableWithoutFeedback : View;

  if (props.onPress) {
    return (
      <Component {...props}>
        <View style={{...styles, ...style}}>{children}</View>
      </Component>
    );
  }

  return (
    <>
      {!!title && <Title title={title} />}
      <Component style={{...styles, ...style}} {...props}>
        {children}
      </Component>
    </>
  );
};

export default Card;
