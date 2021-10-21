import {useTheme} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  Animated,
  StatusBar,
  View,
  useColorScheme,
  FlatList,
} from 'react-native';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from '@codler/react-native-keyboard-aware-scroll-view';
import Loading from './Loading';
import NavBar from './NavBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList as RNGFlatlist} from 'react-native-gesture-handler';

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
);

const AnimatedKeyboardAwareFlatList = Animated.createAnimatedComponent(
  KeyboardAwareFlatList,
);

const AnimatedRNGFlatlist = Animated.createAnimatedComponent(RNGFlatlist);
const HEADER_SCROLL_DISTANCE = 100;
const TITLE_SCROLL_DISTANCE = 200;

export default ({
  children,
  back,
  type,
  headerType,
  page,
  loading,
  flatlistProps,
  fixedNav,
  navBarProps,
  landscape,
  screenFooter,
  getRef,
  backgroundImage,
  backStyle,
  showMenu = false,
  hideNav = false,
  ...props
}) => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;

  let inputRange = [0, HEADER_SCROLL_DISTANCE];
  let outputRange = [0, 1];
  let titleInputRange = [0, TITLE_SCROLL_DISTANCE / 2, TITLE_SCROLL_DISTANCE];
  let titleOutputRange = [0, 0, 1];
  if (backgroundImage) {
    inputRange = [
      0,
      HEADER_SCROLL_DISTANCE * 1.5,
      HEADER_SCROLL_DISTANCE * 2,
      HEADER_SCROLL_DISTANCE * 4,
    ];
    outputRange = [0, 0, 0, 1];
    titleInputRange = [
      0,
      HEADER_SCROLL_DISTANCE * 1.5,
      HEADER_SCROLL_DISTANCE * 2,
      HEADER_SCROLL_DISTANCE * 4,
    ];
    titleOutputRange = [0, 0, 0, 1];
  }

  const headerHeight = animatedScrollYValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
  const titleHeight = animatedScrollYValue.interpolate({
    inputRange: titleInputRange,
    outputRange: titleOutputRange,
    extrapolate: 'clamp',
  });

  const opacityDark = animatedScrollYValue.interpolate({
    inputRange: [0, TITLE_SCROLL_DISTANCE / 2, TITLE_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const ref = useRef(null);

  if (fixedNav) {
    return (
      <SafeAreaView
        edges={['left', 'right']}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          ...backStyle,
        }}>
        <StatusBar
          barStyle={theme.statusBar}
          backgroundColor={theme.colors.background}
        />
        {!landscape && (
          <NavBar
            headerHeight={headerHeight}
            titleHeight={titleHeight}
            opacityDark={opacityDark}
            back={back}
            headerType={headerType}
            page={page}
            fixedNav={fixedNav}
            {...navBarProps}
          />
        )}
        <View style={{flex: 1}} {...props}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
  if (type === 'flatlist-fixed') {
    return (
      <SafeAreaView
        edges={['left', 'right']}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <StatusBar
          barStyle={theme.statusBar}
          backgroundColor={theme.colors.background}
        />
        {!hideNav && (
          <NavBar
            headerHeight={headerHeight}
            titleHeight={titleHeight}
            opacityDark={opacityDark}
            back={back}
            headerType={headerType}
            page={page}
            fixedNav={true}
            {...navBarProps}
          />
        )}
        <FlatList
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 15}}
          ref={ref}
          keyboardShouldPersistTaps={'handled'}
          // getRef={getRef && getRef(ref)}
          {...flatlistProps}
        />
        {screenFooter}
        {loading && <Loading />}
      </SafeAreaView>
    );
  }
  if (type === 'flatlist') {
    return (
      <SafeAreaView
        edges={['left', 'right']}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <StatusBar
          barStyle={theme.statusBar}
          backgroundColor={theme.colors.background}
        />
        <AnimatedKeyboardAwareFlatList
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 15}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
            {useNativeDriver: true},
          )}
          ref={ref}
          keyboardShouldPersistTaps={'handled'}
          // getRef={getRef && getRef(ref)}
          {...flatlistProps}
        />
        {loading && <Loading />}
        {screenFooter}
        {!hideNav && (
          <NavBar
            headerHeight={headerHeight}
            titleHeight={titleHeight}
            opacityDark={opacityDark}
            back={back}
            headerType={headerType}
            page={page}
            showMenu={showMenu}
            backgroundImage={backgroundImage}
            {...navBarProps}
          />
        )}
      </SafeAreaView>
    );
  }
  if (type === 'flatlist-swipable') {
    return (
      <SafeAreaView
        edges={['left', 'right']}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <StatusBar
          barStyle={theme.statusBar}
          backgroundColor={theme.colors.background}
        />
        <AnimatedRNGFlatlist
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 15}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
            {useNativeDriver: true},
          )}
          ref={ref}
          keyboardShouldPersistTaps={'handled'}
          // getRef={getRef && getRef(ref)}
          {...flatlistProps}
        />
        {loading && <Loading />}
        {screenFooter}
        {!hideNav && (
          <NavBar
            headerHeight={headerHeight}
            titleHeight={titleHeight}
            opacityDark={opacityDark}
            back={back}
            headerType={headerType}
            page={page}
            showMenu={showMenu}
            backgroundImage={backgroundImage}
            {...navBarProps}
          />
        )}
      </SafeAreaView>
    );
  }
  if (type === 'aware') {
    return (
      <SafeAreaView
        edges={['left', 'right']}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <StatusBar
          barStyle={theme.statusBar}
          backgroundColor={theme.colors.background}
        />
        <AnimatedKeyboardAwareScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 15}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
            {useNativeDriver: true},
          )}
          ref={ref}
          keyboardShouldPersistTaps={'handled'}
          getRef={getRef && getRef(ref)}
          {...props}>
          {children}
        </AnimatedKeyboardAwareScrollView>
        {!hideNav && (
          <NavBar
            headerHeight={headerHeight}
            titleHeight={titleHeight}
            opacityDark={opacityDark}
            back={back}
            headerType={headerType}
            page={page}
            showMenu={showMenu}
            {...navBarProps}
          />
        )}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        ...backStyle,
      }}>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.colors.background}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{paddingBottom: 15}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
          {useNativeDriver: true},
        )}
        ref={ref}
        keyboardShouldPersistTaps={'handled'}
        getRef={getRef && getRef(ref)}
        {...props}>
        {children}
      </Animated.ScrollView>
      {screenFooter}
      {!hideNav && (
        <NavBar
          headerHeight={headerHeight}
          titleHeight={titleHeight}
          opacityDark={opacityDark}
          back={back}
          headerType={headerType}
          page={page}
          showMenu={showMenu}
          fixedNav={fixedNav}
          backgroundImage={backgroundImage}
          {...navBarProps}
        />
      )}
    </SafeAreaView>
  );
};
