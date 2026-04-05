import React from 'react';
import { View, FlatList } from 'react-native';
import { Container, AppHeader, Button } from '../../components';
import Styles from './Styles';
import UserCalendarListItem from '../../components/UserCalendarListitem/UserCalendarListitem';
const UserCalendar = () => {
  const UserCalendarList = [
    {
      name: 'Malcolm Function',
      type: 'CrossFit Yoga | Group Session | 1 Hour',
      location: 'Taos, NM',
      rating: 5,
      imageLink: 'https://bit.ly/3JxFYHQ',
      category: 'Monday | 11:00 AM',
    },
    {
      name: 'Malcolm Function',
      type: 'CrossFit Yoga | Group Session | 1 Hour',
      location: 'Taos, NM',
      rating: 4,
      imageLink: 'https://bit.ly/3JxFYHQ',
      category: 'Monday | 11:00 AM',
    },
    {
      name: 'Malcolm Function',
      type: 'CrossFit Yoga | Group Session | 1 Hour',
      location: 'Taos, NM',
      rating: 3,
      imageLink: 'https://bit.ly/3JxFYHQ',
      category: 'Monday | 11:00 AM',
    },
    {
      name: 'Malcolm Function',
      type: 'CrossFit Yoga | Group Session | 1 Hour',
      location: 'Taos, NM',
      rating: 2,
      imageLink: 'https://bit.ly/3JxFYHQ',
      category: 'Monday | 11:00 AM',
    },
  ];
  return (
    <Container style={Styles.container}>
      <AppHeader notificationCount="9" />
      <View style={Styles.secMain}>
        <View style={Styles.buttonContainer}>
          <Button
            style={Styles.buttonStyleS}
            titleStyle={Styles.buttonTextStyleS}
            title="SCHEDULED BOOKINGS"
          />
          <Button
            style={Styles.buttonStyleB}
            titleStyle={Styles.buttonTextStyleS}
            title="BOOKING HISTORY"
          />
        </View>
        <FlatList
          data={UserCalendarList}
          renderItem={({ item }) => (
            <UserCalendarListItem
              // star={true} for BOoking history screen
              props={item}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default UserCalendar;
