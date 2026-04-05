/** @format */

import React, { useImperativeHandle, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { Button, ButtonView, ImageView, Text } from '../../components';
import { BOOKING_SESSION_TYPE } from '../../config/Constants';
import { UserUtill } from '../../dataUtils';
import {
  acceptTrainerRequest,
  rejectTrainerRequest,
} from '../../ducks/booking';
import { Colors, Images, Metrics } from '../../theme';
import styles from './styles';

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

  const Line = () => (
    <View style={styles.orContainer}>
      <View style={styles.horizontalLine} />
    </View>
  );

  console.log('Data ========>', data.data?.user?.fullName);
  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      style={styles.modal}
      isVisible={data.isVisible}>
      <View style={styles.mainContainer}>
        <View
          style={{
            backgroundColor: Colors.tertiary,
            paddingVertical: 40,
            width: Metrics.width - 40,
            borderWidth: 1,
            borderColor: Colors.greyborder,
          }}>
          <View style={{ alignItems: 'center' }}>
            <CountDown
              until={120}
              // size={20}
              onFinish={() => {
                // setTimeout(() => {
                //   hideModal();
                // }, 200);
              }}
              digitStyle={styles.countdigitStyle}
              digitTxtStyle={styles.countdigitTxtStyle}
              timeToShow={['M', 'S']}
              timeLabels={{ h: null, m: null, s: null }}
              showSeparator
              separatorStyle={{ color: Colors.white }}
            />
            <Text style={styles.loactionHeading}>
              {'Time Left to Pay Trainer'}
            </Text>
          </View>
          <Line />
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ImageView
                source={{ uri: UserUtill.image(data?.data?.user) }}
                style={{ width: 62, height: 62, borderRadius: 62 / 2 }}
                placeholderStyle={{
                  width: 62,
                  height: 62,
                  borderRadius: 62 / 2,
                }}
                borderRadius={62 / 2}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // backgroundColor: 'red',
                  marginLeft: 10,
                }}>
                <View style={{}}>
                  {/* <View style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}> */}
                  <Text style={styles.trainerName}>
                    {UserUtill.name(data.data?.user)}
                  </Text>
                  {/* </View> */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={[
                        styles.tagView,
                        {
                          backgroundColor:
                            data?.data?.bookingType ===
                            BOOKING_SESSION_TYPE.CLASS
                              ? Colors.lightGreen
                              : Colors.blue,
                        },
                      ]}>
                      <Text style={styles.tagViewText}>
                        {data?.data?.bookingType === BOOKING_SESSION_TYPE.CLASS
                          ? 'CLASS'
                          : 'SESSION'}
                      </Text>
                    </View>
                    <Text style={styles.typeStyle}>
                      {data?.data?.category?.title}
                    </Text>
                  </View>

                  <Text style={styles.loactionHeading}>
                    {/* {'Estimated Reach Time: 30 Mins'} */}
                  </Text>
                </View>
              </View>
            </View>
            <Line />
            {/* <Text style={styles.loactionHeading}>{'Location:'}</Text>
            <View style={styles.fullBox2}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={Images.locationPin}
                  style={{ marginRight: 10 }}
                />
              </View>
              <Text style={styles.otherText}>
                {UserUtill.address(data?.data?.user)}
              </Text>
            </View> */}
            {/* <Line /> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <Button
                title={'Accept'}
                style={{
                  width: Metrics.width / 2 - 50,
                  backgroundColor: Colors.lightGreen,
                }}
                onPress={() => {
                  dispatch(
                    acceptTrainerRequest.request({
                      payloadApi: { id: data.data?.id },
                      cb: () => {
                        setTimeout(() => {
                          hideModal();
                        }, 200);
                      },
                    }),
                  );
                }}
              />
              <Button
                title={'Reject'}
                style={{ width: Metrics.width / 2 - 50 }}
                onPress={() => {
                  dispatch(
                    rejectTrainerRequest.request({
                      payloadApi: { id: data.data?.id },
                      cb: () => {
                        setTimeout(() => {
                          hideModal();
                        }, 200);
                      },
                    }),
                  );
                }}
              />
            </View>
          </View>
          <ButtonView
            style={{ position: 'absolute', top: 10, right: 15 }}
            onPress={() => {
              setTimeout(() => {
                hideModal();
              }, 200);
            }}>
            <Image source={Images.cancelIcon} />
          </ButtonView>
        </View>
      </View>
    </Modal>
  );
};

export default React.forwardRef(TraineeAlertModal);
