/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import {
  AppHeader,
  Container,
  Map,
  Text,
  Button,
  ImageView,
  Loader,
} from '../../components';
import Lottie from 'lottie-react-native';
import { Colors, Images, Metrics } from '../../theme';
import { NavigationService } from '../../utils';
import { Styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { UserUtill } from '../../dataUtils';
import {
  getbookingIdentifierBookingData,
  gettrainerFlag,
  trainerAccept,
} from '../../ducks/booking';
import CountDown from 'react-native-countdown-component';

/** Finding-trainer flow (trainee). Match UI is inline here; trainers see TraineeAlertModal from FCM instead. */
const SearchTrainer = ({ route }) => {
  const animationProgress = useRef(new Animated.Value(0));
  const [isLoading, setisLoading] = useState(true);
  const payloadData = route.params?.payloadData ?? false;
  const trainerFlag = useSelector(gettrainerFlag);
  const bookingData = useSelector(getbookingIdentifierBookingData(trainerFlag));
  const dispatch = useDispatch();

  useEffect(() => {
    if (trainerFlag !== '') {
      animationProgress.current.stopAnimation();
      return;
    }
    if (isLoading) {
      const anim = Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false,
      });
      anim.start(({ finished }) => {
        if (finished) {
          setisLoading(false);
          animationProgress.current.setValue(0);
        }
      });
      return () => anim.stop();
    }
    setisLoading(true);
  }, [isLoading, trainerFlag]);

  useEffect(() => {
    return () => {
      dispatch(trainerAccept({ id: '' }));
    };
  }, [dispatch]);

  const SearchBox = () => (
    <View style={{ position: 'absolute', top: 20 }}>
      <View style={[Styles.fullBox, { alignSelf: 'center' }]}>
        <Text style={Styles.timeFull}>{UserUtill.address(payloadData)}</Text>
        <View>
          <Image source={Images.locationPin} />
        </View>
      </View>
    </View>
  );

  const mapContent = () => (
    <View style={Styles.mapContent}>
      <View style={Styles.findingRadarFrame}>
        <Lottie
          style={Styles.findingRadarLottie}
          source={Images.locationLottie}
          progress={animationProgress.current}
          loop
        />
        <Image
          source={Images.locationSetting}
          style={Styles.findingPinOnRadar}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );

  const trainerView = () => (
    <View
      style={{
        height: 350,
        width: Metrics.width - 30,
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.secondary,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: Colors.greyborder,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: 'center',
      }}>
      <View style={{ alignItems: 'center' }}>
        <CountDown
          until={120}
          onFinish={() => {
            NavigationService.reset('UserApp');
          }}
          digitStyle={Styles.countdigitStyle}
          digitTxtStyle={Styles.countdigitTxtStyle}
          timeToShow={['M', 'S']}
          timeLabels={{ h: null, m: null, s: null }}
          showSeparator
          separatorStyle={{ color: Colors.white }}
        />
        <Text style={Styles.loactionHeading}>{'Time Left to Pay Trainer'}</Text>
      </View>
      <Line />
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ImageView
            source={{ uri: UserUtill.image(bookingData?.trainer) }}
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
              marginLeft: 10,
            }}>
            <View style={{}}>
              <Text style={Styles.trainerName}>
                {UserUtill.name(bookingData?.trainer)}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={Styles.tagView}>
                  <Text style={Styles.tagViewText}>{'SESSION'}</Text>
                </View>
                <Text style={Styles.typeStyle}>
                  {bookingData?.category?.title ?? ''}
                </Text>
              </View>

              <Text style={Styles.loactionHeading}>
                {'Estimated Reach Time: 30 Mins'}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={Styles.priceText}>{`$${
                bookingData?.amount ?? 0
              }`}</Text>
              <Text style={Styles.trainerminiName}>{`/${
                bookingData?.duration ?? 30
              }min`}</Text>
            </View>
          </View>
        </View>
        <Line />
        <Text style={Styles.descText}>
          You will need to pay the booking amount in 60 seconds or else the
          booking will be cancelled automatically.
        </Text>
        <Button
          title="PAY NOW"
          disabled={!bookingData?.id}
          onPress={() => {
            NavigationService.replace('UserTrainerSchedule', {
              isSession: true,
              id: bookingData?.id,
              data: bookingData,
              trainerData: bookingData?.trainer,
              isRealTime: true,
            });
          }}
        />
      </View>
    </View>
  );

  return (
    <Container>
      <AppHeader
        hideLogo
        style={Styles.header}
        notificationCount="2"
        title="Finding Trainer"
        showBack
      />
      <View style={Styles.content}>
        <Map
          latitude={UserUtill.lat(payloadData)}
          longitude={UserUtill.long(payloadData)}
        />
        <SearchBox />
        {trainerFlag === '' ? (
          <>
            {mapContent()}
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 100,
                alignItems: 'center',
                paddingHorizontal: 24,
              }}>
              <Text style={Styles.waitingSubtitle}>
                Notifying nearby trainers. Please wait.
              </Text>
            </View>
          </>
        ) : null}
        {trainerFlag !== '' ? trainerView() : null}
      </View>
      <Loader type={['CREATE_BOOKING_INTENT']} />
    </Container>
  );
};

export default SearchTrainer;
