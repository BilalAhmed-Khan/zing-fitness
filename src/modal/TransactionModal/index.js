/** @format */

import React, { useImperativeHandle, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { Button, ButtonView, ImageView, Text } from '../../components';
import { BOOKING_SESSION_TYPE } from '../../config/Constants';
import { UserUtill } from '../../dataUtils';
import { acceptTrainerRequest } from '../../ducks/booking';
import { Colors, Images, Metrics } from '../../theme';
import { Util } from '../../utils';
import styles from './styles';

const Item = ({ item, onPress, isReport }) => {
  return (
    <View
      // style={styles.itemContainer}
      onPress={() => onPress && onPress(item)}>
      <Text style={styles.headerTextStyle}>{item?.header}</Text>
      <Text style={styles.subHeaderTextStyle}>{item?.data}</Text>
    </View>
  );
};
const transactionDetails = [
  { header: 'Sent to', data: 'Subhan' },
  { header: 'Account Details', data: 'Subhan' },
];
const TraineeAlertModal = (props, forwardedRef) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    data: {},
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

  console.log(data.data);
  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      style={styles.modal}
      isVisible={data.isVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.dataView}>
          <View style={styles.transactionView}>
            <Image
              source={Images.logoWithText}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <Text style={styles.titleText}>
              {data.data?.type === 'cancel'
                ? 'Transaction Reversed'
                : 'Transaction Successful'}
            </Text>
            <Text style={styles.desc}>
              {data.data?.type === 'booking'
                ? 'You have received money'
                : data.data?.type === 'cancel'
                ? 'Booking cancellation penalty'
                : 'You have withdrawn money'}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.transactionHistoryView}>
              <Text style={styles.dateTime}>{`${Util.formatDate(
                data.data?.createdAt,
                'DD MMMM YYYY',
              )}  ${Util.formatDate(data.data?.createdAt, 'HH:mm A')}`}</Text>
              {data?.data?.transactionDetails &&
                data?.data?.transactionDetails?.map((item, index) => (
                  <React.Fragment key={item.header + index}>
                    <Item item={item} />
                  </React.Fragment>
                ))}
              <Text
                style={[
                  styles.headerAmountTextStyle,
                  {
                    color:
                      data.data?.type === 'booking' ? '#19D545' : '#D51919',
                  },
                ]}>
                {data.data?.type === 'booking'
                  ? 'Amount Received'
                  : data.data?.type === 'cancel'
                  ? 'Total Amount'
                  : 'Amount Withdrawn'}
              </Text>
              <Text
                style={[
                  styles.subHeaderTextStyle,
                ]}>{`$${Util.toFixedIfNecessary(data.data?.amount, 2)}`}</Text>
            </View>
          </ScrollView>
          <ButtonView
            style={{ position: 'absolute', top: 10, right: 15 }}
            onPress={() => {
              setTimeout(() => {
                hideModal();
              }, 200);
            }}>
            <Image source={Images.cancelIcon} style={{ tintColor: 'black' }} />
          </ButtonView>
        </View>
      </View>
    </Modal>
  );
};

export default React.forwardRef(TraineeAlertModal);
