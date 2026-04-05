import React, { useState } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';

import {
  Container,
  Text,
  SessionType,
  Button,
  ButtonView,
  SessionRateInput,
  Dropdown,
  TextInputNative,
  ImageView,
} from '../../components';
import { TextInput } from 'react-native';
import {
  SESSION_DURATION,
  SESSION_TYPE,
  UPLOAD_IMAGE_LIMIT,
} from '../../config/Constants';
import { ImagePicker, NavigationService } from '../../utils';
import { Colors, Images } from '../../theme';

import { Styles } from './Styles';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

const TrainerSessionType = () => {
  const [selectImages, setSelectImages] = useState([]);
  // init form inputs
  const [formObj, priceProps, durationProps, descriptionProps] = useHookForm(
    ['price', 'duration', 'description'],
    {},
    ValidationSchema.sessionSettings,
  );

  // submit
  const submit = formObj.handleSubmit(values => {
    values.images = selectImages;
    console.log(values);
    NavigationService.navigate('TrainerSchedule', { payload: values });
  });

  const deleteImage = item => {
    const newData = selectImages.filter(val => val !== item);
    setSelectImages([...newData]);
  };

  const onUploadImage = () => {
    ImagePicker.showGalleryAndCameraOptions(
      val => {
        console.log(val);
        if (val?.uri || val?.length > 0) {
          let newData = [];
          if (val?.uri) {
            newData.push(val?.uri);
          } else {
            const data = val.map(val => val.uri);
            console.log('data ==>', data);
            newData = [...newData, ...data];
          }
          setSelectImages([...selectImages, ...newData]);
        }
      },
      { selectionLimit: UPLOAD_IMAGE_LIMIT - selectImages.length },
    );
  };

  const renderItem = ({ item }) => {
    console.log('renderItem', item);
    return (
      <>
        <View style={Styles.imageViewStyle}>
          {/* <Image source={Images.addButton} style={Styles.addImageSize} />
          <Text style={Styles.imageAddTitle}>{'Add More Images'}</Text> */}
          <ImageView
            source={{ uri: item }}
            borderRadius={12}
            style={Styles.imageViewStyle}
            placeholderStyle={Styles.imageViewStyle}
          />
          <ButtonView
            style={{ position: 'absolute', top: 3, right: 0 }}
            onPress={() => deleteImage(item)}>
            <Image source={Images.remove} />
          </ButtonView>
        </View>
      </>
    );
  };
  return (
    <Container headerTitle="SINGLE SESSION SETTINGS">
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/* <SessionType data={SESSION_TYPE[0]} /> */}
          <SessionRateInput {...priceProps} />
          <Text style={Styles.uploadTitle}>{'SESSION DURATION'}</Text>
          <Dropdown
            placeholder="Select Duration"
            data={SESSION_DURATION}
            {...durationProps}
          />

          <View>
            <Text style={Styles.sessionTimeTitle}>{'ADD DESCRIPTION'}</Text>
            <TextInputNative
              multiline
              inputViewStyle={Styles.textInputView}
              inputContainerStyle={Styles.textInput}
              placeholder="Write Here..."
              placeholderTextColor={Colors.placeholderText}
              {...descriptionProps}
            />
          </View>
          <View>
            <View style={Styles.titleView}>
              <Text style={Styles.uploadTitle}>{'UPLOAD IMAGES'}</Text>
              {UPLOAD_IMAGE_LIMIT !== selectImages.length && (
                <ButtonView onPress={onUploadImage}>
                  <Image source={Images.addButton} />
                </ButtonView>
              )}
            </View>
          </View>
          {selectImages.length > 0 && (
            <FlatList
              style={{ flex: 1 }}
              data={selectImages}
              renderItem={renderItem}
              numColumns={2}
            />
          )}
          <Button
            title="Save & Continue"
            largeButton
            style={Styles.button}
            onPress={submit}
          />
        </>
      </ScrollView>
    </Container>
  );
};

export default TrainerSessionType;
