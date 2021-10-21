import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
// import Orientation from 'react-native-orientation-locker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gradiant from './Gradiant';
import Icon from './Icon';
import Loading from './Loading';
import Text from './Text';

export default ({images = [], visible, onClose}) => {
  //   React.useEffect(() => {
  //     if (visible) Orientation.unlockAllOrientations();
  //     return () => {
  //       if (isTab()) {
  //         Orientation.unlockAllOrientations();
  //       } else {
  //         Orientation.lockToPortrait();
  //       }
  //     };
  //   }, [visible]);

  const insets = useSafeAreaInsets();

  const theme = useTheme();
  return (
    <Modal
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        onClose && onClose();
      }}>
      <ImageViewer
        saveToLocalByLongPress={false}
        renderIndicator={index => (
          <View
            style={{
              position: 'absolute',
              top: insets.top + 10,
              left: 0,
              right: 0,
              zIndex: 99,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                onClose && onClose();
              }}>
              <Gradiant
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40 / 2,
                  position: 'relative',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="close" size={22} />
              </Gradiant>
            </TouchableOpacity>
            <Gradiant
              style={{
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 15,
                position: 'relative',
              }}>
              <Text p>
                {index} / {images.length}
              </Text>
            </Gradiant>
          </View>
        )}
        loadingRender={() => <Loading />}
        enableSwipeDown={true}
        onSwipeDown={() => {
          onClose && onClose();
        }}
        backgroundColor={theme.colors.background}
        imageUrls={images.map(one => ({url: one.image}))}
      />
    </Modal>
  );
};
