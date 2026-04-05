/** @format */

import React, { useImperativeHandle, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, ButtonView, Text } from '../../components';
import styles from './styles';

const SessionCompleteModal = (props, forwardedRef) => {
  const [data, setData] = useState({
    data: [],
    isVisible: false,
    title: undefined,
    discription: 'Your Session Booking Has Been Completed',
    onPress: () => {},
  });

  // hide modal function
  const hideModal = () => {
    setData({ ...data, isVisible: false });
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (options = data) => {
      setData({ ...options, isVisible: true });
    },
    hide: hideModal,
  }));

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      style={styles.modal}
      isVisible={data.isVisible}>
      <View style={styles.mainContainer}>
        <Text style={styles.thankyouText}>Thank You!</Text>
        <Text style={styles.desc}>{data?.discription}</Text>
        <View style={styles.buttonStyle}>
          <Button
            title={'Done'}
            onPress={() => {
              hideModal();
              setTimeout(() => {
                data?.onPress?.();
              }, 300);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default React.forwardRef(SessionCompleteModal);
