import {useTheme} from '@react-navigation/native';
import React, {forwardRef} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  I18nManager,
  Platform,
} from 'react-native';
import Card from './Card';
import Icon from './Icon';

const Input = (
  {placeholder, label, wrapperStyle, style, iconAfter, iconBefore, ...props},
  ref,
) => {
  const theme = useTheme();
  const styles = {
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: I18nManager.isRTL ? 16 : 18,
    color: theme.colors.text,
    flex: 1,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  };
  if (I18nManager.isRTL) {
    styles.fontFamily =
      Platform.OS === 'ios' ? 'ElMessiri-Regular' : 'ElMessiri-Regular';
    styles.textAlign = 'right';
  }
  return (
    <Card
      style={{
        flexDirection: 'row',
        padding: 0,
        flex: 1,
        alignItems: 'center',
        ...wrapperStyle,
      }}>
      {iconBefore && (
        <Icon
          name={iconBefore.name}
          type={iconBefore.type}
          size={iconBefore.size}
          color={iconBefore.color}
          style={{marginStart: 10}}
        />
      )}
      <TextInput
        style={{...styles, ...style}}
        autoCapitalize={'none'}
        textAlignVertical={'center'}
        placeholderTextColor={theme.colors.grey}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
      {iconAfter && (
        <Icon
          name={iconAfter.name}
          type={iconAfter.type}
          size={iconAfter.size}
          color={iconAfter.color}
          style={{marginStart: 10}}
        />
      )}
    </Card>
  );
};

Input.prototype = {
  ...TextInputProps,
};

export default forwardRef(Input);
