import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Styles from './Styles';
import { AirbnbRating } from 'react-native-ratings';
import Text from '../Text/Text';
import PropTypes from 'prop-types';
import ButtonView from '../ButtonView';
import { NavigationService, Util } from '../../utils';
import { SessionUtill, UserUtill } from '../../dataUtils';
import ImageView from '../ImageView';

const NearbyTrainerListItem = ({ props }) => {
  const categories = Util.getTrainerCategoreis(props?.trainerCategories ?? []);
  return (
    <View style={Styles.container}>
      <ImageView
        source={{ uri: UserUtill.image(props) }}
        borderRadius={10}
        style={Styles.imageStyle}
        placeholderStyle={Styles.imageStyle}
      />
      <View style={Styles.maincontent}>
        <View style={Styles.content}>
          <View style={{ flex: 0.9 }}>
            <Text style={Styles.trainerN}>{UserUtill.name(props)}</Text>
            <Text style={Styles.trainerType}>{categories}</Text>
          </View>
          <View style={Styles.ratingContainer}>
            <AirbnbRating
              count={1}
              showRating={false}
              defaultRating={1}
              size={13}
              isDisabled={true}
            />
            <Text style={Styles.ratingText}>
              {Util.toFixedIfNecessary(UserUtill.rating(props), 0)}
            </Text>
          </View>
        </View>
        <View style={Styles.priceButtonContainer}>
          <Text style={Styles.price}>{`$${Util.toFixedIfNecessary(
            SessionUtill.price(props?.session),
            2,
          )}`}</Text>
          <ButtonView
            style={Styles.bookButton}
            onPress={() => {
              NavigationService.navigate('UserTrainerProfile', {
                id: UserUtill.id(props),
              });
            }}>
            <Text style={Styles.bookText}>BOOK AHEAD</Text>
          </ButtonView>
        </View>
      </View>
    </View>
  );
};

NearbyTrainerListItem.propTypes = {
  trainerName: PropTypes.string,
  trainingType: PropTypes.string,
  rating: PropTypes.string,
  cost: PropTypes.string,
};
export default NearbyTrainerListItem;
