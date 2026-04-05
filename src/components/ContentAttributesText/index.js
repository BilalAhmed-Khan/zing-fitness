/** @format */

import React from 'react';
import { View, Text, TextRN, Image, TouchableOpacity } from 'react-native';
import { Colors, Metrics } from '../../theme';
// import PropTypes from "prop-types";
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import styles from './styles';
import { ButtonView } from '../../components';
import { Images } from '../../theme';

const ContentAttributesText = ({
  content,
  phrase1,
  phrase2,
  seperatorTile,
  phrase1CallBack,
  phrase2CallBack,
  containerStyle,
  textStyle,
  checkBox,
  onPressCheckBox,
  checkBoxState,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {checkBox && (
        <ButtonView
          onPress={() => onPressCheckBox(!checkBoxState)}
          style={[styles.box, checkBoxState && { borderWidth: 0 }]}>
          {checkBoxState && (
            <Image source={Images.icons.tick} style={styles.tick} />
          )}
        </ButtonView>
      )}
      <Text style={[styles.policyText, textStyle]}>
        {content}{' '}
        <ButtonView
          accessibilityLabel={'Terms Conditions btn'}
          onPress={phrase1CallBack}>
          <Text style={[styles.polictTextPrimary, { color: Colors.primary }]}>
            {`${phrase1} `}
          </Text>
        </ButtonView>
      </Text>
    </View>
  );
};

ContentAttributesText.propTypes = {
  checkBox: ViewPropTypes.boolean,
  content: ViewPropTypes.string,
  phrase1: ViewPropTypes.string,
  phrase2: ViewPropTypes.string,
  seperatorTile: ViewPropTypes.string,
  phrase1CallBack: ViewPropTypes.func,
  phrase2CallBack: ViewPropTypes.func,
};

ContentAttributesText.defaultProps = {
  content: 'By selecting Facebook, Google, or Apple above, you agree to our',
  phrase1: 'Terms of Use and Privacy Policy',
  phrase2: 'Privacy Policy',
  seperatorTile: 'and',
};
export default ContentAttributesText;
