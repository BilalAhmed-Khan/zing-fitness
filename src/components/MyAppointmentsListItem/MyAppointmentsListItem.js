import React from 'react';
import { View, Image } from 'react-native';
import { Colors, Images } from '../../theme';
import Styles from './Styles';
import Text from '../Text/Text';
import PropTypes from 'prop-types';
import ImageView from '../ImageView';
import { UserUtill } from '../../dataUtils';
import { Util } from '../../utils';
const Line = () => (
  <View style={Styles.orContainer}>
    <View style={Styles.horizontalLine} />
  </View>
);
const MyAppointmentsListItem = ({ props }) => {
  // const { name, type, location, time, imageLink, isSession } = props;
  const isSession = true;
  const categories = Util.getTrainerCategoreis(props?.trainerCategories ?? []);
  return (
    <View>
      <View style={Styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <ImageView
            source={{ uri: UserUtill.image(props) }}
            style={Styles.imageStyle}
            placeholderStyle={Styles.imageStyle}
            borderRadius={17}
          />
          <View style={Styles.childContainer}>
            <View>
              <Text style={Styles.name}>{UserUtill.name(props)}</Text>
              <Text style={Styles.type}>{categories}</Text>
              <View style={Styles.locationView}>
                <Image
                  source={Images.locationPin}
                  style={Styles.imageLocation}
                />
                <Text style={Styles.location} numberOfLines={1}>
                  {UserUtill.address(props)}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={[
                Styles.tagView,
                {
                  backgroundColor: isSession ? Colors.blue : Colors.lightGreen,
                },
              ]}>
              <Text style={Styles.tagViewText}>
                {isSession ? 'SESSION' : 'CLASS'}
              </Text>
            </View>
          </View>
        </View>
        <View style={Styles.ratingContainer}>
          {/* <Text style={Styles.ratingText}>{'time'}</Text> */}
          {/* <Text style={Styles.More}>'More…'</Text> */}
        </View>
      </View>
      <Line />
    </View>
  );
};

MyAppointmentsListItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  imageLink: PropTypes.string,
};
export default MyAppointmentsListItem;
