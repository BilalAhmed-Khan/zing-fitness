import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '../../components';
import { Colors, Metrics } from '../../theme';

const { height: SCREEN_H } = Dimensions.get('window');

/**
 * Google-style bottom sheet: drag handle / header to expand (near full screen) or collapse.
 * @param {'collapsed' | 'expanded'} snap - controlled snap from parent is optional; we notify via onSnap.
 */
const NearbyTrainersSheet = ({
  Styles,
  nearbyTrainers,
  loading,
  renderItem,
  keyExtractor,
  onSnap,
}) => {
  const insets = useSafeAreaInsets();
  const expandedTop = useMemo(() => {
    const fallback =
      Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 48;
    return Math.max(insets.top > 0 ? insets.top : fallback, 8);
  }, [insets.top]);
  const collapsedPeek = Math.min(Metrics.height * 0.36, 300);
  const collapsedTop = useMemo(() => SCREEN_H - collapsedPeek, [collapsedPeek]);

  const topAnim = useRef(new Animated.Value(collapsedTop)).current;
  const topRef = useRef(collapsedTop);
  const gestureStartTop = useRef(collapsedTop);
  const snapRef = useRef('collapsed');

  useEffect(() => {
    const sub = topAnim.addListener(({ value }) => {
      topRef.current = value;
    });
    return () => topAnim.removeListener(sub);
  }, [topAnim]);

  const notifySnap = useCallback(
    top => {
      const distExp = Math.abs(top - expandedTop);
      const distCol = Math.abs(top - collapsedTop);
      const phase = distExp < distCol ? 'expanded' : 'collapsed';
      if (snapRef.current !== phase) {
        snapRef.current = phase;
        onSnap?.(phase);
      }
    },
    [collapsedTop, expandedTop, onSnap],
  );

  const springTo = useCallback(
    toValue => {
      Animated.spring(topAnim, {
        toValue,
        useNativeDriver: false,
        friction: 9,
        tension: 65,
      }).start(({ finished }) => {
        if (finished) {
          topRef.current = toValue;
          notifySnap(toValue);
        }
      });
    },
    [notifySnap, topAnim],
  );

  const toggleFromCurrent = useCallback(() => {
    const current = topRef.current;
    const distExp = Math.abs(current - expandedTop);
    const distCol = Math.abs(current - collapsedTop);
    springTo(distExp < distCol ? collapsedTop : expandedTop);
  }, [collapsedTop, expandedTop, springTo]);

  useEffect(() => {
    onSnap?.('collapsed');
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial map padding only
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dy) > 6 || Math.abs(g.dx) > 6,
        onPanResponderGrant: () => {
          gestureStartTop.current = topRef.current;
        },
        onPanResponderMove: (_, g) => {
          const next = Math.min(
            collapsedTop,
            Math.max(expandedTop, gestureStartTop.current + g.dy),
          );
          topAnim.setValue(next);
        },
        onPanResponderRelease: (_, g) => {
          const current = topRef.current;
          if (Math.abs(g.dy) < 10 && Math.abs(g.dx) < 10) {
            toggleFromCurrent();
            return;
          }
          const mid = (expandedTop + collapsedTop) / 2;
          let snapTo = current < mid ? expandedTop : collapsedTop;
          const vy = typeof g.vy === 'number' ? g.vy : 0;
          if (vy > 0.4) {
            snapTo = collapsedTop;
          }
          if (vy < -0.4) {
            snapTo = expandedTop;
          }
          springTo(snapTo);
        },
      }),
    [collapsedTop, expandedTop, springTo, toggleFromCurrent, topAnim],
  );

  const count = nearbyTrainers?.length ?? 0;

  return (
    <Animated.View
      style={[Styles.bottomSheet, Styles.bottomSheetWrap, { top: topAnim }]}>
      <View style={Styles.sheetDragZone} {...panResponder.panHandlers}>
        <View style={Styles.sheetDragInner}>
          <View style={Styles.bottomSheetHandle} />
          <Text style={Styles.bottomSheetTitle}>
            {`Nearby trainers${count > 0 ? ` (${count})` : ''}`}
          </Text>
        </View>
      </View>

      <View style={Styles.sheetBody}>
        {loading && count === 0 ? (
          <View style={Styles.sheetLoadingWrap}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={[Styles.bottomSheetEmpty, Styles.sheetLoadingCaption]}>
              Finding trainers near you…
            </Text>
          </View>
        ) : null}
        {!loading && count === 0 ? (
          <Text style={Styles.bottomSheetEmpty}>
            No trainers found near this location.
          </Text>
        ) : null}
        {count > 0 ? (
          <FlatList
            data={nearbyTrainers}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={Styles.sheetFlatList}
            contentContainerStyle={Styles.bottomSheetList}
            showsVerticalScrollIndicator
            bounces
          />
        ) : null}
      </View>
    </Animated.View>
  );
};

export default NearbyTrainersSheet;
