/** @format */

import React, { useImperativeHandle, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { AirbnbRating } from 'react-native-ratings';
import { Button, ButtonView, Dropdown, Text } from '../../components';
import {
  Experience,
  SESSION_STATUS,
  TRAINER_STATUS,
} from '../../config/Constants';
import { Images, Metrics } from '../../theme';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import styles from './styles';

const FilterModal = (props, forwardedRef) => {
  const [data, setData] = useState({
    data: [],
    isVisible: false,
    title: undefined,
    discription: 'Your Session Booking Has Been Completed',
    onPress: () => {},
  });

  const [formObj, experienceProps] = useHookForm(
    ['experience'],
    {},
    ValidationSchema.filter,
  );
  const [selectCategories, setSelectCategories] = useState('');
  const [selectSession, setSelectSession] = useState('');
  const [trainerStatus, settrainerStatus] = useState('');
  const [rating, setRating] = useState('');
  // hide modal function
  const hideModal = () => {
    setData({ ...data, isVisible: false });
  };
  const submit = formObj.handleSubmit(val => {});

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (options = data) => {
      setData({ ...options, isVisible: true });
    },
    hide: hideModal,
  }));

  const onSelectCategories = data => {
    if (selectCategories === data.id) {
      setSelectCategories('');
    } else {
      setSelectCategories(data.id);
    }
  };
  const onSelectSessionType = data => {
    if (selectSession === data) {
      setSelectSession('');
    } else {
      setSelectSession(data);
    }
  };
  const onSelectTrainerStatus = data => {
    if (trainerStatus === data) {
      settrainerStatus('');
    } else {
      settrainerStatus(data);
    }
  };

  const renderItem = (item, isSelected) => {
    return (
      <ButtonView
        onPress={() => onSelectCategories(item)}
        style={[styles.itemStyle, isSelected && styles.itemStyleSelected]}>
        <Text style={styles.containerText}>{item?.title}</Text>
      </ButtonView>
    );
  };

  const onPressApply = () => {
    const payload = {};
    // if (value.experience) {
    //   // payload.experience = selectCategories;
    // } else {
    //   delete payload.experience;
    // }
    if (selectCategories !== '') {
      payload.categoryId = selectCategories;
    }
    if (selectSession !== '') {
      payload.trainingType = selectSession;
    }
    if (trainerStatus !== '') {
      payload.status =
        trainerStatus === TRAINER_STATUS.ONLINE ? 'online' : 'offline';
    }
    if (rating !== '') {
      payload.rating = rating;
    }

    console.log('FilterPayload =====>', payload);
    hideModal();
    setTimeout(() => {
      data?.onPress(payload);
    }, 350);
  };

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      style={styles.modal}
      isVisible={data.isVisible}>
      <View style={styles.mainContainer}>
        <ButtonView style={styles.buttonView} onPress={hideModal}>
          <Image source={Images.cancelIcon} style={styles.closeModalIcon} />
        </ButtonView>
        <Text style={styles.mainText}>{'Filters'}</Text>
        <Text style={styles.titeText}>{'Training Category'}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {data?.data.map(item =>
            renderItem(item, item.id === selectCategories),
          )}
        </View>
        <Text style={styles.titeText}>{'Training Type'}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <ButtonView
            style={[
              styles.itemStyle,
              selectSession === SESSION_STATUS.SESSION &&
                styles.itemStyleSelected,
            ]}
            onPress={() => onSelectSessionType(SESSION_STATUS.SESSION)}>
            <Text style={styles.containerText}>{'Session'}</Text>
          </ButtonView>
          <ButtonView
            style={[
              styles.itemStyle,
              selectSession === SESSION_STATUS.CLASS &&
                styles.itemStyleSelected,
            ]}
            onPress={() => onSelectSessionType(SESSION_STATUS.CLASS)}>
            <Text style={styles.containerText}>{'Classes'}</Text>
          </ButtonView>
        </View>
        <View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View>
              <Text style={styles.titeText}>{'Star Rating'}</Text>
              <View style={[styles.itemStyle]}>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  defaultRating={1}
                  size={13}
                  onFinishRating={setRating}
                />
              </View>
            </View>
            {/* <View>
              <Text style={styles.titeText}>{'Trainer Experience'}</Text>
              <View style={[styles.experienceStyle]}>
                <Dropdown
                  placeholder="Experience"
                  data={Experience}
                  {...experienceProps}
                  // customStyle={{ height: 30 }}
                  customStyle={{
                    height: 25,
                    width: Metrics.width / 1.9,
                    marginVertical: 0,
                    // paddingHorizontal: 10,
                    // backgroundColor: 'red',
                  }}
                />
              </View>
            </View> */}
          </View>
        </View>
        {/* <View>
          <Text style={styles.titeText}>{'Trainer Experience'}</Text>
          <View
            style={[
              styles.experienceStyle,
              { width: Metrics.width / 1.9, height: 30 },
            ]}>
            <Dropdown
              placeholder="Experience"
              data={Experience}
              {...experienceProps}
              // customStyle={{ height: 30 }}
              customStyle={{
                height: 30,
                width: Metrics.width / 1.9,
                marginVertical: 0,
                paddingHorizontal: 0,
                backgroundColor: 'red',
              }}
            />
          </View>
        </View> */}
        <Text style={styles.titeText}>{'Trainer Status'}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <ButtonView
            style={[
              styles.itemStyle,
              trainerStatus === TRAINER_STATUS.ONLINE &&
                styles.itemStyleSelected,
            ]}
            onPress={() => onSelectTrainerStatus(TRAINER_STATUS.ONLINE)}>
            <Text style={styles.containerText}>{'Online'}</Text>
          </ButtonView>
          <ButtonView
            style={[
              styles.itemStyle,
              trainerStatus === TRAINER_STATUS.OFFLINE &&
                styles.itemStyleSelected,
            ]}
            onPress={() => onSelectTrainerStatus(TRAINER_STATUS.OFFLINE)}>
            <Text style={styles.containerText}>{'Offline'}</Text>
          </ButtonView>
          <Button
            title={'Apply'}
            largeButton
            style={styles.button}
            onPress={onPressApply}
          />
        </View>
      </View>
    </Modal>
  );
};

export default React.forwardRef(FilterModal);
