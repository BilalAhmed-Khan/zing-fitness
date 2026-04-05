import React from 'react';
import {
  View,
  Pressable,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonView, Container, Loader, Text } from '../../components';
import {
  authEditProfile,
  authGetProfile,
  authUserLogout,
  deleteAccount,
  getBankAccount,
  getUserData,
} from '../../ducks/auth';
import { getHelp } from '../../ducks/general';
import { Colors, Images } from '../../theme';
import { NavigationService } from '../../utils';
import Styles from './Styles';
const TrainerProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const _onPressEditProfile = () => {
    // dispatch(
    //   authGetProfile.request({
    //     payloadApi: {
    //       id: userData.id,
    //     },
    //     cb: () => {
    NavigationService.navigate('TrainerEditProfile');
    //     },
    //   }),
    // );
  };
  const _onPressResetPassword = () => {
    NavigationService.navigate('TrainerResetPassword');
  };
  const _onPressCertificates = () => {
    NavigationService.navigate('TrainerEditCertificates', { isSetting: true });
  };
  const _onPressCategories = () => {
    NavigationService.navigate('TrainerCategories', { isSetting: true });
  };
  const _onPressBreaks = () => {
    NavigationService.navigate('TrainerConfigureBreaks', { isSetting: true });
  };
  const _onPressSessionType = () => {
    NavigationService.navigate('TrainerEditSessionType');
  };
  const _onPressLocationSettings = () => {
    NavigationService.navigate('TrainerServiceAreas', { isEdit: true });
  };
  const _onPressLogout = () => {
    dispatch(
      authUserLogout.request({
        payloadApi: {},
        cb: data => {
          NavigationService.reset('UserRoleSelection');
        },
      }),
    );
  };

  const _onPressDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account.',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              deleteAccount.request({
                payloadApi: {},
                cb: data => {
                  NavigationService.reset('UserRoleSelection');
                },
              }),
            );
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const _onPressTermsAndPolices = () => {
    NavigationService.navigate('TermsAndPolices');
  };
  const _onPressBank = () => {
    dispatch(
      getBankAccount.request({
        payloadApi: {},
        cb: data => {
          NavigationService.navigate('BankDetails', { bankData: data });
        },
      }),
    );
  };
  const _onPressNotificationSettings = () => {
    NavigationService.navigate('NotificationSetting');
  };
  const _onPressUserHelp = () => {
    dispatch(
      getHelp.request({
        payloadApi: {},
        cb: data => {
          NavigationService.navigate('UserHelp', { data });
        },
      }),
    );
  };
  return (
    <Container
      contentStyle={{
        paddingBottom: Platform.select({
          android: 90,
          ios: 80,
        }),
      }}
      headerTitle="Settings"
      notificationCount="9"
      showBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={Styles.profileText}>PROFILE</Text>
        <ButtonView style={Styles.mainView} onPress={_onPressEditProfile}>
          <Image source={Images.editprofileicon} />
          <Text style={Styles.mainText}>Edit Profile</Text>
        </ButtonView>
        <ButtonView style={Styles.mainView} onPress={_onPressResetPassword}>
          <Image source={Images.resetpassword} />
          <Text style={Styles.mainText}>Reset Password</Text>
        </ButtonView>
        <ButtonView style={Styles.mainView} onPress={_onPressCertificates}>
          <Image source={Images.certificationicon} />
          <Text style={Styles.mainText}>Certifications</Text>
        </ButtonView>
        <ButtonView style={Styles.mainView} onPress={_onPressCategories}>
          <Image source={Images.edittrainingcategory} />
          <Text style={Styles.mainText}>Edit Training Categories</Text>
        </ButtonView>
        <ButtonView style={Styles.mainView} onPress={_onPressSessionType}>
          <Image source={Images.editrates} />
          <Text style={Styles.mainText}>Edit Session Rates & Type</Text>
        </ButtonView>
        <ButtonView style={Styles.mainView} onPress={_onPressBreaks}>
          <Image source={Images.cofigureBreaks} style={Styles.imageStyle} />
          <Text style={Styles.mainText}>Configure Breaks</Text>
        </ButtonView>
        <ButtonView style={Styles.mainView} onPress={_onPressLocationSettings}>
          <Image source={Images.locationSetting} />
          <Text style={Styles.mainText}>Location Settings</Text>
        </ButtonView>
        {/* <ButtonView style={Styles.mainView} onPress={_onPressScheduleSettings}>
          <Image source={Images.shedulesetting} />
          <Text style={Styles.mainText}>Schedule Settings</Text>
        </ButtonView> */}
        <ButtonView style={Styles.mainView} onPress={_onPressBank}>
          <Image source={Images.bankdetail} />
          <Text style={Styles.mainText}>Bank Details</Text>
        </ButtonView>
        <ButtonView
          style={Styles.mainView}
          onPress={_onPressNotificationSettings}>
          <Image source={Images.notificationsetting} />
          <Text style={Styles.mainText}>Notifications Settings</Text>
        </ButtonView>
        <View>
          <Text style={Styles.profileText}>SUPPORT</Text>
          <ButtonView style={Styles.mainView} onPress={_onPressTermsAndPolices}>
            <Image source={Images.termpolicies} />
            <Text style={Styles.mainText}>Terms & Policies</Text>
          </ButtonView>
          <ButtonView style={Styles.mainView} onPress={_onPressUserHelp}>
            <Image source={Images.HelpIcon} />
            <Text style={Styles.mainText}>Help</Text>
          </ButtonView>
          <ButtonView
            style={[Styles.mainView, { borderBottomWidth: 0 }]}
            onPress={_onPressDelete}>
            <Image
              source={Images.trash}
              style={{ tintColor: Colors.primary }}
            />
            <Text style={Styles.mainText}>Delete Account</Text>
          </ButtonView>
          <ButtonView
            style={[Styles.mainView, { borderBottomWidth: 0 }]}
            onPress={_onPressLogout}>
            <Image source={Images.logout} />
            <Text style={Styles.mainText}>Log Out</Text>
          </ButtonView>
        </View>
      </ScrollView>
      <Loader
        type={[
          'GET_BANK_ACCOUNT',
          'AUTH_LOGOUT',
          'GET_HELP',
          deleteAccount.type,
        ]}
      />
    </Container>
  );
};

export default TrainerProfile;
