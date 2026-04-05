import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Colors, Images } from '../../theme';
import Styles from './Styles';
import { AirbnbRating } from 'react-native-ratings';
import Text from '../Text/Text';
import PropTypes from 'prop-types';
import { NavigationService, Util } from '../../utils';
import ButtonView from '../ButtonView';
import { ClassUtill, SessionUtill, UserUtill } from '../../dataUtils';
import ImageView from '../ImageView';
import {
  BOOKING_SESSION_TYPE,
  BOOKING_STATUS,
  SESSION_STATUS,
} from '../../config/Constants';
const Line = () => (
  <View style={Styles.orContainer}>
    <View style={Styles.horizontalLine} />
  </View>
);
const UserCalendarListItem = ({
  props,
  star,
  isSimpleView = false,
  isBooking = false,
  isTrainee = false,
  onButtonPress = () => {},
  onPress = () => {},
}) => {
  // const {
  //   name,
  //   type,
  //   location,
  //   rating,
  //   imageLink,
  //   category,
  //   isSession,
  //   completeStatus,
  // } = props;

  let completeStatus = true;

  const isSession = props?.bookingType !== BOOKING_SESSION_TYPE.CLASS;
  const categories = Util.getTrainerCategoreis(props?.trainer.session ?? []);

  return (
    <ButtonView onPress={() => onPress?.(props)}>
      <View style={Styles.content}>
        <ImageView
          source={
            isTrainee
              ? { uri: UserUtill.image(props.user) }
              : SessionUtill.firstImage(
                  isSession ? props.session : props.class,
                ) === ''
              ? {
                  uri: isTrainee
                    ? UserUtill.image(props.user)
                    : UserUtill.image(props.trainer),
                }
              : {
                  uri: SessionUtill.firstImage(
                    isSession ? props.session : props.class,
                  ),
                }
          }
          style={Styles.imageStyle}
          placeholderStyle={Styles.imageStyle}
          borderRadius={60}
        />
        <View style={Styles.childContainer}>
          <View style={{ flex: 1 }}>
            <View style={Styles.nameStar}>
              <View>
                <Text style={Styles.name}>
                  {isSession
                    ? isTrainee
                      ? UserUtill.name(props.user)
                      : UserUtill.name(props.trainer)
                    : ClassUtill.title(props.class)}
                </Text>
                <Text style={Styles.type}>
                  {ClassUtill.duration(props) + ' mins'}
                </Text>
              </View>
              <View>
                <View
                  style={[
                    Styles.tagView,
                    {
                      backgroundColor: isSession
                        ? Colors.blue
                        : Colors.lightGreen,
                    },
                  ]}>
                  <Text style={Styles.tagViewText}>
                    {isSession ? 'SESSION' : 'CLASS'}
                  </Text>
                </View>
                {star && (
                  <AirbnbRating
                    count={5}
                    showRating={false}
                    defaultRating={UserUtill.rating(props)}
                    size={11}
                  />
                )}
              </View>
            </View>

            {/* {!isSimpleView && <Text style={Styles.category}>{categories}</Text>} */}
            <View
              style={[
                Styles.locationView,
                { marginTop: isSimpleView ? 5 : 0 },
              ]}>
              <View style={Styles.locationMain}>
                <Image
                  source={Images.locationPin}
                  style={Styles.imageLocation}
                />
                <Text style={Styles.location} numberOfLines={2}>
                  {isSession
                    ? SessionUtill.address(props ?? '')
                    : ClassUtill.address(props ?? '')}
                </Text>
              </View>
              {
                // props.status !== BOOKING_STATUS.END &&
                isBooking ? (
                  <View style={{ flex: 1 }}>
                    <View
                      style={Styles.bookButton}
                      // onPress={() => onButtonPress?.(props)}
                      disabled={true}
                      disabledOpacity={isBooking ? 1 : 0.5}>
                      <Text style={Styles.bookText}>{props?.status}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    {props.canCancel && (
                      <ButtonView
                        style={Styles.bookButton}
                        onPress={() => onButtonPress?.(props)}
                        disabled={isBooking}
                        disabledOpacity={isBooking ? 1 : 0.5}>
                        {isSession ? (
                          <Text style={Styles.bookText}>
                            {'CANCEL SESSION'}
                          </Text>
                        ) : (
                          <Text style={Styles.bookText}>{'CANCEL CLASS'}</Text>
                        )}
                      </ButtonView>
                    )}
                  </View>
                )
              }
            </View>
          </View>
        </View>
      </View>
      <Line />
    </ButtonView>
  );
};

UserCalendarListItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  rating: PropTypes.number,
  location: PropTypes.string,
};
export default React.memo(UserCalendarListItem);
