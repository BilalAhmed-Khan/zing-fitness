import React, { useState } from 'react';
import { Alert, FlatList, Image, ScrollView, View } from 'react-native';

import {
  Container,
  Text,
  SessionType,
  Button,
  ButtonView,
  AvailableDayAndTime,
  Dropdown,
  Map,
  ScrollViewApi,
  ImageView,
} from '../../components';
import { TextInput } from 'react-native';
import { SESSION_TYPE } from '../../config/Constants';
import { NavigationService } from '../../utils';
import { Colors, Images } from '../../theme';

import { Styles } from './styles';
import { TIME_ZONES } from '../../config/TimeZones';
import {
  getSessionIdentifierData,
  getTrainerSession,
} from '../../ducks/trainer';
import { useSelector } from 'react-redux';
import { ClassUtill, SessionUtill, UserUtill } from '../../dataUtils';
import dayjs from 'dayjs';
import {
  useApplePay,
  useGooglePay,
  useStripe,
} from '@stripe/stripe-react-native';
import { getUserData } from '../../ducks/auth';
import {
  applePayRequestConfig,
  googlePayRequestConfig,
} from '../../config/PaymentConfig';

const UserSessionDetail = ({ route }) => {
  const isSession = route.params?.isSession ?? false;
  const id = route.params?.id ?? '';
  const data = route.params?.data ?? {};
  const trainerData = route.params?.trainerData ?? {};
  // const data =  isSession ? useSelector(getSessionIdentifierData(id)) : useSelector(getSessionIdentifierData(id))
  const userData = useSelector(getUserData);
  console.log('userData ==>', userData);
  const _onPress = () => {
    NavigationService.navigate('UserTrainerSchedule', {
      isSession: isSession,
      id,
      data,
      trainerData,
    });
  };
  // const sessionData = useSelector(getSessionIdentifierData(id));
  console.log('sessionData ===>', data);

  const Memnber = () => (
    <>
      <View style={Styles.fullMain}>
        {/* <View style={{ flex: 0.49 }}>
          <Text style={Styles.timeFull}>{'MEMBERS REGISTERED'}</Text>
          <View style={Styles.box}>
            <Text style={Styles.timeFull}>{'$ 200'}</Text>
          </View>
        </View> */}

        <View style={{ flex: 1 }}>
          <Text style={Styles.timeFull}>{'MAX MEMBERS'}</Text>
          <View style={Styles.box}>
            <Text style={Styles.timeFull}>
              {ClassUtill.maxParticipants(data)}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
  const SessionDuration = () => (
    <>
      <View style={Styles.fullMain}>
        <View style={{ flex: 0.49 }}>
          <Text style={Styles.sessionTimeTitle}>{'CLASS RATE'}</Text>
          <View style={Styles.box}>
            <Text style={Styles.rate}>{ClassUtill.price(data)}</Text>
          </View>
        </View>

        <View style={{ flex: 0.49 }}>
          <Text style={Styles.sessionTimeTitle}>{'CLASS DURATION'}</Text>
          <View style={Styles.box}>
            <Text style={Styles.rate}>{`${ClassUtill.duration(
              data,
            )} min`}</Text>
          </View>
        </View>
      </View>
    </>
  );

  const renderContent = data => {
    console.log('DATA ===>', data);
    return (
      <>
        {!isSession && (
          <>
            <Text style={Styles.sessionTimeTitle}>{'CLASS TITLE'}</Text>
            <View style={Styles.fullBox}>
              <Text style={Styles.timeFull}>{data?.title ?? ''}</Text>
            </View>
          </>
        )}
        <Text style={Styles.sessionTimeTitle}>
          {isSession ? 'SESSION DESCRIPTION' : 'DESCRIPTION'}
        </Text>
        {/* <TextInput
          multiline
          style={Styles.textInput}
          editable={true}
          placeholder="Write Here..."
          value="Pellentesque malesuada gravida mauris quis dapibus. Donec vestibulum, nulla ut semper convallis, ex tortor ullamcorper nulla, sit amet pretium odio metus ac enim. Duis congue, lorem sed fermentum euismod, dui ligula iaculis ex, id males uada est augue at ipsum."
          placeholderTextColor={Colors.placeholderText}
        /> */}
        <View style={Styles.descriptionView}>
          <ScrollView>
            <Text style={Styles.textStyle}>
              {SessionUtill.description(data)}
            </Text>
          </ScrollView>
        </View>
        <AvailableDayAndTime
          selectedDays={SessionUtill.availableDateTime(data)}
          showOnly={true}
          isDummy={false}
        />
        <View style={Styles.selectTime}>
          <View>
            <Text style={Styles.sessionTimeTitle}>{'START TIME'}</Text>
            <View style={Styles.selectTimeData}>
              <Image source={Images.clock} style={Styles.clock} />
              <Text style={Styles.text}>
                {dayjs(SessionUtill.startTimeFull(data))
                  .tz(SessionUtill.timeZone(data))
                  .format('hh:mm A')}
              </Text>
            </View>
          </View>
          <View>
            <Text style={Styles.sessionTimeTitle}>{'END TIME'}</Text>
            <View style={Styles.selectTimeData}>
              <Image source={Images.clock} style={Styles.clock} />
              <Text style={Styles.text}>
                {dayjs(SessionUtill.endTimeFull(data))
                  .tz(SessionUtill.timeZone(data))
                  .format('hh:mm A')}
              </Text>
            </View>
          </View>
        </View>
        {!isSession && (
          <>
            <SessionDuration />
            <Memnber />
          </>
        )}

        {/* {isSession && <SessionType showOnly={true} />} */}
        {!isSession && (
          <>
            <Text style={Styles.sessionTimeTitle}>{'LOCATION'}</Text>
            <View style={Styles.fullBox}>
              <Text style={Styles.timeFull}>{SessionUtill.address(data)}</Text>
              <View>
                <Image source={Images.locationIcon} />
              </View>
            </View>
            <View style={Styles.mapStyle} pointerEvents={'none'}>
              <Map
                latitude={data?.location?.cordinates?.[1] ?? -1}
                longitude={data?.location?.cordinates?.[0] ?? -1}
              />
            </View>
          </>
        )}
        {SessionUtill.images(data).length > 0 && (
          <View>
            <Text style={Styles.sessionTimeTitle}>
              {isSession ? 'SESSION PORTFOLIO' : 'CLASS PORTFOLIO'}
            </Text>
            <FlatList
              data={SessionUtill.images(data)}
              style={{ flex: 1 }}
              numColumns={2}
              renderItem={({ item }) => {
                console.log('item ==>', item);
                return (
                  <View style={Styles.uploadImageMainView}>
                    <ImageView
                      source={{ uri: item }}
                      style={Styles.imageStyle}
                      placeholderStyle={Styles.imageStyle}
                      borderRadius={12}
                    />
                  </View>
                );
              }}
            />
          </View>
        )}

        <Button
          title={isSession ? 'BOOK A SESSION' : 'BOOK A CLASS'}
          largeButton
          style={Styles.button}
          onPress={_onPress}
        />
      </>
    );
  };

  return (
    <Container headerTitle={isSession ? 'SESSION DETAILS' : 'CLASS DETAILS'}>
      {/* <ScrollViewApi
        // style={Styles.container}
        actionType="GET_TRAINER_SESSION"
        requestAction={getTrainerSession.request}
        identifier={id}
        selectorData={getSessionIdentifierData}
        payload={{ id: id }}
        content={renderContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent(data)}
      </ScrollView>
    </Container>
  );
};

export default UserSessionDetail;
