import React, { useState } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { Styles } from './Styles';
import { Colors } from '../../theme';
import { View } from 'react-native';
import moment from 'moment';

const markedDateStyle = {
  dateContainerStyle: { backgroundColor: Colors.primary },
};

const HorizontalCalendar = ({
  markedDates,
  customDatesStyles,
  selectedDate,
}) => {
  // const [markedDates, setMarkedDates] = useState([]);
  // const [customDatesStyles, setCustomDateStyles] = useState([]);

  // const _onDateSelected = date => {
  //   console.log(date);
  //   // const _date = {
  //   //   date,
  //   // };
  //   // let _marketDates = markedDates.filter(_marketDate =>
  //   //   _marketDate.date.isSame(date),
  //   // );
  //   // if (_marketDates.length > 0) {
  //   //   _marketDates = markedDates.filter(
  //   //     _marketDate => !_marketDate.date.isSame(date),
  //   //   );
  //   // } else {
  //   //   _marketDates = [...markedDates, _date];
  //   // }
  //   // const _customDatesStyles = _marketDates.map(_marketDate => ({
  //   //   startDate: _marketDate.date,
  //   //   ...markedDateStyle,
  //   // }));
  //   // setMarkedDates(_marketDates);
  //   // setCustomDateStyles(_customDatesStyles);
  //   const _customDatesStyles = {
  //     startDate: date,
  //     ...markedDateStyle,
  //   };

  //   setMarkedDates([date]);
  //   setCustomDateStyles([_customDatesStyles]);
  // };

  const onDateSelected = date => {
    const _customDatesStyles = {
      startDate: date,
      ...markedDateStyle,
    };
    selectedDate?.(date);
    setTimeout(() => {
      // setMarkedDates([date]);
      // setCustomDateStyles([_customDatesStyles]);
    }, 300);
  };
  return (
    <View>
      <CalendarStrip
        calendarHeaderStyle={Styles.dateNumberStyle}
        dateNumberStyle={Styles.dateNumberStyle}
        dateNameStyle={Styles.dateNumberStyle}
        highlightDateNameStyle={Styles.dateNumberStyle}
        highlightDateNumberStyle={Styles.dateNumberStyle}
        // startingDate={new moment()}
        minDate={new Date()}
        enabled
        iconStyle={Styles.arrowIcon}
        style={Styles.calendar}
        markedDates={markedDates}
        onDateSelected={onDateSelected}
        customDatesStyles={customDatesStyles}
        dayContainerStyle
        useIsoWeekday={false}
      />
    </View>
  );
};

export default React.memo(HorizontalCalendar);
