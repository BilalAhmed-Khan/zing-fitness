import dayjs from 'dayjs';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Text,
  SessionType,
  Button,
  SessionRateInput,
  Dropdown,
  TextInputNative,
  ButtonView,
  TimePicker,
  AvailableDayAndTime,
  Loader,
  ImageView,
} from '../../components';
import {
  BREAK_TIME,
  SESSION_DURATION,
  SESSION_TYPE,
  UPLOAD_IMAGE_LIMIT,
} from '../../config/Constants';
import { TIME_ZONES } from '../../config/TimeZones';
import { SessionUtill } from '../../dataUtils';
import { createSession, getSessionData } from '../../ducks/auth';
import { DropDown } from '../../modal';
import { Images, Colors } from '../../theme';
import { ImagePicker, NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

import { Styles } from './Styles';

const TrainerEditSessionType = () => {
  const sessionData = useSelector(getSessionData);
  const dispatch = useDispatch();
  const dropDownModalRef = useRef();
  console.log('sessionData', sessionData);

  const [selectImages, setSelectImages] = useState(
    SessionUtill.images(sessionData),
  );
  const [selectedDays, setSelectedDays] = useState(
    SessionUtill.availableDateTime(sessionData),
  );
  let currentDate = new Date();
  const [
    formObj,
    priceProps,
    durationProps,
    descriptionProps,
    // timeZoneProps,
    breakTimeProps,
    startTimeProps,
    endTimeProps,
  ] = useHookForm(
    [
      'price',
      'duration',
      'description',
      // 'timeZone',
      'breakTime',
      'startTime',
      'endTime',
    ],
    {
      description: SessionUtill.description(sessionData),
      price: SessionUtill.price(sessionData),
      duration: SessionUtill.duration(sessionData),
      // timeZone: SessionUtill.timeZone(sessionData),
      breakTime: SessionUtill.breakTime(sessionData),
      startTime:
        SessionUtill.startTimeFull(sessionData) !== ''
          ? new Date(SessionUtill.startTimeFull(sessionData))
          : currentDate,
      endTime:
        SessionUtill.endTimeFull(sessionData) !== ''
          ? new Date(SessionUtill.endTimeFull(sessionData))
          : new Date(currentDate.getTime() + 30 * 60 * 1000),
      // startTime: currentDate,
      // endTime: new Date(currentDate.getTime() + 30 * 60 * 1000),
    },
    ValidationSchema.sessionEdit,
  );
  const onDaySelectPress = item => {
    if (selectedDays.includes(item.day)) {
      let newData = selectedDays.filter(val => val !== item.day);
      setSelectedDays([...newData]);
    } else {
      selectedDays.push(item.day);
      setSelectedDays([...selectedDays]);
    }
  };
  const deleteImage = item => {
    const newData = selectImages.filter(val => val !== item);
    setSelectImages([...newData]);
  };

  const onUploadImage = () => {
    ImagePicker.showGalleryAndCameraOptions(
      val => {
        console.log(val);
        if (val?.uri || val?.length > 0) {
          let newData = [];
          if (val?.uri) {
            newData.push(val?.uri);
          } else {
            const data = val.map(val => val.uri);
            console.log('data ==>', data);
            newData = [...newData, ...data];
          }
          setSelectImages([...selectImages, ...newData]);
        }
      },
      { selectionLimit: UPLOAD_IMAGE_LIMIT - selectImages.length },
    );
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={Styles.imageViewStyle}>
          {/* <Image source={Images.addButton} style={Styles.addImageSize} />
          <Text style={Styles.imageAddTitle}>{'Add More Images'}</Text> */}
          <ImageView
            source={{ uri: item }}
            borderRadius={12}
            placeholderStyle={Styles.imageViewStyle}
            style={Styles.imageViewStyle}
          />
          <ButtonView
            style={{ position: 'absolute', top: 3, right: 0 }}
            onPress={() => deleteImage(item)}>
            <Image source={Images.remove} />
          </ButtonView>
        </View>
      </>
    );
  };

  const timeZoneOnPress = onChange => {
    dropDownModalRef.current.show({
      data: Util.sortArrayById(TIME_ZONES),
      onPress: item => {
        console.log(item);
        onChange(item?.label);
        // setSelectedStates(item?.state_code);
      },
    });
  };

  const submit = formObj.handleSubmit(values => {
    console.log(values);
    values.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeCheck = dayjs(values.startTime).isAfter(values.endTime);
    if (timeCheck) {
      Util.showMessage('Please Select Start And End time Correctly');
      return;
    }
    console.log('timeChecktimeCheck ===>', timeCheck);
    if (selectedDays.length > 0) {
      let newData = selectedDays.map(val => {
        return {
          day: val,
          startTime: Util.convert12HoursTime(
            dayjs(values.startTime).format('hh:mm A'),
          ),
          endTime: Util.convert12HoursTime(
            dayjs(values.endTime).format('hh:mm A'),
          ),
        };
      });
      values.availableDateTime = newData;
    } else {
      Util.showMessage('Please Select Available Day');
      return;
    }
    values.images = selectImages;
    if (values.startTime) {
      values.startTimeFull = values.startTime;
      values.bookingTime = dayjs(values.startTime).format('hh:mm A');
      delete values.startTime;
    }
    if (values.endTime) {
      values.endTimeFull = values.endTime;
      delete values.endTime;
    }

    const newPayload = {
      ...sessionData,
      ...values,
    };
    console.log('newPayload', newPayload);

    dispatch(
      createSession.request({
        payloadApi: newPayload,
        cb: () => {
          NavigationService.goBack();
        },
      }),
    );
  });
  return (
    <Container headerTitle="Edit Session Rates">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SessionRateInput {...priceProps} />

        <View>
          <Text style={Styles.sessionTimeTitle}>{'ADD DESCRIPTION'}</Text>
          <TextInputNative
            multiline
            inputViewStyle={Styles.textInputView}
            inputContainerStyle={Styles.textInput}
            placeholder="Write Here..."
            placeholderTextColor={Colors.placeholderText}
            {...descriptionProps}
          />
        </View>
        <Text style={Styles.uploadTitle}>{'SESSION DURATION'}</Text>
        <Dropdown
          placeholder="Select Duration"
          data={SESSION_DURATION}
          {...durationProps}
        />
        <View>
          <View style={Styles.titleView}>
            <Text style={Styles.uploadTitle}>{'UPLOAD IMAGES'}</Text>
            {UPLOAD_IMAGE_LIMIT !== selectImages.length && (
              <ButtonView onPress={onUploadImage}>
                <Image source={Images.addButton} />
              </ButtonView>
            )}
          </View>
        </View>
        {selectImages.length > 0 && (
          <FlatList
            style={{ flex: 1 }}
            data={selectImages}
            renderItem={renderItem}
            numColumns={2}
          />
        )}
        <AvailableDayAndTime
          selectedDays={selectedDays}
          onDaySelect={onDaySelectPress}
          isDummy={false}
        />
        <View style={Styles.selectTime}>
          <Controller
            {...startTimeProps}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                title="Start time"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            {...endTimeProps}
            render={({ field: { onChange, value } }) => (
              <TimePicker title="End time" value={value} onChange={onChange} />
            )}
          />
        </View>
        <Text style={Styles.breakTimeTitle}>Enter Slot Break Time</Text>
        <Dropdown
          placeholder="Select slot break time"
          data={BREAK_TIME}
          {...breakTimeProps}
        />
        <Button
          title="Save"
          largeButton
          style={Styles.button}
          onPress={submit}
        />
      </ScrollView>
      <DropDown ref={dropDownModalRef} />
      <Loader type={'TRAINER_CREATE_SESSION'} />
    </Container>
  );
};

export default TrainerEditSessionType;
