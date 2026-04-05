import React, { useState } from 'react';
import { View, Image, FlatList, TextInput, ScrollView } from 'react-native';
import {
  Container,
  Text,
  AppHeader,
  MyAppointmentsListItem,
  RadioButton,
  ButtonView,
  UserCalendarListitem,
  ClassListView,
  SessionType,
  AvailableDayAndTime,
  Button,
  Dropdown,
  TextInputNative,
  TimePicker,
  SessionRateInput,
  Loader,
  ImageView,
} from '../../components';
import Styles from './styles';
import { Colors, Images, Metrics } from '../../theme';
import {
  BREAK_TIME,
  SESSION_DURATION,
  SESSION_TYPE,
  STATUS,
  UPLOAD_IMAGE_LIMIT,
} from '../../config/Constants';
import { ImagePicker, NavigationService, Util } from '../../utils';
import { TIME_ZONES } from '../../config/TimeZones';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { createClasess, updateClasess } from '../../ducks/classes';
import { ClassUtill } from '../../dataUtils';

const TranieeCreateClass = ({ route }) => {
  const isEdit = route?.params?.isEdit ?? false;
  const data = route?.params?.data ?? {};

  const [selectedDays, setSelectedDays] = useState(
    isEdit ? ClassUtill.availableDateTime(data) : [],
  );
  const [selectImages, setSelectImages] = useState(ClassUtill.images(data));
  const [cordinates, setCordinates] = useState(ClassUtill.location(data));
  let currentDate = new Date();
  const dispatch = useDispatch();

  console.log(
    'currentDate==>',
    new Date(currentDate.getTime() + 30 * 60 * 1000),
  );
  console.log('ClassUtill ===>', ClassUtill.endTime(data));

  const [
    formObj,
    titleProps,
    descriptionProps,
    priceProps,
    durationProps,
    maxParticipantsProps,
    // breakTimeProps,
    startTimeProps,
    endTimeProps,
    locationProps,
  ] = useHookForm(
    [
      'title',
      'description',
      'price',
      'duration',
      // 'breakTime',
      'maxParticipants',
      'startTime',
      'endTime',
      'address',
    ],
    isEdit
      ? {
          title: ClassUtill.title(data),
          description: ClassUtill.description(data),
          price: ClassUtill.price(data),
          duration: ClassUtill.duration(data),
          // breakTime: ClassUtill.breakTime(data),
          // startTime: ClassUtill.startTime(data),
          // endTime: ClassUtill.endTime(data),
          maxParticipants: ClassUtill.maxParticipants(data),
          startTime: new Date(ClassUtill.startTimeFull(data)),
          endTime: new Date(ClassUtill.endTimeFull(data)),
          address: ClassUtill.address(data),
        }
      : {
          startTime: currentDate,
          endTime: new Date(currentDate.getTime() + 30 * 60 * 1000),
        },
    ValidationSchema.createClass,
  );
  console.log(selectedDays);

  const submit = formObj.handleSubmit(values => {
    const timeCheck = dayjs(values.startTime).isAfter(values.endTime);
    if (timeCheck) {
      Util.showMessage('Please Select Start And End time Correctly');
      return;
    }
    console.log(values);
    console.log(selectedDays);
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
    values.location = {
      cordinates: cordinates,
    };
    if (values.startTime) {
      values.startTimeFull = values.startTime;
      values.bookingTime = dayjs(values.startTime).format('hh:mm A');

      delete values.startTime;
    }
    if (values.endTime) {
      values.endTimeFull = values.endTime;
      delete values.endTime;
    }
    console.log('newPayload', values);
    if (isEdit) {
      dispatch(
        updateClasess.request({
          payloadApi: values,
          cb: () => {
            NavigationService.goBack();
          },
          id: ClassUtill.id(data),
        }),
      );
    } else {
      dispatch(
        createClasess.request({
          payloadApi: values,
          cb: () => {
            NavigationService.goBack();
          },
        }),
      );
    }
  });

  const deleteImage = item => {
    const newData = selectImages.filter(val => val !== item);
    setSelectImages([...newData]);
  };

  const onUploadImage = () => {
    ImagePicker.showGalleryAndCameraOptions(
      val => {
        console.log('onUploadImage ==>', val);
        if (val?.uri || val?.length > 0) {
          let newData = [];
          if (val?.uri) {
            newData.push(val?.uri);
          } else {
            const data = val.map(val => val.uri);
            console.log('data ==>', data);
            newData = [...newData, ...data];
          }
          console.log('newData ==>', newData);
          setSelectImages([...selectImages, ...newData]);
        }
      },
      { selectionLimit: UPLOAD_IMAGE_LIMIT - selectImages.length },
    );
  };

  const onDaySelectPress = item => {
    if (selectedDays.includes(item.day)) {
      let newData = selectedDays.filter(val => val !== item.day);
      setSelectedDays([...newData]);
    } else {
      selectedDays.push(item.day);
      setSelectedDays([...selectedDays]);
    }
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
            style={Styles.imageViewStyle}
            placeholderStyle={Styles.imageViewStyle}
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

  return (
    <>
      <Container
        style={Styles.container}
        contentStyle={{ paddingHorizontal: Metrics.smallMargin }}
        headerTitle="Class Details"
        notificationCount="9">
        <ScrollView
          style={{ flex: 1, marginHorizontal: 10 }}
          showsVerticalScrollIndicator={false}>
          <Text style={Styles.sessionTimeTitle}>{'CLASS TITLE'}</Text>
          <TextInputNative
            placeholder="Write Here..."
            placeholderTextColor={Colors.placeholderText}
            {...titleProps}
          />
          <Text style={Styles.sessionTimeTitle}>{'ADD DESCRIPTION'}</Text>
          <TextInputNative
            multiline
            inputViewStyle={Styles.multilineTextInputView}
            inputContainerStyle={Styles.multilineTextInput}
            placeholder="Write Here..."
            placeholderTextColor={Colors.placeholderText}
            {...descriptionProps}
          />
          <Text style={Styles.sessionTimeTitle}>{'Max Participants'}</Text>
          <TextInputNative
            placeholder="Max Participants"
            placeholderTextColor={Colors.placeholderText}
            {...maxParticipantsProps}
            keyboardType="number-pad"
          />
          <Text style={Styles.sessionTimeTitle}>{'LOCATION'}</Text>
          <TextInputNative
            placeholder="Select Location"
            placeholderTextColor={Colors.placeholderText}
            onPress={onChange => {
              NavigationService.navigate('SearchLocation', {
                onSaveLocation: (location, cordinates) => {
                  console.log('onSaveLocation ==>', location, cordinates);
                  onChange(location);
                  setCordinates([...cordinates]);
                  NavigationService.goBack();
                },
              });
            }}
            {...locationProps}
          />
          <AvailableDayAndTime
            selectedDays={selectedDays}
            onDaySelect={onDaySelectPress}
            isDummy={false}
          />
          <Text style={Styles.breakTimeTitle}>Duration</Text>
          <Dropdown
            placeholder="Select Duration"
            data={SESSION_DURATION}
            {...durationProps}
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
                <TimePicker
                  title="End time"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </View>
          <SessionRateInput {...priceProps} isClass />
          {/* <View>
            <Text style={Styles.breakTimeTitle}>Enter Break Time</Text>
            <Dropdown
              placeholder="Select break time"
              data={BREAK_TIME}
              {...breakTimeProps}
            />
          </View> */}
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
          <Button
            title="Save"
            largeButton
            style={Styles.button}
            onPress={submit}
          />
        </ScrollView>
      </Container>
      <Loader type={['CREATE_CLASESS', 'UPDATE_CLASESS']} />
    </>
  );
};

export default TranieeCreateClass;
