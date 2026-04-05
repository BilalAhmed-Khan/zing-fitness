import React, { useRef, useState } from 'react';
import { View, Image, Pressable, FlatList } from 'react-native';
import {
  Container,
  Text,
  AppHeader,
  Button,
  ImageView,
  ScrollViewApi,
  RadioButton,
  Loader,
  ButtonView,
} from '../../components';
import Styles from './Styles';
import { Images, Metrics } from '../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { authEditProfile, getUserData } from '../../ducks/auth';
import { UserUtill } from '../../dataUtils';
import {
  getDashboard,
  getDashboardData,
  getDashboardTrainerData,
  getTrainerDashboard,
} from '../../ducks/dashboard';
import { STATUS } from '../../config/Constants';
import { withdraw } from '../../ducks/dashboard';
import { NavigationService, Util } from '../../utils';
import { TransactionModal } from '../../modal';
const TrainerDashboard = () => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(UserUtill.isOnline(userData));
  const transactionModalRef = useRef();
  const ImageUsernameUserID = () => (
    <View style={Styles.childContainer}>
      <View style={Styles.ImageView}>
        {/* <ImageView
          source={{ uri: UserUtill.image(userData) }}
          style={Styles.imageStyle}
          borderRadius={8}
        /> */}
        {UserUtill.image(userData) === '' ? (
          <ImageView
            source={{ uri: '' }}
            style={Styles.imageStyle}
            placeholderStyle={Styles.imageStyle}
            borderRadius={8}
          />
        ) : (
          <Image
            source={{ uri: UserUtill.image(userData) }}
            style={Styles.imageStyle}
          />
        )}
      </View>
      <View style={Styles.nameUserID}>
        <View style={Styles.textView}>
          <View style={{ alignSelf: 'center', flex: 1 }}>
            <Text style={Styles.username}>{UserUtill.name(userData)}</Text>
            <Text style={Styles.userid}></Text>
            <RadioButton
              buttons={STATUS}
              style={Styles.radioStyle}
              buttonStyle={Styles.radioButoonStyle}
              buttonTextStyle={Styles.radioButoonTextStyle}
              isOnline={isOnline}
              onButtonPress={(flag, sucess) => {
                setIsOnline(!isOnline);
                dispatch(
                  authEditProfile.request({
                    payloadApi: {
                      isOnline: flag,
                    },
                    id: UserUtill.id(userData),
                    cb: sucess,
                    faliure: () => {
                      setIsOnline(!flag);
                    },
                  }),
                );
              }}
            />
          </View>
          <View>
            {UserUtill.isFeatured(userData) && (
              <Image source={Images.kingIcon} style={Styles.kingIcon} />
            )}
          </View>
        </View>
      </View>
    </View>
  );

  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );
  const Steps = ({ count, type }) => {
    return (
      <View>
        <View style={Styles.border}>
          <View style={Styles.innerView}>
            <Text style={Styles.count}>{count}</Text>
          </View>
        </View>
        <Text style={Styles.bottomText}>{type}</Text>
      </View>
    );
  };
  const Box = ({ text, price, onPressButton, isWidthdraw }) => {
    console.log(price);
    return (
      <View style={Styles.earningView}>
        <Text
          style={[
            Styles.earningText,
            { paddingVertical: Metrics.smallMargin },
          ]}>
          {text}
        </Text>
        <Text
          style={Styles.price}
          numberOfLines={1}>{`$${Util.toFixedIfNecessary(price, 2)}`}</Text>
        {Number(price) > 0 && isWidthdraw && (
          <Button
            onPress={onPressButton}
            title="WITHDRAW"
            style={Styles.boxButton}
          />
        )}
      </View>
    );
  };
  const Box2 = ({ text, price, data }) => {
    return (
      <View style={Styles.earningView}>
        <Text style={Styles.earningText}>{text}</Text>
        <Text style={Styles.price}>{price}</Text>
        <Text style={[Styles.earningText, { paddingTop: Metrics.smallMargin }]}>
          {`${data?.trainingsCompletedCount ?? 0} Trainings Completed`}
        </Text>
        <Text style={Styles.earningText}>
          {' '}
          {`${data?.classesCompletedCount ?? 0} Classes Completed`}
        </Text>
      </View>
    );
  };
  const ReceiptBoxView = ({ props, sameDate }) => {
    return (
      <View style={Styles.receiptInnerView}>
        {!sameDate && (
          <Text style={Styles.dateText}>
            {Util.formatDate(props.createdAt, 'DD MMMM YYYY')}
          </Text>
        )}
        <ButtonView
          style={Styles.receiptBox}
          onPress={() => {
            transactionModalRef.current.show({
              data: props,
              onPress: () => {
                // dispatch(deleteChat.request({ roomId: data.roomId }));
              },
            });
          }}
          // disabled={!props?.transactionDetails}
          disabledOpacity={1}>
          <View>
            <Text style={Styles.recText}>
              {props?.type === 'booking'
                ? 'Money Received'
                : props?.type === 'cancel'
                ? 'Booking Cancelled'
                : 'Money Withdraw'}
            </Text>
            <Text style={Styles.date}>
              {Util.formatDate(props.createdAt, 'HH:mm A')}
            </Text>
          </View>
          <View style={Styles.rightView}>
            <Text
              style={[
                Styles.priceText,
                {
                  color: props?.type === 'booking' ? '#19D545' : '#D51919',
                },
              ]}>
              {`${
                props?.type === 'booking' ? '+' : '-'
              }$${Util.toFixedIfNecessary(props?.amount, 2)}`}
            </Text>
            <View style={Styles.ViewView}>
              <Image source={Images.viewReceiptIcon} />
              <Text style={Styles.viewText}>View</Text>
            </View>
          </View>
        </ButtonView>
      </View>
    );
  };
  const data1 = [
    {
      type: 'Money Received',
      time: '11:10AM',
      cost: '$200.00',
    },
    {
      type: 'Money Withdraw',
      time: '12:00PM',
      cost: '$200.00',
    },
  ];

  const renderContent = data => {
    console.log('DATA ==>', data);
    return (
      <>
        <View style={Styles.stepView}>
          <Steps
            count={data?.newRequestBookingCount ?? '0'}
            type="NEW REQUEST"
          />
          <Steps count={data?.pendingBookingCount ?? '0'} type="PENDING" />
          <Steps count={data?.onGoingBookingCount ?? '0'} type="ON-GOING" />
          <Steps count={data?.completedBookingCount ?? '0'} type="COMPLETED" />
        </View>
        <Line />
        <View style={Styles.boxView}>
          <Box
            text="Your Wallet Amount"
            price={data?.trainerTotalAmount ?? 0}
            isWidthdraw
            onPressButton={() => {
              dispatch(
                withdraw.request({
                  payloadApi: {},
                  cb: () => {
                    Util.showMessage('Amount Withdraw Successfully', 'sucess');
                  },
                }),
              );
            }}
          />
          <Box
            text="This Month Earning"
            price={data?.thisMonthEarning}
            onPressButton={() => {}}
          />
        </View>
        <Box2
          text="Last Month Earning"
          price={`$${data?.lastMonthEarning}`}
          data={data}
        />

        {data?.transactions?.data?.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: Metrics.ratio(16),
              marginTop: Metrics.ratio(16),
            }}>
            <Text style={Styles.Heading}>Transaction History</Text>
            {data?.transactions?.data?.length >= 2 ? (
              <ButtonView
                onPress={() => {
                  NavigationService.navigate('TransactionListing');
                }}>
                <Text style={Styles.viewAllText}>{'View All'}</Text>
              </ButtonView>
            ) : (
              <></>
            )}
          </View>
        )}
        <FlatList
          contentContainerStyle={{ marginHorizontal: Metrics.ratio(16) }}
          showsVerticalScrollIndicator={false}
          data={data?.transactions?.data}
          renderItem={({ item }) => <ReceiptBoxView props={item} />}
        />
        {/* <View style={Styles.receiptView}>
          <Text style={Styles.transText}>Transaction History</Text>
          <ReceiptBoxView props={data1[0]} />
          <ReceiptBoxView props={data1[1]} />
          <ReceiptBoxView props={data1[1]} sameDate={true} />
          <ReceiptBoxView props={data1[1]} sameDate={true} />
        </View> */}
      </>
    );
  };
  return (
    <Container style={Styles.container} showBar>
      <AppHeader notificationCount="9" chat={false} />
      <View style={Styles.secMain}>
        <ImageUsernameUserID />
        <Line />
        {/* <View style={Styles.stepView}>
          <Steps count="0" type="NEW REQUEST" />
          <Steps count="0" type="PENDING" />
          <Steps count="0" type="ON-GOING" />
          <Steps count="0" type="COMPLETED" />
        </View> */}
        <ScrollViewApi
          // style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: Metrics.ratio(100) }}
          actionType="GET_TRAINER_DASHBOARD"
          requestAction={getTrainerDashboard.request}
          selectorData={getDashboardTrainerData}
          content={renderContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
      <Loader type={['WITHDRAW']} />
      <TransactionModal ref={transactionModalRef} />
    </Container>
  );
};

export default TrainerDashboard;
