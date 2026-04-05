import React, { useCallback, useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import {
  Container,
  Text,
  AppHeader,
  Button,
  UserCalendarListitem,
  FlatListApi,
  Loader,
} from '../../components';
import Styles from './Styles';
import { Colors, Fonts } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRole } from '../../ducks/general';
import TopTabs from '../../components/TopTabs';
import {
  bookingTabs,
  BOOKING_SESSION_TYPE,
  BOOKING_STATUS,
} from '../../config/Constants';
import {
  bookingHistory,
  bookingListing,
  endBooking,
  endClass,
  getbookingIdentifierData,
  startBooking,
  startClass,
} from '../../ducks/booking';
const TrainerCalendar = () => {
  const isTrainee = useSelector(getUserRole);
  const dispatch = useDispatch();

  const [isBookingHistory, setBookingHistory] = useState(false);

  const BookingHistory = () => {
    return (
      <FlatListApi
        style={{
          paddingTop: 10,
          backgroundColor: Colors.secondary,
        }}
        contentContainerStyle={{
          paddingBottom: Platform.select({ ios: 70, android: 90 }),
        }}
        showsVerticalScrollIndicator={false}
        actionType="BOOKING_HISTORY"
        selectorData={getbookingIdentifierData}
        requestAction={bookingHistory.request}
        renderItem={({ item }) => (
          <UserCalendarListitem
            star={true}
            // for BOoking history screen
            props={item}
            isBooking={true}
            isTrainee={isTrainee}
            onPress={item => {
              NavigationService.navigate('TrainerSessionDetail', {
                isSession: item?.bookingType !== BOOKING_SESSION_TYPE.CLASS,
                id: item?.id ?? '',
              });
            }}
            // isSimpleView
          />
        )}
        keyExtractor={item => `${item.id}`}
        identifier={'BOOKING_HISTORY_DATA'}
      />
    );
  };

  const onPressSession = item => {
    const payloadApi = {
      id: item?.id,
    };
    let isSession = item?.bookingType !== BOOKING_SESSION_TYPE.CLASS;
    let isCheckStatus =
      item.status === BOOKING_STATUS.PENDING ||
      item.status === BOOKING_STATUS.TRAINER_ACCEPTED;
    if (isCheckStatus && item.canCancel) {
      NavigationService.navigate('TrainerSessionCancel', {
        isSession: isSession,
        sessionData: item,
      });
    } else {
      Util.showMessage('Your booking is started so you can not cancel it');
    }
  };
  const BookingView = () => {
    return (
      <FlatListApi
        style={{
          paddingTop: 10,
          backgroundColor: Colors.secondary,
        }}
        contentContainerStyle={{
          paddingBottom: Platform.select({ ios: 70, android: 90 }),
        }}
        showsVerticalScrollIndicator={false}
        actionType="BOOKING_LISTING"
        selectorData={getbookingIdentifierData}
        requestAction={bookingListing.request}
        renderItem={({ item }) => (
          <UserCalendarListitem
            // for BOoking history screen
            props={item}
            isTrainee={isTrainee}
            onPress={item => {
              NavigationService.navigate('TrainerSessionDetail', {
                isSession: item?.bookingType !== BOOKING_SESSION_TYPE.CLASS,
                id: item?.id ?? '',
              });
            }}
            onButtonPress={item => onPressSession(item)}
            // isSimpleView
          />
        )}
        keyExtractor={item => `${item.id}`}
        identifier={'BOOKING'}
      />
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'booking':
        return <BookingView />;
      case 'bookingHistory':
        return <BookingHistory />;
      default:
        return null;
    }
  };
  return (
    <Container style={Styles.container} showBar={isTrainee}>
      <AppHeader notificationCount="9" chat={false} />

      {/* {!isBookingHistory && isTrainee && (
        <View style={Styles.dayView}>
          <Text
            style={[
              Styles.dayText,
              { color: Colors.primary, fontFamily: Fonts.semiBold },
            ]}>
            MON
          </Text>
          <Text style={Styles.dayText}>TUES</Text>
          <Text style={Styles.dayText}>WED</Text>
          <Text style={Styles.dayText}>THURS</Text>
          <Text style={Styles.dayText}>FRI</Text>
          <Text style={Styles.dayText}>SAT</Text>
          <Text style={[Styles.dayText, { borderRightWidth: 0 }]}>SUN</Text>
        </View>
      )} */}
      <TopTabs
        tabData={bookingTabs}
        // renderViews={{
        //   booking: () => renderBooking(),
        //   bookingHistory: () => renderBookingHistory(),
        // }}
        renderScene={renderScene}
        tabIndicatorColor={Colors.primary}
      />
      <Loader type={['START_BOOK_SESSION']} />
    </Container>
  );
};

export default TrainerCalendar;
