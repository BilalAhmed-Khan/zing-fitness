import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Button,
  TextInputNative,
  Loader,
  DatePicker,
  ButtonView,
  ImageView,
  Text,
} from '../../components';
import { createBankAccount } from '../../ducks/auth';

import { Styles } from './styles';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { ImagePicker, NavigationService } from '../../utils';
import { Controller } from 'react-hook-form';
import { DropDown } from '../../modal';
import { getStates, getStatesData } from '../../ducks/general';
const BankDetails = ({ route }) => {
  const bankData = route?.params?.bankData ?? {};
  const statesData = useSelector(getStatesData);
  const dropDownModalRef = useRef();
  const [selectedStates, setSelectedStates] = useState(
    bankData?.state ? bankData.state : '',
  );
  const dispatch = useDispatch();
  const [
    formObj,
    bankNameProps,
    accountHolderNameProps,
    accountNumberProps,
    routingNumberProps,
    idNumberProps,
    cityProps,
    addressProps,
    postalCodeProps,
    stateProps,
    dobProps,
    frontOfIdProps,
    backOfIdProps,
  ] = useHookForm(
    [
      'bankName',
      'accountHolderName',
      'accountNumber',
      'routingNumber',
      'idNumber',
      'city',
      'address',
      'postalCode',
      'stateName',
      'dob',
      'frontOfId',
      'backOfId',
    ],
    {
      bankName: bankData?.bankName ?? '',
      accountHolderName: bankData?.accountHolderName ?? '',
      accountNumber: bankData?.accountNumber ?? '',
      routingNumber: bankData?.routingNumber ?? '',
      idNumber: bankData?.idNumber ?? '',
      city: bankData?.city ?? '',
      address: bankData?.address ?? '',
      postalCode: bankData?.postalCode ?? '',
      stateName: bankData?.stateName ?? '',
      dob: bankData?.dob ?? '',
      frontOfId: bankData?.frontOfId ?? '',
      backOfId: bankData?.backOfId ?? '',
    },
    ValidationSchema.bankDetails,
  );

  const onSubmit = formObj.handleSubmit(values => {
    console.log(values);
    if (selectedStates) {
      console.log(selectedStates);
      values.state = selectedStates;
    }
    dispatch(
      createBankAccount.request({
        payloadApi: values,
        cb: data => {
          NavigationService.goBack();
        },
      }),
    );
  });

  const AddNIC = ({ value, onChange }) => (
    <ButtonView
      style={Styles.addCertificateContainer}
      onPress={() => {
        ImagePicker.showGalleryAndCameraOptions(val => {
          console.log(val);
          onChange(val.uri);
        });
      }}>
      <ImageView
        source={{ uri: value }}
        style={Styles.imageStyle}
        placeholderStyle={Styles.imageStyle}
        borderRadius={14}
      />
      {/* <Text style={Styles.addCertificateTitle}>Add Certificate Image</Text> */}
    </ButtonView>
  );

  const onPressStates = onChange => {
    if (!statesData?.length > 0) {
      dispatch(
        getStates.request({
          payloadApi: {},
          cb: data => {
            setTimeout(() => {
              dropDownModalRef.current.show({
                data,
                onPress: item => {
                  console.log(item);
                  onChange(item?.name);
                  setSelectedStates(item?.state_code);
                },
              });
            }, 300);
          },
        }),
      );
    } else {
      dropDownModalRef.current.show({
        data: statesData,
        onPress: item => {
          console.log(item);
          onChange(item?.name);
          setSelectedStates(item?.state_code);
        },
      });
    }
  };

  return (
    <Container headerTitle="Bank Details" notificationCount="2" chat>
      <ScrollView
        style={{ flex: 1, marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}>
        <TextInputNative placeholder="Bank Name" {...bankNameProps} />
        <TextInputNative
          placeholder="Account Holder Name"
          {...accountHolderNameProps}
        />
        <TextInputNative
          placeholder="Account Number"
          keyboardType="numeric"
          {...accountNumberProps}
        />
        <TextInputNative
          placeholder="Routing Number"
          keyboardType="numeric"
          {...routingNumberProps}
        />
        <TextInputNative placeholder="SSN or EIN" {...idNumberProps} />
        <TextInputNative placeholder="City" {...cityProps} />
        <TextInputNative placeholder="Address" {...addressProps} />
        <TextInputNative
          placeholder="State"
          {...stateProps}
          onPress={onPressStates}
        />
        <TextInputNative
          placeholder="Postal Code"
          keyboardType="numeric"
          {...postalCodeProps}
        />

        <Controller
          {...dobProps}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              placeholder="Date Of Birth"
              onChange={onChange}
              value={value}
              error={dobProps.error}
            />
          )}
          defaultValue={''}
        />
        <Text style={Styles.title}>{'Add Front ID Picture'}</Text>
        <Controller
          {...frontOfIdProps}
          render={({ field: { onChange, value } }) => (
            <AddNIC onChange={onChange} value={value} />
          )}
          defaultValue={''}
        />
        <Text style={Styles.title}>{'Add Back ID Picture'}</Text>
        <Controller
          {...backOfIdProps}
          render={({ field: { onChange, value } }) => (
            <AddNIC onChange={onChange} value={value} />
          )}
          defaultValue={''}
        />
      </ScrollView>
      <Button title="Save" largeButton onPress={onSubmit} />
      <DropDown ref={dropDownModalRef} />
      <Loader type={['CREATE_BANK_ACCOUNT', 'GET_STATES']} />
    </Container>
  );
};

export default BankDetails;
