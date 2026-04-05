import React from 'react';
import { View, Image, TextInput, ScrollView } from 'react-native';
import {
  Container,
  Text,
  Button,
  ImageView,
  TextInputNative,
  Loader,
} from '../../components';
import { Colors, Images, Metrics } from '../../theme';
import Styles from './Styles';
import { AirbnbRating } from 'react-native-ratings';
import { DataHandler, NavigationService, Util } from '../../utils';
import { UserUtill } from '../../dataUtils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, rateSession } from '../../ducks/booking';
import dayjs from 'dayjs';
import { getUserRole } from '../../ducks/general';
const TrainerSessionCancel = ({ route }) => {
  const isSession = route.params?.isSession ?? false;
  const sessionData = route.params?.sessionData ?? {};
  const trainerData = sessionData.trainer;
  const isTrainee = useSelector(getUserRole);
  console.log('sessionData ==>', sessionData);
  const dispatch = useDispatch();
  const [formObj, cancelReasonProps] = useHookForm(
    ['cancelReason'],
    {},
    ValidationSchema.cancellation,
  );
  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );
  const submit = formObj.handleSubmit(values => {
    const payloadApi = values;
    payloadApi.bookingId = sessionData.id;
    console.log('payloadApi', payloadApi);
    dispatch(
      cancelBooking.request({
        payloadApi: payloadApi,
        cb: () => {
          setTimeout(() => {
            DataHandler.getSessionCompleteModal().show({
              discription: 'Your Booking Has Been Cancelled',
              onPress: () => {
                isTrainee
                  ? NavigationService.reset('TrainerApp')
                  : NavigationService.reset('UserApp');
              },
            });
          }, 300);
        },
      }),
    );
  });
  const TextContainer = () => (
    <View style={Styles.textMainView}>
      <View style={Styles.innerTopView}>
        <Text style={Styles.usernameText}>{UserUtill.name(trainerData)}</Text>
      </View>
      <View>
        {isSession ? (
          <Text style={Styles.dateText}>{`${Util.convertDayString(
            sessionData.session?.days,
          )} | ${
            sessionData.bookingType === 'realTime'
              ? sessionData.startTime
              : Util.convert24HrTo12(sessionData.slot)
          }`}</Text>
        ) : (
          <Text style={Styles.dateText}>{`${Util.convertDayString(
            sessionData.class?.days,
          )} | ${dayjs(sessionData.startTimeFull).format('hh:mm A')}`}</Text>
        )}
        <View style={Styles.locationView}>
          <Image source={Images.locationPin} style={Styles.imageLocation} />
          <Text style={Styles.location}>{UserUtill.address(trainerData)}</Text>
        </View>
      </View>
      {/* <View style={Styles.timeButtonView}>
        <Text style={Styles.timeText}>00:52:33</Text>
      </View> */}
    </View>
  );
  const ReportProblem = () => (
    <View style={Styles.reportView}>
      <Image source={Images.eye} style={Styles.reportImage} />
      <Text style={Styles.reportText}>Report a Problem</Text>
    </View>
  );
  return (
    <Container
      headerTitle="Trainer Ratings"
      notificationCount="9"
      style={Styles.container}>
      <ScrollView>
        <View style={Styles.secMain}>
          <View style={Styles.mainView}>
            <ImageView
              source={{ uri: UserUtill.image(trainerData) }}
              style={Styles.imageStyle}
              placeholderStyle={Styles.imageStyle}
              borderRadius={45}
            />
            <TextContainer />
            <View
              style={[
                Styles.tagView,
                {
                  backgroundColor: isSession ? Colors.blue : Colors.lightGreen,
                },
              ]}>
              <Text style={Styles.tagViewText}>
                {isSession ? 'SESSION' : 'CLASS'}
              </Text>
            </View>
            <Line />

            <Text style={Styles.textNew}>Reason For cancellation:</Text>

            <TextInputNative
              multiline
              inputViewStyle={Styles.textInputView}
              inputContainerStyle={Styles.textInput}
              placeholder="Write Here..."
              placeholderTextColor={Colors.placeholderText}
              {...cancelReasonProps}
            />
            <Button
              style={{ marginTop: Metrics.baseMargin, width: '85%' }}
              titleStyle={Styles.ButText}
              title="SUBMIT"
              onPress={submit}
            />
            {/* <ReportProblem /> */}
          </View>
        </View>
      </ScrollView>
      <Loader type={'CANCEL_BOOKING'} />
    </Container>
  );
};
export default TrainerSessionCancel;
