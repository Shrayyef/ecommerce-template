import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';
import en from './translations/en';
import tr from './translations/tr';
import ar from './translations/ar';
import AsyncStorage from '@react-native-community/async-storage';

AsyncStorage.getItem('lang').then(lang => {
  I18n.locale = lang;
});
I18n.fallbacks = true;
I18n.translations = {en, tr, ar};

export default I18n;
