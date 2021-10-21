import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';
import Icon from './Icon';
import Loading from './Loading';
import Text from './Text';

const Button = (
  {
    label,
    onPress,
    loading,
    cardStyle,
    textStyle,
    sm,
    iconBefore,
    iconAfter,
    type,
    ...props
  },
  ref,
) => {
  const theme = useTheme();
  let backgroundColor = theme.colors.primary;
  if (type === 'secondary') backgroundColor = theme.colors.secondary;
  if (type === 'success') backgroundColor = theme.colors.success;
  if (type === 'danger') backgroundColor = theme.colors.danger;
  if (type === 'warning') backgroundColor = theme.colors.warning;
  const styles = {
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...cardStyle,
  };
  return (
    <Card onPress={!loading && onPress} sm={sm} style={styles}>
      {loading && (
        <Loading style={{marginEnd: 10}} color={theme.colors.white} />
      )}
      {iconBefore && <Icon {...iconBefore} style={{marginEnd: 5}} />}
      <Text white p style={{...textStyle}}>
        {label?.toUpperCase()}
      </Text>
      {iconAfter && <Icon {...iconAfter} style={{marginEnd: 5}} />}
    </Card>
  );
};

Button.prototype = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
