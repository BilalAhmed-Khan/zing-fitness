import React from 'react';
import Styles from './styles';
import { View, FlatList } from 'react-native';
import { Container, FlatListApi } from '../../components';
import { AppHeader } from '../../components';
import { Text } from '../../components';
import FavoriteTrainerListItem from '../../components/FavoriteTrainerListItem/FavoriteTrainerListItem';
import {
  getTrainerIdentifierListingData,
  getTrainerListing,
} from '../../ducks/trainer';
import { UserUtill } from '../../dataUtils';
import { NavigationService } from '../../utils';
const FeaturedTrainer = ({ route }) => {
  const isNearBy = route?.params?.isNearBy ?? false;

  let payload = {};
  if (isNearBy) {
    payload.nearbyTrainers = true;
  } else {
    payload.isFeatured = true;
  }
  return (
    <Container
      style={Styles.container}
      headerTitle={isNearBy ? 'Nearby Trainers' : 'Featured Trainers'}>
      <View style={Styles.secMain}>
        <FlatListApi
          showsVerticalScrollIndicator={false}
          actionType="GET_TRAINER_LISTING"
          identifier={isNearBy ? 'NEARBY_TRAINERS' : 'FEATURED_TRAINERS'}
          selectorData={getTrainerIdentifierListingData}
          requestAction={getTrainerListing.request}
          renderItem={({ item }) => (
            <FavoriteTrainerListItem
              props={item}
              onPress={() => {
                NavigationService.navigate('UserTrainerProfile', {
                  id: UserUtill.id(item),
                });
              }}
            />
          )}
          keyExtractor={item => `${item.id}`}
          payload={payload}
        />
      </View>
    </Container>
  );
};

export default FeaturedTrainer;
