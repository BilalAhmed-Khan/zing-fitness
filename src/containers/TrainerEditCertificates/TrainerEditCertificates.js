import React from 'react';
import { View, Pressable, Image, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import {
  Container,
  Text,
  TextInput,
  DatePicker,
  Button,
  ButtonView,
  ImageView,
  FlatListApi,
  Loader,
  EmptyView,
} from '../../components';
import {
  deleteTrainerCertificate,
  getIdentifierAuthData,
  getIdentifierData,
  getIdentifierTrainer,
  getTrainerCertificate,
} from '../../ducks/auth';
import { Images, Metrics } from '../../theme';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const TrainerEditCertificates = ({ route }) => {
  const isFirstTime = route.params?.isFirstTime ?? false;
  const isEdit = route.params?.isEdit ?? true;
  const isSetting = route.params?.isSetting ?? false;
  const dispatch = useDispatch();
  const onPressCertification = () => {
    NavigationService.goBack();
  };
  const AddCertificates = () => (
    <Pressable style={Styles.addCertificateContainer}>
      <Image source={Images.photo} />
      <Text style={Styles.addCertificateTitle}>Add Certificate Image</Text>
    </Pressable>
  );

  const onButtonPress = item => {
    NavigationService.navigate('TrainerCertificates', {
      onPressCertification,
      item: item,
      isEdit: true,
    });
  };

  const renderItem = ({ item, index }) => {
    console.log('item ==>', item);
    return (
      <ButtonView style={Styles.imageCard} onPress={() => onButtonPress(item)}>
        <ImageView
          source={{ uri: item.certificateFileUrl }}
          placeholderStyle={Styles.imageStyle}
          style={Styles.imageStyle}
          borderRadius={10}
        />
        <ButtonView
          style={Styles.crossButtonStyle}
          onPress={() => {
            dispatch(
              deleteTrainerCertificate.request({
                payloadApi: { id: item?.id },
                cb: () => {},
              }),
            );
          }}>
          <Image source={Images.remove} style={Styles.crossStyle} />
        </ButtonView>
      </ButtonView>
    );
  };
  const renderListHeader = () => (
    <View style={Styles.titleView}>
      <Text style={Styles.uploadTitle}>Upload Certificates</Text>
      <ButtonView
        onPress={() =>
          NavigationService.navigate('TrainerCertificates', {
            onPressCertification,
            isSetting,
          })
        }
        style={Styles.addimageStyle}>
        <Image source={Images.addButton} />
      </ButtonView>
    </View>
  );

  const Certificates = () => (
    <>
      {renderListHeader()}
      <FlatListApi
        showsVerticalScrollIndicator={false}
        actionType="GET_TRAINER_CERTIFICATE"
        selectorData={getIdentifierTrainer}
        requestAction={getTrainerCertificate.request}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        identifier={'TRAINER_CERTIFICATE'}
        ListEmptyComponent={
          <EmptyView
            text={
              'No Certificates, Add certificates to see your certificates here'
            }
          />
        }
        numColumns={2}
      />
      {isEdit && (
        <Button
          title={isSetting ? 'DONE' : 'Save & Continue'}
          largeButton
          onPress={() => {
            isSetting
              ? NavigationService.goBack()
              : NavigationService.navigate('TrainerCategories');
          }}
          //  style={Styles.button}
        />
      )}
    </>
  );
  return (
    <Container
      headerTitle={isFirstTime ? 'Trainer Registration' : 'Certifications'}>
      <Certificates />

      <Loader type={'DELETE_TRAINER_CERTIFICATE'} />
    </Container>
  );
};

export default TrainerEditCertificates;
