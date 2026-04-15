import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import NetworkLogger from 'react-native-network-logger';

import { styles } from './styles';

const NetworkFab = () => {
  const [showNetworkLogger, setShowNetworkLogger] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowNetworkLogger(true)}
        activeOpacity={0.8}>
        <View style={styles.fabInner}>
          <View style={styles.networkIcon}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={showNetworkLogger}
        animationType="slide"
        onRequestClose={() => setShowNetworkLogger(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowNetworkLogger(false)}>
              <View style={styles.closeIcon}>
                <View style={styles.closeLine1} />
                <View style={styles.closeLine2} />
              </View>
            </TouchableOpacity>
          </View>
          <NetworkLogger theme="dark" />
        </View>
      </Modal>
    </>
  );
};

export default NetworkFab;
