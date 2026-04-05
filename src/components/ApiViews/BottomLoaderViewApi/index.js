import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React from 'react';
import { Metrics, Colors } from '../../../theme';

const BottomLoaderViewApi = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.primary} />
    </View>
  );
};

BottomLoaderViewApi.propTypes = {};

export default BottomLoaderViewApi;

const styles = StyleSheet.create({
  container: {
    padding: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
