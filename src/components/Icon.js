import {useColorScheme} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';

const Icon = ({type, name, size = 22, color, focused, style}) => {
  const theme = useTheme();

  let iconColor = color;
  if (!color) {
    iconColor = theme.colors.text;
  }

  if (focused) {
    iconColor = theme.colors.primary;
  }

  let IconComponent = AntDesign;
  switch (type?.toLowerCase()) {
    case 'antdesign':
      IconComponent = AntDesign;
      break;
    case 'entypo':
      IconComponent = Entypo;
      break;
    case 'evilicons':
      IconComponent = EvilIcons;
      break;
    case 'fontawesome5':
      IconComponent = FontAwesome5;
      break;
    case 'fontisto':
      IconComponent = Fontisto;
      break;
    case 'ionicons':
      IconComponent = Ionicons;
      break;
    case 'octicons':
      IconComponent = Octicons;
      break;
    case 'materialcommunityicons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'materialicons':
      IconComponent = MaterialIcons;
      break;
    case 'feather':
      IconComponent = Feather;
      break;
  }
  return (
    <IconComponent name={name} size={size} color={iconColor} style={style} />
  );
};

Icon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  focused: PropTypes.bool,
};

export default Icon;
