import React from 'react';
import { View, Image } from 'react-native';
import { Colors, Images, Metrics } from '../../theme';
import { ImagePicker } from '../../utils';
import ButtonView from '../ButtonView';
import InputError from '../InputError';
import { Styles } from './Styles';

const SelectImage = ({
  onChange,
  value,
  error,
  isTrainee = false,
  setCropImage,
}) => {
  const imagePickerCallback = () => {
    ImagePicker.showGalleryAndCameraOptions(val => {
      console.log(val);
      if (!isTrainee) {
        onChange(val.uri);
      } else {
        ImagePicker.cropImage(
          val,
          {
            width: Metrics.width,
            height: Metrics.width / 2,
          },
          cropImage => {
            onChange(val.uri);
            // Util.showMessage('please select the box image for the card view');
            setCropImage(cropImage.uri);
            // console.log(cropImage);
          },
        );
      }
    });
  };

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  return (
    <View style={Styles.innerContainer}>
      <ButtonView
        style={[Styles.container, !value && { backgroundColor: Colors.white }]}
        onPress={imagePickerCallback}>
        <Image
          source={value ? { uri: value } : Images.cameraRed}
          style={value ? Styles.imageStyle : Styles.imagePlaceholdeStyle}
        />
      </ButtonView>
      {renderError()}
    </View>
  );
};

export default SelectImage;
