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
import { useDispatch } from 'react-redux';
import { rateSession } from '../../ducks/booking';
const TrainerSessionRating = ({ route }) => {
  const isSession = route.params?.isSession ?? false;
  const sessionData = route.params?.sessionData ?? {};
  const trainerData = sessionData.trainer;
  const dispatch = useDispatch();
  const [formObj, ratingProps, reviewProps] = useHookForm(
    ['rating', 'review'],
    {
      rating: 0,
    },
    ValidationSchema.addRating,
  );
  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );
  const submit = formObj.handleSubmit(values => {
    console.log('values', values);
    if (values.rating === '0') {
      Util.showMessage('PLease Rate');
    }
    const payloadApi = values;
    payloadApi.id = sessionData.id;
    dispatch(
      rateSession.request({
        payloadApi: payloadApi,
        cb: () => {
          setTimeout(() => {
            DataHandler.getSessionCompleteModal().show({
              discription: 'Your Session Booking Has Been Completed',
              onPress: () => {
                NavigationService.reset('UserApp');
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
            <Controller
              {...ratingProps}
              render={({ field: { onChange, value } }) => (
                <AirbnbRating
                  count={5}
                  showRating={false}
                  defaultRating={0}
                  size={20}
                  onFinishRating={onChange}
                />
              )}
              defaultValue={''}
            />

            <Text style={Styles.textNew}>Any Comments/Suggestions:</Text>

            <TextInputNative
              multiline
              inputViewStyle={Styles.textInputView}
              inputContainerStyle={Styles.textInput}
              placeholder="Write Here..."
              placeholderTextColor={Colors.placeholderText}
              {...reviewProps}
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
      <Loader type={'RATE_SESSION'} />
    </Container>
  );
};
export default TrainerSessionRating;
