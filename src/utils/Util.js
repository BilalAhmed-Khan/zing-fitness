import { showMessage as flashMessageShow } from 'react-native-flash-message';
import { Platform, StatusBar, Alert, Share } from 'react-native';
import { normalize, schema } from 'normalizr';
import moment from 'moment';
import _ from 'lodash';
import { Colors } from '../theme';
import DataHandler from './DataHandler';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { authGetProfile, getUserData } from '../ducks/auth';
import { getTrainerSession } from '../ducks/trainer';
import { bookingDetails, trainerAccept } from '../ducks/booking';
import NavigationService from './NavigationService';
import { BOOKING_SESSION_TYPE } from '../config/Constants';
import { unreadNotificationCount } from '../ducks/notification';
import { createChatRoom } from '../ducks/chat';
import { SessionUtill } from '../dataUtils';

function isPlatformAndroid() {
  return Platform.OS === 'android';
}

function isPlatformIOS() {
  return Platform.OS === 'ios';
}

function getPlatform() {
  return Platform.OS;
}

function normalizeData(data, id = '_id') {
  const offerSchema = new schema.Entity('listItems', {}, { idAttribute: id });
  const offerListSchema = [offerSchema];
  const normalizedData = normalize(data, offerListSchema);
  return {
    ids: normalizedData.result,
    items: normalizedData.entities.listItems || {},
  };
}

function convert24HrTo12(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

function convert24HrTo12Moment(time24) {
  return moment(time24, 'hh:mm A');
}

function getFormattedTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${
    seconds > 9 ? seconds : `0${seconds}`
  }`;
}

function translucentApp() {
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('light-content');
}

function setStatusBarLight() {
  StatusBar.setBarStyle('light-content', true);
}

function setStatusBarDark() {
  StatusBar.setBarStyle('dark-content', true);
}

function isNotEmpty(data) {
  return !_.isEmpty(data, true);
}

function isEmpty(data) {
  return _.isEmpty(data, true);
}

function clone(data) {
  return _.clone(data);
}

function cloneDeep(data) {
  return _.cloneDeep(data);
}

function getTimeDiffInMinutes(timeStamp) {
  return (Number(new Date()) - Number(new Date(timeStamp))) / (1000 * 60);
}

function compareDeep(previous, next) {
  return !_.isEqual(previous, next);
}

function getDateFromNow(date) {
  return date ? moment(date).fromNow() : '';
}

function onShare(title, message) {
  Share.share({
    title,
    message,
  });
}

function formatDate(dateString, formattedDateFormat) {
  return dateString ? moment(dateString).format(formattedDateFormat) : '';
}

function formatDate2(dateString, currentDateFormat, formattedDateFormat) {
  return dateString
    ? moment(dateString, currentDateFormat).format(formattedDateFormat)
    : '';
}

function compareDates(date1, date2) {
  if (date1 && date2) {
    return moment(date1).isSame(date2, 'day');
  }
  return false;
}

function setStatusBarStyle(barStyle) {
  StatusBar.setBarStyle(barStyle, true);
}

function showAlertConfirm(
  title,
  message,
  doneText,
  onDonePress,
  cancelText = 'cancel',
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        onPress: () => {},
        style: 'cancel',
      },
      { text: doneText, onPress: () => onDonePress() },
    ],
    { cancelable: true },
  );
}

function removeFormatLocalNumber(x) {
  return x.toString().replace(/[^\d.-]/g, '');
}

function toFixedIfNecessary(value, dp = 1) {
  return parseFloat(value).toFixed(dp);
}

/*
type : 'danger' , 'success' , 'info'
*/
function showMessage(message, type = 'danger', duration = 2000) {
  flashMessageShow({
    message,
    type,
    duration,
    backgroundColor: type === 'sucess' ? Colors.lightGreen : Colors.primary,
  });
}

function concatNormalizeArray(
  state,
  action,
  normalizeKey = '_id',
  dataKey = 'data',
  isUnique = false,
) {
  const { data, reset, identifier } = action.payload;
  const { ids, items } = normalizeData(data, normalizeKey);
  let newIds = reset ? ids : _.concat(state?.[identifier] ?? [], ids);
  if (isUnique) {
    newIds = Array.from(new Set(newIds));
  }
  state[identifier] = newIds;
  state[dataKey] = { ...state[dataKey], ...items };
}

function concatDataArray(state, action, dataKey = 'data', identifier) {
  const { data, reset } = action.payload;
  let newData;
  if (identifier) {
    newData = reset
      ? data
      : _.concat(state?.[dataKey]?.[identifier] ?? [], data);
    state[dataKey][identifier] = newData;
  } else {
    newData = reset ? data : _.concat(state?.[dataKey] ?? [], data);

    state[dataKey] = newData;
  }
}

function stringToDateObject(date, format) {
  if (date) {
    return moment(date, format).toDate();
  }
  return moment().toDate();
}

function convert12HoursTime(time) {
  return moment(time, 'hh:mm A').format('HH:mm');
}

function makeRandomString(length = 20) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function refreshAuthData() {
  const userData = getUserData(DataHandler.getStore().getState());
  DataHandler.getStore().dispatch(
    authGetProfile.request({
      payloadApi: {
        id: userData.id,
      },
      cb: () => {},
    }),
  );
}
function refreshNotificationData() {
  const userData = getUserData(DataHandler.getStore().getState());
  DataHandler.getStore().dispatch(
    unreadNotificationCount.request({
      payloadApi: {
        // id: userData.id,
      },
      cb: () => {},
    }),
  );
}

function getNestedRouteName(route) {
  return getFocusedRouteNameFromRoute(route);
}

function getTrainerCategoreis(data) {
  if (data.length > 0) {
    let categoriesTitle = '';
    // const getTitles = data?.map(val => val.)
    for (let i = 0; i < data.length; i++) {
      categoriesTitle += i === 0 ? data[i].title : ', ' + data[i].title;
    }
    return categoriesTitle;
  }

  return '';
}

function showDateNotification(index, notificationList) {
  if (index === 0) {
    return true;
  }
  const currentNotificationDate = notificationList[index].createdAt;
  const previousNotificationDate = notificationList[index - 1].createdAt;
  if (currentNotificationDate && previousNotificationDate) {
    return !moment(currentNotificationDate).isSame(
      previousNotificationDate,
      'day',
    );
  }
  return false;
}

function showDateNotificationFromLast(index, notificationList) {
  const isLastItem = index === notificationList.length - 1;
  if (isLastItem) {
    return true;
  }
  const currentNotificationDate = notificationList[index].createdAt;
  const nextNotificationDate = notificationList[index + 1]?.createdAt;
  if (currentNotificationDate && nextNotificationDate) {
    return !moment(currentNotificationDate).isSame(nextNotificationDate, 'day');
  }
  return false;
}

function dayFromNow(time) {
  moment.updateLocale('en', {
    calendar: {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[Last] dddd',
      nextWeek: '[Next] dddd',
      sameElse: 'L',
    },
  });
  return moment(time).calendar();
}

function addTimeFromMomment(time, addDuration) {
  const duration = moment.duration(addDuration, 'minutes'); // Duration to add (60 minutes)

  const newTime = moment(time, 'HH:mm').add(duration).format('HH:mm'); // Add duration to the starting time

  return convert24HrTo12(newTime);
}

function getTimeSlots(currentDate, slotDuration) {
  let slots = [];
  let startTime = new Date(currentDate.setHours(9, 0, 0, 0));
  let endTime = new Date(currentDate.setHours(24, 59, 59, 999));

  while (startTime < endTime) {
    let slot = startTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    slots.push(slot);
    startTime.setTime(startTime.getTime() + slotDuration * 60 * 1000);
  }

  return slots;
}

function getTimeSlotsFromMoment(currentDate, slotDuration) {
  let slots = [];
  let startTime = moment(currentDate);

  if (!moment().isSame(currentDate, 'day')) {
    startTime.hours(0).minutes(0).seconds(0);
  } else {
    console.log(startTime);
    console.log(currentDate.hours(), currentDate.minutes());
    startTime
      .hours(currentDate.hours())
      .minutes(currentDate.minutes())
      .seconds(0);
  }
  let endTime = moment(currentDate).endOf('day');

  while (startTime.isSameOrBefore(endTime)) {
    slots.push(startTime.format('HH:mm'));
    startTime.add(slotDuration, 'minutes');
  }

  return slots;
}

function onNotificationTap(data) {
  console.log('DATA ==>', data);
  const { dispatch } = DataHandler.getStore();
  switch (data?.target_identifier || data?.identifier) {
    case 'chat_messages':
      dispatch(
        createChatRoom.request({
          payloadApi: { userId: data.sender },
          identifier: data.sender,
          cb: callbackData => {
            console.log('CALLBACK ==>', callbackData);
            NavigationService.navigate('Chat', {
              id: data.sender,
              roomId: callbackData?.roomId,
            });
          },
        }),
      );
      break;
    case 'real_time_booking':
      dispatch(
        bookingDetails.request({
          payloadApi: { id: data?.reference_id },
          identifier: data?.reference_id,
          cb: data => {
            setTimeout(() => {
              DataHandler.getTraineAlertModal().show({ data: data });
            }, 500);
          },
        }),
      );
      break;
    case 'real_time_booking_accepted':
      dispatch(
        bookingDetails.request({
          payloadApi: { id: data?.reference_id },
          identifier: data?.reference_id,
          cb: data => {
            console.log('data  =>', data);
            if (data.isPaid) {
              NavigationService.navigate('TrainerSessionDetail', {
                isSession: data?.bookingType !== BOOKING_SESSION_TYPE.SESSION,
                id: data?.id ?? '',
              });
            } else {
              NavigationService.navigate('UserTrainerSchedule', {
                isSession: true,
                id: data?.id,
                data: data,
                trainerData: data?.trainer,
                isRealTime: true,
              });
            }
            // dispatch(trainerAccept({ id: data?.id }));
            // NavigationService.navigate('SearchTrainer', { payloadData: {} });
          },
        }),
      );
      break;
    case 'session_booked':
      // NavigationService.navigate('ScoreCardDetails', {
      //   id: data?.ref_id,
      // });
      dispatch(
        bookingDetails.request({
          payloadApi: { id: data?.reference_id },
          identifier: data?.reference_id,
          cb: data => {
            // dispatch(trainerAccept({ id: data?.id }));
            NavigationService.navigate('TrainerSessionDetail', {
              isSession: data?.bookingType !== BOOKING_SESSION_TYPE.SESSION,
              id: data?.id ?? '',
            });
          },
        }),
      );
      break;
    case 'booking_cancelled':
    case 'class_booked':
    case 'booking_completed':
    case 'booking_started':
      dispatch(
        bookingDetails.request({
          payloadApi: { id: data?.reference_id },
          identifier: data?.reference_id,
          cb: data => {
            // dispatch(trainerAccept({ id: data?.id }));
            NavigationService.navigate('TrainerSessionDetail', {
              isSession: data?.bookingType !== BOOKING_SESSION_TYPE.CLASS,
              id: data?.id ?? '',
            });
          },
        }),
      );
      break;
    default:
      break;
  }
}

function supportCategoriesArrayForDD(data = []) {
  let newData = [];
  if (data.length > 0) {
    newData = data?.map(obj => {
      return {
        value: obj.id,
        image: obj.image,
        sort: obj.sort,
        label: obj.title,
        updatedAt: obj.updatedAt,
      };
    });
  }
  return newData;
}
function countdown(startTime, duration) {
  const start = moment(startTime, 'H:mm'); // Parse the start time
  const end = moment(start).add(duration, 'minutes'); // Calculate end time

  const now = moment(); // Get current time
  const remaining = moment.duration(end.diff(now)).asSeconds(); // Calculate remaining time in seconds

  return remaining < 0 ? 0 : remaining;
}

function isPast(myDate) {
  const now = moment(); // get the current date and time

  if (myDate.isBefore(now, 'day')) {
    return true;
  } else {
    return false;
  }
}

// Function to sort the array based on the 'id' property
function sortArrayById(array) {
  return array.slice().sort((a, b) => {
    const offsetA = parseInt(a.id.split('/')[1]);
    const offsetB = parseInt(b.id.split('/')[1]);

    return offsetA - offsetB;
  });
}

function isPastTime(startTime) {
  const myDate = moment(startTime); // create a moment object for a specific date and time

  if (myDate.valueOf() < moment().valueOf()) {
    return true;
  } else {
    return false;
  }
}

function convertDayString(days) {
  // let days = "monday,saturday,tuesday,thursday";
  let order = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  let abbreviations = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  if (!days) {
    const today = new Date();
    return abbreviations[today.getDay()];
  }

  let daysArray = days?.split(',');
  let result = [];

  // sort the array of days based on their position in the order array
  daysArray.sort((a, b) => order.indexOf(a) - order.indexOf(b));

  let startDay = daysArray[0];
  let endDay = daysArray[0];

  // loop through each day in the array and group consecutive days together
  for (let i = 1; i < daysArray.length; i++) {
    let currentDay = daysArray[i];

    if (order.indexOf(currentDay) - order.indexOf(endDay) === 1) {
      endDay = currentDay;
    } else {
      if (startDay === endDay) {
        result.push(abbreviations[order.indexOf(startDay)]);
      } else {
        result.push(
          `${abbreviations[order.indexOf(startDay)]}-${
            abbreviations[order.indexOf(endDay)]
          }`,
        );
      }
      startDay = currentDay;
      endDay = currentDay;
    }
  }

  // handle the last group of days
  if (startDay === endDay) {
    result.push(abbreviations[order.indexOf(startDay)]);
  } else {
    result.push(
      `${abbreviations[order.indexOf(startDay)]}-${
        abbreviations[order.indexOf(endDay)]
      }`,
    );
  }

  // let resultString = result.join(", ");
  // console.log(resultString); // output: "Mon, Tue, Thu, Sat"

  return result.join(', ');
}

export default {
  isPlatformAndroid,
  isPlatformIOS,
  getPlatform,
  normalizeData,
  convert24HrTo12,
  translucentApp,
  setStatusBarLight,
  setStatusBarDark,
  isNotEmpty,
  isEmpty,
  clone,
  cloneDeep,
  getTimeDiffInMinutes,
  compareDeep,
  getDateFromNow,
  formatDate,
  makeRandomString,
  formatDate2,
  stringToDateObject,
  compareDates,
  setStatusBarStyle,
  showAlertConfirm,
  removeFormatLocalNumber,
  toFixedIfNecessary,
  showMessage,
  concatDataArray,
  concatNormalizeArray,
  getFormattedTime,
  refreshAuthData,
  getNestedRouteName,
  getTrainerCategoreis,
  showDateNotification,
  dayFromNow,
  getTimeSlots,
  getTimeSlotsFromMoment,
  onNotificationTap,
  supportCategoriesArrayForDD,
  addTimeFromMomment,
  countdown,
  refreshNotificationData,
  isPast,
  isPastTime,
  showDateNotificationFromLast,
  convertDayString,
  convert12HoursTime,
  convert24HrTo12Moment,
  sortArrayById,
  onShare,
};
