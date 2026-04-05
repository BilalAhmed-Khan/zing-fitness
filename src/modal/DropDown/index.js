/** @format */

import React, { useImperativeHandle, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { ButtonView } from '../../components';
import styles from './styles';
const Item = ({ item, onPress, isReport }) => {
  return (
    <ButtonView
      style={styles.itemContainer}
      onPress={() => onPress && onPress(item)}>
      <Text style={[styles.textStyle]} numberOfLines={1}>
        {item?.name ? item?.name : item?.label}
      </Text>
    </ButtonView>
  );
};

const DropDown = (props, forwardedRef) => {
  const [data, setData] = useState({
    data: [],
    isVisible: false,
    title: undefined,
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
        {data.title ? (
          <View style={styles.cancelWithTitleView}>
            <ButtonView onPress={hideModal}>
              <Text style={styles.cancelTitleText}>{'Cancel'}</Text>
            </ButtonView>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
        ) : (
          <ButtonView style={styles.cancelTextView} onPress={hideModal}>
            <Text style={styles.cancelText}>{'Cancel'}</Text>
          </ButtonView>
        )}

        <ScrollView>
          {data.data?.map(item => (
            <React.Fragment key={item.identifier}>
              <Item
                item={item}
                onPress={item => {
                  hideModal();
                  setTimeout(() => {
                    data.onPress && data.onPress(item);
                  }, 300);
                }}
              />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default React.forwardRef(DropDown);
