import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import {
  Container,
  Text,
  Dropdown,
  AvailableDayAndTime,
  Button,
  TimePicker,
  Loader,
  TextInputNative,
} from '../../components';
import { BREAK_TIME, GENDER } from '../../config/Constants';
import { TIME_ZONES } from '../../config/TimeZones';
import { NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import dayjs from 'dayjs';

import { Styles } from './Styles';
import { createSession } from '../../ducks/auth';
import { useDispatch } from 'react-redux';
import { DropDown } from '../../modal';

const TrainerSchedule = ({ route }) => {
  const payload = route?.params?.payload ?? {};
  const dropDownModalRef = useRef();
  const [selectedDays, setSelectedDays] = useState([]);
  const dispatch = useDispatch();
  let currentDate = new Date();
  const [formObj, breakTimeProps, startTimeProps, endTimeProps] = useHookForm(
    ['breakTime', 'startTime', 'endTime'],
    {
      startTime: currentDate,
      endTime: new Date(currentDate.getTime() + 30 * 60 * 1000),
    },
    ValidationSchema.sessionSettingsStep2,
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
  const submit = formObj.handleSubmit(values => {
    console.log(values);
    values.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
      ...payload,
      ...values,
    };
    console.log('newPayload', newPayload);
    dispatch(
      createSession.request({
        payloadApi: newPayload,
        cb: () => {
          NavigationService.navigate('TrainerServiceAreas');
        },
      }),
    );
  });

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

  return (
    <Container headerTitle="SINGLE SESSION SETTINGS">
      <View style={{ flex: 1 }}>
        {/* <Text style={Styles.timeZoneTitle}>Select Time Zone</Text> */}
        {/* <Dropdown
          placeholder="Select Timezone"
          data={TIME_ZONES}
          {...timeZoneProps}
        /> */}
        {/* <TextInputNative
          placeholder="Select Timezone"
          {...timeZoneProps}
          onPress={timeZoneOnPress}
        /> */}
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
      </View>
      <Button
        title="Save & Continue"
        largeButton
        style={Styles.button}
        onPress={submit}
      />
      <Loader type={'TRAINER_CREATE_SESSION'} />
      <DropDown ref={dropDownModalRef} />
    </Container>
  );
};

export default TrainerSchedule;
