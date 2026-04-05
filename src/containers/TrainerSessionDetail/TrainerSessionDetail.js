import React from 'react';
import CountDown from 'react-native-countdown-component';
import { View, Image, Pressable, FlatList, ScrollView } from 'react-native';
import {
  Button,
  ButtonView,
  Container,
  ImageView,
  Loader,
  ScrollViewApi,
  Text,
} from '../../components';
import Styles from './Styles';
import { Colors, Images, Metrics } from '../../theme';
import { NavigationService, Util } from '../../utils';
import {
  getSessionIdentifierData,
  getTrainerSession,
} from '../../ducks/trainer';
import {
  bookingDetails,
  endBooking,
  endClass,
  getbookingData,
  getbookingIdentifierBookingData,
  startBooking,
  startClass,
} from '../../ducks/booking';
import { ClassUtill, SessionUtill, UserUtill } from '../../dataUtils';
import { BOOKING_SESSION_TYPE, BOOKING_STATUS } from '../../config/Constants';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getUserRole } from '../../ducks/general';
import { createChatRoom } from '../../ducks/chat';
const TrainerSessionDetail = ({ route }) => {
  const isTrainee = useSelector(getUserRole);
  const isSession = route.params?.isSession ?? false;
  const bookingId = route.params?.id ?? '';
  const dispatch = useDispatch();
  console.log(isSession);

  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );
  const Profile = ({ data }) => {
    return (
      <View style={Styles.mainView}>
        <ImageView
          source={{ uri: UserUtill.image(data?.trainer) }}
          style={Styles.imageStyle}
          placeholderStyle={Styles.imageStyle}
          borderRadius={45}
        />
        <View style={Styles.textMainView}>
          <View style={Styles.innerTopView}>
            <Text style={Styles.usernameText}>
              {UserUtill.name(data?.trainer)}
            </Text>
            <ButtonView
              onPress={() => {
                dispatch(
                  createChatRoom.request({
                    payloadApi: {
                      userId: UserUtill.id(
                        isTrainee ? data.user : data?.trainer,
                      ),
                    },
                    identifier: UserUtill.id(
                      isTrainee ? data.user : data?.trainer,
                    ),
                    cb: callbackData => {
                      console.log('CALLBACK ==>', callbackData);
                      NavigationService.navigate('Chat', {
                        id: callbackData.userId,
                        roomId: callbackData?.roomId,
                      });
                    },
                  }),
                );
              }}>
              <Image source={Images.chat} />
            </ButtonView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ flex: 1 }}>
              {isSession ? (
                data.bookingType === 'realTime' ? (
                  <Text style={Styles.dateText}>{`${Util.convertDayString(
                    data.session?.days,
                  )} | ${Util.convert24HrTo12(data.startTime)}`}</Text>
                ) : (
                  <Text style={Styles.dateText}>{`${Util.convertDayString(
                    data.session?.days,
                  )} | ${Util.convert24HrTo12(data.slot)}`}</Text>
                )
              ) : (
                <Text style={Styles.dateText}>{`${Util.convertDayString(
                  data.class?.days,
                )} | ${dayjs(data.startTimeFull).format('hh:mm A')}`}</Text>
              )}
              <View style={Styles.locationView}>
                <Image
                  source={Images.locationPin}
                  style={Styles.imageLocation}
                />
                <Text style={Styles.location} numberOfLines={1}>
                  {UserUtill.address(data)}
                </Text>
              </View>
            </View>
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
          </View>

          <View style={Styles.timeButtonView}>
            {/* <Text style={Styles.timeText}>00:52:33</Text> */}
            {/* {console.log(Util.countdown('9:00', 30))} */}
            {data.status == BOOKING_STATUS.START && (
              <CountDown
                until={Util.countdown(
                  isSession
                    ? data.bookingType === 'realTime'
                      ? data.startTime
                      : data.slot
                    : dayjs(data.startTimeFull).format('hh:mm'),
                  SessionUtill.duration(data),
                )}
                // size={20}
                onFinish={() => {
                  console.log('FINISHED');
                }}
                digitStyle={Styles.countdigitStyle}
                digitTxtStyle={Styles.countdigitTxtStyle}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ h: null, m: null, s: null }}
                showSeparator
                separatorStyle={{ color: Colors.white }}
              />
            )}

            {/* {data.status !== BOOKING_STATUS.END && (
              <Button
                style={Styles.ButtonStyle}
                onPress={() =>
                  NavigationService.navigate('TrainerSessionRating', {
                    isSession: isSession,
                    sessionData: data,
                  })
                }
                titleStyle={Styles.textStyle}
                title={
                  data.status === BOOKING_STATUS.PENDING
                    ? 'START SESSION'
                    : 'END SESSION'
                }
              />
            )} */}
          </View>
        </View>
      </View>
    );
  };
  const appointmentDetails = data => (
    <View style={Styles.fullBox}>
      <Text style={Styles.timeFull}>{UserUtill.address(data)}</Text>
      <Pressable hitSlop={10}>
        <Image source={Images.locationIcon} />
      </Pressable>
    </View>
  );
  const sessionType = data => (
    <View style={{ marginVertical: Metrics.miniMargin }}>
      <Text style={Styles.textHeadSession}>
        {isSession ? 'Specialty of Session Chosen:' : 'Class Title:'}
      </Text>
      <View style={Styles.fullBox}>
        <Text style={Styles.timeFull}>
          {isSession
            ? data?.category?.title ?? ''
            : ClassUtill.title(data?.class)}
        </Text>
      </View>
    </View>
  );
  const sessionTime = data => (
    <>
      <View style={{ marginVertical: Metrics.miniMargin }}>
        <Text style={Styles.textHeadSession}>
          {isSession ? 'Session Date:' : 'Class Date:'}
        </Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>
            {/* {Util.formatDate(data?.date, 'DD MMM YYYY')} */}
            {dayjs(data?.date).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
    </>
  );
  const sessionDuration = data => (
    <>
      <Text style={Styles.textHeadSession}>
        {isSession ? 'Session Duration:' : 'Class Duration:'}
      </Text>
      <View style={Styles.fullMain}>
        <View style={Styles.box}>
          <Text style={Styles.timeFull}>{`${SessionUtill.duration(
            data,
          )} Min Session`}</Text>
        </View>
        {/* {bookingType === 'isRe'} */}
        <View style={Styles.box}>
          {isSession ? (
            <Text style={Styles.timeFull}>{`${
              data?.bookingType === 'realTime'
                ? Util.convert24HrTo12(data.startTime)
                : Util.convert24HrTo12(data.slot)
            } - ${Util.addTimeFromMomment(
              data?.bookingType === 'realTime' ? data.startTime : data.slot,
              SessionUtill.duration(data),
            )}`}</Text>
          ) : (
            <Text style={Styles.timeFull}>{`${dayjs(data.startTimeFull).format(
              'hh:mm A',
            )} - ${Util.addTimeFromMomment(
              dayjs(data.startTimeFull).format('hh:mm'),
              SessionUtill.duration(data.class),
            )}`}</Text>
          )}
        </View>
      </View>
    </>
  );
  const traineeDetails = data => (
    <>
      <Text style={Styles.textHeadSession}>Trainee Details</Text>
      <View style={{ marginVertical: Metrics.miniMargin }}>
        <Text style={Styles.textHeadSession}>{'Gender:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>{UserUtill.gender(data.user)}</Text>
        </View>
      </View>
      <View style={{ marginVertical: Metrics.miniMargin }}>
        <Text style={Styles.textHeadSession}>{'Date Of Birth:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>
            {UserUtill.age(data.user) !== ''
              ? dayjs(UserUtill.age(data.user)).format('MM/DD/YYYY')
              : ''}
          </Text>
        </View>
      </View>
      <View style={Styles.fullMain}>
        <View style={Styles.innerBox}>
          <Text style={Styles.timeFull}>Weight:</Text>
          <View style={Styles.box}>
            <Text style={Styles.trainerDetailText}>
              {UserUtill.weight(data.user)}
              <Text style={Styles.unitText}>
                {` ${UserUtill.weightUnit(data.user)}`}
              </Text>
            </Text>
          </View>
        </View>
        <View style={Styles.innerBox}>
          <Text style={Styles.timeFull}>Height:</Text>
          <View style={Styles.box}>
            <Text style={Styles.trainerDetailText}>
              {UserUtill.height(data.user)}
              <Text style={Styles.unitText}>
                {` ${UserUtill.heightUnit(data.user)}`}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
  const commonHealthProblemsInput = data => (
    <>
      <Text style={Styles.textHeadSession}>Common Health Problems</Text>
      <View style={Styles.bigBox}>
        <Text style={Styles.bigBoxText}>
          {UserUtill.commonHealthProblem(data.user)}
        </Text>
      </View>
    </>
  );
  const partnersList = data => {
    const renderCard = ({ item }) => (
      <View style={{ marginRight: Metrics.baseMargin }}>
        <ImageView
          source={{ uri: UserUtill.image(item) }}
          style={Styles.listImageStyle}
          placeholderStyle={Styles.listImageStyle}
          borderRadius={10}
        />
        <Text style={Styles.listText}>
          {`${UserUtill.firstName(item)} ${UserUtill.lastName(item)}`}
        </Text>
      </View>
    );
    return (
      <View style={{ marginTop: Metrics.baseMargin }}>
        <Text style={Styles.textListTitle}>{`Who is coming with you? `}</Text>
        <FlatList data={data} renderItem={renderCard} horizontal />
      </View>
    );
  };

  const renderContent = data => {
    console.log('DATA ==>', data);
    let isCheckPendingStatus =
      data.status === BOOKING_STATUS.PENDING ||
      data.status === BOOKING_STATUS.TRAINER_ACCEPTED;
    return (
      <View style={Styles.secMain}>
        <Profile data={data} />
        <Line />
        <View style={Styles.bottomMainView}>
          <Text style={Styles.textHead}>
            {isSession ? 'Session Details' : 'Class Details'}
          </Text>
          {appointmentDetails(data)}
          {sessionType(data)}
          {sessionDuration(data)}
          {sessionTime(data)}
          <Line />
          {traineeDetails(data)}
          {commonHealthProblemsInput(data)}
          {data?.participants.length > 0 && partnersList(data.participants)}
          {/* {isTrainee ? (
            data.status !== BOOKING_STATUS.END &&
            // data.status == BOOKING_STATUS.START &&
            (isSession ? (
              <Button
                onPress={() => {
                  const payloadApi = {
                    id: data?.id,
                  };
                  data.status === BOOKING_STATUS.PENDING
                    ? dispatch(
                        startBooking.request({ payloadApi, cb: () => {} }),
                      )
                    : dispatch(
                        endBooking.request({
                          payloadApi,
                          cb: () => {
                            if (!isTrainee) {
                              NavigationService.navigate(
                                'TrainerSessionRating',
                                {
                                  isSession: isSession,
                                  sessionData: data,
                                },
                              );
                            } else {
                              NavigationService.goBack();
                            }
                          },
                        }),
                      );
                }}
                style={{ marginTop: Metrics.baseMargin }}
                titleStyle={Styles.ButText}
                title={
                  data.status === BOOKING_STATUS.PENDING
                    ? 'Start Session'
                    : 'End Session'
                }
              />
            ) : (
              <Button
                onPress={() => {
                  const payloadApi = {
                    id: data?.id,
                  };
                  data.status === BOOKING_STATUS.PENDING
                    ? dispatch(startClass.request({ payloadApi, cb: () => {} }))
                    : dispatch(
                        endClass.request({
                          payloadApi,
                          cb: () => {
                            if (!isTrainee) {
                              NavigationService.navigate(
                                'TrainerSessionRating',
                                {
                                  isSession: isSession,
                                  sessionData: data,
                                },
                              );
                            } else {
                              NavigationService.goBack();
                            }
                          },
                        }),
                      );
                }}
                style={{ marginTop: Metrics.baseMargin }}
                titleStyle={Styles.ButText}
                title={BOOKING_STATUS.PENDING ? 'Start Class' : 'End Class'}
              />
            ))
          ) : data.status === BOOKING_STATUS.START ? (
            isSession ? (
              <Button
                onPress={() => {
                  const payloadApi = {
                    id: data?.id,
                  };
                  data.status === BOOKING_STATUS.PENDING
                    ? dispatch(
                        startBooking.request({ payloadApi, cb: () => {} }),
                      )
                    : dispatch(
                        endBooking.request({
                          payloadApi,
                          cb: () => {
                            NavigationService.navigate('TrainerSessionRating', {
                              isSession: isSession,
                              sessionData: data,
                            });
                          },
                        }),
                      );
                }}
                style={{ marginTop: Metrics.baseMargin }}
                titleStyle={Styles.ButText}
                title={
                  data.status === BOOKING_STATUS.PENDING
                    ? 'Start Session'
                    : 'End Session'
                }
              />
            ) : (
              <Button
                onPress={() => {
                  const payloadApi = {
                    id: data?.id,
                  };
                  data.status === BOOKING_STATUS.PENDING
                    ? dispatch(startClass.request({ payloadApi, cb: () => {} }))
                    : dispatch(
                        endClass.request({
                          payloadApi,
                          cb: () => {
                            NavigationService.navigate('TrainerSessionRating', {
                              isSession: isSession,
                              sessionData: data,
                            });
                          },
                        }),
                      );
                }}
                style={{ marginTop: Metrics.baseMargin }}
                titleStyle={Styles.ButText}
                title={BOOKING_STATUS.PENDING ? 'Start Class' : 'End Class'}
              />
            )
          ) : (
            <></>
          )} */}
          {data.status !== BOOKING_STATUS.CANCELLED &&
            (isTrainee && data.status !== BOOKING_STATUS.END ? (
              isSession ? (
                <Button
                  onPress={() => {
                    const payloadApi = {
                      id: data?.id,
                    };
                    isCheckPendingStatus
                      ? dispatch(
                          startBooking.request({ payloadApi, cb: () => {} }),
                        )
                      : dispatch(
                          endBooking.request({
                            payloadApi,
                            cb: () => {
                              if (!isTrainee) {
                                NavigationService.navigate(
                                  'TrainerSessionRating',
                                  {
                                    isSession: isSession,
                                    sessionData: data,
                                  },
                                );
                              } else {
                                NavigationService.goBack();
                              }
                            },
                          }),
                        );
                  }}
                  style={{ marginTop: Metrics.baseMargin }}
                  titleStyle={Styles.ButText}
                  title={isCheckPendingStatus ? 'Start Session' : 'End Session'}
                />
              ) : (
                <Button
                  onPress={() => {
                    const payloadApi = {
                      id: data?.id,
                    };
                    isCheckPendingStatus
                      ? dispatch(
                          startClass.request({ payloadApi, cb: () => {} }),
                        )
                      : dispatch(
                          endClass.request({
                            payloadApi,
                            cb: () => {
                              if (!isTrainee) {
                                NavigationService.navigate(
                                  'TrainerSessionRating',
                                  {
                                    isSession: isSession,
                                    sessionData: data,
                                  },
                                );
                              } else {
                                NavigationService.goBack();
                              }
                            },
                          }),
                        );
                  }}
                  style={{ marginTop: Metrics.baseMargin }}
                  titleStyle={Styles.ButText}
                  title={isCheckPendingStatus ? 'Start Class' : 'End Class'}
                />
              )
            ) : isCheckPendingStatus && data.canCancel ? (
              <Button
                onPress={() => {
                  NavigationService.navigate('TrainerSessionCancel', {
                    isSession: isSession,
                    sessionData: data,
                  });
                }}
                style={{ marginTop: Metrics.baseMargin }}
                titleStyle={Styles.ButText}
                title={isSession ? 'Cancel Session' : 'Cancel Class'}
              />
            ) : (
              <>
                {!isTrainee &&
                  data.rating === 0 &&
                  data.status === BOOKING_STATUS.END && (
                    <Button
                      onPress={() => {
                        NavigationService.navigate('TrainerSessionRating', {
                          isSession: isSession,
                          sessionData: data,
                        });
                      }}
                      style={{ marginTop: Metrics.baseMargin }}
                      titleStyle={Styles.ButText}
                      title={isSession ? 'Rate Session' : 'Rate Class'}
                    />
                  )}
              </>
            ))}
        </View>
      </View>
    );
  };
  return (
    <Container
      contentStyle={{ paddingHorizontal: Metrics.smallMargin }}
      headerTitle={isSession ? 'Session Details' : 'Class Details'}
      notificationCount="9"
      style={Styles.container}>
      <ScrollViewApi
        // style={Styles.container}
        actionType="BOOKING_DETAILS"
        requestAction={bookingDetails.request}
        identifier={bookingId}
        selectorData={getbookingIdentifierBookingData}
        payload={{ id: bookingId }}
        content={renderContent}
        showsVerticalScrollIndicator={false}
      />
      <Loader
        type={[
          'START_BOOK_CLASS',
          'END_BOOK_CLASS',
          'START_BOOK_SESSION',
          'END_BOOK_SESSION',
        ]}
      />
    </Container>
  );
};

export default TrainerSessionDetail;
