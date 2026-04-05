import React from 'react';
import { View, Image } from 'react-native';
import { Images } from '../../theme';
import Styles from './Styles';
import { AirbnbRating } from 'react-native-ratings';
import Text from '../Text/Text';
import PropTypes from 'prop-types';
import ImageView from '../ImageView';
import { UserUtill } from '../../dataUtils';
import { Util } from '../../utils';
import ButtonView from '../ButtonView';
const Line = () => (
  <View style={Styles.orContainer}>
    <View style={Styles.horizontalLine} />
  </View>
);
const FavoriteTrainerListItem = ({ props, onPress }) => {
  // const { name, type, location, rating, imageLink } = props;
  const categories = Util.getTrainerCategoreis(props?.trainerCategories ?? []);
  return (
    <ButtonView onPress={() => onPress(props)}>
      <View style={Styles.content}>
        <ImageView
          source={{ uri: UserUtill.image(props) }}
          style={Styles.imageStyle}
          placeholderStyle={Styles.imageStyle}
          borderRadius={60}
        />
        <View style={Styles.childContainer}>
          <View>
            <Text style={Styles.name}>{UserUtill.name(props)}</Text>
            <Text style={Styles.type}>{categories}</Text>
            {/* <View style={Styles.locationView}>
              <Image source={Images.locationPin} style={Styles.imageLocation} />
              <Text style={Styles.location} numberOfLines={1}>
                {UserUtill.address(props)}
              </Text>
            </View> */}
          </View>
          <View style={Styles.ratingContainer}>
            <AirbnbRating
              count={1}
              showRating={false}
              defaultRating={UserUtill.rating(props)}
              size={13}
              isDisabled={true}
            />
            <Text style={Styles.ratingText}>
              {Util.toFixedIfNecessary(UserUtill.rating(props), 0)}
            </Text>
          </View>
        </View>
      </View>
      <Line />
    </ButtonView>
  );
};

FavoriteTrainerListItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  rating: PropTypes.number,
  location: PropTypes.string,
};
export default FavoriteTrainerListItem;
