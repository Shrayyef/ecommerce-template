import React, {memo, useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Text from './Text';
import Icon from './Icon';
import {useTheme} from '@react-navigation/native';
import Card from './Card';

const Dropdown = memo(
  ({
    label,
    value,
    items = [],
    itemId = 'id',
    itemLabel = 'label',
    itemLabelChoose,
    onChange,
    disabled,
    placeholder = '',
    style,
    modalStyle,
    header,
    footer,
    buttonStyle,
    showIcon = true,
  }) => {
    const theme = useTheme();
    const ref = useRef();

    const [localValue, setLocalValue] = useState('');
    const [index, setIndex] = useState(-1);

    const onOpen = () => ref.current.open();

    const onChoose = (item, i) => {
      const currValue = item[itemId];
      setIndex(i);
      setLocalValue(currValue);
      onChange(currValue);
      ref.current.close();
    };

    useEffect(() => {
      if (value !== localValue) {
        const i = items.findIndex(x => x[itemId] === value);
        if (i !== -1) {
          setIndex(i);
          setLocalValue(value);
        }
      }
    }, [value]);

    return (
      <View style={[{flex: 1}, style]}>
        {label && <Text p>{label}</Text>}

        <View>
          <TouchableOpacity
            disabled={disabled}
            onPress={onOpen}
            style={[
              {
                flexDirection: 'row',
                backgroundColor: theme.colors.border,
                padding: 12,
                borderRadius: 10,
                justifyContent: 'space-between',
                ...buttonStyle,
              },
            ]}>
            {localValue !== '' ? (
              <Text p>
                {typeof itemLabel === 'function'
                  ? itemLabelChoose
                    ? itemLabelChoose(items[index])
                    : itemLabel(items[index])
                  : items[index][itemLabel]}
              </Text>
            ) : (
              <Text p>{placeholder}</Text>
            )}
            {showIcon && (
              <Icon type={'Feather'} name="chevron-down" size={20} />
            )}
          </TouchableOpacity>

          <RBSheet
            ref={ref}
            animationType="fade"
            customStyles={{
              container: {
                ...{
                  backgroundColor: theme.colors.card,
                  borderRadius: 20,
                  height:
                    (modalStyle && modalStyle.height) || items.length > 5
                      ? 300
                      : items.length * 24 + 130,
                  ...modalStyle,
                },
              },
              wrapper: {backgroundColor: 'rgba(0,0,0, 0.8)'},
            }}>
            <View
              style={{
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text h6>{placeholder}</Text>
            </View>

            <ScrollView>
              {items.length > 0 ? (
                items.map((data, i) => (
                  <Card
                    sm
                    key={`${i}-${data[itemId]}`}
                    onPress={() => (!data.disabled ? onChoose(data, i) : {})}
                    style={
                      typeof itemLabel === 'function'
                        ? {}
                        : {
                            backgroundColor: theme.colors.card,
                            borderColor:
                              i === index
                                ? theme.colors.primary
                                : theme.colors.border,
                            borderWidth: 1,
                            marginTop: 0,
                          }
                    }>
                    {typeof itemLabel === 'function' ? (
                      itemLabel(data, i === index)
                    ) : (
                      <Text p primary={i === index}>
                        {data[itemLabel]}
                      </Text>
                    )}
                  </Card>
                ))
              ) : (
                <Text p grey>
                  No list.
                </Text>
              )}
            </ScrollView>

            {footer && footer()}
          </RBSheet>
        </View>
      </View>
    );
  },
);

export default Dropdown;
