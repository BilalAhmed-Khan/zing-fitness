import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Text,
  TrainingCategoriesList,
  Button,
  FlatListApi,
  TrainingCategoryItem,
  Loader,
  ButtonView,
  DatePicker,
  TimePicker,
  ContentAttributesText,
} from '../../components';
import { UserUtill } from '../../dataUtils';
import {
  getIdentifierAuthData,
  getIdentifierTrainer,
  getTraineeCategoriesData,
  getTrainerCategories,
  getUserData,
  selectCategories,
} from '../../ducks/auth';
import { addBreakTimes, getTrainerBreakTimes } from '../../ducks/trainer';
import { Images } from '../../theme';
import { NavigationService, Util } from '../../utils';

import { Styles } from './Styles';

const AddConfigureBreaks = ({ route }) => {
  let currentDate = new Date();
  const getUser = useSelector(getUserData);
  const getSelectedCategories = useSelector(getTraineeCategoriesData);
  let ids = [];
  if (getSelectedCategories.length > 0) {
    ids = getSelectedCategories?.map(val => val.id);
  }
  const [isFullDay, setIsFullDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [selectedEndDate, setSelectedEndDate] = useState(currentDate);
  const [selectedStartTime, setSelectedStartTime] = useState(currentDate);
  const [selectedEndTime, setSelectedEndTime] = useState(
    new Date(currentDate.getTime() + 30 * 20 * 1000),
  );

  // console.log(selectedDate);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   setSelectedStartTime()

  // },[selectedDate])

  const onPress = () => {
    const dateCheck = dayjs(new Date(selectedDate)).isAfter(selectedEndDate);
    const timeCheck = dayjs(new Date(selectedStartTime)).isAfter(
      selectedEndTime,
    );
    if (dateCheck) {
      Util.showMessage('Please select start and end date correctly');
      return;
    }
    if (timeCheck && !isFullDay) {
      Util.showMessage('Please select start and end time correctly');
      return;
    }
    const startDate = Util.formatDate(selectedDate, 'YYYY-MM-DD');
    const endDate = Util.formatDate(selectedEndDate, 'YYYY-MM-DD');
    console.log(dayjs(new Date(selectedDate)).isAfter(selectedEndDate));
    setTimeout(() => {
      const payload = {
        startDate: startDate,
        endDate: endDate,
        fullDay: isFullDay ? 1 : '0',
        startTime: isFullDay ? null : dayjs(selectedStartTime).format('HH:mm'),
        endTime: isFullDay ? null : dayjs(selectedEndTime).format('HH:mm'),
      };
      console.log('asdasda', payload);
      dispatch(
        addBreakTimes.request({
          payloadApi: payload,
          cb: () => {
            NavigationService.goBack();
            dispatch(
              getTrainerBreakTimes.request({
                payloadApi: {
                  trainerId: UserUtill.id(getUser),
                  page: 1,
                },
                reset: true,
              }),
            );
          },
        }),
      );
    }, 300);
  };
  const onSelectStartTime = updatedTime => {
    console.log('onSelectStartTime', updatedTime);
    setSelectedStartTime(updatedTime);
  };
  const onSelectEndTime = updateTime => {
    console.log('onSelectEndTime', updateTime);
    setSelectedEndTime(updateTime);
  };
  const onDateSelect = updatedDate => {
    console.log('onDateSelect', updatedDate);
    setSelectedDate(updatedDate);
  };
  const onDateSelectEnd = updatedDate => {
    console.log('onDateSelect', updatedDate);
    setSelectedEndDate(updatedDate);
  };

  return (
    <>
      <Container headerTitle="Configure Breaks">
        <View>
          <Text style={Styles.title}>{'Select Start Date'}</Text>
          <DatePicker
            placeholder="Start Date"
            onChange={onDateSelect}
            value={selectedDate}
            error={''}
            extraProps={{
              minimumDate: new Date(),
              // maximumDate: maxDate,
            }}
          />
          <Text style={Styles.title}>{'Select End Date'}</Text>
          <DatePicker
            placeholder="End Date"
            onChange={onDateSelectEnd}
            value={selectedEndDate}
            error={''}
            extraProps={{
              minimumDate: new Date(),
              // maximumDate: maxDate,
            }}
          />
          <View style={Styles.selectTime}>
            <TimePicker
              title="Start time"
              value={selectedStartTime}
              disabled={isFullDay}
              onChange={onSelectStartTime}
            />

            <TimePicker
              title="End time"
              value={selectedEndTime}
              disabled={isFullDay}
              onChange={onSelectEndTime}
            />
          </View>
        </View>
        <ButtonView
          bounceTime={0}
          style={Styles.row}
          onPress={() => {
            setIsFullDay(!isFullDay);
          }}>
          <Image
            source={isFullDay ? Images.checkboxSelected : Images.checkboxEmpty}
          />
          <Text style={Styles.textStyle}>Full Day</Text>
        </ButtonView>
        <Button title="Done" largeButton onPress={onPress} />
      </Container>
      <Loader type={addBreakTimes.type} />
    </>
  );
};

export default AddConfigureBreaks;
