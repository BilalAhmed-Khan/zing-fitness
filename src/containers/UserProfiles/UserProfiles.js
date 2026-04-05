import React from 'react';
import Styles from './Styles';
import { View, FlatList } from 'react-native';
import { Container, FlatListApi } from '../../components';
import { AppHeader } from '../../components';
import { Text } from '../../components';
import FavoriteTrainerListItem from '../../components/FavoriteTrainerListItem/FavoriteTrainerListItem';
import {
  getTrainerIdentifierData,
  getTrainerIdentifierListingData,
  getTrainerListing,
} from '../../ducks/trainer';
import { NavigationService } from '../../utils';
import { UserUtill } from '../../dataUtils';
import { Colors } from '../../theme';
const UserProfiles = () => {
  return (
    <Container style={Styles.container}>
      <AppHeader notificationCount="9" />
      <View style={Styles.secMain}>
        <FlatListApi
          style={{ paddingTop: 10, backgroundColor: Colors.secondary }}
          showsVerticalScrollIndicator={false}
          actionType="GET_TRAINER_LISTING"
          identifier={'TRAINERS'}
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
          payload={{ nearbyTrainers: true }}
        />
      </View>
    </Container>
  );
};

export default UserProfiles;
