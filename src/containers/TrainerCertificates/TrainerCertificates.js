import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Pressable, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import {
  Container,
  Text,
  TextInput,
  DatePicker,
  Button,
  TextInputNative,
  ButtonView,
  ImageView,
  Loader,
} from '../../components';
import { addTrainerCertificate, updateCertificate } from '../../ducks/auth';
import { Images } from '../../theme';
import { ImagePicker, NavigationService } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

import { Styles } from './Styles';

const TrainerCertificates = ({ route }) => {
  const onPressCertification = route.params?.onPressCertification ?? undefined;
  const item = route.params?.item ?? undefined;
  const isEdit = route.params?.isEdit ?? false;
  const dispatch = useDispatch();
  const _onPressContinue = () => {
    onPressCertification
      ? onPressCertification?.()
      : NavigationService.navigate('TrainerCategories');
  };

  // init form inputs
  const [
    formObj,
    titleProps,
    organizationProps,
    dateProps,
    certificateFileUrlProp,
  ] = useHookForm(
    ['title', 'organization', 'date', 'certificateFileUrl'],
    isEdit
      ? {
          title: item?.title ?? '',
          organization: item?.organization ?? '',
          date: item?.date ?? '',
          certificateFileUrl: item?.certificateFileUrl ?? '',
        }
      : {},
    ValidationSchema.trainerCertificateForm,
  );

  const onSubmit = formObj.handleSubmit(values => {
    console.log(values);
    if (isEdit) {
      dispatch(
        updateCertificate.request({
          payloadApi: values,
          cb: data => {
            NavigationService.goBack();
          },
          id: item?.id,
        }),
      );
    } else {
      dispatch(
        addTrainerCertificate.request({
          payloadApi: values,
          cb: data => {
            console.log('DATA ==>', data);
            onPressCertification
              ? onPressCertification?.()
              : NavigationService.navigate('TrainerCategories');
          },
        }),
      );
    }
  });

  const AddCertificates = ({ value, onChange }) => (
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

  return (
    <>
      <Container headerTitle="Trainer Registration">
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <Text style={Styles.uploadTitle}>Upload Certificates</Text>
          <Controller
            {...certificateFileUrlProp}
            render={({ field: { onChange, value } }) => (
              <AddCertificates onChange={onChange} value={value} />
            )}
            defaultValue={''}
          />
          <TextInputNative placeholder="Certificate Title*" {...titleProps} />
          <TextInputNative
            placeholder="Issuing Organization*"
            {...organizationProps}
          />

          <Controller
            {...dateProps}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                placeholder="Issuing Date*"
                onChange={onChange}
                value={value}
                error={dateProps.error}
              />
            )}
            defaultValue={''}
          />
          <Button
            title={onPressCertification ? 'Submit' : 'Save & Continue'}
            largeButton
            style={Styles.button}
            onPress={onSubmit}
          />
        </ScrollView>
      </Container>
      <Loader
        type={['ADD_TRAINER_CERTIFICATE', 'UPDATE_TRAINER_CERTIFICATE']}
      />
    </>
  );
};

export default TrainerCertificates;
