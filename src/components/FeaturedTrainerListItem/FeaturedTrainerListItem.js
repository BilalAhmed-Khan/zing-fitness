import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Images } from '../../theme';
import Styles from './Styles';
import { AirbnbRating } from 'react-native-ratings';
import Text from '../Text/Text';
import PropTypes from 'prop-types';
import ButtonView from '../ButtonView';
import { NavigationService, Util } from '../../utils';
import { SessionUtill, UserUtill } from '../../dataUtils';
import ImageView from '../ImageView';
const Line = () => (
  <View style={Styles.orContainer}>
    <View style={Styles.horizontalLine} />
  </View>
);
const FeaturedTrainerListItem = ({ props }) => {
  // const { trainerName, trainingType, rating, shedule, time, cost, imageLink } =
  //   props;
  const categories = Util.getTrainerCategoreis(props?.trainerCategories ?? []);
  return (
    <ButtonView
      style={Styles.container}
      onPress={() => {
        NavigationService.navigate('UserTrainerProfile', {
          id: UserUtill.id(props),
        });
      }}>
      <ImageView
        source={{ uri: UserUtill.cropImage(props) }}
        style={Styles.imageStyle}
        placeholderStyle={Styles.imageStyle}
        // resizeMode={'cover'}
      />
      <View style={Styles.boxItems}>
        <Text style={Styles.boxName} numberOfLines={2}>
          {UserUtill.name(props)}
        </Text>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={UserUtill.rating(props)}
          size={13}
          isDisabled={true}
        />
      </View>
      <View style={Styles.boxItems2}>
        <Text style={Styles.trainingType}>{categories}</Text>
        <Text style={Styles.cost}>{`$${Util.toFixedIfNecessary(
          SessionUtill.price(props?.session),
          2,
        )}`}</Text>
      </View>
      {/* <Line />
      <View style={Styles.mainTime}>
        <View style={Styles.boxItems3}>
          <Image source={Images.calendarSmall} style={Styles.smallImage} />
          <Text style={Styles.cost}>{'shedule'}</Text>
        </View>
        <View style={Styles.boxItems3}>
          <Image source={Images.clock} style={Styles.smallImage} />
          <Text style={Styles.cost}>{'time'}</Text>
        </View>
      </View> */}
    </ButtonView>
  );
};

FeaturedTrainerListItem.propTypes = {
  trainerName: PropTypes.string,
  trainingType: PropTypes.string,
  rating: PropTypes.number,
  shedule: PropTypes.string,
  time: PropTypes.string,
  cost: PropTypes.string,
};
export default FeaturedTrainerListItem;
