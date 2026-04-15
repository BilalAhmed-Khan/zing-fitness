/** @format */

import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { Colors } from '../../theme';
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
  checkBox: PropTypes.bool,
  content: PropTypes.string,
  phrase1: PropTypes.string,
  phrase2: PropTypes.string,
  seperatorTile: PropTypes.string,
  phrase1CallBack: PropTypes.func,
  phrase2CallBack: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  onPressCheckBox: PropTypes.func,
  checkBoxState: PropTypes.bool,
};

ContentAttributesText.defaultProps = {
  content: 'By selecting Facebook, Google, or Apple above, you agree to our',
  phrase1: 'Terms of Use and Privacy Policy',
  phrase2: 'Privacy Policy',
  seperatorTile: 'and',
};
export default ContentAttributesText;
