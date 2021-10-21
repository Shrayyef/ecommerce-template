import DeviceInfo from 'react-native-device-info';
import {Platform, StatusBar, I18nManager} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import I18n from './i18n';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

export const changeLang = lang => {
  if (lang === 'ar') {
    if (I18nManager.isRTL) return;
    AsyncStorage.setItem('lang', lang).then(() => {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      setTimeout(() => {
        RNRestart.Restart();
      }, 500);
    });
  } else {
    if (!I18nManager.isRTL) return;
    AsyncStorage.setItem('lang', lang).then(() => {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);

      setTimeout(() => {
        RNRestart.Restart();
      }, 500);
    });
  }
};

export const showToats = string => {
  if (string) Toast.show(string);
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const translate = (text, attr = {}) => {
  return capitalizeFirstLetter(I18n.t(text, attr));
};

export const hasNotch = DeviceInfo.hasNotch;

export const getNotchHeight = () => {
  let height = 50;
  if (hasNotch()) {
    if (Platform.OS === 'ios') {
      height += StaticSafeAreaInsets.safeAreaInsetsTop;
    } else {
      height += StatusBar.currentHeight;
    }
  } else {
    if (Platform.OS === 'ios') {
      height += 20;
    }
  }
  return height;
};
