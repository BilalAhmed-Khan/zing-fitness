import React from 'react';
import { View, Image } from 'react-native';
import { Colors, Images } from '../../theme';
import Styles from './styles';
import Text from '../Text/Text';
import PropTypes from 'prop-types';
import ButtonView from '../ButtonView';
import ImageView from '../ImageView';
import { Util } from '../../utils';
import dayjs from 'dayjs';
import { ClassUtill } from '../../dataUtils';
const Line = () => (
  <View style={Styles.orContainer}>
    <View style={Styles.horizontalLine} />
  </View>
);
const MyAppointmentsListItem = ({
  props,
  onPress = () => {},
  isUser,
  onDeletePress,
}) => {
  const { title, days, address, images, price, id } = props;
  console.log('link,', images);
  return (
    <ButtonView
      style={Styles.content}
      onPress={onPress}
      // disabled={isUser}
      // disabledOpacity={isUser ? 1 : 0.5}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={Styles.imageViewStyle}>
          <ImageView
            source={{ uri: images[0] }}
            style={Styles.imageStyle}
            borderRadius={10}
            placeholderStyle={Styles.imageStyle}
          />
        </View>
        <View style={Styles.childContainer}>
          <View style={Styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={Styles.name}>{title}</Text>
              <Text style={Styles.type}>{Util.convertDayString(days)}</Text>
              <Text style={Styles.type}>
                {`${dayjs(props.startTimeFull).format(
                  'hh:mm A',
                  // )} - ${Util.addTimeFromMomment(
                  //   dayjs(props.startTimeFull).format('hh:mm'),
                  //   ClassUtill.duration(props),
                )}`}
              </Text>
            </View>
            <View style={Styles.ratingContainer}>
              <Text style={Styles.ratingText}>{`$${price}`}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={Styles.locationView}>
        <Image source={Images.locationPin} style={Styles.imageLocation} />
        <Text style={Styles.location} numberOfLines={1}>
          {address}
        </Text>
      </View>
      {isUser && (
        <ButtonView
          style={{ position: 'absolute', top: -8, right: -12, padding: 5 }}
          onPress={() => onDeletePress(id)}>
          <Image source={Images.remove} style={{ width: 40, height: 40 }} />
        </ButtonView>
      )}
    </ButtonView>
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
